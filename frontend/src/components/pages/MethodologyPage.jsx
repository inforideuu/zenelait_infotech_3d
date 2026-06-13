import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  Settings, 
  Layers, 
  Terminal, 
  ShieldCheck, 
  CloudLightning, 
  Activity,
  Award,
  Sparkles,
  Compass
} from 'lucide-react';

const METHODOLOGIES = [
  {
    phase: '01',
    title: 'Discovery & Consultation',
    desc: 'Understanding your product needs, concurrency requirements, and mapping operational friction to concrete technical models.',
    image: '/images/methodology_1.png',
    icon: Compass,
    color: 'cyan'
  },
  {
    phase: '02',
    title: 'Architectural Blueprinting',
    desc: 'Drafting high-concurrency database schemas, low-latency API mappings, and highly interactive responsive front-end visual states.',
    image: '/images/methodology_2.png',
    icon: Layers,
    color: 'purple'
  },
  {
    phase: '03',
    title: 'High-Precision Engineering',
    desc: 'Writing optimized codebases from scratch using modern modular frameworks and caching modules geared for massive scalability.',
    image: '/images/methodology_3.png',
    icon: Terminal,
    color: 'amber'
  },
  {
    phase: '04',
    title: 'System Stress & Load Testing',
    desc: 'Rigorous automated load testing, mimicking high concurrent traffic vectors to guarantee zero operational latency or database locks.',
    image: '/images/methodology_4.png',
    icon: ShieldCheck,
    color: 'rose'
  },
  {
    phase: '05',
    title: 'Secure CI/CD Deployment',
    desc: 'Orchestrating smooth cloud delivery cycles via automated pipelines and portable containerized packages with 99.99% uptime.',
    image: '/images/methodology_5.png',
    icon: CloudLightning,
    color: 'cyan'
  },
  {
    phase: '06',
    title: '24/7 Monitoring & Evolution',
    desc: 'Deployment is a beginning. We establish live performance tracking metrics, regular server audits, and ongoing feature rollouts.',
    image: '/images/methodology_6.png',
    icon: Activity,
    color: 'purple'
  }
];

