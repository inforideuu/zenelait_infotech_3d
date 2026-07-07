import json
import random
import os
import requests
from django.utils import timezone
from django.http import JsonResponse, HttpResponseNotAllowed
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import get_object_or_404
from .models import About, TeamMember, Service, Project, Career, Inquiry, Testimonial, AdminCredential, OtpCode, ProblemResolution

# Helper to serialize dynamic fields
def to_dict(model_obj):
    if not model_obj:
        return {}
    data = {}
    for field in model_obj._meta.fields:
        if field.is_relation:
            data[field.name] = getattr(model_obj, field.attname)
        else:
            val = getattr(model_obj, field.name)
            if hasattr(val, 'isoformat'):
                data[field.name] = val.isoformat()
            else:
                data[field.name] = val
    return data

@csrf_exempt
def api_about(request):
    about_obj = About.objects.first()
    if not about_obj:
        about_obj = About.objects.create(
            mission="To architect scalable, high-performance digital matrices that empower global enterprises through precision technology.",
            vision="To set the absolute standard for immersive, highly kinetic, interactive web experiences and cognitive platforms.",
            who_we_are="Zenelait Infotech specializes in building custom software products that empower startups, SMEs, and large enterprises. We bridge the gap between complex business challenges and innovative technology solutions.",
            commitment="Our focus is on delivering high quality development, timely delivery, and long term support. As a trusted product based organization, we ensure that every solution we build from ERP systems to mobile applications is engineered to absorb massive concurrency and scale effortlessly.",
            values="Engineered with uncompromising precision. We value bulletproof safety, high concurrency, clean procedural pipelines, and high-fidelity aesthetics across every system."
        )
        # Create default team members
        TeamMember.objects.create(about=about_obj, name='Dr. Helen Vance', role='Chief Technical Architect', bio='Former infrastructure lead at NASA, specialized in procedural rendering and lattice math.')
        TeamMember.objects.create(about=about_obj, name='Marcus Sterling', role='Head of AI Systems', bio='Pioneered early neural routing matrix setups and natural language agent scaling.')
        TeamMember.objects.create(about=about_obj, name='Sienna Ross', role='Lead Creative Designer', bio='Award-winning interactive artist dedicated to premium glassmorphic interfaces.')

    if request.method == 'GET':
        team = [to_dict(m) for m in about_obj.team.all()]
        data = to_dict(about_obj)
        data['team'] = team
        return JsonResponse(data, safe=False)

    elif request.method == 'POST':
        try:
            body = json.loads(request.body)
            about_obj.mission = body.get('mission', about_obj.mission)
            about_obj.vision = body.get('vision', about_obj.vision)
            about_obj.who_we_are = body.get('who_we_are', about_obj.who_we_are)
            about_obj.commitment = body.get('commitment', about_obj.commitment)
            about_obj.values = body.get('values', about_obj.values)
            about_obj.save()

            # Handle team updates if passed in
            if 'team' in body:
                # Simple recreation or update
                existing_team_ids = [m.id for m in about_obj.team.all()]
                passed_team = body['team']
                
                # Keep track of kept IDs to delete others
                kept_ids = []
                for member_data in passed_team:
                    m_id = member_data.get('id')
                    # If ID is string like 't_...' or 't1' or has non-digits, it might be client-simulated
                    if m_id and str(m_id).isdigit():
                        try:
                            member = TeamMember.objects.get(id=int(m_id), about=about_obj)
                            member.name = member_data.get('name', member.name)
                            member.role = member_data.get('role', member.role)
                            member.bio = member_data.get('bio', member.bio)
                            member.save()
                            kept_ids.append(member.id)
                        except TeamMember.DoesNotExist:
                            pass
                    else:
                        # Create new
                        member = TeamMember.objects.create(
                            about=about_obj,
                            name=member_data.get('name', ''),
                            role=member_data.get('role', ''),
                            bio=member_data.get('bio', '')
                        )
                        kept_ids.append(member.id)
                
                # Delete team members not present in updated list
                about_obj.team.exclude(id__in=kept_ids).delete()

            team = [to_dict(m) for m in about_obj.team.all()]
            data = to_dict(about_obj)
            data['team'] = team
            return JsonResponse(data)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)
    
    return HttpResponseNotAllowed(['GET', 'POST'])

