import React, { useState, useEffect } from 'react';
import { Compass, Menu, X, ArrowRight } from 'lucide-react';

const LinkedinIcon = ({ size = 16 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const FacebookIcon = ({ size = 16 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const TwitterIcon = ({ size = 16 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

const InstagramIcon = ({ size = 16 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const WhatsappIcon = ({ size = 16 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
  </svg>
);


const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav className={`navbar-wrapper ${isScrolled ? 'scrolled' : ''}`}>
        <div className="navbar-container">
          {/* Logo */}
          <a href="#" className="navbar-logo logo-flipper-container">
            <div className="logo-flipper">
              <div className="logo-face logo-front">
                <img src="/logo.png" alt="Zenel Ait Info Tech" className="navbar-logo-img" />
              </div>
              <div className="logo-face logo-back">
                <img src="/logo1.png" alt="Zenel Ait Info Tech Hover" className="navbar-logo-img" />
              </div>
            </div>
          </a>

          {/* Nav Links - Desktop */}
          <div className="nav-links-desktop">
            <a href="#" className="nav-link">Home</a>
            <a href="#about-us" className="nav-link">About us</a>
            <a href="#services" className="nav-link">Services</a>
            <a href="#capabilities" className="nav-link">Capabilities</a>
            <a href="#projects" className="nav-link">Projects</a>
            <a href="#careers" className="nav-link">Careers</a>
            <a href="#contact" className="nav-link">Get in Touch</a>
          </div>

          {/* Action Button - Desktop */}
          <div className="nav-actions-desktop">
            <div className="nav-socials-desktop">
              <a href="https://www.linkedin.com/company/zenelatit-info-tech/?originalSubdomain=in" target="_blank" rel="noopener noreferrer" className="nav-social-btn" aria-label="LinkedIn">
                <LinkedinIcon size={15} />
              </a>
              <a href="https://www.facebook.com/p/Zenelait-Info-Tech-61582899936644/" target="_blank" rel="noopener noreferrer" className="nav-social-btn" aria-label="Facebook">
                <FacebookIcon size={15} />
              </a>
              {/* <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="nav-social-btn" aria-label="Twitter">
                <TwitterIcon size={15} />
              </a> */}
              <a href="https://www.instagram.com/zenelait_infotech/" target="_blank" rel="noopener noreferrer" className="nav-social-btn" aria-label="Instagram">
                <InstagramIcon size={15} />
              </a>
              <a href="https://wa.me/919884264816" target="_blank" rel="noopener noreferrer" className="nav-social-btn" aria-label="WhatsApp">
                <WhatsappIcon size={15} />
              </a>
            </div>
            <a href="#admin" className="glow-btn nav-btn admin-shortcut-btn">
              <span>ADMIN CORE</span>
              <ArrowRight size={14} className="btn-arrow" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Dropdown Panel */}
        <div className={`mobile-nav-panel ${mobileMenuOpen ? 'open' : ''}`}>
          <div className="mobile-links">
            <a href="#" className="mobile-link" onClick={() => setMobileMenuOpen(false)}>Home</a>
            <a href="#about-us" className="mobile-link" onClick={() => setMobileMenuOpen(false)}>About us</a>
            <a href="#services" className="mobile-link" onClick={() => setMobileMenuOpen(false)}>Services</a>
            <a href="#capabilities" className="mobile-link" onClick={() => setMobileMenuOpen(false)}>Capabilities</a>
            <a href="#projects" className="mobile-link" onClick={() => setMobileMenuOpen(false)}>Projects</a>
            <a href="#careers" className="mobile-link" onClick={() => setMobileMenuOpen(false)}>Careers</a>
            <a href="#contact" className="mobile-link" onClick={() => setMobileMenuOpen(false)}>Get in Touch</a>
            <a href="#admin" className="glow-btn mobile-action-btn" onClick={() => setMobileMenuOpen(false)}>
              <span>ADMIN PANEL</span>
              <ArrowRight size={14} />
            </a>
          </div>
        </div>
      </nav>

      <style>{`
        .navbar-wrapper {
          position: fixed;
          top: 1.5rem;
          left: 50%;
          transform: translateX(-50%);
          width: calc(100% - 3rem);
          max-width: var(--max-width);
          height: 4.5rem;
          border-radius: 100px;
          border: 1px solid rgba(255, 255, 255, 0.04);
          background: rgba(13, 13, 17, 0.35);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          z-index: 1000;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .navbar-wrapper.scrolled {
          top: 0.75rem;
          width: calc(100% - 1.5rem);
          background: rgba(7, 7, 9, 0.8);
          border-color: rgba(255, 255, 255, 0.08);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5), 
                      0 0 20px rgba(0, 242, 254, 0.02);
        }

        .navbar-container {
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 2rem;
        }

        /* Logo styling */
        .logo-flipper-container {
          perspective: 1000px;
          display: block;
          text-decoration: none;
        }

        .logo-flipper {
          width: 80px;
          height: 55px;
          position: relative;
          transform-style: preserve-3d;
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .logo-flipper-container:hover .logo-flipper {
          transform: rotateX(180deg);
        }

        .logo-face {
          position: absolute;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          top: 0;
          left: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 4px;
          overflow: hidden;
        }

        .logo-front {
          z-index: 2;
          transform: rotateX(0deg);
        }

        .logo-back {
          transform: rotateX(180deg);
          z-index: 1;
        }

        .navbar-logo-img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          display: block;
          border-radius: 4px;
          background-color: #ffffff;
          padding: 0.15rem 0.5rem;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
          transition: box-shadow 0.3s ease;
        }

        .logo-flipper-container:hover .navbar-logo-img {
          box-shadow: 0 0 15px rgba(255, 255, 255, 0.15), 0 8px 20px rgba(0, 0, 0, 0.35);
        }

        /* Nav links desktop */
        .nav-links-desktop {
          display: flex;
          align-items: center;
          gap: 2.5rem;
        }

        .nav-link {
          font-size: 0.875rem;
          font-weight: 500;
          color: var(--text-secondary);
          text-decoration: none;
          position: relative;
          transition: color 0.3s ease;
          letter-spacing: 0.02em;
        }

        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          width: 0;
          height: 1px;
          background: linear-gradient(90deg, var(--primary), var(--accent));
          transition: width 0.3s ease;
        }

        .nav-link:hover {
          color: var(--text-primary);
        }

        .nav-link:hover::after {
          width: 100%;
        }

        /* Action button */
        .nav-actions-desktop {
          display: flex;
          align-items: center;
          gap: 1.25rem;
        }

        .nav-socials-desktop {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          margin-right: 0.25rem;
        }

        .nav-social-btn {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.05);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-muted);
          transition: all 0.3s ease;
          text-decoration: none;
        }

        .nav-social-btn:hover {
          background: rgba(0, 242, 254, 0.04);
          border-color: var(--primary);
          color: var(--primary);
          box-shadow: 0 0 10px rgba(0, 242, 254, 0.15);
          transform: translateY(-2px);
        }

        .nav-btn {
          padding: 0.65rem 1.75rem;
          font-size: 0.75rem;
          gap: 0.5rem;
        }

        .btn-arrow {
          transition: transform 0.3s ease;
        }

        .glow-btn:hover .btn-arrow {
          transform: translateX(4px);
        }

        /* Mobile toggle button */
        .mobile-menu-toggle {
          display: none;
          background: none;
          border: none;
          color: var(--text-primary);
          cursor: pointer;
          padding: 0.5rem;
          transition: color 0.3s ease;
        }

        .mobile-menu-toggle:hover {
          color: var(--primary);
        }

        /* Mobile dropdown panel */
        .mobile-nav-panel {
          position: absolute;
          top: 5rem;
          left: 0;
          width: 100%;
          max-height: 0;
          overflow: hidden;
          background: rgba(7, 7, 9, 0.95);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-radius: 24px;
          border: 1px solid rgba(255, 255, 255, 0.05);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.6);
          transition: max-height 0.4s cubic-bezier(0.16, 1, 0.3, 1), 
                      opacity 0.3s ease;
          opacity: 0;
          pointer-events: none;
        }

        .mobile-nav-panel.open {
          max-height: 400px;
          opacity: 1;
          pointer-events: all;
          border-color: rgba(0, 242, 254, 0.1);
        }

        .mobile-links {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          padding: 2rem;
        }

        .mobile-link {
          font-size: 1rem;
          font-weight: 500;
          color: var(--text-secondary);
          text-decoration: none;
          transition: color 0.3s ease;
        }

        .mobile-link:hover {
          color: var(--primary);
          padding-left: 5px;
        }

        .mobile-action-btn {
          width: 100%;
          justify-content: center;
          margin-top: 0.5rem;
        }

        @media (max-width: 768px) {
          .navbar-wrapper {
            top: 1rem;
            width: calc(100% - 2rem);
            height: 4rem;
          }
          
          .navbar-wrapper.scrolled {
            top: 0.5rem;
            width: calc(100% - 1rem);
          }

          .navbar-container {
            padding: 0 1.25rem;
          }

          .nav-links-desktop,
          .nav-actions-desktop {
            display: none;
          }

          .mobile-menu-toggle {
            display: block;
          }
        }
      `}</style>
    </>
  );
};

export default Navbar;
