from django.urls import path
from . import views

urlpatterns = [
    # About
    path('about/', views.api_about, name='api_about'),

    # Services
    path('services/', views.api_services, name='api_services'),
    path('services/<int:item_id>/', views.api_services, name='api_services_detail'),



    # Problems & Resolutions
    path('problems/', views.api_problems_resolutions, name='api_problems_resolutions'),
    path('problems/<int:item_id>/', views.api_problems_resolutions, name='api_problems_resolutions_detail'),

    # Projects
    path('projects/', views.api_projects, name='api_projects'),
    path('projects/<int:item_id>/', views.api_projects, name='api_projects_detail'),

    # Careers
    path('careers/', views.api_careers, name='api_careers'),
    path('careers/<int:item_id>/', views.api_careers, name='api_careers_detail'),

    # Inquiries
    path('inquiries/', views.api_inquiries, name='api_inquiries'),
    path('inquiries/<int:item_id>/', views.api_inquiries, name='api_inquiries_detail'),

    # Testimonials
    path('testimonials/', views.api_testimonials, name='api_testimonials'),
    path('testimonials/<int:item_id>/', views.api_testimonials, name='api_testimonials_detail'),

    # Auth
    path('login/', views.api_login, name='api_login'),
    path('forgot-password/request/', views.api_forgot_password_request, name='api_forgot_password_request'),
    path('forgot-password/verify/', views.api_forgot_password_verify, name='api_forgot_password_verify'),
    path('forgot-password/reset/', views.api_forgot_password_reset, name='api_forgot_password_reset'),

    # Seeder
    path('seed/', views.api_seed, name='api_seed'),
]