@csrf_exempt
def api_services(request, item_id=None):
    if request.method == 'GET':
        services = [to_dict(s) for s in Service.objects.all()]
        return JsonResponse(services, safe=False)

    elif request.method == 'POST':
        try:
            body = json.loads(request.body)
            new_service = Service.objects.create(
                title=body.get('title', ''),
                description=body.get('description', ''),
                icon=body.get('icon', 'Cpu')
            )
            return JsonResponse(to_dict(new_service), status=201)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)

    elif request.method == 'PUT':
        if not item_id:
            return JsonResponse({'error': 'ID required for update'}, status=400)
        try:
            body = json.loads(request.body)
            service = Service.objects.get(id=item_id)
            service.title = body.get('title', service.title)
            service.description = body.get('description', service.description)
            service.icon = body.get('icon', service.icon)
            service.save()
            return JsonResponse(to_dict(service))
        except Service.DoesNotExist:
            return JsonResponse({'error': 'Not found'}, status=404)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)

    elif request.method == 'DELETE':
        if not item_id:
            return JsonResponse({'error': 'ID required for delete'}, status=400)
        try:
            service = Service.objects.get(id=item_id)
            service.delete()
            return JsonResponse({'success': True})
        except Service.DoesNotExist:
            return JsonResponse({'error': 'Not found'}, status=404)

    return HttpResponseNotAllowed(['GET', 'POST', 'PUT', 'DELETE'])

@csrf_exempt
def api_problems_resolutions(request, item_id=None):
    if request.method == 'GET':
        if not ProblemResolution.objects.exists():
            ProblemResolution.objects.create(
                problem_title='Disjointed Enterprise Data Silos',
                problem_desc='Disjointed database silos across business departments causing synchronization lags, manual double-entry errors, and inconsistent reporting.',
                resolution_title='Unified Corporate ERP Core',
                resolution_desc='A single, central database engine integrating all financial, HR, logistics, and billing pipelines into a unified real-time ledger.',
                stats='100% Data Integrity',
                latency='Real-time Sync'
            )
            ProblemResolution.objects.create(
                problem_title='High-Concurrency Query Bottlenecks',
                problem_desc='Primary database structures bottlenecking under high concurrency loads, resulting in page timeouts and slow lookup queries.',
                resolution_title='Distributed Multi-Region Cache Mesh',
                resolution_desc='Deploying optimized Redis edge nodes globally to intercept read queries and resolve lookups instantly with minimal server load.',
                stats='99.9% Cache Hit Rate',
                latency='< 10ms Latency'
            )
            ProblemResolution.objects.create(
                problem_title='Customer Support Operations Lags',
                problem_desc='Customer support teams overwhelmed by high volumes of repetitive inquiries, delaying critical technical support responses.',
                resolution_title='AI Neural Conversational Agent',
                resolution_desc='Embedding semantic LLM assistant nodes trained on product documentation to instantly resolve standard inquiries 24/7.',
                stats='85% Case Deflection',
                latency='Instant Response'
            )

        probs = [to_dict(p) for p in ProblemResolution.objects.all()]
        return JsonResponse(probs, safe=False)

    elif request.method == 'POST':
        try:
            body = json.loads(request.body)
            new_prob = ProblemResolution.objects.create(
                problem_title=body.get('problem_title', ''),
                problem_desc=body.get('problem_desc', ''),
                resolution_title=body.get('resolution_title', ''),
                resolution_desc=body.get('resolution_desc', ''),
                stats=body.get('stats', ''),
                latency=body.get('latency', '')
            )
            return JsonResponse(to_dict(new_prob), status=201)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)

    elif request.method == 'PUT':
        if not item_id:
            return JsonResponse({'error': 'ID required for update'}, status=400)
        try:
            body = json.loads(request.body)
            prob = ProblemResolution.objects.get(id=item_id)
            prob.problem_title = body.get('problem_title', prob.problem_title)
            prob.problem_desc = body.get('problem_desc', prob.problem_desc)
            prob.resolution_title = body.get('resolution_title', prob.resolution_title)
            prob.resolution_desc = body.get('resolution_desc', prob.resolution_desc)
            prob.stats = body.get('stats', prob.stats)
            prob.latency = body.get('latency', prob.latency)
            prob.save()
            return JsonResponse(to_dict(prob))
        except ProblemResolution.DoesNotExist:
            return JsonResponse({'error': 'Not found'}, status=404)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)

    elif request.method == 'DELETE':
        if not item_id:
            return JsonResponse({'error': 'ID required for delete'}, status=400)
        try:
            prob = ProblemResolution.objects.get(id=item_id)
            prob.delete()
            return JsonResponse({'success': True})
        except ProblemResolution.DoesNotExist:
            return JsonResponse({'error': 'Not found'}, status=404)

    return HttpResponseNotAllowed(['GET', 'POST', 'PUT', 'DELETE'])

