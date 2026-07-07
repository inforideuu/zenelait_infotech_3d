import React, { useState, useEffect } from 'react';
import { store } from '../../utils/store';
import {
  Compass,
  Users,
  Target,
  Rocket,
  ShieldCheck,
  Layers,
  Cpu,
  Cloud,
  Database,
  CheckCircle2,
  Sparkles,
  Award,
  HeartHandshake,
  MapPin,
  Terminal,
  ArrowRight,
  Code,
  AlignCenter
} from 'lucide-react';

const AboutPage = () => {
  const [hoveredEdgeCard, setHoveredEdgeCard] = useState(null);
  const [testimonials, setTestimonials] = useState(store.getTestimonials());
  const [aboutData, setAboutData] = useState(store.getAbout());
  const [activeTestimonialIdx, setActiveTestimonialIdx] = useState(0);

  useEffect(() => {
    const handleUpdate = () => {
      setTestimonials(store.getTestimonials());
      setAboutData(store.getAbout());
    };
    window.addEventListener('aura_store_update', handleUpdate);
    return () => window.removeEventListener('aura_store_update', handleUpdate);
  }, []);

  const handlePrevTestimonial = () => {
    if (testimonials.length === 0) return;
    setActiveTestimonialIdx((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleNextTestimonial = () => {
    if (testimonials.length === 0) return;
    setActiveTestimonialIdx((prev) => (prev + 1) % testimonials.length);
  };

  return (
    <div className="subpage-wrapper">
      {/* Ambient background glows */}
      <div className="ambient-glow glow-1"></div>
      <div className="ambient-glow glow-2"></div>

      <div className="container">

        {/* ================= SECTION 1: HEADER & INTRO ================= */}
        <div className="subpage-header">
          <div className="section-badge animate-fade-in">
            <Compass size={14} className="spin-slow" />
            <span>ABOUT ZENELAIT INFOTECH</span>
          </div>
          <h1 className="subpage-title font-display animate-slide-up">
            Architecting the <span className="cyber-text">Future</span> of Custom Software
          </h1>
          <p className="subpage-subtitle animate-slide-up-delay">
            At Zenelait Infotech, we bridge the gap between complex business challenges and high-performance digital ecosystems.
          </p>
        </div>

        {/* Who We Are & Our Commitment Split Grid */}
        <div className="split-intro-grid">

          {/* Who We Are (Card 1) */}
          <div className="border-glow-wrapper">
            <div className="glass-card intro-card who-we-are">
              <div className="card-highlight-corner cyan-glow"></div>
              <div className="intro-icon-box">
                <Sparkles size={24} className="icon-cyan" />
              </div>
              <h2 className="section-heading font-display">Who We Are</h2>
              <p className="intro-paragraph" style={{textAlign:"left"}}>
                {aboutData.who_we_are || "Zenelait Infotech specializes in building custom software products that empower startups, SMEs, and large enterprises. We bridge the gap between complex business challenges and innovative technology solutions."}
              </p>
              <div className="card-deco-line"></div>
            </div>
          </div>

          {/* Our Commitment (Card 2) */}
          <div className="border-glow-wrapper">
            <div className="glass-card intro-card commitment-card">
              <div className="card-highlight-corner purple-glow"></div>
              <div className="intro-icon-box">
                <Award size={24} className="icon-purple" />
              </div>
              <h2 className="section-heading font-display">Our Commitment</h2>
              <p className="intro-paragraph text-highlight" style={{textAlign:"left"}}>
                {aboutData.commitment || "Our focus is on delivering high quality development, timely delivery, and long term support. As a trusted product based organization, we ensure that every solution we build from ERP systems to mobile applications is engineered to absorb massive concurrency and scale effortlessly."}
              </p>
              <div className="location-badge">
                <div className="pulse-indicator"></div>
                <MapPin size={16} className="icon-cyan" />
                <span>Anna Nagar, Chennai</span>
              </div>
            </div>
          </div>

        </div>


        {/* ================= SECTION 2: MISSION, VISION, VALUES ================= */}
        <div className="content-section">
          <div className="section-title-wrap text-center">
            <div className="section-badge inline-badge" style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }} >
              <Target size={14} />
              <span style={{ fontSize: '1.25rem' }}>CORE PURPOSE</span>
            </div>
            <h2 className="section-main-title font-display" style={{ textAlign: 'center' }}>Our Blueprint & Philosophy</h2>
          </div>

          <div className="three-cards-grid">

             {/* Mission Card */}
            <div className="border-glow-wrapper">
              <div className="glass-card purpose-card">
                <div className="purpose-number font-display">01</div>
                <div className="purpose-icon-box bg-cyan-dim">
                  <Target size={28} className="icon-cyan" />
                </div>
                <h3 className="purpose-card-title font-display">Our Mission</h3>
                <p className="purpose-card-desc" style={{textAlign:"left"}}>
                  {aboutData.mission || "To build state-of-the-art custom products and scale computational structures that convert complex enterprise friction into seamless, high-velocity digital operational loops."}
                </p>
              </div>
            </div>

            {/* Vision Card */}
            <div className="border-glow-wrapper">
              <div className="glass-card purpose-card">
                <div className="purpose-number font-display">02</div>
                <div className="purpose-icon-box bg-purple-dim">
                  <Rocket size={28} className="icon-purple" />
                </div>
                <h3 className="purpose-card-title font-display">Our Vision</h3>
                <p className="purpose-card-desc" style={{textAlign:"left"}}>
                  {aboutData.vision || "To emerge as a premier globally-trusted technological architect, setting absolute benchmarks for software scale, architectural durability, and customer-first long-term partnerships."}
                </p>
              </div>
            </div>

            {/* Product Values Card */}
            <div className="border-glow-wrapper">
              <div className="glass-card purpose-card">
                <div className="purpose-number font-display">03</div>
                <div className="purpose-icon-box bg-amber-dim">
                  <ShieldCheck size={28} className="icon-amber" />
                </div>
                <h3 className="purpose-card-title font-display">Product Values</h3>
                <p className="purpose-card-desc" style={{textAlign:"left"}}>
                  {aboutData.values || "Engineered with uncompromising precision. We value bulletproof safety, high concurrency, clean procedural pipelines, and high-fidelity aesthetics across every system."}
                </p>
              </div>
            </div>

          </div>
        </div>


        {/* ================= SECTION 3: WHY CHOOSE US ================= */}
        <div className="content-section">
          <div className="section-title-wrap text-center">
            <div className="section-badge inline-badge" style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}>
              <CheckCircle2 size={14} />
              <span style={{ fontSize: '1.25rem' }}>THE ZENELAIT EDGE</span>
            </div>
            <h2 className="section-main-title font-display" style={{ textAlign: 'center' }}>Why Businesses Trust Us</h2>
          </div>

          <div className="four-cards-grid">

            <div
              className="glass-card edge-card edge-card-0"
              onMouseEnter={() => setHoveredEdgeCard(0)}
              onMouseLeave={() => setHoveredEdgeCard(null)}
            >
              <Card3DCanvas type="cube" isHovered={hoveredEdgeCard === 0} />
              <div className="edge-icon-circle bg-cyan-dim">
                <Cpu size={20} className="icon-cyan" />
              </div>
              <h4 className="edge-title font-display" style={{ fontSize: '1.3rem' }}>Impeccable Craftsmanship</h4>
              <p className="edge-desc" style={{ fontSize: '1rem' }}>
                We reject standard off-the-shelf templates. Every backend logic and UI rendering routine is coded by hand for perfect structural fit and speed.
              </p>
            </div>

            <div
              className="glass-card edge-card edge-card-1"
              onMouseEnter={() => setHoveredEdgeCard(1)}
              onMouseLeave={() => setHoveredEdgeCard(null)}
            >
              <Card3DCanvas type="sphere" isHovered={hoveredEdgeCard === 1} />
              <div className="edge-icon-circle bg-purple-dim">
                <Layers size={20} className="icon-purple" />
              </div>
              <h4 className="edge-title font-display">Massive Concurrency</h4>
              <p className="edge-desc">
                Our codebases are systematically battle-tested. We configure high-DPI scaling systems designed to handle thousands of operations per second smoothly.
              </p>
            </div>

            <div
              className="glass-card edge-card edge-card-2"
              onMouseEnter={() => setHoveredEdgeCard(2)}
              onMouseLeave={() => setHoveredEdgeCard(null)}
            >
              <Card3DCanvas type="torus" isHovered={hoveredEdgeCard === 2} />
              <div className="edge-icon-circle bg-amber-dim">
                <Award size={20} className="icon-amber" />
              </div>
              <h4 className="edge-title font-display">Timely & Premium Delivery</h4>
              <p className="edge-desc">
                Using highly systematic sprint intervals and reliable CI/CD pipelines, we ensure that your software is launched reliably on-budget and on-schedule.
              </p>
            </div>

            <div
              className="glass-card edge-card edge-card-3"
              onMouseEnter={() => setHoveredEdgeCard(3)}
              onMouseLeave={() => setHoveredEdgeCard(null)}
            >
              <Card3DCanvas type="helix" isHovered={hoveredEdgeCard === 3} />
              <div className="edge-icon-circle bg-rose-dim">
                <HeartHandshake size={20} className="icon-rose" />
              </div>
              <h4 className="edge-title font-display">Dedicated Support Lifeline</h4>
              <p className="edge-desc">
                Deployment is only the beginning. We provide proactive server maintenance, continuous feature rollouts, and direct access to senior developers.
              </p>
            </div>

          </div>
        </div>


        {/* ================= SECTION 4: TECHNOLOGIES WE USE ================= */}
        <div className="content-section">
          <div className="section-title-wrap text-center">
            <div className="section-badge inline-badge" style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}>
              <Code size={14} />
              <span className="font-display" style={{ fontSize: '1.25rem' }}>STACK MATRIX</span>
            </div>
            <h2 className="section-main-title font-display" style={{ textAlign: 'center' }}>Technologies We Use</h2>
          </div>

          <div className="tech-matrix-grid">

            {/* Card 1: Frontend */}
            <div className="border-glow-wrapper">
              <div className="glass-card tech-card">
                <div className="tech-header">
                  <Terminal size={22} className="icon-cyan" />
                  <h3 className="tech-group-title font-display">Frontend Architectures</h3>
                </div>
                <ul className="tech-list">
                  <li><span>React / Next.js</span><span className="tech-tag tag-cyan">Advanced</span></li>
                  <li><span>TypeScript / JavaScript</span><span className="tech-tag tag-cyan">Core</span></li>
                  <li><span>Tailwind CSS / Vanilla CSS</span><span className="tech-tag tag-cyan">Modern</span></li>
                  <li><span>GSAP / Canvas WebGL</span><span className="tech-tag tag-purple">High-Fidelity</span></li>
                </ul>
              </div>
            </div>

            {/* Card 2: Backend */}
            <div className="border-glow-wrapper">
              <div className="glass-card tech-card">
                <div className="tech-header">
                  <Cpu size={22} className="icon-purple" />
                  <h3 className="tech-group-title font-display">Backend & APIs</h3>
                </div>
                <ul className="tech-list">
                  <li><span>Node.js / Express</span><span className="tech-tag tag-cyan">High Scale</span></li>
                  <li><span>Python / FastAPI</span><span className="tech-tag tag-cyan">Robust</span></li>
                  <li><span>Go (Golang)</span><span className="tech-tag tag-purple">Concurrent</span></li>
                  <li><span>REST / GraphQL APIs</span><span className="tech-tag tag-cyan">Seamless</span></li>
                </ul>
              </div>
            </div>

            {/* Card 3: Databases */}
            <div className="border-glow-wrapper">
              <div className="glass-card tech-card">
                <div className="tech-header">
                  <Database size={22} className="icon-amber" />
                  <h3 className="tech-group-title font-display">Data & Caching</h3>
                </div>
                <ul className="tech-list">
                  <li><span>PostgreSQL / MySQL</span><span className="tech-tag tag-cyan">Relational</span></li>
                  <li><span>MongoDB</span><span className="tech-tag tag-cyan">NoSQL</span></li>
                  <li><span>Redis Cache</span><span className="tech-tag tag-purple">In-Memory</span></li>
                  <li><span>Elasticsearch</span><span className="tech-tag tag-cyan">Search Engine</span></li>
                </ul>
              </div>
            </div>

            {/* Card 4: Cloud */}
            <div className="border-glow-wrapper">
              <div className="glass-card tech-card">
                <div className="tech-header">
                  <Cloud size={22} className="icon-rose" />
                  <h3 className="tech-group-title font-display">Cloud & Devops</h3>
                </div>
                <ul className="tech-list">
                  <li><span>AWS / GCP Infrastructure</span><span className="tech-tag tag-cyan">Global</span></li>
                  <li><span>Docker Containers</span><span className="tech-tag tag-cyan">Portable</span></li>
                  <li><span>Kubernetes Pods</span><span className="tech-tag tag-purple">Orchestrated</span></li>
                  <li><span>CI/CD Automations</span><span className="tech-tag tag-rose">Instantly Safe</span></li>
                </ul>
              </div>
            </div>

          </div>
        </div>


        {/* ================= SECTION 5: MEET OUR TEAM ================= */}
        <div className="content-section team-section">
          <div className="section-title-wrap text-center">
            <div className="section-badge inline-badge" style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}>
              <Users size={14} />
              <span style={{ fontSize: '1.25rem' }}>THE ARCHITECTS</span>
            </div>
            <h2 className="section-main-title font-display" style={{ textAlign: 'center' }}>Meet Our Team</h2>
          </div>

          <div className="team-grid">

            {/* CEO Card */}
            <div className="border-glow-wrapper team-card-wrap">
              <div className="glass-card team-card">
                <div className="member-avatar avatar-cyan">
                  <span>Z</span>
                  <div className="avatar-ring animate-pulse"></div>
                </div>
                <h3 className="member-name font-display">Chief Executive Officer</h3>
                <span className="member-role font-display">Founder & CEO</span>
                <p className="member-bio" style={{textAlign:"left"}}>
                  A visionary technologist leading the general strategy and product culture at Zenelait Infotech. Passionate about empowering startups and enterprises through high-concurrency systems.
                </p>
                <div className="member-social-glow"></div>
              </div>
            </div>

            {/* Managers Card */}
            <div className="border-glow-wrapper team-card-wrap">
              <div className="glass-card team-card">
                <div className="member-avatar avatar-purple">
                  <span>M</span>
                  <div className="avatar-ring animate-pulse"></div>
                </div>
                <h3 className="member-name font-display">Head of Delivery</h3>
                <span className="member-role font-display">Project & Product Management</span>
                <p className="member-bio" style={{textAlign:"left"}}>
                  Aligns complex business objectives with execution pipelines, ensuring high-quality, systematic sprint delivery, and robust product lifecycle roadmaps on schedule.
                </p>
                <div className="member-social-glow"></div>
              </div>
            </div>

            {/* Product Developer Card */}
            <div className="border-glow-wrapper team-card-wrap">
              <div className="glass-card team-card">
                <div className="member-avatar avatar-amber">
                  <span>D</span>
                  <div className="avatar-ring animate-pulse"></div>
                </div>
                <h3 className="member-name font-display">Lead Product Developer</h3>
                <span className="member-role font-display">Principal Software Architect</span>
                <p className="member-bio" style={{textAlign:"left"}}>
                  Specializes in procedurally sound custom codebases, massive database scaling architectures, elastic API layers, and highly reactive interactive canvas platforms.
                </p>
                <div className="member-social-glow"></div>
              </div>
            </div>

          </div>

          {/* General contents at bottom of team section */}
          <div className="border-glow-wrapper general-culture-wrap animate-slide-up">
            <div className="glass-card general-culture-card">
              <div className="culture-grid">
                <div className="culture-left">
                  <h3 className="culture-title font-display">Our Dynamic Culture</h3>
                  <p className="culture-paragraph" style={{textAlign:"justify"}}>
                    We are a cohesive team of dedicated software builders, problem solvers, and creative interface artists. At Zenelait Infotech, we embrace continuous learning, transparent sprint delivery methodologies, and relentless technical refinement.
                  </p>
                  <p className="culture-paragraph" style={{textAlign:"left"}}>
                    Every member of our crew is committed to crafting scalable structures that stay resilient under massive computational demands. We work in close synergy, turning complex ideas into flawless software assets.
                  </p>
                </div>
                <div className="culture-right">
                  <div className="culture-stat-box">
                    <span className="culture-stat-num cyber-text">100%</span>
                    <span className="culture-stat-label">In-House Engineering</span>
                  </div>
                  <div className="culture-stat-box">
                    <span className="culture-stat-num cyber-text">24/7</span>
                    <span className="culture-stat-label">System Performance Monitors</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ================= SECTION 6: CLIENT TESTIMONIALS (3D) ================= */}
          <div className="content-section testimonials-section">
            <div className="section-title-wrap text-center">
              <div className="section-badge inline-badge" style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}>
                <Sparkles size={14} className="spin-slow" />
                <span style={{ fontSize: '1.25rem' }}>WHAT CLIENTS SAY</span>
              </div>
              <h2 className="section-main-title font-display" style={{ textAlign: 'center' }}>Client Testimonials</h2>
              <p className="section-subtitle" style={{ margin: '0.5rem auto 0 auto', maxWidth: 600, fontSize: '1.25rem', textAlign: 'center' }}>
                Read actual operational telemetry and feedback from executives and founders who integrated Zenelait systems.
              </p>
            </div>

            {testimonials.length === 0 ? (
              <div className="empty-state-testimonials text-center">
                <p className="text-muted">No client reviews currently published in database.</p>
              </div>
            ) : (
              <div className="testimonials-3d-arena">

                <div className="testimonials-deck-viewport">
                  {testimonials.map((item, idx) => {
                    const total = testimonials.length;
                    const diff = (idx - activeTestimonialIdx + total) % total;

                    let position = 'inactive';
                    if (diff === 0) position = 'active';
                    else if (diff === 1 || (total === 2 && activeTestimonialIdx === 0 && idx === 1)) position = 'next';
                    else if (diff === total - 1 || (total === 2 && activeTestimonialIdx === 1 && idx === 0)) position = 'prev';

                    let transformStyle = '';
                    let opacity = 0;
                    let zIndex = 0;
                    let pointerEvents = 'none';

                    if (position === 'active') {
                      transformStyle = 'perspective(1200px) translate3d(0, 0, 0) scale3d(1, 1, 1)';
                      opacity = 1;
                      zIndex = 100;
                      pointerEvents = 'auto';
                    } else if (position === 'next') {
                      transformStyle = 'perspective(1200px) translate3d(180px, 0, -150px) rotateY(-25deg) scale3d(0.85, 0.85, 0.85)';
                      opacity = 0.55;
                      zIndex = 50;
                    } else if (position === 'prev') {
                      transformStyle = 'perspective(1200px) translate3d(-180px, 0, -150px) rotateY(25deg) scale3d(0.85, 0.85, 0.85)';
                      opacity = 0.55;
                      zIndex = 50;
                    } else {
                      transformStyle = 'perspective(1200px) translate3d(0, 0, -300px) scale3d(0.7, 0.7, 0.7)';
                      opacity = 0;
                      zIndex = 10;
                    }

                    return (
                      <div
                        key={item.id}
                        className={`testimonial-3d-card-wrap ${position}`}
                        style={{
                          transform: transformStyle,
                          opacity: opacity,
                          zIndex: zIndex,
                          pointerEvents: pointerEvents
                        }}
                        onClick={() => {
                          if (position === 'next') handleNextTestimonial();
                          if (position === 'prev') handlePrevTestimonial();
                        }}
                      >
                        <div className="border-glow-wrapper height-100-pct">
                          <div className="glass-card testimonial-3d-card">
                            <div className="quote-decorator">“</div>

                            <div className="testimonial-rating-stars">
                              {Array.from({ length: item.rating || 5 }).map((_, rIdx) => (
                                <span key={rIdx} className="star-icon">★</span>
                              ))}
                            </div>

                            <p className="testimonial-content-text">
                              "{item.content}"
                            </p>

                            <div className="testimonial-client-profile">
                              <div className="client-avatar-glow" style={{ background: 'var(--primary)' }}>
                                {item.avatar || item.name[0]}
                              </div>
                              <div className="client-meta-info">
                                <h4 className="client-name font-display">{item.name}</h4>
                                <span className="client-role">{item.role}</span>
                              </div>
                            </div>

                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Slider Nav Buttons */}
                <div className="testimonials-deck-controls">
                  <button className="deck-nav-arrow" onClick={handlePrevTestimonial} aria-label="Previous Testimonial">‹</button>
                  <div className="deck-bullet-indicators">
                    {testimonials.map((_, idx) => (
                      <div
                        key={idx}
                        className={`bullet-dot ${idx === activeTestimonialIdx ? 'active' : ''}`}
                        onClick={() => setActiveTestimonialIdx(idx)}
                      ></div>
                    ))}
                  </div>
                  <button className="deck-nav-arrow" onClick={handleNextTestimonial} aria-label="Next Testimonial">›</button>
                </div>

              </div>
            )}
          </div>

        </div>

      </div>

      <style>{`
        /* Testimonials 3D Arena Styling */
        .testimonials-section {
          margin-top: 5rem;
        }
        
        .testimonials-3d-arena {
          width: 100%;
          max-width: 900px;
          margin: 4rem auto 0 auto;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 3rem;
          position: relative;
        }

        .testimonials-deck-viewport {
          position: relative;
          width: 100%;
          height: 380px;
          display: flex;
          justify-content: center;
          align-items: center;
          perspective: 1200px;
          transform-style: preserve-3d;
        }

        .testimonial-3d-card-wrap {
          position: absolute;
          width: 100%;
          max-width: 520px;
          height: 320px;
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1);
          transform-style: preserve-3d;
        }

        .testimonial-3d-card-wrap.prev,
        .testimonial-3d-card-wrap.next {
          cursor: pointer;
        }

        .height-100-pct {
          height: 100%;
        }

        .testimonial-3d-card {
          padding: 3rem;
          height: 100%;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          background: rgba(13, 13, 17, 0.7);
          backdrop-filter: blur(16px);
          border-color: rgba(255, 255, 255, 0.05);
          text-align: left;
          position: relative;
          justify-content: center;
        }

        .quote-decorator {
          position: absolute;
          top: 1rem;
          right: 2rem;
          font-family: var(--font-display);
          font-size: 8rem;
          line-height: 1;
          color: rgba(255, 255, 255, 0.02);
          pointer-events: none;
          font-weight: 900;
        }

        .testimonial-rating-stars {
          display: flex;
          gap: 0.25rem;
        }

        .star-icon {
          color: #f59e0b;
          font-size: 1.1rem;
          text-shadow: 0 0 8px rgba(245, 158, 11, 0.4);
        }

        .testimonial-content-text {
          font-size: 1.05rem;
          line-height: 1.65;
          color: var(--text-secondary);
          font-style: italic;
        }

        .testimonial-client-profile {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-top: 0.5rem;
        }

        .client-avatar-glow {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-display);
          font-weight: 800;
          font-size: 0.95rem;
          color: #000000;
          box-shadow: 0 0 15px rgba(0, 242, 254, 0.3);
        }

        .client-meta-info {
          display: flex;
          flex-direction: column;
          gap: 0.15rem;
        }

        .client-name {
          font-size: 1rem;
          font-weight: 700;
          color: #ffffff;
        }

        .client-role {
          font-size: 0.8rem;
          color: var(--text-muted);
        }

        .testimonials-deck-controls {
          display: flex;
          align-items: center;
          gap: 2.5rem;
          z-index: 100;
        }

        .deck-nav-arrow {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--border-color);
          width: 48px;
          height: 48px;
          border-radius: 50%;
          color: #ffffff;
          font-size: 1.5rem;
          font-weight: 300;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          line-height: 1;
        }

        .deck-nav-arrow:hover {
          background: rgba(0, 242, 254, 0.08);
          border-color: var(--primary);
          box-shadow: 0 0 15px rgba(0, 242, 254, 0.2);
          transform: scale(1.05);
        }

        .deck-bullet-indicators {
          display: flex;
          gap: 0.6rem;
        }

        .bullet-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.15);
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .bullet-dot:hover {
          background: rgba(255, 255, 255, 0.4);
        }

        .bullet-dot.active {
          background: var(--primary);
          box-shadow: 0 0 10px var(--primary);
          transform: scale(1.2);
        }

        @media (max-width: 768px) {
          .testimonials-deck-viewport {
            height: 440px;
          }
          .testimonial-3d-card-wrap {
            max-width: 100%;
            height: 380px;
          }
          .testimonial-3d-card {
            padding: 2rem;
          }
          .testimonial-content-text {
            font-size: 0.95rem;
          }
        }

        .subpage-wrapper {
          padding: 8rem 0 6rem 0;
          background-color: var(--bg-darker);
          min-height: 100vh;
          position: relative;
          overflow: hidden;
        }

        /* Ambient Glow Orbs */
        .ambient-glow {
          position: absolute;
          width: 500px;
          height: 500px;
          border-radius: 50%;
          filter: blur(140px);
          opacity: 0.05;
          pointer-events: none;
          z-index: 0;
        }

        .glow-1 {
          top: 10%;
          left: -150px;
          background: var(--primary);
        }

        .glow-2 {
          bottom: 20%;
          right: -150px;
          background: var(--accent);
        }

        .subpage-header {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          margin-bottom: 5rem;
          gap: 1.25rem;
          position: relative;
          z-index: 1;
        }

        .subpage-title {
          font-size: 3.5rem;
          font-weight: 800;
          line-height: 1.15;
          letter-spacing: -0.03em;
          max-width: 800px;
        }

        .subpage-subtitle {
          max-width: 650px;
          font-size: 1.15rem;
          color: var(--text-secondary);
          line-height: 1.6;
        }

        .section-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--border-color);
          padding: 0.4rem 1rem;
          border-radius: 50px;
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--text-primary);
        }

        .inline-badge {
          margin-bottom: 1rem;
        }

        /* Split grid */
        .split-intro-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
          margin-bottom: 6rem;
          position: relative;
          z-index: 1;
        }

        .intro-card {
          padding: 3rem;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-items: flex-start;
          gap: 1.5rem;
        }

        .who-we-are {
          position: relative;
          overflow: hidden;
          transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
          z-index: 1;
        }

        .who-we-are::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: url('/images/who-we-are-bg.png');
          background-size: cover;
          background-position: center;
          opacity: 0;
          transition: opacity 0.6s ease, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
          z-index: -2;
          pointer-events: none;
        }

        .who-we-are::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, rgba(8, 8, 12, 0.8) 0%, rgba(8, 8, 12, 0.95) 100%);
          opacity: 0;
          transition: opacity 0.6s ease;
          z-index: -1;
          pointer-events: none;
        }

        .who-we-are:hover {
          transform: translateY(-8px) scale(1.04);
          border-color: rgba(0, 242, 254, 0.5);
          box-shadow: 0 25px 50px rgba(0, 242, 254, 0.25), 
                      0 0 40px rgba(0, 242, 254, 0.15) inset;
        }

        .who-we-are:hover::before {
          opacity: 1;
          transform: scale(1.08);
        }

        .who-we-are:hover::after {
          opacity: 1;
        }

        /* Specific readability adjustments for who-we-are components on hover */
        .who-we-are .section-heading,
        .who-we-are .intro-paragraph,
        .who-we-are .intro-icon-box,
        .who-we-are .card-deco-line {
          transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .who-we-are:hover .section-heading {
          color: #ffffff;
          text-shadow: 0 0 15px rgba(0, 242, 254, 0.6), 0 2px 5px rgba(0, 0, 0, 0.9);
          transform: translateY(-2px);
        }

        .who-we-are:hover .intro-paragraph {
          color: #e6f9ff;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.9), 0 0 10px rgba(0, 242, 254, 0.15);
          font-weight: 500;
        }

        .who-we-are:hover .intro-icon-box {
          background: rgba(0, 242, 254, 0.15);
          border-color: rgba(0, 242, 254, 0.6);
          box-shadow: 0 0 25px rgba(0, 242, 254, 0.4);
          transform: scale(1.1) rotate(5deg);
        }

        .who-we-are:hover .card-deco-line {
          width: 120px;
          background: linear-gradient(90deg, var(--primary), var(--accent));
          box-shadow: 0 0 15px var(--primary);
        }

        .commitment-card {
          position: relative;
          overflow: hidden;
          transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
          z-index: 1;
        }

        .commitment-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: url('/images/commitment-bg.png');
          background-size: cover;
          background-position: center;
          opacity: 0;
          transition: opacity 0.6s ease, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
          z-index: -2;
          pointer-events: none;
        }

        .commitment-card::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, rgba(8, 8, 12, 0.8) 0%, rgba(8, 8, 12, 0.95) 100%);
          opacity: 0;
          transition: opacity 0.6s ease;
          z-index: -1;
          pointer-events: none;
        }

        .commitment-card:hover {
          transform: translateY(-8px) scale(1.04);
          border-color: rgba(170, 59, 255, 0.5);
          box-shadow: 0 25px 50px rgba(170, 59, 255, 0.25), 
                      0 0 40px rgba(170, 59, 255, 0.15) inset;
        }

        .commitment-card:hover::before {
          opacity: 1;
          transform: scale(1.08);
        }

        .commitment-card:hover::after {
          opacity: 1;
        }

        /* Specific readability adjustments for commitment-card components on hover */
        .commitment-card .section-heading,
        .commitment-card .intro-paragraph,
        .commitment-card .intro-icon-box,
        .commitment-card .location-badge {
          transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .commitment-card:hover .section-heading {
          color: #ffffff;
          text-shadow: 0 0 15px rgba(170, 59, 255, 0.6), 0 2px 5px rgba(0, 0, 0, 0.9);
          transform: translateY(-2px);
        }

        .commitment-card:hover .intro-paragraph {
          color: #f5ebff;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.9), 0 0 10px rgba(170, 59, 255, 0.15);
          font-weight: 500;
        }

        .commitment-card:hover .intro-icon-box {
          background: rgba(170, 59, 255, 0.15);
          border-color: rgba(170, 59, 255, 0.6);
          box-shadow: 0 0 25px rgba(170, 59, 255, 0.4);
          transform: scale(1.1) rotate(-5deg);
        }

        .commitment-card:hover .location-badge {
          background: rgba(170, 59, 255, 0.15);
          border-color: rgba(170, 59, 255, 0.3);
          box-shadow: 0 0 15px rgba(170, 59, 255, 0.2);
        }

        .card-highlight-corner {
          position: absolute;
          top: 0;
          right: 0;
          width: 80px;
          height: 80px;
          background: radial-gradient(circle at top right, rgba(0, 242, 254, 0.15), transparent 70%);
          border-radius: 0 20px 0 0;
        }

        .purple-glow {
          background: radial-gradient(circle at top right, rgba(170, 59, 255, 0.15), transparent 70%);
        }

        .intro-icon-box {
          width: 52px;
          height: 52px;
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--border-color);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 0.5rem;
        }

        .section-heading {
          font-size: 2rem;
          color: #ffffff;
          font-weight: 800;
        }

        .intro-paragraph {
          font-size: 1.05rem;
          line-height: 1.65;
          color: var(--text-secondary);
        }

        .text-highlight {
          color: var(--text-primary);
        }

        .card-deco-line {
          width: 60px;
          height: 2px;
          background: linear-gradient(90deg, var(--primary), transparent);
          margin-top: auto;
        }

        .location-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(0, 242, 254, 0.05);
          border: 1px solid rgba(0, 242, 254, 0.1);
          padding: 0.5rem 1.25rem;
          border-radius: 50px;
          font-size: 0.85rem;
          color: var(--text-primary);
          margin-top: auto;
          position: relative;
        }

        .pulse-indicator {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: var(--primary);
          position: relative;
        }

        .pulse-indicator::after {
          content: '';
          position: absolute;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background-color: var(--primary);
          animation: pulseGlow 1.8s infinite ease-in-out;
          top: 0;
          left: 0;
        }

        /* Purpose Sections */
        .content-section {
          margin-bottom: 6rem;
          position: relative;
          z-index: 1;
        }

        .section-title-wrap {
          margin-bottom: 3.5rem;
        }

        .section-main-title {
          font-size: 2.5rem;
          font-weight: 800;
          margin-top: 0.5rem;
        }

        .three-cards-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
        }

        .purpose-card {
          padding: 2.5rem;
          height: 100%;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          align-items: flex-start;
          transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
          perspective: 1000px;
          transform-style: preserve-3d;
        }

        .purpose-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
        }

        .purpose-icon-box {
          width: 60px;
          height: 60px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 0.25rem;
          transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
          transform-style: preserve-3d;
        }

        .purpose-number {
          position: absolute;
          top: 2rem;
          right: 2.5rem;
          font-size: 3.5rem;
          font-weight: 900;
          color: rgba(255, 255, 255, 0.03);
          line-height: 1;
          transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
          transform-style: preserve-3d;
          pointer-events: none;
        }

        .purpose-card:hover .purpose-number {
          transform: translateZ(50px) rotateY(-20deg) scale(1.1);
        }

        /* Specific theme glows for numbers on hover */
        .purpose-card:hover:has(.bg-cyan-dim) .purpose-number {
          color: rgba(0, 242, 254, 0.18);
          text-shadow: 0 0 20px rgba(0, 242, 254, 0.25);
        }

        .purpose-card:hover:has(.bg-purple-dim) .purpose-number {
          color: rgba(170, 59, 255, 0.18);
          text-shadow: 0 0 20px rgba(170, 59, 255, 0.25);
        }

        .purpose-card:hover:has(.bg-amber-dim) .purpose-number {
          color: rgba(245, 158, 11, 0.18);
          text-shadow: 0 0 20px rgba(245, 158, 11, 0.25);
        }

        .purpose-card-title {
          font-size: 1.4rem;
          color: #ffffff;
          transition: all 0.5s ease;
        }

        .purpose-card:hover .purpose-card-title {
          transform: translateZ(15px);
          text-shadow: 0 2px 5px rgba(0, 0, 0, 0.8);
        }

        .purpose-card-desc {
          font-size: 1.2rem;
          color: var(--text-secondary);
          line-height: 1.6;
          transition: all 0.5s ease;
        }

        .purpose-card:hover .purpose-card-desc {
          transform: translateZ(10px);
          color: rgba(255, 255, 255, 0.95);
        }

        /* 3D Animations for each icon-box and icon on hover */
        
        /* 1. Target (Mission) - Spins 3D on Y axis */
        .purpose-card:hover .bg-cyan-dim {
          transform: translateZ(35px) rotateY(360deg) scale(1.15);
          background: rgba(0, 242, 254, 0.15);
          border-color: rgba(0, 242, 254, 0.5);
          box-shadow: 0 0 25px rgba(0, 242, 254, 0.4);
        }

        /* 2. Rocket (Vision) - Launches upward and forward in 3D */
        .purpose-card:hover .bg-purple-dim {
          transform: translate3d(5px, -10px, 40px) rotate(-15deg) scale(1.18);
          background: rgba(170, 59, 255, 0.15);
          border-color: rgba(170, 59, 255, 0.5);
          box-shadow: 0 0 25px rgba(170, 59, 255, 0.4);
        }
        
        /* 3. ShieldCheck (Values) - Flips 3D on X axis */
        .purpose-card:hover .bg-amber-dim {
          transform: translateZ(35px) rotateX(180deg) scale(1.15);
          background: rgba(245, 158, 11, 0.15);
          border-color: rgba(245, 158, 11, 0.5);
          box-shadow: 0 0 25px rgba(245, 158, 11, 0.4);
        }

        .bg-amber-dim svg {
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }
        
        .purpose-card:hover .bg-amber-dim svg {
          transform: rotateX(180deg);
        }

        .bg-cyan-dim { background: rgba(0, 242, 254, 0.06); border: 1px solid rgba(0, 242, 254, 0.15); }
        .bg-purple-dim { background: rgba(170, 59, 255, 0.06); border: 1px solid rgba(170, 59, 255, 0.15); }
        .bg-amber-dim { background: rgba(245, 158, 11, 0.06); border: 1px solid rgba(245, 158, 11, 0.15); }
        .bg-rose-dim { background: rgba(244, 63, 94, 0.06); border: 1px solid rgba(244, 63, 94, 0.15); }

        .icon-cyan { color: var(--primary); filter: drop-shadow(0 0 8px rgba(0, 242, 254, 0.4)); }
        .icon-purple { color: var(--accent); filter: drop-shadow(0 0 8px rgba(170, 59, 255, 0.4)); }
        .icon-amber { color: #f59e0b; filter: drop-shadow(0 0 8px rgba(245, 158, 11, 0.4)); }
        .icon-rose { color: #f43f5e; filter: drop-shadow(0 0 8px rgba(244, 63, 94, 0.4)); }

        .purpose-card-title {
          font-size: 1.4rem;
          color: #ffffff;
        }

        .purpose-card-desc {
          font-size: 0.95rem;
          color: var(--text-secondary);
          line-height: 1.6;
        }

        /* Why Choose Us 4 Cards Grid */
        .four-cards-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem;
        }

        .edge-card {
          padding: 2.25rem;
          height: 100%;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          align-items: flex-start;
          background: rgba(13, 13, 17, 0.2);
          position: relative;
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          z-index: 1;
        }

        .edge-card > * {
          position: relative;
          z-index: 1;
          pointer-events: none;
        }

        .edge-card:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.4);
        }

        /* Specific glows on hover for each card index */
        .edge-card-0:hover {
          border-color: rgba(0, 242, 254, 0.4);
          box-shadow: 0 20px 40px rgba(0, 242, 254, 0.15), 0 0 20px rgba(0, 242, 254, 0.1) inset;
        }

        .edge-card-1:hover {
          border-color: rgba(170, 59, 255, 0.4);
          box-shadow: 0 20px 40px rgba(170, 59, 255, 0.15), 0 0 20px rgba(170, 59, 255, 0.1) inset;
        }

        .edge-card-2:hover {
          border-color: rgba(245, 158, 11, 0.4);
          box-shadow: 0 20px 40px rgba(245, 158, 11, 0.15), 0 0 20px rgba(245, 158, 11, 0.1) inset;
        }

        .edge-card-3:hover {
          border-color: rgba(244, 63, 94, 0.4);
          box-shadow: 0 20px 40px rgba(244, 63, 94, 0.15), 0 0 20px rgba(244, 63, 94, 0.1) inset;
        }

        /* Readability and color styling adjustments on hover for edge-cards */
        .edge-card .edge-title,
        .edge-card .edge-desc,
        .edge-card .edge-icon-circle {
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .edge-card:hover .edge-title {
          color: #ffffff;
        }

        .edge-card-0:hover .edge-title { text-shadow: 0 0 10px rgba(0, 242, 254, 0.3), 0 2px 4px rgba(0, 0, 0, 0.9); }
        .edge-card-1:hover .edge-title { text-shadow: 0 0 10px rgba(170, 59, 255, 0.3), 0 2px 4px rgba(0, 0, 0, 0.9); }
        .edge-card-2:hover .edge-title { text-shadow: 0 0 10px rgba(245, 158, 11, 0.3), 0 2px 4px rgba(0, 0, 0, 0.9); }
        .edge-card-3:hover .edge-title { text-shadow: 0 0 10px rgba(244, 63, 94, 0.3), 0 2px 4px rgba(0, 0, 0, 0.9); }

        .edge-card:hover .edge-desc {
          color: rgba(255, 255, 255, 0.95);
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.9);
          font-weight: 500;
        }

        .edge-card:hover .edge-icon-circle {
          transform: scale(1.1) rotate(5deg);
        }

        .edge-card-0:hover .edge-icon-circle { background: rgba(0, 242, 254, 0.15); border-color: rgba(0, 242, 254, 0.4); box-shadow: 0 0 15px rgba(0, 242, 254, 0.3); }
        .edge-card-1:hover .edge-icon-circle { background: rgba(170, 59, 255, 0.15); border-color: rgba(170, 59, 255, 0.4); box-shadow: 0 0 15px rgba(170, 59, 255, 0.3); }
        .edge-card-2:hover .edge-icon-circle { background: rgba(245, 158, 11, 0.15); border-color: rgba(245, 158, 11, 0.4); box-shadow: 0 0 15px rgba(245, 158, 11, 0.3); }
        .edge-card-3:hover .edge-icon-circle { background: rgba(244, 63, 94, 0.15); border-color: rgba(244, 63, 94, 0.4); box-shadow: 0 0 15px rgba(244, 63, 94, 0.3); }

        .edge-icon-circle {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .edge-title {
          font-size: 1.2rem;
          color: #ffffff;
        }

        .edge-desc {
          font-size: 0.9rem;
          color: var(--text-secondary);
          line-height: 1.55;
        }

        /* Tech Stack cards floating animations */
        .tech-matrix-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem;
        }

        .tech-matrix-grid > .border-glow-wrapper {
          animation: techFloat 6s ease-in-out infinite;
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease;
        }

        .tech-matrix-grid > .border-glow-wrapper:nth-child(1) { animation-delay: 0s; }
        .tech-matrix-grid > .border-glow-wrapper:nth-child(2) { animation-delay: -1.5s; }
        .tech-matrix-grid > .border-glow-wrapper:nth-child(3) { animation-delay: -3s; }
        .tech-matrix-grid > .border-glow-wrapper:nth-child(4) { animation-delay: -4.5s; }

        .tech-matrix-grid > .border-glow-wrapper:hover {
          animation-play-state: paused;
          transform: translateY(-12px) scale(1.03);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
        }

        @keyframes techFloat {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }

        .tech-card {
          padding: 2rem;
          height: 100%;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .tech-header {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          border-bottom: 1px solid var(--border-color);
          padding-bottom: 1rem;
        }

        .tech-group-title {
          font-size: 1.15rem;
          color: #ffffff;
          font-weight: 700;
        }

        .tech-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
        }

        .tech-list li {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.9rem;
          color: var(--text-secondary);
        }

        .tech-tag {
          font-size: 0.7rem;
          padding: 0.15rem 0.5rem;
          border-radius: 4px;
          font-weight: 600;
          text-transform: uppercase;
        }

        .tag-cyan {
          background: rgba(0, 242, 254, 0.05);
          color: var(--primary);
          border: 1px solid rgba(0, 242, 254, 0.1);
        }

        .tag-purple {
          background: rgba(170, 59, 255, 0.05);
          color: var(--accent);
          border: 1px solid rgba(170, 59, 255, 0.1);
        }

        .tag-rose {
          background: rgba(244, 63, 94, 0.05);
          color: #f43f5e;
          border: 1px solid rgba(244, 63, 94, 0.1);
        }

        /* Team structures */
        .team-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
          margin-bottom: 3.5rem;
        }

        .team-card-wrap {
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease;
        }

        .team-card-wrap:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
        }

        .team-card {
          text-align: center;
          align-items: center;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          height: 100%;
          padding: 3rem 2rem;
          transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .member-avatar {
          width: 90px;
          height: 90px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-display);
          font-size: 2.25rem;
          font-weight: 800;
          border: 2px solid rgba(255,255,255,0.08);
          position: relative;
          transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .avatar-cyan {
          background: linear-gradient(135deg, rgba(0, 242, 254, 0.2) 0%, rgba(0, 242, 254, 0.02) 100%);
          color: var(--primary);
          box-shadow: 0 0 20px rgba(0, 242, 254, 0.1);
        }

        .avatar-purple {
          background: linear-gradient(135deg, rgba(170, 59, 255, 0.2) 0%, rgba(170, 59, 255, 0.02) 100%);
          color: var(--accent);
          box-shadow: 0 0 20px rgba(170, 59, 255, 0.1);
        }

        .avatar-amber {
          background: linear-gradient(135deg, rgba(245, 158, 11, 0.2) 0%, rgba(245, 158, 11, 0.02) 100%);
          color: #f59e0b;
          box-shadow: 0 0 20px rgba(245, 158, 11, 0.1);
        }

        .avatar-ring {
          position: absolute;
          top: -4px;
          left: -4px;
          right: -4px;
          bottom: -4px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 50%;
        }

        .member-name {
          font-size: 1.4rem;
          font-weight: 800;
          color: #ffffff;
        }

        .member-role {
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--primary);
          text-transform: uppercase;
          letter-spacing: 0.08em;
          margin-top: -0.75rem;
          background: rgba(0, 242, 254, 0.06);
          padding: 0.25rem 0.75rem;
          border-radius: 4px;
          border: 1px solid rgba(0, 242, 254, 0.15);
        }

        .avatar-purple + .member-role {
          color: var(--accent);
          background: rgba(170, 59, 255, 0.06);
          border-color: rgba(170, 59, 255, 0.15);
        }

        .avatar-amber + .member-role {
          color: #f59e0b;
          background: rgba(245, 158, 11, 0.06);
          border-color: rgba(245, 158, 11, 0.15);
        }

        .member-bio {
          font-size: 1.2rem;
          color: var(--text-secondary);
          line-height: 1.6;
          opacity: 0;
          max-height: 0;
          overflow: hidden;
          margin-top: 0px;
          transform: translateY(15px);
          transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .team-card-wrap:hover .member-bio {
          opacity: 1;
          max-height: 150px;
          margin-top: 0.5rem;
          transform: translateY(0px);
        }

        .team-card-wrap:hover .member-avatar {
          transform: scale(1.08) translateY(-4px);
        }

        /* General culture card */
        .general-culture-wrap {
          margin-top: 4rem;
        }

        .general-culture-card {
          padding: 4rem;
        }

        .culture-grid {
          display: grid;
          grid-template-columns: 1.6fr 1fr;
          gap: 4rem;
          align-items: center;
        }

        .culture-left {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .culture-title {
          font-size: 2rem;
          color: #ffffff;
          font-weight: 800;
        }

        .culture-paragraph {
          font-size: 1.05rem;
          line-height: 1.65;
          color: var(--text-secondary);
        }

        .culture-right {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .culture-stat-box {
          border-left: 3px solid var(--primary);
          padding-left: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .culture-stat-box:nth-child(2) {
          border-left-color: var(--accent);
        }

        .culture-stat-num {
          font-size: 2.5rem;
          font-weight: 900;
          line-height: 1;
        }

        .culture-stat-label {
          font-size: 0.95rem;
          color: var(--text-muted);
          font-weight: 500;
          letter-spacing: 0.02em;
        }

        /* Keyframes & Animations */
        @keyframes pulseGlow {
          0% {
            transform: scale(1);
            opacity: 0.6;
          }
          50% {
            transform: scale(2.2);
            opacity: 0;
          }
          100% {
            transform: scale(1);
            opacity: 0;
          }
        }

        /* Animations */
        .animate-fade-in {
          animation: fadeIn 0.8s ease forwards;
        }

        .animate-slide-up {
          animation: slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .animate-slide-up-delay {
          opacity: 0;
          animation: slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s forwards;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Responsiveness adjustments */
        @media (max-width: 1200px) {
          .three-cards-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .three-cards-grid > div:last-child {
            grid-column: span 2;
          }
          .tech-matrix-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .four-cards-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 992px) {
          .split-intro-grid {
            grid-template-columns: 1fr;
          }
          .culture-grid {
            grid-template-columns: 1fr;
            gap: 2.5rem;
          }
          .team-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .team-grid > div:last-child {
            grid-column: span 2;
          }
        }

        @media (max-width: 768px) {
          .subpage-wrapper {
            padding: 6rem 0 4rem 0;
          }
          .subpage-title {
            font-size: 2.5rem;
          }
          .three-cards-grid {
            grid-template-columns: 1fr;
          }
          .three-cards-grid > div:last-child {
            grid-column: span 1;
          }
          .tech-matrix-grid {
            grid-template-columns: 1fr;
          }
          .four-cards-grid {
            grid-template-columns: 1fr;
          }
          .team-grid {
            grid-template-columns: 1fr;
          }
          .team-grid > div:last-child {
            grid-column: span 1;
          }
          .general-culture-card {
            padding: 2rem;
          }
          .intro-card {
            padding: 2rem;
          }
        }
      `}</style>
    </div>
  );
};

const Card3DCanvas = ({ type, isHovered }) => {
  const canvasRef = React.useRef(null);
  const requestRef = React.useRef(null);
  const angleRef = React.useRef({ x: 0, y: 0, z: 0 });

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width = canvas.width = canvas.offsetWidth || 250;
    let height = canvas.height = canvas.offsetHeight || 250;

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth || 250;
      height = canvas.height = canvas.offsetHeight || 250;
    };
    window.addEventListener('resize', handleResize);

    // 3D Projection functions
    const project = (x, y, z) => {
      const distance = 2.5; // distance from camera
      const fov = 160; // field of view
      const scale = fov / (distance + z);
      const projX = x * scale + width / 2;
      const projY = y * scale + height / 2;
      return { x: projX, y: projY };
    };

    // 3D Rotation functions
    const rotateX = (x, y, z, angle) => {
      const rad = angle * Math.PI / 180;
      const cos = Math.cos(rad);
      const sin = Math.sin(rad);
      return { x, y: y * cos - z * sin, z: y * sin + z * cos };
    };

    const rotateY = (x, y, z, angle) => {
      const rad = angle * Math.PI / 180;
      const cos = Math.cos(rad);
      const sin = Math.sin(rad);
      return { x: x * cos + z * sin, y, z: -x * sin + z * cos };
    };

    const rotateZ = (x, y, z, angle) => {
      const rad = angle * Math.PI / 180;
      const cos = Math.cos(rad);
      const sin = Math.sin(rad);
      return { x: x * cos - y * sin, y: x * sin + y * cos, z };
    };

    // Card geometries
    // 1. Tesseract / Cube
    const getCubePoints = () => {
      const size = 0.55;
      return [
        { x: -size, y: -size, z: -size },
        { x: size, y: -size, z: -size },
        { x: size, y: size, z: -size },
        { x: -size, y: size, z: -size },
        { x: -size, y: -size, z: size },
        { x: size, y: -size, z: size },
        { x: size, y: size, z: size },
        { x: -size, y: size, z: size },
      ];
    };
    const cubeEdges = [
      [0, 1], [1, 2], [2, 3], [3, 0],
      [4, 5], [5, 6], [6, 7], [7, 4],
      [0, 4], [1, 5], [2, 6], [3, 7]
    ];

    // 2. Concentric spheres for Concurrency
    const getSpherePoints = () => {
      const points = [];
      const numLat = 7;
      const numLong = 7;
      const radiusOuter = 0.55;
      const radiusInner = 0.28;

      const makeSphere = (r) => {
        for (let i = 0; i <= numLat; i++) {
          const lat = Math.PI * i / numLat - Math.PI / 2;
          for (let j = 0; j < numLong; j++) {
            const lon = 2 * Math.PI * j / numLong;
            points.push({
              x: r * Math.cos(lat) * Math.cos(lon),
              y: r * Math.sin(lat),
              z: r * Math.cos(lat) * Math.sin(lon)
            });
          }
        }
      };
      makeSphere(radiusOuter);
      makeSphere(radiusInner);
      return points;
    };

    // 3. Torus for Delivery
    const getTorusPoints = () => {
      const points = [];
      const R = 0.45;
      const r = 0.16;
      const numR = 10;
      const numr = 7;
      for (let i = 0; i < numR; i++) {
        const u = 2 * Math.PI * i / numR;
        for (let j = 0; j < numr; j++) {
          const v = 2 * Math.PI * j / numr;
          points.push({
            x: (R + r * Math.cos(v)) * Math.cos(u),
            y: (R + r * Math.cos(v)) * Math.sin(u),
            z: r * Math.sin(v)
          });
        }
      }
      return points;
    };

    // 4. DNA Helix Wave for Lifeline
    const getHelixPoints = () => {
      const points = [];
      const numPoints = 20;
      const r = 0.3;
      const height = 1.1;
      for (let i = 0; i < numPoints; i++) {
        const t = (i / numPoints) * 2 * Math.PI * 1.5;
        const y = (i / numPoints - 0.5) * height;
        points.push({
          x: r * Math.cos(t),
          y: y,
          z: r * Math.sin(t)
        });
        points.push({
          x: r * Math.cos(t + Math.PI),
          y: y,
          z: r * Math.sin(t + Math.PI)
        });
      }
      return points;
    };

    const geometry =
      type === 'cube' ? getCubePoints() :
        type === 'sphere' ? getSpherePoints() :
          type === 'torus' ? getTorusPoints() :
            getHelixPoints();

    // Render loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const targetSpeed = isHovered ? 2.2 : 0.35;
      angleRef.current.x += targetSpeed * 0.4;
      angleRef.current.y += targetSpeed * 0.6;
      angleRef.current.z += targetSpeed * 0.2;

      const currentOpacity = isHovered ? 0.32 : 0.07;
      ctx.strokeStyle =
        type === 'cube' ? `rgba(0, 242, 254, ${currentOpacity})` :
          type === 'sphere' ? `rgba(170, 59, 255, ${currentOpacity})` :
            type === 'torus' ? `rgba(245, 158, 11, ${currentOpacity})` :
              `rgba(244, 63, 94, ${currentOpacity})`;

      ctx.lineWidth = isHovered ? 1.5 : 1;

      // Project points
      const projected = geometry.map(p => {
        let rotated = rotateX(p.x, p.y, p.z, angleRef.current.x);
        rotated = rotateY(rotated.x, rotated.y, rotated.z, angleRef.current.y);
        rotated = rotateZ(rotated.x, rotated.y, rotated.z, angleRef.current.z);
        return project(rotated.x, rotated.y, rotated.z);
      });

      // Draw edges / lines
      if (type === 'cube') {
        cubeEdges.forEach(edge => {
          const p1 = projected[edge[0]];
          const p2 = projected[edge[1]];
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        });
      } else if (type === 'sphere') {
        projected.forEach((p, idx) => {
          ctx.fillStyle = ctx.strokeStyle;
          ctx.beginPath();
          ctx.arc(p.x, p.y, isHovered ? 2.5 : 1.5, 0, 2 * Math.PI);
          ctx.fill();

          if (idx % 7 !== 6 && idx + 1 < projected.length) {
            const nextP = projected[idx + 1];
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(nextP.x, nextP.y);
            ctx.stroke();
          }
        });
      } else if (type === 'torus') {
        const numr = 7;
        projected.forEach((p, idx) => {
          ctx.fillStyle = ctx.strokeStyle;
          ctx.beginPath();
          ctx.arc(p.x, p.y, isHovered ? 1.8 : 1, 0, 2 * Math.PI);
          ctx.fill();

          if (idx % numr !== numr - 1) {
            const nextP = projected[idx + 1];
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(nextP.x, nextP.y);
            ctx.stroke();
          } else {
            const nextP = projected[idx - numr + 1];
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(nextP.x, nextP.y);
            ctx.stroke();
          }
        });
      } else {
        // DNA Helix
        const half = projected.length / 2;
        for (let i = 0; i < half; i++) {
          const p1 = projected[i * 2];
          const p2 = projected[i * 2 + 1];

          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();

          ctx.fillStyle = ctx.strokeStyle;
          ctx.beginPath();
          ctx.arc(p1.x, p1.y, isHovered ? 3 : 2, 0, 2 * Math.PI);
          ctx.fill();
          ctx.beginPath();
          ctx.arc(p2.x, p2.y, isHovered ? 3 : 2, 0, 2 * Math.PI);
          ctx.fill();

          if (i > 0) {
            const prevP1 = projected[(i - 1) * 2];
            const prevP2 = projected[(i - 1) * 2 + 1];
            ctx.beginPath();
            ctx.moveTo(prevP1.x, prevP1.y);
            ctx.lineTo(p1.x, p1.y);
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(prevP2.x, prevP2.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      requestRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [type, isHovered]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
        opacity: 0.85,
        transition: 'opacity 0.5s ease'
      }}
    />
  );
};

export default AboutPage;
