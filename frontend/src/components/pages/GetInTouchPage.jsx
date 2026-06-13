import React, { useState } from 'react';
import { store } from '../../utils/store';
import { Compass, Mail, Phone, MapPin, Send, CheckCircle2, Globe, Clock } from 'lucide-react';

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

const GetInTouchPage = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;

    setLoading(true);

    // Simulate cyber holographic transmission delay (800ms)
    setTimeout(() => {
      // Save directly into the persistent inquiries inbox store
      store.addInquiry({
        name: form.name,
        email: form.email,
        message: `[SUBJECT: ${form.subject || 'General Inquiry'}]\n\n${form.message}`
      });

      setLoading(false);
      setSuccess(true);
      setForm({ name: '', email: '', subject: '', message: '' });

      // Smooth reset success overlay after 3 seconds
      setTimeout(() => setSuccess(false), 3000);
    }, 800);
  };

  return (
    <div className="subpage-wrapper">
      <div className="container">

        {/* Header section */}
        <div className="subpage-header">
          <div className="section-badge">
            <Compass size={14} className="spin-slow" />
            <span>CONTACT US</span>
          </div>
          <h1 className="subpage-title font-display">Get in <span className="cyber-text">Touch</span></h1>
          <p className="subpage-subtitle">
            Initiate communication. Transmit your project requirements or request an architecture review.
          </p>
        </div>

        {/* Contact layout grid */}
        <div className="contact-grid">

          {/* Info Sidebar Column */}
          <div className="contact-info-col">

            <div className="glass-card contact-info-card">
              <h3 className="info-card-title font-display">Operations Headquarters</h3>

              <div className="info-list">

                <div className="info-item">
                  <div className="info-icon-box">
                    <MapPin size={18} />
                  </div>
                  <div className="info-text">
                    <span className="info-label">COORDINATES</span>
                    <a href="https://maps.app.goo.gl/stPexqWhWA6ai5iQ9" target="_blank" rel="noopener noreferrer" className="info-val info-link">Y Block, Anna Nagar, Chennai</a>
                  </div>
                </div>

                <div className="info-item">
                  <div className="info-icon-box">
                    <Mail size={18} />
                  </div>
                  <div className="info-text">
                    <span className="info-label">SECURE EMAIL</span>
                    <a href="mailto:zenlaitinfotech@gmail.com" className="info-val info-link">zenlaitinfotech@gmail.com</a>
                  </div>
                </div>

                <div className="info-item">
                  <div className="info-icon-box">
                    <Phone size={18} />
                  </div>
                  <div className="info-text">
                    <span className="info-label">TELEPHONY INTERACTION</span>
                    <a href="tel:+919884264816" className="info-val info-link">+91 9884264816</a>
                  </div>
                </div>

                <div className="info-item">
                  <div className="info-icon-box">
                    <Clock size={18} />
                  </div>
                  <div className="info-text">
                    <span className="info-label">OFFICE HOURS</span>
                    <span className="info-val">Mon - Fri: 9:00 AM - 6:30 PM</span>
                  </div>
                </div>

              </div>

              {/* Premium Social Navigation Deck */}
              <div className="social-navigation-deck">
                <span className="social-deck-label font-display">CONNECTED PROTOCOLS</span>
                <div className="social-deck-icons">
                  <a href="https://www.linkedin.com/company/zenelatit-info-tech/?originalSubdomain=in" target="_blank" rel="noopener noreferrer" className="social-deck-btn linkedin" title="LinkedIn Profile">
                    <LinkedinIcon size={18} />
                  </a>
                  <a href="https://www.instagram.com/zenelait_infotech/" target="_blank" rel="noopener noreferrer" className="social-deck-btn instagram" title="Instagram Profile">
                    <InstagramIcon size={18} />
                  </a>
                  <a href="https://www.facebook.com/p/Zenelait-Info-Tech-61582899936644/" target="_blank" rel="noopener noreferrer" className="social-deck-btn facebook" title="Facebook Page">
                    <FacebookIcon size={18} />
                  </a>
                  <a href="https://wa.me/919884264816" target="_blank" rel="noopener noreferrer" className="social-deck-btn whatsapp" title="WhatsApp Direct">
                    <WhatsappIcon size={18} />
                  </a>
                </div>
              </div>

            </div>

          </div>

          {/* Form Interactive Column */}
          <div className="contact-form-col">
            <div className="border-glow-wrapper form-card-wrap">
              <div className="glass-card form-card">

                {success ? (
                  <div className="form-success-overlay">
                    <CheckCircle2 size={64} className="success-icon" />
                    <h3 className="success-heading font-display">Message Securely Transmitted</h3>
                    <p className="success-text">
                      Your query packets have been written directly to our operational dashboard records. An architect will establish communication shortly.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="contact-form-inner">
                    <div className="form-row">
                      <div className="form-group half-width">
                        <label>Your Name</label>
                        <input
                          type="text"
                          required
                          placeholder="Helen Sterling"
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                        />
                      </div>

                      <div className="form-group half-width">
                        <label>Email Address</label>
                        <input
                          type="email"
                          required
                          placeholder="helen@sterling.com"
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label>Subject Index</label>
                      <input
                        type="text"
                        placeholder="Request for Custom ERP Matrix Mock-up"
                        value={form.subject}
                        onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      />
                    </div>

                    <div className="form-group">
                      <label>Message Content Packets</label>
                      <textarea
                        rows="5"
                        required
                        placeholder="Detail your parameters, required scaling capacities, or organizational bottlenecks..."
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      className={`glow-btn submit-btn ${loading ? 'loading' : ''}`}
                      disabled={loading}
                    >
                      {loading ? (
                        <span>TRANSMITTING PACKETS...</span>
                      ) : (
                        <>
                          <span>SEND SECURE TRANSMISSION</span>
                          <Send size={14} />
                        </>
                      )}
                    </button>
                  </form>
                )}

              </div>
            </div>
          </div>

        </div>

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
          margin-bottom: 5rem;
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

        /* Contact Grid Layout */
        .contact-grid {
          display: grid;
          grid-template-columns: 4fr 6fr;
          gap: 3rem;
          align-items: start;
        }

        .contact-info-card {
          padding: 3rem;
          display: flex;
          flex-direction: column;
          gap: 2rem;
          text-align: left;
        }

        .info-card-title {
          font-size: 1.5rem;
          color: #ffffff;
        }

        .info-list {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .info-item {
          display: flex;
          align-items: flex-start;
          gap: 1.25rem;
        }

        .info-icon-box {
          width: 42px;
          height: 42px;
          border-radius: 10px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.05);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--primary);
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
          flex-shrink: 0;
        }

        .info-text {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .info-label {
          font-size: 0.65rem;
          font-weight: 700;
          color: var(--text-muted);
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }

        .info-val {
          font-size: 0.95rem;
          color: var(--text-secondary);
          line-height: 1.4;
        }

        .info-link {
          text-decoration: none;
          transition: color 0.3s ease;
        }

        .info-link:hover {
          color: var(--primary);
          text-shadow: 0 0 5px rgba(0, 242, 254, 0.2);
        }

        /* Social Navigation Deck */
        .social-navigation-deck {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          margin-top: 1rem;
          padding-top: 1.5rem;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
        }

        .social-deck-label {
          font-size: 0.65rem;
          font-weight: 700;
          color: var(--text-muted);
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }

        .social-deck-icons {
          display: flex;
          gap: 1rem;
        }

        .social-deck-btn {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.08);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-muted);
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .social-deck-btn:hover {
          color: #ffffff;
          transform: translateY(-3px);
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.4);
        }

        .social-deck-btn.linkedin:hover {
          background: rgba(0, 119, 181, 0.15);
          border-color: rgba(0, 119, 181, 0.4);
          color: #0077b5;
          box-shadow: 0 0 15px rgba(0, 119, 181, 0.35);
        }

        .social-deck-btn.instagram:hover {
          background: rgba(225, 48, 108, 0.15);
          border-color: rgba(225, 48, 108, 0.4);
          color: #e1306c;
          box-shadow: 0 0 15px rgba(225, 48, 108, 0.35);
        }

        .social-deck-btn.facebook:hover {
          background: rgba(24, 119, 242, 0.15);
          border-color: rgba(24, 119, 242, 0.4);
          color: #1877f2;
          box-shadow: 0 0 15px rgba(24, 119, 242, 0.35);
        }

        .social-deck-btn.whatsapp:hover {
          background: rgba(37, 211, 102, 0.15);
          border-color: rgba(37, 211, 102, 0.4);
          color: #25d366;
          box-shadow: 0 0 15px rgba(37, 211, 102, 0.35);
        }

        /* Form Card */
        .form-card-wrap {
          border-radius: 20px;
        }

        .form-card {
          padding: 3rem;
          height: 100%;
        }

        .contact-form-inner {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          text-align: left;
        }

        .form-row {
          display: flex;
          gap: 1.5rem;
        }

        .half-width {
          width: 50%;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .form-group label {
          font-size: 0.8rem;
          font-weight: 600;
          color: #ffffff;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .form-group input,
        .form-group textarea {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.08);
          color: #ffffff;
          padding: 0.75rem 1rem;
          border-radius: 8px;
          font-family: var(--font-sans);
          font-size: 0.95rem;
          outline: none;
          transition: all 0.3s ease;
        }

        .form-group input:focus,
        .form-group textarea:focus {
          border-color: var(--primary);
          background: rgba(0, 242, 254, 0.02);
          box-shadow: 0 0 12px rgba(0, 242, 254, 0.1);
        }

        .submit-btn {
          width: 100%;
          justify-content: center;
          margin-top: 0.5rem;
          gap: 0.75rem;
        }

        .submit-btn.loading {
          opacity: 0.8;
          cursor: not-allowed;
        }

        /* Success screen overlay */
        .form-success-overlay {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 1.5rem;
          padding: 3rem 0;
        }

        .success-icon {
          color: var(--primary);
          filter: drop-shadow(0 0 15px rgba(0, 242, 254, 0.4));
          animation: successPulse 2s infinite alternate ease-in-out;
        }

        @keyframes successPulse {
          0% { transform: scale(1); filter: drop-shadow(0 0 10px rgba(0, 242, 254, 0.4)); }
          100% { transform: scale(1.05); filter: drop-shadow(0 0 20px rgba(0, 242, 254, 0.6)); }
        }

        .success-heading {
          font-size: 1.8rem;
          color: #ffffff;
        }

        .success-text {
          color: var(--text-secondary);
          line-height: 1.6;
          max-width: 420px;
        }

        @media (max-width: 1024px) {
          .contact-grid {
            grid-template-columns: 1fr;
            gap: 2.5rem;
          }
        }

        @media (max-width: 768px) {
          .subpage-wrapper {
            padding: 6rem 0;
          }
          .subpage-title {
            font-size: 2.5rem;
          }
          .contact-info-card,
          .form-card {
            padding: 2rem;
          }
          .form-row {
            flex-direction: column;
            gap: 1.5rem;
          }
          .half-width {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default GetInTouchPage;