@csrf_exempt
def api_projects(request, item_id=None):
    if request.method == 'GET':
        projects = [to_dict(p) for p in Project.objects.all()]
        return JsonResponse(projects, safe=False)

    elif request.method == 'POST':
        try:
            body = json.loads(request.body)
            new_project = Project.objects.create(
                name=body.get('name', ''),
                category=body.get('category', ''),
                client=body.get('client', ''),
                year=body.get('year', ''),
                description=body.get('description', '')
            )
            return JsonResponse(to_dict(new_project), status=201)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)

    elif request.method == 'PUT':
        if not item_id:
            return JsonResponse({'error': 'ID required for update'}, status=400)
        try:
            body = json.loads(request.body)
            project = Project.objects.get(id=item_id)
            project.name = body.get('name', project.name)
            project.category = body.get('category', project.category)
            project.client = body.get('client', project.client)
            project.year = body.get('year', project.year)
            project.description = body.get('description', project.description)
            project.save()
            return JsonResponse(to_dict(project))
        except Project.DoesNotExist:
            return JsonResponse({'error': 'Not found'}, status=404)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)

    elif request.method == 'DELETE':
        if not item_id:
            return JsonResponse({'error': 'ID required for delete'}, status=400)
        try:
            project = Project.objects.get(id=item_id)
            project.delete()
            return JsonResponse({'success': True})
        except Project.DoesNotExist:
            return JsonResponse({'error': 'Not found'}, status=404)

    return HttpResponseNotAllowed(['GET', 'POST', 'PUT', 'DELETE'])

@csrf_exempt
def api_careers(request, item_id=None):
    if request.method == 'GET':
        careers = [to_dict(c) for c in Career.objects.all()]
        return JsonResponse(careers, safe=False)

    elif request.method == 'POST':
        try:
            body = json.loads(request.body)
            new_career = Career.objects.create(
                title=body.get('title', ''),
                department=body.get('department', ''),
                salary=body.get('salary', ''),
                description=body.get('description', ''),
                requirements=body.get('requirements', '')
            )
            return JsonResponse(to_dict(new_career), status=201)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)

    elif request.method == 'PUT':
        if not item_id:
            return JsonResponse({'error': 'ID required for update'}, status=400)
        try:
            body = json.loads(request.body)
            career = Career.objects.get(id=item_id)
            career.title = body.get('title', career.title)
            career.department = body.get('department', career.department)
            career.salary = body.get('salary', career.salary)
            career.description = body.get('description', career.description)
            career.requirements = body.get('requirements', career.requirements)
            career.save()
            return JsonResponse(to_dict(career))
        except Career.DoesNotExist:
            return JsonResponse({'error': 'Not found'}, status=404)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)

    elif request.method == 'DELETE':
        if not item_id:
            return JsonResponse({'error': 'ID required for delete'}, status=400)
        try:
            career = Career.objects.get(id=item_id)
            career.delete()
            return JsonResponse({'success': True})
        except Career.DoesNotExist:
            return JsonResponse({'error': 'Not found'}, status=404)

    return HttpResponseNotAllowed(['GET', 'POST', 'PUT', 'DELETE'])

