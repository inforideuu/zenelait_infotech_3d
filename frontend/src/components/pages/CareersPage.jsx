import React, { useEffect, useState } from 'react';
import { store } from '../../utils/store';
import { Compass, Briefcase, MapPin, IndianRupee, Send, CheckCircle2, Upload } from 'lucide-react';

const CareersPage = () => {
  const [jobs, setJobs] = useState(store.getCareers());
  const [selectedJob, setSelectedJob] = useState(null);
  const [applyForm, setApplyForm] = useState({ name: '', email: '', resume: '', message: '' });
  const [resumeFileName, setResumeFileName] = useState('');
  const [applySuccess, setApplySuccess] = useState(false);

  useEffect(() => {
    const syncData = () => setJobs(store.getCareers());
    window.addEventListener('aura_store_update', syncData);
    return () => window.removeEventListener('aura_store_update', syncData);
  }, []);

  const handleApplySubmit = (e) => {
    e.preventDefault();
    if (!applyForm.name || !applyForm.email) return;

    store.addInquiry({
      name: applyForm.name,
      email: applyForm.email,
      resume: applyForm.resume,
      message: `[CAREER APPLICATION: ${selectedJob.title}]\nResume/Links: ${applyForm.resume}\nCover Note: ${applyForm.message}`
    });

    setApplySuccess(true);
    setTimeout(() => {
      setApplySuccess(false);
      setSelectedJob(null);
      setApplyForm({ name: '', email: '', resume: '', message: '' });
      setResumeFileName('');
    }, 2000);
  };

  return (
    <div className="subpage-wrapper">
      <div className="container">
        
        {/* Header section */}
        <div className="subpage-header">
          <div className="section-badge animate-fade-in">
            <Compass size={14} className="spin-slow" />
            <span>CAREERS</span>
          </div>
          <h1 className="subpage-title font-display animate-slide-up">Join the <span className="cyber-text">Matrix</span></h1>
          <p className="subpage-subtitle animate-slide-up-delay">
            We are actively looking for visionary engineers, technical architects, and graphics artists to shape dynamic computing portals.
          </p>
        </div>

        {/* Jobs List */}
        <div className="jobs-list-container">
          {jobs.map((job, idx) => (
            <div 
              key={job.id} 
              className="border-glow-wrapper job-item-wrap animate-slide-up-stagger"
              style={{ animationDelay: `${idx * 0.12}s`, opacity: 0 }}
            >
              <div className="glass-card job-item-card">
                
                <div className="job-meta-top">
                  <span className="job-dept-tag">{job.department}</span>
                  <div className="job-salary">
                    <IndianRupee size={14} className="salary-icon" />
                    <span>{job.salary ? job.salary.replace(/\$/g, '₹') : ''}</span>
                  </div>
                </div>

                <div className="job-item-body">
                  <h3 className="job-item-title font-display">{job.title}</h3>
                  <div className="job-location">
                    <MapPin size={12} />
                    <span>Remote / Global Infrastructure Nodes</span>
                  </div>
                  <p className="job-item-desc">{job.description}</p>
                  
                  <div className="job-reqs-box">
                    <h4 className="reqs-title font-display">Requirements Index:</h4>
                    <p className="reqs-desc">{job.requirements}</p>
                  </div>
                </div>

                <button 
                  className="glow-btn apply-btn"
                  onClick={() => setSelectedJob(job)}
                >
                  <span>INITIATE APPLICATION</span>
                  <Briefcase size={14} />
                </button>

              </div>
            </div>
          ))}
        </div>

        {/* Apply Modal */}
        {selectedJob && (
          <div className="modal-overlay">
            <div className="modal-content glass-panel">
              
              {applySuccess ? (
                <div className="modal-success-screen">
                  <CheckCircle2 size={64} className="success-check-icon" />
                  <h3 className="success-title font-display">Transmission Completed</h3>
                  <p className="success-desc">
                    Your application core parameters have been successfully routed to our technical leadership boards.
                  </p>
                </div>
              ) : (
                <>
                  <div className="modal-header">
                    <h3 className="modal-title font-display">Apply: {selectedJob.title}</h3>
                    <button className="modal-close-btn" onClick={() => setSelectedJob(null)}>×</button>
                  </div>
                  
                  <form onSubmit={handleApplySubmit} className="modal-form">
                    <div className="form-group">
                      <label>Full Name</label>
                      <input 
                        type="text" 
                        required 
                        placeholder="Dr. Sienna Vance"
                        value={applyForm.name}
                        onChange={(e) => setApplyForm({ ...applyForm, name: e.target.value })}
                      />
                    </div>

                    <div className="form-group">
                      <label>Email Address</label>
                      <input 
                        type="email" 
                        required 
                        placeholder="vance@aura.engineering"
                        value={applyForm.email}
                        onChange={(e) => setApplyForm({ ...applyForm, email: e.target.value })}
                      />
                    </div>

                    <div className="form-group">
                      <label>Upload Resume (PDF only)</label>
                      <div className="file-upload-wrapper">
                        <input 
                          type="file" 
                          required
                          accept=".pdf"
                          id="resume-upload"
                          className="file-upload-input"
                          onChange={(e) => {
                            const file = e.target.files[0];
                            if (file) {
                              setResumeFileName(file.name);
                              const reader = new FileReader();
                              reader.onload = () => {
                                setApplyForm({ ...applyForm, resume: reader.result });
                              };
                              reader.readAsDataURL(file);
                            }
                          }}
                        />
                        <div className="file-upload-label">
                          <Upload size={16} />
                          <span>{resumeFileName || 'Choose PDF File...'}</span>
                        </div>
                      </div>
                    </div>

                    <div className="form-group">
                      <label>Cover Matrix Brief (Optional)</label>
                      <textarea 
                        rows="3"
                        placeholder="Summarize your experience in high-performance structures..."
                        value={applyForm.message}
                        onChange={(e) => setApplyForm({ ...applyForm, message: e.target.value })}
                      ></textarea>
                    </div>

                    <button type="submit" className="glow-btn submit-apply-btn">
                      <span>TRANSMIT APPLICATION</span>
                      <Send size={14} />
                    </button>
                  </form>
                </>
              )}

            </div>
          </div>
        )}

      </div>

      <style>{`
        .subpage-wrapper {
          padding: 8rem 0;
          min-height: 100vh;
          position: relative;
          background: var(--bg-darker);
        }

        .subpage-header {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          margin-bottom: 5rem;
          gap: 1.25rem;
          position: relative;
          z-index: 2;
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

        /* Careers list styling */
        .jobs-list-container {
          display: flex;
          flex-direction: column;
          gap: 2rem;
          max-width: 900px;
          margin: 0 auto;
          position: relative;
          z-index: 2;
        }

        .job-item-wrap {
          border-radius: 16px;
          perspective: 1000px;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .job-item-wrap:hover {
          /* No TranslateY here to keep 3D rotation clean */
        }

        .job-item-card {
          padding: 3rem;
          display: flex;
          flex-direction: column;
          gap: 2rem;
          text-align: left;
          background: rgba(13, 13, 17, 0.45);
          backdrop-filter: blur(16px) saturate(180%);
          -webkit-backdrop-filter: blur(16px) saturate(180%);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 16px;
          transform-style: preserve-3d;
          transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), background 0.4s ease, border-color 0.4s ease;
        }

        .job-item-wrap:hover .job-item-card {
          transform: rotateX(6deg) rotateY(-4deg) translateZ(10px);
          background: rgba(13, 13, 17, 0.65);
          border-color: rgba(255, 255, 255, 0.12);
          box-shadow: -15px 25px 45px rgba(0, 0, 0, 0.65);
        }

        .job-meta-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .job-dept-tag {
          font-family: var(--font-display);
          font-size: 0.7rem;
          font-weight: 700;
          color: var(--accent);
          letter-spacing: 0.1em;
          text-transform: uppercase;
          padding: 0.35rem 0.9rem;
          border-radius: 4px;
          background: rgba(170, 59, 255, 0.04);
          border: 1px solid rgba(170, 59, 255, 0.15);
        }

        .job-salary {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          font-family: var(--font-display);
          font-weight: 700;
          font-size: 1.05rem;
          color: var(--primary);
          text-shadow: 0 0 10px rgba(0, 242, 254, 0.15);
        }

        .salary-icon {
          color: var(--primary);
        }

        .job-item-body {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .job-item-title {
          font-size: 1.8rem;
          font-weight: 800;
          color: #ffffff;
        }

        .job-location {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.8rem;
          color: var(--text-muted);
          margin-top: -0.5rem;
        }

        .job-item-desc {
          font-size: 1rem;
          line-height: 1.6;
          color: var(--text-secondary);
        }

        .job-reqs-box {
          margin-top: 0.5rem;
          padding: 1.5rem;
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.01);
          border: 1px solid rgba(255, 255, 255, 0.03);
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .reqs-title {
          font-size: 0.9rem;
          font-weight: 700;
          color: #ffffff;
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }

        .reqs-desc {
          font-size: 0.9rem;
          line-height: 1.5;
          color: var(--text-secondary);
        }

        .apply-btn {
          align-self: flex-start;
          gap: 0.75rem;
        }

        /* Modal styling */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(2, 2, 3, 0.75);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          z-index: 2000;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .modal-content {
          width: calc(100% - 2rem);
          max-width: 520px;
          padding: 3rem;
          box-shadow: 0 40px 80px rgba(0, 0, 0, 0.8);
          border-color: rgba(255, 255, 255, 0.08);
          position: relative;
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
        }

        .modal-title {
          font-size: 1.5rem;
          color: #ffffff;
        }

        .modal-close-btn {
          background: none;
          border: none;
          color: var(--text-muted);
          font-size: 2rem;
          cursor: pointer;
          line-height: 0.5;
          transition: color 0.3s ease;
        }

        .modal-close-btn:hover {
          color: var(--primary);
        }

        .modal-form {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          text-align: left;
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

        /* File Upload Custom Styling */
        .file-upload-wrapper {
          position: relative;
          width: 100%;
        }

        .file-upload-input {
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          opacity: 0;
          cursor: pointer;
          z-index: 10;
        }

        .file-upload-label {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          background: rgba(255, 255, 255, 0.02);
          border: 1px dashed rgba(255, 255, 255, 0.15);
          color: var(--text-secondary);
          padding: 0.75rem 1rem;
          border-radius: 8px;
          font-size: 0.95rem;
          transition: all 0.3s ease;
        }

        .file-upload-input:focus + .file-upload-label,
        .file-upload-wrapper:hover .file-upload-label {
          border-color: var(--primary);
          background: rgba(0, 242, 254, 0.02);
          color: #ffffff;
          box-shadow: 0 0 12px rgba(0, 242, 254, 0.1);
        }

        .submit-apply-btn {
          width: 100%;
          justify-content: center;
          margin-top: 0.5rem;
        }

        /* Success screen modal */
        .modal-success-screen {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 1.5rem;
          padding: 2rem 0;
        }

        .success-check-icon {
          color: var(--primary);
          filter: drop-shadow(0 0 15px rgba(0, 242, 254, 0.4));
        }

        .success-title {
          font-size: 1.8rem;
          color: #ffffff;
        }

        .success-desc {
          color: var(--text-secondary);
          line-height: 1.6;
        }

        /* Volumetric animations definitions */
        .animate-fade-in {
          animation: fadeIn 0.8s ease forwards;
        }

        .animate-slide-up {
          animation: slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .animate-slide-up-delay {
          opacity: 0;
          animation: slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.15s forwards;
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
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 768px) {
          .subpage-wrapper {
            padding: 6rem 0;
          }
          .subpage-title {
            font-size: 2.5rem;
          }
          .job-item-card {
            padding: 2rem;
            gap: 1.5rem;
          }
          .job-item-title {
            font-size: 1.4rem;
          }
          .modal-content {
            padding: 2rem;
          }
        }
      `}</style>
    </div>
  );
};

export default CareersPage;
