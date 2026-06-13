import React, { useRef, useState } from 'react';
import {
  Building2,
  Coins,
  HeartPulse,
  ShoppingBag,
  GraduationCap,
  Activity,
  ArrowRight,
  Sparkles,
  AlignCenter
} from 'lucide-react';

const INDUSTRIES_DATA = [
  {
    id: 'ind_fintech',
    title: 'Finance & Fintech',
    description: 'Engineering bulletproof transactional architectures, localized ledgers, and secure payment pathways with sub-millisecond cryptographic sweeps.',
    icon: Coins,
    color: 'cyan',
    bgColor: 'rgba(0, 242, 254, 0.03)',
    borderColor: 'rgba(0, 242, 254, 0.15)',
    glowColor: '#00f2fe'
  },
  {
    id: 'ind_retail',
    title: 'E-Commerce & Retail',
    description: 'Deploying high-concurrency catalogs, smart billing software, checkout pipelines, and automated tax systems built to absorb massive traffic surges.',
    icon: ShoppingBag,
    color: 'purple',
    bgColor: 'rgba(170, 59, 255, 0.03)',
    borderColor: 'rgba(170, 59, 255, 0.15)',
    glowColor: '#aa3bff'
  },
  {
    id: 'ind_healthcare',
    title: 'Healthcare Systems',
    description: 'Configuring secure zero-knowledge data pipelines, real-time patient charts telemetry, compliance tracking, and automated schedules systems.',
    icon: HeartPulse,
    color: 'rose',
    bgColor: 'rgba(244, 63, 94, 0.03)',
    borderColor: 'rgba(244, 63, 94, 0.15)',
    glowColor: '#f43f5e'
  },
  {
    id: 'ind_logistics',
    title: 'Logistics & Supply Chain',
    description: 'Unifying multi-branch inventory databases, asset allocation matrices, fleet tracking, and dynamic shipping networks under one dashboard.',
    icon: Building2,
    color: 'amber',
    bgColor: 'rgba(245, 158, 11, 0.03)',
    borderColor: 'rgba(245, 158, 11, 0.15)',
    glowColor: '#f59e0b'
  },
  {
    id: 'ind_education',
    title: 'Academic & EdTech',
    description: 'Building custom LMS suites with procedural course modules, student training tracking, interactive gamification, and digital credentials.',
    icon: GraduationCap,
    color: 'cyan',
    bgColor: 'rgba(6, 182, 212, 0.03)',
    borderColor: 'rgba(6, 182, 212, 0.15)',
    glowColor: '#06b6d4'
  },
  {
    id: 'ind_manufacture',
    title: 'Smart Manufacturing',
    description: 'Integrating automated industrial schedules, resource allocation charts, workflow telemetry, and real-time operations commands panels.',
    icon: Activity,
    color: 'purple',
    bgColor: 'rgba(168, 85, 247, 0.03)',
    borderColor: 'rgba(168, 85, 247, 0.15)',
    glowColor: '#a855f7'
  }
];