@csrf_exempt
def api_inquiries(request, item_id=None):
    if request.method == 'GET':
        inqs = [to_dict(i) for i in Inquiry.objects.all().order_by('-date')]
        return JsonResponse(inqs, safe=False)

    elif request.method == 'POST':
        try:
            body = json.loads(request.body)
            new_inq = Inquiry.objects.create(
                name=body.get('name', ''),
                email=body.get('email', ''),
                message=body.get('message', ''),
                resume=body.get('resume', '')
            )
            return JsonResponse(to_dict(new_inq), status=201)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)

    elif request.method == 'DELETE':
        if not item_id:
            return JsonResponse({'error': 'ID required for delete'}, status=400)
        try:
            inq = Inquiry.objects.get(id=item_id)
            inq.delete()
            return JsonResponse({'success': True})
        except Inquiry.DoesNotExist:
            return JsonResponse({'error': 'Not found'}, status=404)

    return HttpResponseNotAllowed(['GET', 'POST', 'DELETE'])

@csrf_exempt
def api_testimonials(request, item_id=None):
    if request.method == 'GET':
        testimonials = [to_dict(t) for t in Testimonial.objects.all()]
        return JsonResponse(testimonials, safe=False)

    elif request.method == 'POST':
        try:
            body = json.loads(request.body)
            new_testimonial = Testimonial.objects.create(
                name=body.get('name', ''),
                role=body.get('role', ''),
                content=body.get('content', ''),
                rating=int(body.get('rating', 5)),
                avatar=body.get('avatar', 'U')
            )
            return JsonResponse(to_dict(new_testimonial), status=201)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)

    elif request.method == 'PUT':
        if not item_id:
            return JsonResponse({'error': 'ID required for update'}, status=400)
        try:
            body = json.loads(request.body)
            t = Testimonial.objects.get(id=item_id)
            t.name = body.get('name', t.name)
            t.role = body.get('role', t.role)
            t.content = body.get('content', t.content)
            t.rating = int(body.get('rating', t.rating))
            t.avatar = body.get('avatar', t.avatar)
            t.save()
            return JsonResponse(to_dict(t))
        except Testimonial.DoesNotExist:
            return JsonResponse({'error': 'Not found'}, status=404)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)

    elif request.method == 'DELETE':
        if not item_id:
            return JsonResponse({'error': 'ID required for delete'}, status=400)
        try:
            t = Testimonial.objects.get(id=item_id)
            t.delete()
            return JsonResponse({'success': True})
        except Testimonial.DoesNotExist:
            return JsonResponse({'error': 'Not found'}, status=404)

    return HttpResponseNotAllowed(['GET', 'POST', 'PUT', 'DELETE'])

@csrf_exempt
def api_login(request):
    if request.method == 'POST':
        try:
            body = json.loads(request.body)
            username = body.get('username')
            password = body.get('password')
            
            # Fetch or seed the dynamic Admin credentials
            admin_cred = AdminCredential.objects.first()
            if not admin_cred:
                admin_cred = AdminCredential.objects.create(username='admin', password='admin')
                
            if username == admin_cred.username and password == admin_cred.password:
                return JsonResponse({'success': True, 'token': 'admin_secured_token_session'})
            else:
                return JsonResponse({'error': 'Invalid credentials. Authentication denied.'}, status=401)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)
    return HttpResponseNotAllowed(['POST'])

