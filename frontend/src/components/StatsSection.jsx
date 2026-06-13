import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Award, Heart, Handshake, Users } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const StatsSection = () => {
  const sectionRef = useRef(null);
  const [hoveredCardIndex, setHoveredCardIndex] = useState(null);

  // References for individual stats cards for ScrollTrigger 3D waves
  const card1 = useRef(null);
  const card2 = useRef(null);
  const card3 = useRef(null);
  const card4 = useRef(null);

  // 1. Initialize GSAP 3D scroll waves
  useEffect(() => {
    const cards = [card1.current, card2.current, card3.current, card4.current];

    // Set initial 3D transform projection states
    gsap.set(cards, {
      opacity: 0,
      y: 100,
      z: -150,
      rotateX: 25,
      rotateY: -15,
      transformPerspective: 1200,
      transformOrigin: 'center center -80px'
    });

    // Animate cards into flat positions with a wavy stagger on scroll
    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top 80%',
      end: 'top 20%',
      scrub: 1.0, // Smooth scrubbing tied to scroll
      onEnter: () => {
        gsap.to(cards, {
          opacity: 1,
          y: 0,
          rotateX: 0,
          rotateY: 0,
          z: 0,
          stagger: 0.15,
          duration: 1.2,
          ease: 'power3.out',
          overwrite: 'auto'
        });
      },
      onLeaveBack: () => {
        // Reset if scrolling back up
        gsap.to(cards, {
          opacity: 0,
          y: 100,
          rotateX: 25,
          rotateY: -15,
          z: -150,
          stagger: 0.1,
          duration: 0.8,
          ease: 'power2.in',
          overwrite: 'auto'
        });
      }
    });

    return () => {
      trigger.kill();
    };
  }, []);

  // 2. Interactive 3D Cursor Hover Tilt Math
  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const percentX = (x / rect.width) - 0.5;
    const percentY = (y / rect.height) - 0.5;

    // Direct 3D matrix spring tilt
    gsap.to(card, {
      rotateY: percentX * 26,
      rotateX: -percentY * 26,
      z: 35,
      duration: 0.3,
      ease: 'power2.out',
      overwrite: 'auto'
    });

    // Update coordinate sheens
    card.style.setProperty('--x', `${x}px`);
    card.style.setProperty('--y', `${y}px`);
  };

  const handleMouseLeave = (e) => {
    const card = e.currentTarget;

    // Reset smoothly back to baseline flat
    gsap.to(card, {
      rotateY: 0,
      rotateX: 0,
      z: 0,
      duration: 0.6,
      ease: 'power2.out',
      overwrite: 'auto'
    });
  };

  const stats = [
    {
      ref: card1,
      number: "75+",
      label: "Projects Delivered",
      desc: "High-performance operational hubs customized securely.",
      icon: <Award size={20} />,
      color: "rgba(0, 242, 254, 0.4)",
      badgeClass: "primary-badge"
    },
    {
      ref: card2,
      number: "100%",
      label: "Client Satisfaction",
      desc: "Delivering unmatched digital reliability across sectors.",
      icon: <Heart size={20} />,
      color: "rgba(79, 172, 254, 0.4)",
      badgeClass: "secondary-badge"
    },
    {
      ref: card3,
      number: "50+",
      label: "Enterprise Partners",
      desc: "Trusted by leading business organizations globally.",
      icon: <Handshake size={20} />,
      color: "rgba(170, 59, 255, 0.4)",
      badgeClass: "accent-badge"
    },
    {
      ref: card4,
      number: "1000+",
      label: "Users Served",
      desc: "Active clients interacting with our system frameworks.",
      icon: <Users size={20} />,
      color: "rgba(16, 185, 129, 0.4)",
      badgeClass: "success-badge"
    }
  ];

  return (
    <section ref={sectionRef} className="intro-stats-section">
      {/* Dynamic Grid Background Blueprint for 3D technical blueprint feel */}
      <div className="stats-blueprint-grid"></div>
      <div className="stats-ambient-glow"></div>

      <div className="container">

        {/* Typographic Badge Intro */}
        <div className="stats-header text-center">
          <div className="section-badge">
            <ActivityIcon />
            <span style={{ fontSize: '1.25rem' }}>OPERATIONAL METRICS</span>
          </div>
          <h2 className="stats-section-title font-display">
            Zenelait in <span className="cyber-text">Numbers</span>
          </h2>
          <p className="stats-section-subtitle">
            Hover over each operational index card to explore its volumetric 3D details and holographic light matrices.
          </p>
        </div>

        {/* 4-Column 3D Cards Matrix */}
        <div className="stats-matrix-grid">
          {stats.map((stat, i) => (
            <div key={i} ref={stat.ref} className="perspective-wrapper">
              <div
                className="glass-card stat-metric-card"
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setHoveredCardIndex(i)}
                onMouseLeave={(e) => { handleMouseLeave(e); setHoveredCardIndex(null); }}
              >
                {/* Glowing coordinate tracking spotlight background */}
                <div
                  className="stat-card-spotlight"
                  style={{ background: `radial-gradient(circle 200px at var(--x, 0px) var(--y, 0px), ${stat.color} 0%, transparent 80%)` }}
                ></div>

                {/* Floating Badge Header (translateZ projected) */}
                <div className="stat-card-header">
                  <div className={`card-badge ${stat.badgeClass} stat-badge`}>
                    {stat.icon}
                  </div>
                </div>

                {/* Volumetric Floating Number (highest translateZ projection!) */}
                <h3 className="stat-giant-num font-display">
                  <DynamicCounter targetString={stat.number} isHovered={hoveredCardIndex === i} />
                </h3>

                {/* Volumetric Descriptions */}
                <div className="stat-text-box">
                  <h4 className="stat-label font-display">{stat.label}</h4>
                  <p className="stat-desc">{stat.desc}</p>
                </div>

                <div className="stat-card-highlight-bar" style={{ background: stat.color }}></div>

              </div>
            </div>
          ))}
        </div>

      </div>

      <style>{`
        .intro-stats-section {
          position: relative;
          padding: 8rem 0;
          background-color: var(--bg-dark);
          overflow: hidden;
          z-index: 15;
          border-top: 1px solid rgba(255, 255, 255, 0.02);
        }

        /* Blueprint Grid Lines */
        .stats-blueprint-grid {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-size: 40px 40px;
          background-image: 
            linear-gradient(to right, rgba(255, 255, 255, 0.01) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.01) 1px, transparent 1px);
          z-index: 1;
          pointer-events: none;
        }

        .stats-ambient-glow {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 70vw;
          height: 30vw;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(0, 242, 254, 0.02) 0%, transparent 70%);
          z-index: 1;
          pointer-events: none;
        }

        .stats-header {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
          margin-bottom: 5rem;
        }

        .stats-section-title {
          font-size: 3rem;
          font-weight: 900;
          letter-spacing: -0.02em;
          color: #ffffff;
        }

        .stats-section-subtitle {
        text-align: center;
          max-width: 600px;
          font-size: 1.3rem;
          color: var(--text-secondary);
        }

        /* 3D Grid matrix */
        .stats-matrix-grid {
          position: relative;
          z-index: 2;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 2rem;
        }

        .perspective-wrapper {
          perspective: 1200px;
          transform-style: preserve-3d;
          height: 100%;
        }

        .stat-metric-card {
          width: 100%;
          padding: 3rem 2.25rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.75rem;
          text-align: center;
          background: rgba(13, 13, 17, 0.4);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 20px;
          transform-style: preserve-3d;
          position: relative;
          overflow: hidden;
          height: 100%;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.4);
          transition: border-color 0.3s ease;
        }

        .stat-card-spotlight {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 0;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .stat-metric-card:hover .stat-card-spotlight {
          opacity: 1;
        }

        /* Volumetric 3D depth pop offsets */
        .stat-metric-card > * {
          transform: translateZ(25px);
          position: relative;
          z-index: 1;
        }

        .stat-badge {
          transform: translateZ(35px);
          padding: 0.5rem;
          border-radius: 8px;
        }

        .stat-giant-num {
          font-size: 3.5rem;
          font-weight: 900;
          background: linear-gradient(135deg, #ffffff 40%, var(--text-secondary) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          line-height: 0.9;
          transform: translateZ(55px); /* Highest volumetric depth pop */
          text-shadow: 0 10px 30px rgba(0,0,0,0.5);
          filter: drop-shadow(0 0 15px rgba(255,255,255,0.08));
        }

        .stat-metric-card:hover .stat-giant-num {
          background: linear-gradient(135deg, #ffffff 10%, var(--primary) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          filter: drop-shadow(0 0 20px rgba(0,242,254,0.3));
          transform: translateZ(65px);
        }

        .stat-text-box {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          transform: translateZ(30px);
        }

        .stat-label {
          font-size: 1.25rem;
          font-weight: 700;
          color: #ffffff;
        }

        .stat-desc {
          font-size: 1.3rem;
          line-height: 1.5;
          color: var(--text-secondary);
        }

        .stat-card-highlight-bar {
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%) translateZ(10px);
          width: 0;
          height: 3px;
          border-radius: 10px 10px 0 0;
          transition: width 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          z-index: 5;
        }

        .stat-metric-card:hover .stat-card-highlight-bar {
          width: 60%;
        }

        @media (max-width: 1024px) {
          .stats-matrix-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 2rem;
          }
          
          .stats-section-title {
            font-size: 2.5rem;
          }
        }

        @media (max-width: 768px) {
          .intro-stats-section {
            padding: 6rem 0;
          }

          .stats-section-title {
            font-size: 2rem;
          }

          .stats-matrix-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }

          .stat-metric-card {
            padding: 2.5rem 1.5rem;
            gap: 1.25rem;
          }

          .stat-giant-num {
            font-size: 3rem;
          }

          .stat-label {
            font-size: 1.1rem;
          }
        }
      `}</style>
    </section>
  );
};

const ActivityIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ animation: 'pulse 1.5s infinite alternate ease-in-out' }}>
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
    <style>{`
      @keyframes pulse {
        0% { transform: scale(0.9); opacity: 0.7; }
        100% { transform: scale(1.1); opacity: 1; }
      }
    `}</style>
  </svg>
);

const DynamicCounter = ({ targetString, isHovered }) => {
  const match = targetString.match(/^(\d+)(.*)$/);
  const targetVal = match ? parseInt(match[1], 10) : 0;
  const suffix = match ? match[2] : '';

  const [count, setCount] = React.useState(0); // start at 0 for reveal feel
  const animationRef = React.useRef(null);

  React.useEffect(() => {
    if (isHovered) {
      const duration = 650; // fast 650ms countdown/countup
      const startTime = performance.now();

      const animate = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Easing curve (easeOutQuad)
        const easeProgress = progress * (2 - progress);
        const currentCount = Math.floor(easeProgress * targetVal);

        setCount(currentCount);

        if (progress < 1) {
          animationRef.current = requestAnimationFrame(animate);
        } else {
          setCount(targetVal);
        }
      };

      animationRef.current = requestAnimationFrame(animate);
    } else {
      // Hold target value as default state when not hovered
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      setCount(targetVal);
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isHovered, targetVal]);

  return (
    <>
      {count}
      {suffix}
    </>
  );
};

export default StatsSection;
