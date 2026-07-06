import React from 'react';
import {
  Compass,
  Users,
  Layers,
  Cpu,
  Laptop,
  Terminal,
  Sparkles,
  ArrowRight,
  ShieldAlert
} from 'lucide-react';

const SERVICE_ITEMS = [
  {
    id: 'crm',
    title: 'Customer Relationship Management (CRM)',
    description: 'Streamline customer communications, optimize sales pipelines, and coordinate client lifecycles within an interactive, high-performance command center.',
    icon: Users,
    glowColor: 'cyan',
    image: '/images/crm dash.jpg'
  },
  {
    id: 'erp',
    title: 'Enterprise Resource Planning (ERP)',
    description: 'Unify financial ledgers, automate complex global inventory flows, track personnel assets, and synchronize multi-branch operations securely.',
    icon: Layers,
    glowColor: 'purple',
    image: '/images/erp dash.jpg'
  },
  {
    id: 'lms',
    title: 'Learning Management System (LMS)',
    description: 'Deploy premium gamified digital classrooms, configure multi-course learning arcs, monitor student accomplishments, and issue cryptographically secure certifications.',
    icon: Compass,
    glowColor: 'amber',
    image: '/images/lms dash.png'
  },
  {
    id: 'billing',
    title: 'Smart Billing Software',
    description: 'Design custom recurring subscription tiers, automate localized tax filings, distribute professional automated invoices, and manage high-volume transactions.',
    icon: Terminal,
    glowColor: 'rose',
    image: '/images/billing dash.png'
  },
  {
    id: 'webdev',
    title: 'Website Development',
    description: 'Craft hyper-premium, high-fidelity corporate portals and landing frames with dynamic scroll animations, customized layout matrices, and optimized speeds.',
    icon: Laptop,
    glowColor: 'cyan',
    image: '/images/website dash.jpg'
  },
  {
    id: 'aichat',
    title: 'AI Chatbox Systems',
    description: 'Deploy advanced natural language processing chatbots. Drive automated support desks, parse user intents, and scale customer service loops 24/7.',
    icon: Cpu,
    glowColor: 'purple',
    image: '/images/ai chatbot dash.jpg'
  },
  {
    id: 'custom',
    title: 'Customized Software For All Fields',
    description: 'Bespoke high-concurrency systems engineered entirely from scratch to solve your complex operational challenges and scale dynamically with massive traffic.',
    icon: Sparkles,
    glowColor: 'amber',
    image: '/images/customize dash.png'
  }
];