@csrf_exempt
def api_seed(request):
    """
    Seeding API to populate the database with default mockup values instantly.
    """
    if request.method == 'POST':
        try:
            # Clear existing records
            Service.objects.all().delete()
            Project.objects.all().delete()
            Career.objects.all().delete()
            Inquiry.objects.all().delete()
            Testimonial.objects.all().delete()
            About.objects.all().delete()
            TeamMember.objects.all().delete()

            # Seed About & Team
            about_obj = About.objects.create(
                mission="To architect scalable, high-performance digital matrices that empower global enterprises through precision technology.",
                vision="To set the absolute standard for immersive, highly kinetic, interactive web experiences and cognitive platforms.",
                who_we_are="Zenelait Infotech specializes in building custom software products that empower startups, SMEs, and large enterprises. We bridge the gap between complex business challenges and innovative technology solutions.",
                commitment="Our focus is on delivering high quality development, timely delivery, and long term support. As a trusted product based organization, we ensure that every solution we build from ERP systems to mobile applications is engineered to absorb massive concurrency and scale effortlessly.",
                values="Engineered with uncompromising precision. We value bulletproof safety, high concurrency, clean procedural pipelines, and high-fidelity aesthetics across every system."
            )
            TeamMember.objects.create(about=about_obj, name='Dr. Helen Vance', role='Chief Technical Architect', bio='Former infrastructure lead at NASA, specialized in procedural rendering and lattice math.')
            TeamMember.objects.create(about=about_obj, name='Marcus Sterling', role='Head of AI Systems', bio='Pioneered early neural routing matrix setups and natural language agent scaling.')
            TeamMember.objects.create(about=about_obj, name='Sienna Ross', role='Lead Creative Designer', bio='Award-winning interactive artist dedicated to premium glassmorphic interfaces.')

            # Seed Services
            Service.objects.create(title='Enterprise Resource Planning (ERP)', description='Unify and automate financial ledgers, inventory, human capital, and real-time operations inside a single synchronized console.', icon='Cpu')
            Service.objects.create(title='Learning Management System (LMS)', description='Host premium gamified educational courses, track corporate training progressions, and manage instant skills certifications.', icon='Layers')
            Service.objects.create(title='Smart Billing Software', description='Configure automated subscription tiers, handle complex multi-currency tax calculations, and secure active financial routing.', icon='Terminal')
            Service.objects.create(title='Cognitive AI Chatbots', description='Deploy deep semantic processing neural agents to resolve user inquiries 24/7 and route specialized cases dynamically.', icon='Compass')

            # Seed Projects
            Project.objects.create(name='Consolidated Billing Hub', category='Billing', client='5 Schools & 1 College Campus', year='2026', description='Deploys high-frequency automated invoice processing, billing ledgers, and centralized payment terminals.')
            Project.objects.create(name='Gamified LMS Hub', category='LMS', client='3 College Consortium', year='2026', description='Deploys digital training rooms, procedural modules, skills trackers, and secure digital credentialing pipelines.')
            Project.objects.create(name='Corporate Web Portals Showcase', category='Web Dev', client='40+ Custom Creative Clients', year='2026', description='Successfully engineered, stylized, and optimized over 40+ high-fidelity business sites with custom graphics.')
            Project.objects.create(name='Synchronized Enterprise ERP Matrix', category='ERP', client='Aura Logistics Group', year='SOON', description='Bespoke corporate operations ecosystem currently undergoing final simulation and security hardening phase.')

            # Seed Careers
            Career.objects.create(title='Principal AI Core Developer', department='Cognitive Engineering', salary='₹15,00,000 - ₹20,00,000', description='Architecting early-stage semantic models and routing protocols. Experience with vector indices required.', requirements='5+ years AI development, Python/C++, PyTorch.')
            Career.objects.create(title='Premium Frontend Engineer', department='Creative Graphics', salary='₹12,00,000 - ₹15,00,000', description='Designing interactive web canvases, custom easing spring loops, and high-frequency math vectors.', requirements='Advanced React, GSAP, Canvas API, WebGL knowledge.')
            Career.objects.create(title='Infrastructure Security Architect', department='Core Operations', salary='₹14,00,000 - ₹18,00,000', description='Securing distributed multi-node ledgers and automating failover safety matrices.', requirements='Kubernetes, AWS/GCP, Rust/Go, ledger encryption.')

            # Seed Inquiries
            Inquiry.objects.create(name='Jonathan Vance', email='vance@enterprise.com', message='Interested in getting a custom ERP deployment mock-up for our manufacturing pipeline. Please contact me.', resume='')
            Inquiry.objects.create(
                name='Alice Sterling',
                email='alice@sterling.io',
                message='[CAREER APPLICATION: Premium Frontend Engineer]\nResume/Links: resume.pdf\nCover Note: I would love to build immersive web matrices.',
                resume='data:application/pdf;base64,JVBERi0xLjQKJcOkw7zDtsOfCjIgMCBvYmoKPDwvTGVuZ3RoIDMgMCBSL0ZpbHRlci9GbGF0ZURlY29kZT4+CnN0cmVhbQp4nDM0VTAwMVAIQ0MlAyMTBSMTM0VDBTMFCwULDVNDYwtTEwVLJRMFMxNLUwUTAGP4B2MKZW5kc3RyZWFtCmVuZG9iagozIDAgb2JqCjQ2CmVuZG9iagoxIDAgb2JqCjw8L1R5cGUvUGFnZS9QYXJlbnQgNCAwIFIvUmVzb3VyY2VzPDwvRm9udDw8L0YxIDUgMCBSPj4+Pi9Db250ZW50cyAyIDAgUi9NZWRpYUJveFswIDAgNTk1IDg0Ml0+PgplbmRvYmoKNSAwIG9iago8PC9UeXBlL0ZvbnQvU3VidHlwZS9UeXBlMS9CYXNlRm9udC9IZWx2ZXRpY2EvRW5jb2RpbmcvV2luQW5zaUVuY29kaW5nPj4KZW5kb2JqCjQgMCBvYmoKPDwvVHlwZS9QYWdlcy9LaWRzWzEgMCBSXS9Db3VudCAxPj4KZW5kb2JqCjYgMCBvYmoKPDwvVHlwZS9DYXRhbG9nL1BhZ2VzIDQgMCBSPj4KZW5kb2JqCjcgMCBvYmoKPDwvQ3JlYXRvcihBbnRpZ3Jhdml0eSkvQ3JlYXRpb25EYXRlKEQ6MjAyNjA3MDcwOTA5MDBaKT4+CmVuZG9iagp4cmVmCjAgOAowMDAwMDAwMDAwIDY1NTM1IGYgCjAwMDAwMDAxMTAgMDAwMDAgbiAKMDAwMDAwMDAxOSAwMDAwMCBuIAowMDAwMDAwMDkxIDAwMDAwIGYgCjAwMDAwMDAyMjkgMDAwMDAgbiAKMDAwMDAwMDE0OCAwMDAwMCBuIAowMDAwMDAwMjc4IDAwMDAwIGYgCjAwMDAwMDAzMDkgMDAwMDAgZiAKdHJhaWxlcgo8PC9TaXplIDgvUm9vdCA2IDAgUi9JbmZvIDcgMCBSPj4Kc3RhcnR4cmVmCjM4MwpJRU9GCg=='
            )

            # Seed Testimonials
            Testimonial.objects.create(name='Sarah Jenkins', role='CTO, GlobalFintech', content='Zenelait Infotech transformed our legacy ledger pipeline into a robust zero-trust architecture. The 3D telemetry views are game-changers.', rating=5, avatar='SJ')
            Testimonial.objects.create(name='David Cho', role='Head of Operations, ApexRetail', content='Our checkout latency dropped by 64% after deploying Zenelait ERP nodes. Highly recommended engineering group.', rating=5, avatar='DC')
            Testimonial.objects.create(name='Elena Rostova', role='Founder, CloudStream', content='Incredible technical capabilities. The AI neural chatbot handles 90% of our incoming tickets flawlessly.', rating=5, avatar='ER')

            return JsonResponse({'success': True, 'message': 'MySQL database successfully populated with default seed records!'})
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)
    return HttpResponseNotAllowed(['POST'])