const MethodologyPage = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [bgImage, setBgImage] = useState('');

  useEffect(() => {
    const parseHash = () => {
      const hashParts = window.location.hash.split('?');
      if (hashParts.length > 1) {
        const queryParams = new URLSearchParams(hashParts[1]);
        const selectedService = queryParams.get('service') || '';
        const SERVICE_BACKGROUNDS = {
          crm: '/images/crm.png',
          erp: '/images/erp.png',
          lms: '/images/lms.png',
          billing: '/images/billing software.png',
          webdev: '/images/website development.png',
          aichat: '/images/ai chatbot.png',
          custom: '/images/custom_software.png'
        };
        if (SERVICE_BACKGROUNDS[selectedService]) {
          setBgImage(SERVICE_BACKGROUNDS[selectedService]);
        } else {
          setBgImage('');
        }
      } else {
        setBgImage('');
      }
    };

    parseHash();
    window.addEventListener('hashchange', parseHash);
    return () => window.removeEventListener('hashchange', parseHash);
  }, []);

  const handleBack = () => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    window.location.hash = '#services';
  };

  // Generate smooth Archimedean spiral SVG path coordinates
  // Center is (500, 500) inside viewbox 0 0 1000 1000
  const generateSpiralPath = () => {
    let pathD = '';
    const points = 160;
    const center = 500;
    for (let i = 0; i <= points; i++) {
      const fraction = i / points;
      // 3.2 full spiral rotations
      const theta = fraction * Math.PI * 6.4 - Math.PI * 0.5;
      const r = 50 + fraction * 390; // spiral radius growing
      const x = center + r * Math.cos(theta);
      const y = center + r * Math.sin(theta);
      if (i === 0) {
        pathD += `M ${x} ${y}`;
      } else {
        pathD += ` L ${x} ${y}`;
      }
    }
    return pathD;
  };

  // Compute absolute coordinate offsets for 6 steps along the spiral
  const getStepCoord = (index) => {
    const total = METHODOLOGIES.length;
    // Distribute fractional placement along the spiral path
    const fraction = (index + 0.95) / (total + 0.5);
    const theta = fraction * Math.PI * 6.4 - Math.PI * 0.5;
    const r = 50 + fraction * 390;
    const x = r * Math.cos(theta);
    const y = r * Math.sin(theta);
    return { x, y };
  };

  return (
    <div className="subpage-wrapper" style={bgImage ? {
      backgroundImage: `linear-gradient(rgba(2, 2, 3, 0.94), rgba(2, 2, 3, 0.94)), url("${bgImage}")`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
      backgroundRepeat: 'no-repeat'
    } : {}}>
      {/* Background glowing effects */}
      <div className="ambient-glow glow-1"></div>
      <div className="ambient-glow glow-2"></div>

      <div className="container">
        
        {/* Header section */}
        <div className="subpage-header">
          <button className="back-link-btn" onClick={handleBack}>
            <ArrowLeft size={16} />
            <span>Back to Services</span>
          </button>
          
          <div className="section-badge animate-fade-in">
            <Settings size={14} className="spin-slow" />
            <span>METHODOLOGY</span>
          </div>
          <h1 className="subpage-title font-display animate-slide-up">
            Our Implementation <span className="cyber-text">Lifecycle</span>
          </h1>
          <p className="subpage-subtitle animate-slide-up-delay">
            A meticulous, high-fidelity system designed to ensure every software product we deliver is scalable, resilient, and transparently deployed.
          </p>
        </div>

        {/* ================= DESKTOP SPIRAL VIEW ================= */}
        <div className="spiral-outer-container">
          <div className="spiral-inner-wrapper">
            
            {/* Center glowing core anchor */}
            <div className="spiral-core-node">
              <div className="core-inner-glow"></div>
              <Sparkles size={28} className="icon-cyan core-icon" />
              <span className="core-label font-display">ZENELAIT CORE</span>
            </div>

            {/* Glowing SVG Spiral Background */}
            <svg className="spiral-svg-canvas" viewBox="0 0 1000 1000">
              <defs>
                <linearGradient id="spiral-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.1" />
                  <stop offset="50%" stopColor="var(--accent)" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="var(--primary)" stopOpacity="0.8" />
                </linearGradient>
                <linearGradient id="spiral-active-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="var(--primary)" />
                  <stop offset="100%" stopColor="var(--accent)" />
                </linearGradient>
                <filter id="neon-glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="6" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Base inert spiral path */}
              <path 
                className="spiral-path-inert" 
                d={generateSpiralPath()} 
                fill="none" 
                stroke="rgba(255, 255, 255, 0.04)" 
                strokeWidth="4" 
              />

              {/* Glowing active spiral segment on hover */}
              <path 
                className={`spiral-path-active ${hoveredIndex !== null ? 'active' : ''}`}
                d={generateSpiralPath()} 
                fill="none" 
                stroke="url(#spiral-gradient)" 
                strokeWidth="6" 
                filter="url(#neon-glow)"
              />
            </svg>

            {/* Positioned Methodology Phase Cards */}
            {METHODOLOGIES.map((method, index) => {
              const { x, y } = getStepCoord(index);
              const IconComp = method.icon;
              const isHovered = hoveredIndex === index;
              
              return (
                <div 
                  key={method.phase}
                  className={`spiral-card-wrapper wrapper-${method.color} ${isHovered ? 'hovered' : ''}`}
                  style={{
                    left: `calc(50% + ${x}px)`,
                    top: `calc(50% + ${y}px)`
                  }}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <div className="border-glow-wrapper rounded-card-wrapper">
                    <div className="glass-card spiral-phase-card">
                      
                      <div className="phase-image-box">
                        <img src={method.image} alt={method.title} className="phase-img" />
                        <div className="phase-image-overlay"></div>
                        <span className="phase-badge font-display">{method.phase}</span>
                      </div>

                      <div className="phase-meta-box">
                        <div className="phase-header-wrap">
                          <IconComp size={18} className={`phase-icon-${method.color}`} />
                          <h3 className="phase-title font-display">{method.title}</h3>
                        </div>
                        <p className="phase-desc">{method.desc}</p>
                      </div>

                    </div>
                  </div>
                  
                  {/* Point of connection on the spiral path */}
                  <div className="spiral-node-connector"></div>
                </div>
              );
            })}

          </div>
        </div>

        {/* ================= MOBILE/TABLET TIMELINE VIEW ================= */}
        <div className="mobile-timeline-container">
          <div className="serpentine-line"></div>
          
          {METHODOLOGIES.map((method, index) => {
            const IconComp = method.icon;
            return (
              <div 
                key={method.phase} 
                className={`mobile-timeline-card-wrap border-glow-wrapper wrap-${method.color}`}
              >
                <div className="glass-card mobile-timeline-card">
                  <div className="mobile-img-box">
                    <img src={method.image} alt={method.title} className="mobile-img" />
                    <div className="mobile-img-overlay"></div>
                    <span className="mobile-phase-num font-display">{method.phase}</span>
                  </div>
                  
                  <div className="mobile-details-box">
                    <div className="mobile-header-row">
                      <IconComp size={20} className={`phase-icon-${method.color}`} />
                      <h3 className="mobile-phase-title font-display">{method.title}</h3>
                    </div>
                    <p className="mobile-phase-desc">{method.desc}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      <style>{`
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
          width: 600px;
          height: 600px;
          border-radius: 50%;
          filter: blur(140px);
          opacity: 0.04;
          pointer-events: none;
          z-index: 0;
        }

        .glow-1 {
          top: 10%;
          left: -200px;
          background: var(--primary);
        }

        .glow-2 {
          bottom: 10%;
          right: -200px;
          background: var(--accent);
        }

        .subpage-header {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          margin-bottom: 3rem;
          gap: 1.25rem;
          position: relative;
          z-index: 10;
        }

        .back-link-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid var(--border-color);
          padding: 0.5rem 1.25rem;
          border-radius: 50px;
          color: var(--text-secondary);
          font-family: var(--font-display);
          font-size: 0.85rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
          margin-bottom: 1rem;
        }

        .back-link-btn:hover {
          color: var(--text-primary);
          border-color: rgba(255, 255, 255, 0.15);
          background: rgba(255, 255, 255, 0.05);
          transform: translateX(-3px);
        }

        .subpage-title {
          font-size: 3.5rem;
          font-weight: 800;
          letter-spacing: -0.02em;
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

        /* ================= DESKTOP SPIRAL STYLING ================= */
        .spiral-outer-container {
          position: relative;
          width: 1100px;
          height: 1100px;
          margin: 0 auto;
          z-index: 1;
        }

        .spiral-inner-wrapper {
          position: absolute;
          width: 1000px;
          height: 1000px;
          top: 50px;
          left: 50px;
        }

        .spiral-svg-canvas {
          position: absolute;
          width: 1000px;
          height: 1000px;
          top: 0;
          left: 0;
          z-index: 2;
          pointer-events: none;
        }

        .spiral-path-active {
          stroke-dasharray: 2000;
          stroke-dashoffset: 2000;
          transition: stroke-dashoffset 0.8s ease, stroke 0.4s ease;
          opacity: 0;
        }

        .spiral-path-active.active {
          stroke-dashoffset: 0;
          opacity: 1;
        }

        /* Central Core Node */
        .spiral-core-node {
          position: absolute;
          left: 500px;
          top: 500px;
          transform: translate(-50%, -50%);
          width: 140px;
          height: 140px;
          border-radius: 50%;
          background: rgba(7, 7, 9, 0.9);
          border: 2px dashed rgba(0, 242, 254, 0.25);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          z-index: 5;
          box-shadow: 0 0 40px rgba(0, 242, 254, 0.08);
        }

        .core-inner-glow {
          position: absolute;
          top: 15px;
          left: 15px;
          right: 15px;
          bottom: 15px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(0, 242, 254, 0.15) 0%, transparent 80%);
          animation: pulseCoreGlow 3s infinite ease-in-out;
        }

        .core-icon {
          animation: spinSlow 12s linear infinite;
          position: relative;
          z-index: 6;
        }

        .core-label {
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          color: var(--text-primary);
          position: relative;
          z-index: 6;
          text-align: center;
        }

        @keyframes pulseCoreGlow {
          0%, 100% { opacity: 0.5; transform: scale(0.95); }
          50% { opacity: 1; transform: scale(1.1); }
        }

        /* Absolutely positioned spiral card wrappers */
        .spiral-card-wrapper {
          position: absolute;
          transform: translate(-50%, -50%) scale(0.85);
          width: 320px;
          z-index: 10;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .spiral-card-wrapper.hovered {
          transform: translate(-50%, -50%) scale(1.02);
          z-index: 100;
        }

        .rounded-card-wrapper {
          border-radius: 16px;
          overflow: hidden;
        }

        .spiral-phase-card {
          padding: 0; /* Clear default padding */
          display: flex;
          flex-direction: column;
          height: 290px;
          background: rgba(13, 13, 17, 0.85);
          border-radius: 16px;
        }

        .phase-image-box {
          height: 120px;
          position: relative;
          overflow: hidden;
          width: 100%;
        }

        .phase-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .spiral-card-wrapper.hovered .phase-img {
          transform: scale(1.12);
        }

        .phase-image-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(to bottom, transparent 30%, rgba(13, 13, 17, 0.95) 100%);
        }

        .phase-badge {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: rgba(7, 7, 9, 0.8);
          border: 1px solid var(--border-color);
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.85rem;
          font-weight: 800;
          color: #ffffff;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
        }

        .phase-meta-box {
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          flex-grow: 1;
        }

        .phase-header-wrap {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .phase-title {
          font-size: 1.1rem;
          font-weight: 800;
          color: #ffffff;
          line-height: 1.2;
        }

        .phase-desc {
          font-size: 0.85rem;
          color: var(--text-secondary);
          line-height: 1.5;
        }

        .spiral-node-connector {
          position: absolute;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: var(--text-muted);
          border: 2px solid rgba(7, 7, 9, 0.9);
          bottom: -4px;
          left: 50%;
          transform: translateX(-50%);
          transition: all 0.3s ease;
          pointer-events: none;
        }

        .spiral-card-wrapper.hovered .spiral-node-connector {
          background-color: var(--primary);
          box-shadow: 0 0 12px var(--primary);
          transform: translateX(-50%) scale(1.4);
        }

        /* Color details */
        .phase-icon-cyan { color: var(--primary); }
        .phase-icon-purple { color: var(--accent); }
        .phase-icon-amber { color: #f59e0b; }
        .phase-icon-rose { color: #f43f5e; }

        .wrapper-cyan.hovered .rounded-card-wrapper { background: linear-gradient(135deg, var(--primary) 0%, rgba(255,255,255,0.02) 100%); }
        .wrapper-purple.hovered .rounded-card-wrapper { background: linear-gradient(135deg, var(--accent) 0%, rgba(255,255,255,0.02) 100%); }
        .wrapper-amber.hovered .rounded-card-wrapper { background: linear-gradient(135deg, #f59e0b 0%, rgba(255,255,255,0.02) 100%); }
        .wrapper-rose.hovered .rounded-card-wrapper { background: linear-gradient(135deg, #f43f5e 0%, rgba(255,255,255,0.02) 100%); }

        /* ================= MOBILE/TABLET TIMELINE STYLING ================= */
        .mobile-timeline-container {
          display: none;
          position: relative;
          padding: 2rem 0;
          flex-direction: column;
          gap: 2.5rem;
          z-index: 10;
        }

        /* Fallback elements display definitions */
        @media (max-width: 1150px) {
          .spiral-outer-container {
            display: none;
          }
          .mobile-timeline-container {
            display: flex;
          }
        }

        .serpentine-line {
          position: absolute;
          top: 0;
          bottom: 0;
          left: 20px;
          width: 2px;
          background: linear-gradient(to bottom, var(--primary), var(--accent), #f59e0b, #f43f5e, var(--primary));
          opacity: 0.15;
          z-index: 0;
        }

        .mobile-timeline-card-wrap {
          margin-left: 45px;
          position: relative;
        }

        .mobile-timeline-card-wrap::before {
          content: '';
          position: absolute;
          left: -33px;
          top: 30px;
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background-color: var(--primary);
          border: 3px solid var(--bg-darker);
          z-index: 10;
          box-shadow: 0 0 10px rgba(0, 242, 254, 0.4);
        }

        .mobile-timeline-card-wrap.wrap-purple::before { background-color: var(--accent); box-shadow: 0 0 10px rgba(170, 59, 255, 0.4); }
        .mobile-timeline-card-wrap.wrap-amber::before { background-color: #f59e0b; box-shadow: 0 0 10px rgba(245, 158, 11, 0.4); }
        .mobile-timeline-card-wrap.wrap-rose::before { background-color: #f43f5e; box-shadow: 0 0 10px rgba(244, 63, 94, 0.4); }

        .mobile-timeline-card {
          padding: 0;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          background: rgba(13, 13, 17, 0.6);
        }

        .mobile-img-box {
          height: 160px;
          position: relative;
          overflow: hidden;
          width: 100%;
        }

        .mobile-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .mobile-img-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(to bottom, transparent 30%, rgba(13, 13, 17, 0.95) 100%);
        }

        .mobile-phase-num {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: rgba(7, 7, 9, 0.85);
          border: 1px solid var(--border-color);
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.85rem;
          font-weight: 800;
          color: #ffffff;
        }

        .mobile-details-box {
          padding: 2rem;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .mobile-header-row {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .mobile-phase-title {
          font-size: 1.25rem;
          font-weight: 800;
          color: #ffffff;
        }

        .mobile-phase-desc {
          font-size: 0.9rem;
          color: var(--text-secondary);
          line-height: 1.55;
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
      `}</style>
    </div>
  );
};

export default MethodologyPage;
