import React, { useEffect, useState } from 'react';
import { store } from '../../utils/store';
import { Compass, Calendar, Briefcase, ChevronRight } from 'lucide-react';
import gsap from 'gsap';

const ProjectsPage = () => {
  const [projects, setProjects] = useState(store.getProjects());
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    const syncData = () => setProjects(store.getProjects());
    window.addEventListener('aura_store_update', syncData);
    return () => window.removeEventListener('aura_store_update', syncData);
  }, []);

  // 3D Mouse Parallax Tilt Handlers
  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const percentX = (x / rect.width) - 0.5;
    const percentY = (y / rect.height) - 0.5;

    gsap.to(card, {
      rotateY: percentX * 22,
      rotateX: -percentY * 22,
      scale: 1.03,
      z: 15,
      boxShadow: '0 25px 50px rgba(0, 242, 254, 0.12), 0 15px 30px rgba(0, 0, 0, 0.6)',
      borderColor: 'rgba(0, 242, 254, 0.3)',
      duration: 0.3,
      ease: 'power2.out',
      overwrite: 'auto'
    });

    card.style.setProperty('--x', `${x}px`);
    card.style.setProperty('--y', `${y}px`);
  };

  const handleMouseLeave = (e) => {
    const card = e.currentTarget;
    gsap.to(card, {
      rotateY: 0,
      rotateX: 0,
      scale: 1,
      z: 0,
      boxShadow: 'none',
      borderColor: 'rgba(255, 255, 255, 0.05)',
      duration: 0.5,
      ease: 'power2.out',
      overwrite: 'auto'
    });
  };

  // Extract unique categories for filter tabs
  const categories = ['All', ...new Set(projects.map(p => p.category))];

  // Filter projects based on active tab
  const filteredProjects = activeCategory === 'All' 
    ? projects 
    : projects.filter(p => p.category === activeCategory);

  return (
    <div className="subpage-wrapper">
      <div className="container">
        
        {/* Header section */}
        <div className="subpage-header">
          <div className="section-badge animate-fade-in">
            <Compass size={14} className="spin-slow" />
            <span>PORTFOLIO</span>
          </div>
          <h1 className="subpage-title font-display animate-slide-up">
            Completed <span className="cyber-text">Works</span>
          </h1>
          <p className="subpage-subtitle animate-slide-up-delay">
            Explore our architectural showcase of enterprise software hubs, dynamic ledgers, and cognitive AI applications.
          </p>
        </div>

        {/* Categories Filter Tabs */}
        <div className="portfolio-filter-tabs animate-fade-in-delayed">
          {categories.map((cat, idx) => (
            <button
              key={idx}
              className={`filter-tab-btn font-display ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Listing Grid */}
        <div className="projects-portfolio-grid">
          {filteredProjects.map((project, idx) => (
            <div 
              key={project.id} 
              className="border-glow-wrapper project-showcase-wrap animate-slide-up-stagger"
              style={{ animationDelay: `${idx * 0.08}s` }}
            >
              <div 
                className={`glass-card project-showcase-card project-card-${project.category.toLowerCase().replace(/\s+/g, '')}`}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
              >
                
                <div className="project-card-header">
                  <span className="project-cat-badge">{project.category}</span>
                  <div className="project-year-meta">
                    <Calendar size={12} />
                    <span>{project.year}</span>
                  </div>
                </div>

                <div className="project-body">
                  <h3 className="project-showcase-title font-display">{project.name}</h3>
                  
                  <div className="project-client-box">
                    <Briefcase size={12} className="client-icon" />
                    <span className="client-label">CLIENT:</span>
                    <span className="client-name">{project.client}</span>
                  </div>
                  
                  <p className="project-showcase-desc">{project.description}</p>
                </div>

                <div className="project-showcase-footer">
                  <span className="view-case-txt font-display">LAUNCH CORE</span>
                  <ChevronRight size={14} className="footer-arrow" />
                </div>

              </div>
            </div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="empty-projects-state glass-panel">
            <p>No active projects found under the "{activeCategory}" category index.</p>
          </div>
        )}

      </div>

      <style>{`
        .subpage-wrapper {
          padding: 8rem 0;
          background-color: var(--bg-darker);
          min-height: 100vh;
        }

        .subpage-header {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          margin-bottom: 4rem;
          gap: 1.25rem;
        }

        .subpage-title {
          font-size: 3.5rem;
          font-weight: 900;
          letter-spacing: -0.02em;
        }

        .subpage-subtitle {
          max-width: 600px;
          font-size: 1.25rem;
          color: var(--text-secondary);
        }

        /* Portfolio Category Filters */
        .portfolio-filter-tabs {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          flex-wrap: wrap;
          margin-bottom: 4rem;
        }

        .filter-tab-btn {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.05);
          color: var(--text-secondary);
          padding: 0.6rem 1.5rem;
          border-radius: 50px;
          cursor: pointer;
          font-size: 0.85rem;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          transition: all 0.3s ease;
        }

        .filter-tab-btn:hover {
          border-color: rgba(255, 255, 255, 0.2);
          color: var(--text-primary);
          transform: translateY(-1px);
        }

        .filter-tab-btn.active {
          background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
          color: #000;
          font-weight: 700;
          border-color: transparent;
          box-shadow: 0 0 20px rgba(0, 242, 254, 0.3);
        }

        /* Projects Grid */
        .projects-portfolio-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2.5rem;
        }

        .project-showcase-wrap {
          height: 100%;
          perspective: 1000px;
          transform-style: preserve-3d;
        }

        .project-showcase-card {
          display: flex;
          flex-direction: column;
          gap: 1.75rem;
          padding: 2.5rem;
          height: 100%;
          text-align: left;
          transform-style: preserve-3d;
          background: rgba(13, 13, 17, 0.45);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 16px;
          position: relative;
          overflow: hidden;
          transition: border-color 0.3s ease;
          z-index: 1;
        }

        .project-showcase-card > * {
          transform: translateZ(20px);
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .project-showcase-card .project-cat-badge {
          transform: translateZ(30px);
        }

        /* 3D Depth Layering on Card Hover */
        .project-showcase-card:hover > * {
          transform: translateZ(25px);
        }
        .project-showcase-card:hover .project-cat-badge {
          transform: translateZ(35px);
        }

        /* Background 3D image reveal pseudo element */
        .project-showcase-card::before {
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

        /* Double pseudo element for dark readability mask and cursor reflection glow */
        .project-showcase-card::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: 
            radial-gradient(circle 200px at var(--x, 0px) var(--y, 0px), rgba(0, 242, 254, 0.08) 0%, transparent 80%),
            linear-gradient(135deg, rgba(8, 8, 12, 0.92) 0%, rgba(8, 8, 12, 0.97) 100%);
          opacity: 0;
          transition: opacity 0.5s ease;
          z-index: -1;
          pointer-events: none;
        }

        .project-showcase-card:hover::before {
          opacity: 1;
          transform: scale(1.08) translateZ(0); /* inner 3D parallax zoom */
        }

        .project-showcase-card:hover::after {
          opacity: 1;
        }

        /* Category Specific Background Mappings */
        .project-card-billing::before { background-image: url('/images/billing software.png'); }
        .project-card-lms::before { background-image: url('/images/lms.png'); }
        .project-card-webdev::before { background-image: url('/images/website development.png'); }
        .project-card-erp::before { background-image: url('/images/erp.png'); }

        .project-card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .project-cat-badge {
          font-family: var(--font-display);
          font-size: 0.7rem;
          font-weight: 700;
          color: var(--primary);
          letter-spacing: 0.1em;
          text-transform: uppercase;
          padding: 0.3rem 0.8rem;
          border-radius: 4px;
          background: rgba(0, 242, 254, 0.04);
          border: 1px solid rgba(0, 242, 254, 0.15);
        }

        .project-year-meta {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.75rem;
          color: var(--text-muted);
        }

        .project-body {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .project-showcase-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: #ffffff;
        }

        .project-client-box {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.75rem;
          color: var(--text-muted);
          margin-top: -0.25rem;
        }

        .client-icon {
          color: var(--primary);
        }

        .client-label {
          font-weight: 600;
          letter-spacing: 0.05em;
        }

        .client-name {
          color: var(--text-secondary);
        }

        .project-showcase-desc {
          font-size: 0.95rem;
          line-height: 1.6;
          color: var(--text-secondary);
        }

        /* Card Footer arrow action */
        .project-showcase-footer {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--text-primary);
          transition: all 0.3s ease;
          cursor: pointer;
          margin-top: auto; /* push to bottom */
          border-top: 1px solid rgba(255, 255, 255, 0.03);
          padding-top: 1.25rem;
        }

        .view-case-txt {
          font-size: 0.8rem;
          font-weight: 700;
          letter-spacing: 0.1em;
        }

        .footer-arrow {
          color: var(--primary);
          transition: transform 0.3s ease;
        }

        .project-showcase-card:hover .footer-arrow {
          transform: translateX(4px);
        }

        .project-showcase-card:hover .project-showcase-footer {
          color: var(--primary);
          text-shadow: 0 0 10px rgba(0, 242, 254, 0.2);
        }

        /* Empty state */
        .empty-projects-state {
          padding: 4rem;
          text-align: center;
          color: var(--text-secondary);
        }

        /* Highly refined fade slide keyframe structures */
        .animate-fade-in {
          animation: fadeIn 0.8s ease forwards;
        }

        .animate-fade-in-delayed {
          opacity: 0;
          animation: fadeIn 0.8s ease 0.15s forwards;
        }

        .animate-slide-up {
          animation: slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .animate-slide-up-delay {
          opacity: 0;
          animation: slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.12s forwards;
        }

        .animate-slide-up-stagger {
          opacity: 0;
          animation: slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 1024px) {
          .projects-portfolio-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 768px) {
          .subpage-wrapper {
            padding: 6rem 0;
          }
          .subpage-title {
            font-size: 2.5rem;
          }
          .portfolio-filter-tabs {
            gap: 0.5rem;
          }
          .filter-tab-btn {
            padding: 0.5rem 1.1rem;
            font-size: 0.75rem;
          }
          .projects-portfolio-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
          .project-showcase-card {
            padding: 2rem;
          }
        }
      `}</style>
    </div>
  );
};

export default ProjectsPage;