def send_sms_otp(phone_number, otp):
    message = f"Your Zenelait Admin Verification Code is: {otp}"
    print(f"\n======================================================\n[SMS DISPATCHED] To: {phone_number}\nOTP Code: {otp}\n======================================================\n")
    
    # We can try to send it via a real SMS provider if credentials exist.
    twilio_sid = os.environ.get('TWILIO_ACCOUNT_SID')
    twilio_token = os.environ.get('TWILIO_AUTH_TOKEN')
    twilio_from = os.environ.get('TWILIO_PHONE_NUMBER')
    
    if twilio_sid and twilio_token and twilio_from:
        try:
            url = f"https://api.twilio.com/2010-04-01/Accounts/{twilio_sid}/Messages.json"
            data = {
                'To': phone_number,
                'From': twilio_from,
                'Body': message
            }
            response = requests.post(url, data=data, auth=(twilio_sid, twilio_token))
            if response.status_code == 201:
                return True
        except Exception as e:
            print(f"Failed to send Twilio SMS: {e}")
            
    # Or Fast2SMS (popular in India):
    fast2sms_api_key = os.environ.get('FAST2SMS_API_KEY')
    if fast2sms_api_key:
        try:
            url = "https://www.fast2sms.com/dev/bulkV2"
            headers = {
                'authorization': fast2sms_api_key,
                'Content-Type': 'application/json'
            }
            payload = {
                "route": "q",
                "message": message,
                "language": "english",
                "flash": 0,
                "numbers": phone_number.replace("+", "").replace(" ", "")
            }
            response = requests.post(url, json=payload, headers=headers)
            if response.status_code == 200:
                return True
        except Exception as e:
            print(f"Failed to send Fast2SMS SMS: {e}")
            
    return False

