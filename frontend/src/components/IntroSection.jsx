import React, { useEffect, useRef } from 'react';
import { ShieldCheck, ArrowRight, Activity, Terminal } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const IntroSection = () => {
  const sectionRef = useRef(null);
  const glow1Ref = useRef(null);
  const glow2Ref = useRef(null);
  const leftColRef = useRef(null);
  const rightColRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    
    let ctx = gsap.context(() => {
      // 1. Initial Reveal Staggered Entrance
      gsap.fromTo(leftColRef.current, 
        { opacity: 0, y: 70 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 1.2, 
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
            toggleActions: 'play none none none'
          }
        }
      );

      gsap.fromTo(rightColRef.current, 
        { opacity: 0, y: 130 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 1.4, 
          ease: 'power4.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
            toggleActions: 'play none none none'
          }
        }
      );

      gsap.fromTo([glow1Ref.current, glow2Ref.current], 
        { opacity: 0, scale: 0.7 },
        { 
          opacity: 1, 
          scale: 1, 
          duration: 2.0, 
          ease: 'power2.out',
          stagger: 0.2,
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
            toggleActions: 'play none none none'
          }
        }
      );

      // 2. Active Scroll Scrub Parallax
      const parallaxTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top bottom', // Start parallax calculation when top enters viewport bottom
          end: 'bottom top',   // End when bottom leaves viewport top
          scrub: 1.2           // High premium smoothing lag
        }
      });

      // Background glows move very slowly
      parallaxTl.to(glow1Ref.current, { y: -60, ease: 'none' }, 0);
      parallaxTl.to(glow2Ref.current, { y: 60, ease: 'none' }, 0);

      // Left Column (Headline) moves at standard speed
      parallaxTl.to(leftColRef.current, { y: -50, ease: 'none' }, 0);

      // Right Column (Overview Card) moves faster for prominent depth displacement
      parallaxTl.to(rightColRef.current, { y: -110, ease: 'none' }, 0);

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="intro-excellence-section">
      {/* Decorative ambient background glows */}
      <div ref={glow1Ref} className="intro-bg-glow-1"></div>
      <div ref={glow2Ref} className="intro-bg-glow-2"></div>
      
      <div className="container">
        <div className="intro-grid">
          
          {/* Left Column: Typographic Headline */}
          <div ref={leftColRef} className="intro-headline-box">
            <div className="section-badge">
              <Activity size={14} className="badge-pulse-icon" />
              <span style={{ fontSize: '1.25rem' }}>CORPORATE CAPEX</span>
            </div>
            
            <h2 className="intro-title font-display">
              Leading IT Excellence in <span className="cyber-text animate-glow">Tamil Nadu</span>
            </h2>
            
            <div className="tech-schematic-visual glass-panel">
              <div className="schematic-header">
                <Terminal size={12} className="terminal-icon" />
                <span>ZENELAIT NETWORK STATUS : ONLINE</span>
              </div>
              <div className="schematic-bars">
                <div className="bar-row"><span className="label">ERP LAYER</span><div className="track"><div className="fill" style={{width: '95%'}}></div></div></div>
                <div className="bar-row"><span className="label">LMS CORE</span><div className="track"><div className="fill" style={{width: '90%'}}></div></div></div>
                <div className="bar-row"><span className="label">CRM SUITE</span><div className="track"><div className="fill" style={{width: '88%'}}></div></div></div>
              </div>
            </div>
          </div>

          {/* Right Column: Glassmorphic Overview Card */}
          <div className="intro-content-box">
            <div ref={rightColRef} className="border-glow-wrapper excellence-card-wrap">
              <div className="glass-card excellence-card">
                
                <h3 className="excellence-card-title font-display">
                  Corporate Architecture Overview
                </h3>

                <p className="excellence-paragraph" style={{textAlign:"justify"}}>
                  Zenelait Infotech is a premier product-based IT company in Chennai, offering end-to-end software development and digital solutions. From startups to enterprises, we help businesses grow digitally with secure and scalable technology.
                </p>

                <div className="excellence-features-list">
                  <div className="excellence-feature-item">
                    <ShieldCheck size={16} className="feature-check" />
                    <span>Secure Data-Ledger Integrity</span>
                  </div>
                  <div className="excellence-feature-item">
                    <ShieldCheck size={16} className="feature-check" />
                    <span>High-Frequency Auto-Scaling Systems</span>
                  </div>
                  <div className="excellence-feature-item">
                    <ShieldCheck size={16} className="feature-check" />
                    <span>End-to-End Bespoke Architecture Engineering</span>
                  </div>
                </div>

                <div className="intro-cta-wrapper">
                  <a href="#about-us" className="glow-btn">
                    <span>DISCOVER OUR STORY</span>
                    <ArrowRight size={14} />
                  </a>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>

      <style>{`
        .intro-excellence-section {
          position: relative;
          padding: 10rem 0 8rem 0;
          background-color: var(--bg-darker);
          overflow: hidden;
          z-index: 15;
          border-top: 1px solid rgba(255, 255, 255, 0.02);
        }

        /* Ambient Glows */
        .intro-bg-glow-1 {
          position: absolute;
          top: 20%;
          left: -10%;
          width: 500px;
          height: 500px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(0, 242, 254, 0.05) 0%, transparent 70%);
          filter: blur(80px);
          pointer-events: none;
          z-index: 1;
        }

        .intro-bg-glow-2 {
          position: absolute;
          bottom: 10%;
          right: -10%;
          width: 600px;
          height: 600px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(170, 59, 255, 0.04) 0%, transparent 70%);
          filter: blur(95px);
          pointer-events: none;
          z-index: 1;
        }

        /* 2-Column Grid Layout */
        .intro-grid {
          position: relative;
          z-index: 2;
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 4rem;
          align-items: center;
        }

        /* Left Headline Box */
        .intro-headline-box {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          text-align: left;
          gap: 1.5rem;
        }

        .badge-pulse-icon {
          color: var(--primary);
          animation: badgePulse 2s infinite alternate ease-in-out;
        }

        @keyframes badgePulse {
          0% { filter: drop-shadow(0 0 2px var(--primary)); transform: scale(1); }
          100% { filter: drop-shadow(0 0 8px var(--primary)); transform: scale(1.08); }
        }

        .intro-title {
          font-size: 3.5rem;
          font-weight: 900;
          line-height: 1.1;
          letter-spacing: -0.02em;
          color: #ffffff;
        }

        /* Tech Schematic widget box */
        .tech-schematic-visual {
          width: 100%;
          max-width: 440px;
          padding: 1.5rem;
          margin-top: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          background: rgba(13, 13, 17, 0.4);
          border-color: rgba(255, 255, 255, 0.04);
        }

        .schematic-header {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-family: var(--font-mono);
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.05em;
          color: var(--text-muted);
        }

        .terminal-icon {
          color: var(--primary);
        }

        .schematic-bars {
          display: flex;
          flex-direction: column;
          gap: 0.8rem;
        }

        .bar-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
        }

        .bar-row .label {
          font-family: var(--font-display);
          font-size: 0.65rem;
          font-weight: 800;
          color: #ffffff;
          letter-spacing: 0.05em;
          width: 80px;
          text-align: left;
        }

        .bar-row .track {
          flex-grow: 1;
          height: 3px;
          background: rgba(255, 255, 255, 0.04);
          border-radius: 10px;
          overflow: hidden;
        }

        .bar-row .fill {
          height: 100%;
          background: linear-gradient(90deg, var(--primary), var(--secondary));
          border-radius: 10px;
          box-shadow: 0 0 5px var(--primary);
        }

        /* Right Content Card Box */
        .intro-content-box {
          height: 100%;
          display: flex;
          align-items: center;
        }

        .excellence-card-wrap {
          width: 100%;
          border-radius: 20px;
        }

        .excellence-card {
          padding: 3.5rem;
          display: flex;
          flex-direction: column;
          gap: 1.75rem;
          text-align: left;
          height: 100%;
        }

        .excellence-card-title {
          font-size: 1.6rem;
          font-weight: 700;
          color: #ffffff;
          line-height: 1.3;
        }

        .excellence-paragraph {
          font-size: 1.05rem;
          line-height: 1.65;
          color: var(--text-secondary);
        }

        .excellence-features-list {
          display: flex;
          flex-direction: column;
          gap: 0.8rem;
          margin: 0.5rem 0;
        }

        .excellence-feature-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 0.9rem;
          color: var(--text-secondary);
        }

        .feature-check {
          color: var(--primary);
          filter: drop-shadow(0 0 4px var(--primary));
        }

        .intro-cta-wrapper {
          margin-top: 0.5rem;
        }

        @media (max-width: 1024px) {
          .intro-grid {
            grid-template-columns: 1fr;
            gap: 3rem;
          }

          .intro-title {
            font-size: 2.75rem;
          }

          .excellence-card {
            padding: 2.5rem;
          }
        }

        @media (max-width: 768px) {
          .intro-excellence-section {
            padding: 6rem 0 5rem 0;
          }

          .intro-title {
            font-size: 2.25rem;
          }

          .excellence-card {
            padding: 2rem;
            gap: 1.5rem;
          }

          .excellence-paragraph {
            font-size: 0.95rem;
          }

          .excellence-card-title {
            font-size: 1.35rem;
          }
        }
      `}</style>
    </section>
  );
};

export default IntroSection;