const IndustriesSection = () => {
  const [hoveredCardId, setHoveredCardId] = useState(null);
  const cardRefs = useRef({});

  // 3D Mouse Move Tilt Effect Handler
  const handleMouseMove = (e, id) => {
    const card = cardRefs.current[id];
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left; // x position within element
    const y = e.clientY - rect.top;  // y position within element

    // Convert to coordinates from center of card (-0.5 to 0.5)
    const normalizedX = (x / rect.width) - 0.5;
    const normalizedY = (y / rect.height) - 0.5;

    // Tilt calculations (max 12 degrees)
    const tiltX = -normalizedY * 20;
    const tiltY = normalizedX * 20;

    // Apply perspective tilt
    card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.05, 1.05, 1.05)`;

    // Dynamically calculate dynamic background radial glow following client cursor
    const glow = card.querySelector('.cursor-glow-follower');
    if (glow) {
      glow.style.left = `${x}px`;
      glow.style.top = `${y}px`;
      glow.style.opacity = '1';
    }
  };

  const handleMouseLeave = (id) => {
    const card = cardRefs.current[id];
    if (!card) return;

    // Reset styles
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';

    const glow = card.querySelector('.cursor-glow-follower');
    if (glow) {
      glow.style.opacity = '0';
    }
    setHoveredCardId(null);
  };

  return (
    <section className="industries-serve-section">
      <div className="ambient-glow glow-1"></div>
      <div className="ambient-glow glow-2"></div>

      <div className="container">

        {/* Section Header */}
        <div className="section-title-wrap">
          {/* <div className="section-badge inline-badge">
            <Sparkles size={14} className="spin-slow" />
            <span>GLOBAL VERTICALS</span>
          </div> */}
          <h2 className="section-main-title font-display" style={{ textAlign: 'center', fontSize: '3.5rem' }}>
            Industries We <span className="cyber-text">Serve</span>
          </h2>
          <p className="section-subtitle">
            Deploying resilient, high-concurrency custom systems tailored to address the complex requirements of key industry verticals.
          </p>
        </div>

        {/* 3D Isometric Card Grid */}
        <div className="industries-grid">
          {INDUSTRIES_DATA.map((ind) => {
            const IconComponent = ind.icon;
            const isHovered = hoveredCardId === ind.id;

            return (
              <div
                key={ind.id}
                className="border-glow-wrapper industry-card-wrap"
                style={{
                  borderRadius: '24px',
                  background: isHovered
                    ? `linear-gradient(135deg, ${ind.glowColor} 0%, transparent 100%)`
                    : 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.01) 100%)'
                }}
              >
                <div
                  ref={el => cardRefs.current[ind.id] = el}
                  className={`glass-card industry-3d-card ${isHovered ? 'hovered' : ''}`}
                  style={{
                    backgroundColor: 'rgba(10, 10, 15, 0.55)',
                    borderColor: 'rgba(255, 255, 255, 0.05)',
                  }}
                  onMouseMove={(e) => {
                    setHoveredCardId(ind.id);
                    handleMouseMove(e, ind.id);
                  }}
                  onMouseLeave={() => handleMouseLeave(ind.id)}
                >
                  {/* Cursor follower gradient spot */}
                  <div className="cursor-glow-follower" style={{ background: `radial-gradient(circle 80px at center, ${ind.glowColor}1c, transparent 80%)` }}></div>

                  {/* Pop-out 3D details */}
                  <div className="card-popout-icon" style={{ borderColor: isHovered ? ind.glowColor : 'rgba(255,255,255,0.08)' }}>
                    <IconComponent size={24} style={{ color: isHovered ? '#ffffff' : ind.glowColor, filter: isHovered ? `drop-shadow(0 0 10px ${ind.glowColor})` : 'none' }} />
                  </div>

                  <h3 className="industry-card-title font-display">
                    {ind.title}
                  </h3>

                  <p className="industry-card-desc">
                    {ind.description}
                  </p>

                  <div className="industry-card-footer">
                    <span style={{ color: isHovered ? ind.glowColor : 'var(--text-muted)' }}>Explore architecture</span>
                    <ArrowRight size={14} className="explore-arrow-icon" style={{ color: isHovered ? ind.glowColor : 'var(--text-muted)' }} />
                  </div>

                </div>
              </div>
            );
          })}
        </div>

      </div>

      <style>{`
        .industries-serve-section {
          padding: 8rem 0 8rem 0;
          background-color: var(--bg-darker);
          position: relative;
          overflow: hidden;
          z-index: 10;
        }

        .industries-serve-section .ambient-glow {
          position: absolute;
          width: 500px;
          height: 500px;
          border-radius: 50%;
          filter: blur(140px);
          opacity: 0.04;
          pointer-events: none;
          z-index: 0;
        }

        .industries-serve-section .glow-1 {
          top: 10%;
          left: -150px;
          background: var(--primary);
        }

        .industries-serve-section .glow-2 {
          bottom: 10%;
          right: -150px;
          background: var(--accent);
        }

        .section-subtitle {
          max-width: 600px;
          margin: 0.75rem auto 0 auto;
          font-size: 1.1rem;
          color: var(--text-secondary);
          text-align: center;
        }

        /* 3D Grid Layout */
        .industries-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2.5rem;
          margin-top: 4rem;
          position: relative;
          z-index: 1;
        }

        .industry-card-wrap {
          transition: all 0.3s ease;
        }

        .industry-3d-card {
          padding: 3rem 2.5rem;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 1.5rem;
          border-radius: 24px;
          position: relative;
          overflow: hidden;
          transition: transform 0.1s ease-out, border-color 0.4s ease, box-shadow 0.4s ease;
          transform-style: preserve-3d;
          transform: perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1);
          text-align: left;
        }

        .industry-3d-card.hovered {
          border-color: rgba(255, 255, 255, 0.15) !important;
          box-shadow: 0 30px 60px rgba(0,0,0,0.6), inset 0 2px 10px rgba(255,255,255,0.05);
        }

        .cursor-glow-follower {
          position: absolute;
          width: 160px;
          height: 160px;
          transform: translate(-50%, -50%);
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.5s ease;
          z-index: 0;
        }

        .card-popout-icon {
          width: 56px;
          height: 56px;
          border-radius: 14px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255,255,255,0.08);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          transform: translateZ(40px); /* 3D layer pop */
        }

        .industry-3d-card.hovered .card-popout-icon {
          transform: translateZ(60px) scale(1.15);
          background: rgba(255, 255, 255, 0.05);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.4);
        }

        .industry-card-title {
          font-size: 1.45rem;
          font-weight: 800;
          color: #ffffff;
          transform: translateZ(30px);
          transition: all 0.4s ease;
        }

        .industry-3d-card.hovered .industry-card-title {
          transform: translateZ(45px);
          text-shadow: 0 0 10px rgba(255,255,255,0.1);
        }

        .industry-card-desc {
          font-size: 1.1rem;
          color: var(--text-secondary);
          line-height: 1.6;
          transform: translateZ(20px);
          transition: all 0.4s ease;
        }

        .industry-3d-card.hovered .industry-card-desc {
          transform: translateZ(30px);
          color: #ffffff;
        }

        .industry-card-footer {
          margin-top: auto;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-family: var(--font-display);
          font-size: 0.85rem;
          font-weight: 600;
          transform: translateZ(10px);
          transition: all 0.4s ease;
        }

        .explore-arrow-icon {
          transition: transform 0.3s ease;
        }

        .industry-3d-card.hovered .explore-arrow-icon {
          transform: translateX(4px);
        }

        @media (max-width: 1024px) {
          .industries-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 2rem;
          }
        }

        @media (max-width: 768px) {
          .industries-serve-section {
            padding: 6rem 0;
          }
          .industries-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
          .industry-3d-card {
            padding: 2.5rem 2rem;
          }
        }
      `}</style>
    </section>
  );
};

export default IndustriesSection;