@csrf_exempt
def api_forgot_password_request(request):
    if request.method == 'POST':
        try:
            body = json.loads(request.body)
            phone_number = body.get('phone_number', '+91 9884264816')
            
            # Generate a 6-digit OTP
            otp = str(random.randint(100000, 999999))
            
            # Save the OTP
            OtpCode.objects.create(phone_number=phone_number, code=otp)
            
            # Send SMS
            send_sms_otp(phone_number, otp)
            
            return JsonResponse({'success': True, 'message': 'OTP dispatched via SMS gateway.'})
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)
    return HttpResponseNotAllowed(['POST'])

@csrf_exempt
def api_forgot_password_verify(request):
    if request.method == 'POST':
        try:
            body = json.loads(request.body)
            phone_number = body.get('phone_number', '+91 9884264816')
            otp = body.get('otp')
            
            if not otp:
                return JsonResponse({'error': 'OTP is required.'}, status=400)
            
            # Get latest OTP for this phone number created in the last 10 minutes
            ten_minutes_ago = timezone.now() - timezone.timedelta(minutes=10)
            otp_record = OtpCode.objects.filter(
                phone_number=phone_number, 
                code=otp, 
                created_at__gte=ten_minutes_ago,
                is_verified=False
            ).order_by('-created_at').first()
            
            if otp_record:
                otp_record.is_verified = True
                otp_record.save()
                return JsonResponse({'success': True, 'message': 'OTP verified successfully.'})
            else:
                return JsonResponse({'error': 'Invalid or expired cryptographic verification code. Denied.'}, status=400)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)
    return HttpResponseNotAllowed(['POST'])

@csrf_exempt
def api_forgot_password_reset(request):
    if request.method == 'POST':
        try:
            body = json.loads(request.body)
            phone_number = body.get('phone_number', '+91 9884264816')
            otp = body.get('otp')
            new_password = body.get('new_password')
            
            if not otp or not new_password:
                return JsonResponse({'error': 'OTP and new password are required.'}, status=400)
            
            # Check if there is a verified OTP for this phone number in the last 15 minutes
            fifteen_minutes_ago = timezone.now() - timezone.timedelta(minutes=15)
            otp_record = OtpCode.objects.filter(
                phone_number=phone_number,
                code=otp,
                is_verified=True,
                created_at__gte=fifteen_minutes_ago
            ).first()
            
            if otp_record:
                # Update AdminCredential
                admin_cred = AdminCredential.objects.first()
                if not admin_cred:
                    admin_cred = AdminCredential.objects.create(username='admin', password='admin')
                
                admin_cred.password = new_password
                admin_cred.save()
                
                # Delete the OTP code to prevent reuse
                otp_record.delete()
                
                return JsonResponse({'success': True, 'message': 'Admin password successfully updated.'})
            else:
                return JsonResponse({'error': 'Verification session invalid or expired. Access denied.'}, status=400)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)
    return HttpResponseNotAllowed(['POST'])

