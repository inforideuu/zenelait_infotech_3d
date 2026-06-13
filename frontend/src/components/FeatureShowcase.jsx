import React, { useEffect, useRef } from 'react';
import { Users, Database, GraduationCap, Receipt, Laptop, Bot } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const FeatureShowcase = () => {
  const cardsRef = useRef([]);

  const specs = [
    {
      icon: <Users className="spec-icon" size={24} />,
      title: "Customer Relationship Management (CRM)",
      subtitle: "Synchronized pipeline automation",
      desc: "Track lifecycle engagement points, map customer pipeline arrays, and automate client relations with secure data architectures.",
      glowColor: "rgba(0, 242, 254, 0.4)"
    },
    {
      icon: <Database className="spec-icon" size={24} />,
      title: "Enterprise Resource Planning (ERP)",
      subtitle: "Centralized structural scaling",
      desc: "Consolidate inventory tracking, cross-department workflows, and intelligence nodes into a unified obsidian data core.",
      glowColor: "rgba(170, 59, 255, 0.4)"
    },
    {
      icon: <GraduationCap className="spec-icon" size={24} />,
      title: "Learning Management System (LMS)",
      subtitle: "Dynamic education matrices",
      desc: "Power immersive learning courses, automate grading pipelines, and track performance records via customizable student portals.",
      glowColor: "rgba(79, 172, 254, 0.4)"
    },
    {
      icon: <Receipt className="spec-icon" size={24} />,
      title: "Billing Software",
      subtitle: "High-throughput financial hubs",
      desc: "Process automated invoicing layers, synchronize multi-currency modules, and monitor accounting ledgers with zero latency.",
      glowColor: "rgba(16, 185, 129, 0.4)"
    },
    {
      icon: <Laptop className="spec-icon" size={24} />,
      title: "Website Development",
      subtitle: "Immersive front-end systems",
      desc: "Deploy stunning responsive interfaces with fluid animations, micro-interactions, and lighting fast index speeds.",
      glowColor: "rgba(239, 68, 68, 0.4)"
    },
    {
      icon: <Bot className="spec-icon" size={24} />,
      title: "AI Chatbox",
      subtitle: "Neural conversational engines",
      desc: "Integrate LLM processing nodes to reply, recommend, and resolve client inquiries in real-time with continuous neural learning.",
      glowColor: "rgba(245, 158, 11, 0.4)"
    }
  ];

  useEffect(() => {
    // 3D Parallax Staggered Scroll Reveal
    gsap.fromTo(cardsRef.current,
      {
        opacity: 0,
        y: 100,
        rotateX: 25,
        rotateY: -15,
        z: -120,
        transformPerspective: 1200,
        transformOrigin: "center center -100px"
      },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        rotateY: 0,
        z: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.specs-grid',
          start: 'top 85%',
          toggleActions: 'play none none none',
        }
      }
    );
  }, []);

  // 3D Mouse Parallax Tilt Handlers
  const handleMouseMove = (e, spec) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Normalize coordinates from -0.5 to 0.5
    const percentX = (x / rect.width) - 0.5;
    const percentY = (y / rect.height) - 0.5;

    // Apply smooth 3D rotation and lifting via GSAP to prevent any snapping or lag
    gsap.to(card, {
      rotateY: percentX * 22, // 22 degrees max horizontal tilt
      rotateX: -percentY * 22, // 22 degrees max vertical tilt
      z: 30, // Lift forward in 3D
      boxShadow: `0 25px 50px rgba(0, 0, 0, 0.55), 0 0 25px ${spec.glowColor}`,
      borderColor: spec.glowColor,
      duration: 0.35,
      ease: 'power2.out',
      overwrite: 'auto'
    });

    // Update reflection sheen offset variables
    card.style.setProperty('--x', `${x}px`);
    card.style.setProperty('--y', `${y}px`);
  };

  const handleMouseLeave = (e) => {
    const card = e.currentTarget;

    // Smooth glide back to original flat state
    gsap.to(card, {
      rotateY: 0,
      rotateX: 0,
      z: 0,
      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4), 0 0 30px rgba(0, 242, 254, 0.05)',
      borderColor: 'rgba(255, 255, 255, 0.06)',
      duration: 0.5,
      ease: 'power2.out',
      overwrite: 'auto'
    });
  };

  return (
    <section id="features" className="showcase-section">
      <div className="container">

        {/* Section Header */}
        <div className="section-header">
          <div className="section-badge">
            <CompassIcon />
            <span style={{ fontSize: '1.25rem' }}>OUR CORE SERVICES</span>
          </div>
          <h2 className="section-title font-display">
            Our Core <span className="cyber-text">Expertise</span>
          </h2>
          <p className="section-subtitle">
            We deliver state-of-the-art, high-performance software engineering solutions customized to power, secure, and scale modern enterprise&nbsp;workflows.
          </p>
        </div>

        {/* Specs Grid */}
        <div className="specs-grid">
          {specs.map((spec, i) => (
            <div
              key={i}
              ref={el => cardsRef.current[i] = el}
              className="border-glow-wrapper spec-card-wrap"
            >
              <div
                className={`glass-card spec-card spec-card-${i}`}
                onMouseMove={(e) => handleMouseMove(e, spec)}
                onMouseLeave={handleMouseLeave}
              >
                {/* Glowing subtle background spot */}
                <div
                  className="card-spotlight"
                  style={{ background: `radial-gradient(circle, ${spec.glowColor} 0%, transparent 70%)` }}
                ></div>

                <div className="spec-icon-box">
                  {spec.icon}
                </div>

                <div className="spec-header">
                  <h3 className="spec-title font-display">{spec.title}</h3>
                  <span className="spec-subtitle">{spec.subtitle}</span>
                </div>

                <p className="spec-desc">{spec.desc}</p>
              </div>
            </div>
          ))}
        </div>

      </div>

      <style>{`
        .showcase-section {
          padding: 8rem 0;
          background-color: var(--bg-dark);
          position: relative;
          z-index: 15;
          border-top: 1px solid rgba(255, 255, 255, 0.03);
        }

        /* Section header */
        .section-header {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          margin-bottom: 5rem;
          gap: 1rem;
        }

        .section-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-family: var(--font-display);
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.15em;
          color: var(--primary);
          padding: 0.5rem 1.25rem;
          border-radius: 50px;
          background: rgba(0, 242, 254, 0.03);
          border: 1px solid rgba(0, 242, 254, 0.15);
        }

        .section-title {
          font-size: 3rem;
          font-weight: 900;
          letter-spacing: -0.02em;
          line-height: 1.1;
        }

        .section-subtitle {
          max-width: 600px;
          font-size: 1.3rem;
          color: var(--text-secondary);
          margin-top: 0.5rem;
        }

        /* Specs grid */
        .specs-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
        }

        .spec-card-wrap {
          height: 100%;
          perspective: 1200px;
          transform-style: preserve-3d;
        }

        .spec-card {
          height: 100%;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          align-items: flex-start;
          text-align: left;
          transform-style: preserve-3d;
          transition: border-color 0.4s ease, box-shadow 0.4s ease, transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
          position: relative;
          overflow: hidden;
          z-index: 1;
        }

        .spec-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-size: cover;
          background-position: center;
          opacity: 0;
          transition: opacity 0.6s ease, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
          z-index: -2;
          pointer-events: none;
        }

        .spec-card::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, rgba(8, 8, 12, 0.88) 0%, rgba(8, 8, 12, 0.96) 100%);
          opacity: 0;
          transition: opacity 0.6s ease;
          z-index: -1;
          pointer-events: none;
        }

        /* Map background images for each card index */
        .spec-card-0::before { background-image: url('/images/crm.png'); }
        .spec-card-1::before { background-image: url('/images/erp.png'); }
        .spec-card-2::before { background-image: url('/images/lms.png'); }
        .spec-card-3::before { background-image: url('/images/billing software.png'); }
        .spec-card-4::before { background-image: url('/images/website development.png'); }
        .spec-card-5::before { background-image: url('/images/ai chatbot.png'); }

        .spec-card:hover::before {
          opacity: 1;
          transform: scale(1.08); /* inner 3D parallax zoom of the image */
        }

        .spec-card:hover::after {
          opacity: 1;
        }

        /* 3D Depth Layering on Hover */
        .spec-icon-box,
        .spec-header,
        .spec-desc {
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .spec-card:hover .spec-icon-box {
          transform: translateZ(40px) scale(1.08);
        }

        .spec-card:hover .spec-header {
          transform: translateZ(28px);
        }

        .spec-card:hover .spec-desc {
          transform: translateZ(18px);
        }

        .card-spotlight {
          position: absolute;
          top: -20%;
          right: -20%;
          width: 200px;
          height: 200px;
          border-radius: 50%;
          opacity: 0.15;
          pointer-events: none;
          z-index: 0;
          transition: opacity 0.4s ease;
        }

        .spec-card:hover .card-spotlight {
          opacity: 0.35;
        }

        .spec-icon-box {
          width: 52px;
          height: 52px;
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.06);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-primary);
          transition: all 0.3s ease;
        }

        .spec-card:hover .spec-icon-box {
          border-color: var(--primary);
          color: var(--primary);
          box-shadow: 0 0 15px rgba(0, 242, 254, 0.15);
          transform: scale(1.05);
        }

        .spec-header {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .spec-title {
          font-size: 1.25rem;
          font-weight: 700;
          color: #ffffff;
        }

        .spec-subtitle {
          font-size: 1.0rem;
          font-weight: 500;
          color: var(--primary);
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }

        .spec-desc {
          font-size: 1.1rem;
          line-height: 1.6;
          color: var(--text-secondary);
        }

        @media (max-width: 1024px) {
          .specs-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          
          .section-title {
            font-size: 2.5rem;
          }
        }

        @media (max-width: 768px) {
          .showcase-section {
            padding: 5rem 0;
          }
          
          .specs-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }

          .section-title {
            font-size: 2rem;
          }

          .section-subtitle {
            font-size: 1.3rem;
          }
        }
      `}</style>
    </section>
  );
};

// Clean inline badge svg icon
const CompassIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ animation: 'spin 6s linear infinite' }}>
    <circle cx="12" cy="12" r="10" />
    <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
    <style>{`
      @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
    `}</style>
  </svg>
);

export default FeatureShowcase;