const ServicesPage = () => {
  const handleLearnMore = (id) => {
    // Scroll smoothly to top
    window.scrollTo({ top: 0, behavior: 'instant' });
    // Change routing hash
    window.location.hash = `#methodology?service=${id}`;
  };

  return (
    <div className="subpage-wrapper">
      {/* Background ambient orbs */}
      <div className="ambient-glow glow-1"></div>
      <div className="ambient-glow glow-2"></div>

      <div className="container">

        {/* Header section */}
        <div className="subpage-header">
          <div className="section-badge animate-fade-in">
            <Compass size={14} className="spin-slow" />
            <span style={{ fontSize: '1.25rem' }}>CORE CAPABILITIES</span>
          </div>
          <h1 className="subpage-title font-display animate-slide-up">
            Our Premium <span className="cyber-text">Services</span>
          </h1>
          <p className="subpage-subtitle animate-slide-up-delay">
            Engineering robust custom codebases, high-concurrency databases, and gorgeous responsive interfaces built exclusively for your business growth.
          </p>
        </div>

        {/* Services Zig-Zag Showcasing */}
        <div className="services-zigzag-container">
          {SERVICE_ITEMS.map((service, i) => {
            const IconComponent = service.icon;
            const isEven = i % 2 === 0;
            return (
              <div
                key={service.id}
                className={`service-zigzag-row ${isEven ? 'row-normal' : 'row-reverse'}`}
              >

                {/* 1. Visual Image Block (representing "img") */}
                <div className="service-visual-block">
                  <img src={service.image} alt={service.title} className="service-product-img" />
                </div>

                {/* 2. Text Content Block (representing "content") */}
                <div className="service-content-block">
                  <div className="section-badge inline-badge">
                    <IconComponent size={14} className={`icon-${service.glowColor}`} />
                    <span>SERVICE INDEX 0{i + 1}</span>
                  </div>
                  <h2 className="service-zigzag-title font-display">{service.title}</h2>
                  <p className="service-zigzag-desc">{service.description}</p>

                  <button
                    className={`service-learn-btn btn-${service.glowColor}`}
                    onClick={() => handleLearnMore(service.id)}
                  >
                    <span>Explore Methodology</span>
                    <ArrowRight size={14} className="btn-arrow-icon" />
                  </button>
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
          top: -100px;
          left: -200px;
          background: var(--primary);
        }

        .glow-2 {
          bottom: 100px;
          right: -200px;
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

        /* Services Zig-Zag 3D Showcasing */
        .services-zigzag-container {
          display: flex;
          flex-direction: column;
          gap: 6rem;
          position: relative;
          z-index: 1;
          margin-bottom: 6rem;
        }

        .service-zigzag-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
          transition: all 0.4s ease;
        }

        .service-zigzag-row.row-reverse {
          direction: rtl; /* reverse column layout in browser */
        }

        .service-zigzag-row.row-reverse .service-content-block {
          direction: ltr; /* keep text aligned left */
          text-align: left;
        }

        .service-zigzag-row.row-reverse .service-visual-block {
          direction: ltr;
        }

        .service-visual-block {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
        }

        .service-product-img {
          width: 100%;
          max-width: 100%;
          height: auto;
          object-fit: contain;
          border-radius: 12px;
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.4);
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .service-zigzag-row:hover .service-product-img {
          transform: scale(1.03);
        }

        .service-content-block {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 1.25rem;
          width: 100%;
        }

        .service-zigzag-title {
          font-size: 2.25rem;
          font-weight: 900;
          color: #ffffff;
          line-height: 1.2;
          transition: text-shadow 0.4s ease;
        }

        .service-zigzag-desc {
          font-size: 1.2rem;
          line-height: 1.65;
          color: var(--text-secondary);
        }

        /* Action Buttons */
        .service-learn-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--border-color);
          padding: 0.6rem 1.25rem;
          border-radius: 8px;
          color: var(--text-primary);
          font-family: var(--font-display);
          font-size: 0.85rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          width: fit-content;
          margin-top: 0.5rem;
        }

        .btn-arrow-icon {
          transition: transform 0.3s ease;
        }

        .service-learn-btn:hover .btn-arrow-icon {
          transform: translateX(4px);
        }

        .service-learn-btn.btn-cyan:hover { background: rgba(0, 242, 254, 0.08); border-color: var(--primary); color: var(--primary); box-shadow: 0 0 15px rgba(0, 242, 254, 0.15); }
        .service-learn-btn.btn-purple:hover { background: rgba(170, 59, 255, 0.08); border-color: var(--accent); color: var(--accent); box-shadow: 0 0 15px rgba(170, 59, 255, 0.15); }
        .service-learn-btn.btn-amber:hover { background: rgba(245, 158, 11, 0.08); border-color: #f59e0b; color: #f59e0b; box-shadow: 0 0 15px rgba(245, 158, 11, 0.15); }
        .service-learn-btn.btn-rose:hover { background: rgba(244, 63, 94, 0.08); border-color: #f43f5e; color: #f43f5e; box-shadow: 0 0 15px rgba(244, 63, 94, 0.15); }

        .service-show-card:hover .service-accent-border {
          width: 100%;
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

        /* Responsive overrides */
        @media (max-width: 1024px) {
          .services-zigzag-container {
            gap: 4rem;
          }
          .service-zigzag-row {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
          .service-zigzag-row.row-reverse {
            direction: ltr;
          }
          .service-visual-block {
            height: 340px;
          }
        }

        @media (max-width: 768px) {
          .subpage-wrapper {
            padding: 6rem 0;
          }
          .subpage-title {
            font-size: 2.5rem;
          }
          .service-visual-block {
            height: 260px;
          }
          .service-zigzag-title {
            font-size: 1.75rem;
          }
          .service-zigzag-desc {
            font-size: 0.95rem;
          }
        }
      `}</style>
    </div>
  );
};

export default ServicesPage;
