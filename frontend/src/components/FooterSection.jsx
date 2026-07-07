import React from 'react';
import { ArrowRight, Compass, Code, Globe, MessageSquare, Terminal, MapPin, Phone, Mail } from 'lucide-react';

const LinkedinIcon = ({ size = 18 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const FacebookIcon = ({ size = 18 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const TwitterIcon = ({ size = 18 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

const InstagramIcon = ({ size = 18 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const WhatsappIcon = ({ size = 18 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
  </svg>
);



const FooterSection = () => {
  return (
    <>
      {/* 2. PREMIUM MINIMAL FOOTER */}
      <footer className="footer-wrapper">
        <div className="container">

          <div className="footer-top">
            {/* Logo and signature */}
            <div className="footer-brand">
              <a href="#" className="footer-logo">
                <img src="/logo1.png" alt="Zenelait Infotech" className="footer-logo-img" />
              </a>
              <p className="footer-tagline" style={{textAlign:'justify'}}>
                Zenelait Infotech is a leading product-based IT company in Anna Nagar, Chennai, specializing in ERP, LMS, CRM, and bespoke digital solutions for businesses of all sizes.
              </p>
            </div>

            {/* Links columns */}
            <div className="footer-links-cols">
              <div className="footer-col">
                <h4 className="footer-col-title font-display">Company</h4>
                <a href="#about-us" className="footer-link">About Us</a>
                <a href="#capabilities" className="footer-link">Capabilities</a>
                <a href="#projects" className="footer-link">Projects</a>
                <a href="#careers" className="footer-link">Careers</a>
                <a href="#about-us" className="footer-link">Our Team</a>
                <a href="#contact" className="footer-link">Contact Us</a>
              </div>
              <div className="footer-col">
                <h4 className="footer-col-title font-display">Services</h4>
                <a href="#services" className="footer-link">Customer Relationship Management (CRM)</a>
                <a href="#services" className="footer-link">Enterprise Resource Planning (ERP)</a>
                <a href="#services" className="footer-link">Learning Management System (LMS)</a>
                <a href="#services" className="footer-link">Billing Software</a>
                <a href="#services" className="footer-link">Website Development</a>
                <a href="#services" className="footer-link">AI Chatbox</a>
                <a href="#services" className="footer-link">Customized Software For All Fields</a>
              </div>
              <div className="footer-col">
                <h4 className="footer-col-title font-display">Reach Out</h4>
                <div className="footer-contact-item">
                  <MapPin size={14} className="contact-icon" />
                  <span>Y Block, Anna Nagar, Chennai</span>
                </div>
                <a href="tel:+919884264816" className="footer-contact-item footer-contact-link">
                  <Phone size={14} className="contact-icon" />
                  <span>+91 9884264816</span>
                </a>
                <a href="mailto:zenlaitinfotech@gmail.com" className="footer-contact-item footer-contact-link">
                  <Mail size={14} className="contact-icon" />
                  <span>zenlaitinfotech@gmail.com</span>
                </a>
              </div>
            </div>
        </div>
      </div>

      <div className="footer-bottom-bar">
          <div className="container">
            <div className="footer-bottom">
              <span className="footer-copyright">
                © {new Date().getFullYear()} Zenelait Infotech. All rights reserved.
              </span>

              {/* Social Icons */}
              <div className="footer-socials">
                <a href="https://www.linkedin.com/company/zenelatit-info-tech/?originalSubdomain=in" target="_blank" rel="noopener noreferrer" className="social-icon-btn" aria-label="LinkedIn">
                  <LinkedinIcon size={18} />
                </a>
                <a href="https://www.facebook.com/p/Zenelait-Info-Tech-61582899936644/" target="_blank" rel="noopener noreferrer" className="social-icon-btn" aria-label="Facebook">
                  <FacebookIcon size={18} />
                </a>
                <a href="https://www.instagram.com/zenelait_infotech/" target="_blank" rel="noopener noreferrer" className="social-icon-btn" aria-label="Instagram">
                  <InstagramIcon size={18} />
                </a>
                <a href="https://wa.me/919884264816" target="_blank" rel="noopener noreferrer" className="social-icon-btn" aria-label="WhatsApp">
                  <WhatsappIcon size={18} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <style>{`
        /* CTA Section styles */
        .cta-section {
          position: relative;
          padding: 8rem 0;
          background-color: var(--bg-darker);
          overflow: hidden;
          z-index: 15;
        }

        /* Giant glowing background circles */
        .cta-glow-1 {
          position: absolute;
          top: 30%;
          left: 10%;
          width: 500px;
          height: 500px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(0, 242, 254, 0.06) 0%, transparent 70%);
          filter: blur(80px);
          z-index: 1;
        }

        .cta-glow-2 {
          position: absolute;
          bottom: 10%;
          right: 5%;
          width: 600px;
          height: 600px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(170, 59, 255, 0.06) 0%, transparent 70%);
          filter: blur(90px);
          z-index: 1;
        }

        .cta-container {
          position: relative;
          z-index: 2;
          padding: 5rem;
          text-align: center;
          background: linear-gradient(135deg, rgba(13, 13, 17, 0.7) 0%, rgba(7, 7, 9, 0.9) 100%);
          border-color: rgba(255, 255, 255, 0.05);
          box-shadow: 0 40px 100px rgba(0, 0, 0, 0.8),
                      inset 0 0 40px rgba(0, 242, 254, 0.01);
          overflow: hidden;
        }

        .cta-container::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, rgba(0, 242, 254, 0.02) 0%, rgba(170, 59, 255, 0.02) 100%);
          z-index: 0;
          pointer-events: none;
        }

        .cta-content {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.5rem;
          max-width: 720px;
          margin: 0 auto;
        }

        .cta-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-family: var(--font-display);
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.15em;
          color: var(--accent);
          padding: 0.4rem 1rem;
          border-radius: 4px;
          background: rgba(170, 59, 255, 0.04);
          border: 1px solid rgba(170, 59, 255, 0.15);
        }

        .cta-title {
          font-size: 3.5rem;
          font-weight: 900;
          line-height: 1.1;
          letter-spacing: -0.02em;
        }

        .cta-desc {
          font-size: 1.1rem;
          line-height: 1.6;
          color: var(--text-secondary);
        }

        .cta-buttons {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          margin-top: 1rem;
        }

        /* Secondary bordered CTA button */
        .secondary-btn {
          font-family: var(--font-display);
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          font-size: 0.875rem;
          padding: 1rem 2.25rem;
          border-radius: 50px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          background: rgba(255, 255, 255, 0.02);
          color: var(--text-primary);
          cursor: pointer;
          transition: all 0.3s ease;
          text-decoration: none;
        }

        .secondary-btn:hover {
          border-color: rgba(255, 255, 255, 0.2);
          background: rgba(255, 255, 255, 0.05);
          transform: translateY(-2px);
        }

        /* Footer styling */
        .footer-wrapper {
          position: relative;
          background-color: rgba(143, 143, 142, 0.14);
          border-top: 1px solid rgba(255, 255, 255, 0.03);
          padding: 6rem 0 0 0;
          z-index: 15;
        }

        .footer-top {
          display: flex;
          justify-content: space-between;
          gap: 4rem;
          margin-bottom: 5rem;
        }

        .footer-brand {
          max-width: 320px;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .footer-logo {
          display: flex;
          align-items: center;
          text-decoration: none;
        }

        .footer-logo-img {
          height: 60px;
          width: 200px;
          display: block;
          border-radius: 4px;
          background-color: #ffffff;
          padding: 0.15rem 0.5rem;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
        }

        .footer-tagline {
          font-size: 1.2rem;
          color: var(--text-secondary);
          line-height: 1.6;
        }

        .footer-links-cols {
          display: flex;
          gap: 6rem;
        }

        .footer-col {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .footer-col-title {
          font-size: 0.85rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--text-primary);
          margin-bottom: 0.25rem;
        }

        .footer-link {
          font-size: 1.2rem;
          color: var(--text-muted);
          text-decoration: none;
          transition: all 0.3s ease;
        }

        .footer-link:hover {
          color: var(--primary);
          padding-left: 2px;
        }

        .footer-contact-item {
          display: flex;
          align-items: flex-start;
          gap: 0.6rem;
          font-size: 1.2rem;
          color: var(--text-muted);
          line-height: 1.4;
          text-align: left;
        }

        .footer-contact-link {
          text-decoration: none;
          transition: all 0.3s ease;
        }

        .footer-contact-link:hover {
          color: var(--primary);
          text-shadow: 0 0 5px rgba(0, 242, 254, 0.2);
          padding-left: 2px;
        }

        .contact-icon {
          color: var(--primary);
          flex-shrink: 0;
          margin-top: 0.15rem;
        }

        .footer-bottom-bar {
          background-color: #000000;
          border-top: 1px solid rgba(255, 255, 255, 0.03);
          padding: 2rem 0;
        }

        .footer-bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 2rem;
        }

        .footer-copyright {
          font-size: 0.8rem;
          color: var(--text-muted);
        }

        .footer-socials {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .social-icon-btn {
          width: 38px;
          height: 38px;
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

        .social-icon-btn:hover {
          background: rgba(0, 242, 254, 0.03);
          border-color: var(--primary);
          color: var(--primary);
          box-shadow: 0 0 10px rgba(0, 242, 254, 0.1);
          transform: translateY(-2px);
        }

        @media (max-width: 1024px) {
          .cta-container {
            padding: 3.5rem;
          }
          
          .cta-title {
            font-size: 2.75rem;
          }

          .footer-top {
            flex-direction: column;
            gap: 3rem;
          }

          .footer-links-cols {
            gap: 4rem;
          }
        }

        @media (max-width: 768px) {
          .cta-section {
            padding: 5rem 0;
          }

          .cta-container {
            padding: 2.5rem 1.5rem;
            border-radius: 16px;
          }

          .cta-title {
            font-size: 2rem;
          }

          .cta-desc {
            font-size: 0.95rem;
          }

          .cta-buttons {
            flex-direction: column;
            width: 100%;
            gap: 1rem;
          }

          .cta-buttons > * {
            width: 100%;
            justify-content: center;
          }

          .footer-links-cols {
            flex-direction: column;
            gap: 2rem;
          }

          .footer-bottom {
            flex-direction: column-reverse;
            text-align: center;
            gap: 1.5rem;
          }
        }
      `}</style>
    </>
  );
};

export default FooterSection;
