import React, { useState, useEffect } from 'react';
import { store } from '../utils/store';
import {
  ShieldAlert, LogIn, Cpu, Layers, Terminal, Compass,
  Trash2, Edit, Plus, LogOut, CheckCircle, MailOpen, User, Calendar, Info,
  Send, Users, FileText, Eye
} from 'lucide-react';

const AdminDashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [viewingResume, setViewingResume] = useState(null);
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [loginError, setLoginError] = useState('');

  // Navigation
  const [activeTab, setActiveTab] = useState('services'); // services, capabilities, projects, careers, about, inquiries

  // Forgot Password / SMS Recovery States
  const [forgotMode, setForgotMode] = useState(false);
  const [smsStep, setSmsStep] = useState(0); // 0 = idle, 1 = sending, 2 = waiting OTP, 3 = change password, 4 = success
  const [otpInput, setOtpInput] = useState('');
  const [smsStatus, setSmsStatus] = useState('');
  const [otpError, setOtpError] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [resetError, setResetError] = useState('');

  // CRUD Data State (Safeguarded against null/undefined LocalStorage returns)
  const [services, setServices] = useState(store.getServices() || []);
  const [capabilities, setCapabilities] = useState(store.getCapabilities() || []);
  const [projects, setProjects] = useState(store.getProjects() || []);
  const [careers, setCareers] = useState(store.getCareers() || []);
  const [inquiries, setInquiries] = useState(store.getInquiries() || []);
  const [testimonials, setTestimonials] = useState(store.getTestimonials() || []);
  const [about, setAbout] = useState(store.getAbout() || { mission: '', vision: '', history: '', team: [] });

  // About Page Forms State
  const [aboutTexts, setAboutTexts] = useState({ mission: '', vision: '', history: '' });

  // Sync About page fields
  useEffect(() => {
    const data = store.getAbout() || { mission: '', vision: '', history: '', team: [] };
    setAboutTexts({
      mission: data.mission || '',
      vision: data.vision || '',
      history: data.history || ''
    });
  }, [about]);

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [modalActiveTab, setModalActiveTab] = useState('services');
  const [editingId, setEditingId] = useState(null); // null if adding
  const [formData, setFormData] = useState({});

  // Real SMS recovery triggers
  const handleRequestSms = async (e) => {
    e.preventDefault();
    setSmsStep(1);
    setSmsStatus('Connecting to Zenelait SMS Gateway node...');
    setOtpError('');

    try {
      await store.requestPasswordResetOtp('+91 9884264816');
      setSmsStatus('SMS packet transmitted successfully! Recovery token dispatched.');
      setSmsStep(2);
    } catch (err) {
      setOtpError(err.message || 'Failed to dispatch recovery OTP SMS.');
      setSmsStep(0);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setOtpError('');
    try {
      await store.verifyPasswordResetOtp('+91 9884264816', otpInput);
      setSmsStep(3); // Enter New Password Form
    } catch (err) {
      setOtpError(err.message || 'Invalid cryptographic verification code. Denied.');
    }
  };

  const handleResetPasswordSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setResetError("Passwords do not match. Integrity check failed.");
      return;
    }
    if (newPassword.length < 4) {
      setResetError("Password is too short. Secure standard requires at least 4 characters.");
      return;
    }

    try {
      await store.resetPassword('+91 9884264816', otpInput, newPassword);
      setResetError('');
      setSmsStep(4); // Success step
    } catch (err) {
      setResetError(err.message || 'Failed to execute password reset routine.');
    }
  };

  const handleBackToLogin = () => {
    setForgotMode(false);
    setSmsStep(0);
    setOtpInput('');
    setSmsStatus('');
    setOtpError('');
    setNewPassword('');
    setConfirmPassword('');
    setResetError('');
  };

  const handleDownloadResumeFile = (inq) => {
    const resumeText = `======================================================
ZENELAIT INFOTECH - APPLICANT RESUME SYSTEM RECORD
======================================================
Applicant Name:  \${inq.name}
Email Address:   \${inq.email}
Applied For:     \${inq.message && inq.message.includes('[CAREER APPLICATION:') 
                    ? inq.message.split(']')[0].replace('[CAREER APPLICATION:', '').trim()
                    : 'Software Architect'}
Date Submitted:  \${new Date(inq.date).toLocaleString()}
Attached File:   \${inq.resume || 'resume.pdf'}
------------------------------------------------------
TECHNICAL SKILLS MATRIX:
- React.js & Three.js
- WebGL / GLSL / Shader Programming
- Node.js API Microservice Architecture
- Distributed Neural Compute Nodes
------------------------------------------------------
PROFESSIONAL EXPERIENCE:
- Senior Architecture Director (2024 - PRESENT)
  Engineered premium dynamic browser portals and managed low-latency web matrix nodes.
- WebGL Developer (2021 - 2024)
  Constructed 3D user interfaces with real-time mouse coordinate tilt vectors.
------------------------------------------------------
SYSTEM ARCHIVE DECRYPTION METRICS:
Token ID: \${inq.id}
Status: SECURED APPLICANT DATA NODE
======================================================`;

    const blob = new Blob([resumeText], { type: 'text/plain;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `Resume_\${inq.name.replace(/\\s+/g, '_')}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Sync data updates (Safeguarded against null/undefined LocalStorage returns)
  useEffect(() => {
    const syncData = () => {
      setServices(store.getServices() || []);
      setCapabilities(store.getCapabilities() || []);
      setProjects(store.getProjects() || []);
      setCareers(store.getCareers() || []);
      setInquiries(store.getInquiries() || []);
      setTestimonials(store.getTestimonials() || []);
      setAbout(store.getAbout() || { mission: '', vision: '', history: '', team: [] });
    };
    window.addEventListener('aura_store_update', syncData);
    return () => window.removeEventListener('aura_store_update', syncData);
  }, []);

  // 1. Handle dynamic Django Backend Login Authentication
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      await store.login(loginForm.username, loginForm.password);
      setIsAuthenticated(true);
      setLoginError('');
    } catch (err) {
      setLoginError(err.message || 'Invalid credentials. Authentication denied.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setLoginForm({ username: '', password: '' });
  };

  // 2. Open CRUD Modal helper
  const openModal = (item = null, isTeamMember = false) => {
    if (item) {
      // Editing
      setEditingId(item.id);
      setFormData({ ...item });
      if (isTeamMember) {
        setModalActiveTab('about_team');
      } else {
        setModalActiveTab(activeTab);
      }
    } else {
      // Adding new
      setEditingId(null);
      if (isTeamMember || activeTab === 'about') {
        setModalActiveTab('about_team');
        setFormData({ name: '', role: '', bio: '' });
      } else {
        setModalActiveTab(activeTab);
        if (activeTab === 'services') setFormData({ title: '', description: '', icon: 'Cpu' });
        else if (activeTab === 'capabilities') setFormData({ title: '', description: '', progress: 80 });
        else if (activeTab === 'projects') setFormData({ name: '', category: 'ERP', client: '', year: '2026', description: '' });
        else if (activeTab === 'careers') setFormData({ title: '', department: 'Engineering', salary: '', description: '', requirements: '' });
        else if (activeTab === 'testimonials') setFormData({ name: '', role: '', content: '', rating: 5, avatar: '' });
      }
    }
    setModalOpen(true);
  };

  // 3. Save CRUD item helper
  const handleSaveItem = (e) => {
    e.preventDefault();

    if (modalActiveTab === 'services') {
      if (editingId) store.updateService(editingId, formData);
      else store.addService(formData);
    } else if (modalActiveTab === 'capabilities') {
      if (editingId) store.updateCapability(editingId, formData);
      else store.addCapability(formData);
    } else if (modalActiveTab === 'projects') {
      if (editingId) store.updateProject(editingId, formData);
      else store.addProject(formData);
    } else if (modalActiveTab === 'careers') {
      if (editingId) store.updateCareer(editingId, formData);
      else store.addCareer(formData);
    } else if (modalActiveTab === 'about_team') {
      const currentAbout = store.getAbout();
      if (editingId) {
        const updatedTeam = currentAbout.team.map(m => m.id === editingId ? { ...m, ...formData } : m);
        store.updateAbout({ ...currentAbout, team: updatedTeam });
      } else {
        const newMember = { ...formData, id: `t_${Date.now()}` };
        currentAbout.team.push(newMember);
        store.updateAbout(currentAbout);
      }
    } else if (modalActiveTab === 'testimonials') {
      const initAv = formData.name ? formData.name.split(' ').map(n => n[0]).join('').toUpperCase() : 'C';
      const toSave = { ...formData, avatar: initAv };
      if (editingId) store.updateTestimonial(editingId, toSave);
      else store.addTestimonial(toSave);
    }

    setModalOpen(false);
    setEditingId(null);
    setFormData({});
  };

  // Save About page core texts
  const handleSaveAboutTexts = (e) => {
    e.preventDefault();
    const currentAbout = store.getAbout();
    const updatedAbout = {
      ...currentAbout,
      mission: aboutTexts.mission,
      vision: aboutTexts.vision,
      history: aboutTexts.history
    };
    store.updateAbout(updatedAbout);
    alert('About page core texts successfully committed to public store.');
  };

  // 4. Delete CRUD item helper
  const handleDeleteItem = (id, isTeamMember = false) => {
    if (!window.confirm('Confirm database erasure of this record packet?')) return;

    if (isTeamMember) {
      const currentAbout = store.getAbout();
      const updatedTeam = currentAbout.team.filter(m => m.id !== id);
      store.updateAbout({ ...currentAbout, team: updatedTeam });
    } else {
      if (activeTab === 'services') store.deleteService(id);
      else if (activeTab === 'capabilities') store.deleteCapability(id);
      else if (activeTab === 'projects') store.deleteProject(id);
      else if (activeTab === 'careers') store.deleteCareer(id);
      else if (activeTab === 'inquiries') store.deleteInquiry(id);
      else if (activeTab === 'testimonials') store.deleteTestimonial(id);
    }
  };

  // Render Login Card if unauthenticated
  if (!isAuthenticated) {
    return (
      <div className="login-screen-wrapper">
        {/* Decorative glows */}
        <div className="login-glow-1"></div>
        <div className="login-glow-2"></div>

        <div className="border-glow-wrapper login-card-wrap">
          <div className="glass-card login-card">

            {!forgotMode ? (
              <>
                <div className="login-header">
                  <ShieldAlert className="auth-shield-icon" size={48} />
                  <h2 className="login-title font-display">Login</h2>
                </div>

                <form onSubmit={handleLoginSubmit} className="login-form">
                  {loginError && <div className="error-alert">{loginError}</div>}

                  <div className="form-group">
                    <label>Admin Terminal Username</label>
                    <input
                      type="text"
                      required
                      placeholder="admin"
                      value={loginForm.username}
                      onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label>Encryption Password Key</label>
                    <input
                      type="password"
                      required
                      placeholder="••••••••"
                      value={loginForm.password}
                      onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                    />
                  </div>

                  <button type="submit" className="glow-btn login-btn">
                    <span>AUTHENTICATE OPERATOR</span>
                    <LogIn size={14} />
                  </button>
                </form>

                <div className="login-actions-row">
                  <span className="login-tip">Tip: admin / admin</span>
                  <button className="forgot-password-link" onClick={() => setForgotMode(true)}>
                    Forgot Password?
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="login-header">
                  <Terminal className="auth-shield-icon" size={48} />
                  <h2 className="login-title font-display">Recover Terminal</h2>
                </div>
                         {smsStep === 0 && (
                  <div className="recovery-form-wrapper">
                    <p className="recovery-instruction">
                      We will transmit a 6-digit cryptographic authentication token to your recovery number **+91 9884264816** via SMS gateway.
                    </p>
                    <button onClick={handleRequestSms} className="glow-btn login-btn">
                      <span>TRANSMIT RECOVERY SMS</span>
                      <Send size={14} />
                    </button>
                  </div>
                )}

                {smsStep === 1 && (
                  <div className="recovery-loader-wrapper">
                    <div className="holographic-spinner"></div>
                    <p className="loader-status-text animate-pulse">{smsStatus}</p>
                  </div>
                )}

                {smsStep === 2 && (
                  <form onSubmit={handleVerifyOtp} className="login-form">
                    <p className="recovery-status-ok">{smsStatus}</p>

                    {otpError && <div className="error-alert">{otpError}</div>}

                    <div className="form-group">
                      <label>Enter 6-Digit OTP Token</label>
                      <input
                        type="text"
                        required
                        maxLength={6}
                        placeholder="••••••"
                        value={otpInput}
                        onChange={(e) => setOtpInput(e.target.value)}
                      />
                    </div>

                    <button type="submit" className="glow-btn login-btn">
                      <span>VERIFY OTP PACKET</span>
                      <CheckCircle size={14} />
                    </button>
                  </form>
                )}

                {smsStep === 3 && (
                  <form onSubmit={handleResetPasswordSubmit} className="login-form">
                    <p className="recovery-status-ok">OTP Cryptographically Verified. Access Granted.</p>

                    {resetError && <div className="error-alert">{resetError}</div>}

                    <div className="form-group">
                      <label>New Encryption Password Key</label>
                      <input
                        type="password"
                        required
                        placeholder="••••••••"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                      />
                    </div>

                    <div className="form-group">
                      <label>Confirm Password Key</label>
                      <input
                        type="password"
                        required
                        placeholder="••••••••"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                    </div>

                    <button type="submit" className="glow-btn login-btn">
                      <span>COMMIT NEW CREDENTIALS</span>
                      <CheckCircle size={14} />
                    </button>
                  </form>
                )}

                {smsStep === 4 && (
                  <div className="recovery-success-wrapper">
                    <p className="success-instruction">
                      Credential override successful! Administrative encryption keys have been successfully remeasured. You may now return and authenticate with your new password.
                    </p>
                    <button onClick={handleBackToLogin} className="glow-btn login-btn">
                      <span>RETURN TO TERMINAL LOGIN</span>
                      <LogIn size={14} />
                    </button>
                  </div>
                )}

                {smsStep !== 1 && smsStep !== 4 && (
                  <button className="back-login-btn" onClick={handleBackToLogin}>
                    Back to Login
                  </button>
                )}
              </>
            )}

          </div>
        </div>

        <style>{`
          .login-screen-wrapper {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: #020203;
            z-index: 5000;
            display: flex;
            align-items: center;
            justify-content: center;
            overflow: hidden;
          }

          .login-glow-1 {
            position: absolute;
            top: -10%;
            left: -10%;
            width: 50vw;
            height: 50vw;
            background: radial-gradient(circle, rgba(0, 242, 254, 0.05) 0%, transparent 70%);
            filter: blur(80px);
          }

          .login-glow-2 {
            position: absolute;
            bottom: -10%;
            right: -10%;
            width: 50vw;
            height: 50vw;
            background: radial-gradient(circle, rgba(170, 59, 255, 0.05) 0%, transparent 70%);
            filter: blur(80px);
          }

          .login-card-wrap {
            width: calc(100% - 2rem);
            max-width: 440px;
          }

          .login-card {
            padding: 3rem;
            display: flex;
            flex-direction: column;
            gap: 2rem;
            text-align: center;
          }

          .login-header {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 0.75rem;
          }

          .auth-shield-icon {
            color: var(--primary);
            filter: drop-shadow(0 0 8px var(--primary));
          }

          .login-title {
            font-size: 1.35rem;
            letter-spacing: 0.15em;
            color: #ffffff;
          }

          .login-subtitle {
            font-size: 0.75rem;
            color: var(--text-muted);
            line-height: 1.4;
          }

          .login-form {
            display: flex;
            flex-direction: column;
            gap: 1.25rem;
            text-align: left;
          }

          .login-form .form-group {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
          }

          .login-form label {
            font-size: 0.75rem;
            font-weight: 600;
            color: var(--text-secondary);
            text-transform: uppercase;
            letter-spacing: 0.08em;
          }

          .login-form input {
            background: rgba(255, 255, 255, 0.02);
            border: 1px solid rgba(255, 255, 255, 0.08);
            color: #ffffff;
            padding: 0.85rem 1.15rem;
            border-radius: 8px;
            font-family: var(--font-sans);
            font-size: 0.95rem;
            outline: none;
            transition: all 0.3s ease;
          }

          .login-form input:focus {
            border-color: var(--primary);
            background: rgba(0, 242, 254, 0.02);
            box-shadow: 0 0 15px rgba(0, 242, 254, 0.15);
          }

          .error-alert {
            padding: 0.75rem 1rem;
            background: rgba(239, 68, 68, 0.1);
            border: 1px solid rgba(239, 68, 68, 0.3);
            border-radius: 8px;
            color: #ef4444;
            font-size: 0.8rem;
            font-weight: 500;
          }

          .login-btn {
          width: 100%;
          justify-content: center;
          gap: 0.5rem;
        }

        .login-tip {
          font-size: 0.75rem;
          color: var(--text-muted);
          letter-spacing: 0.02em;
        }

        /* Recovery Mode Additions */
        .login-actions-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          font-size: 0.75rem;
        }

        .forgot-password-link {
          background: none;
          border: none;
          color: var(--primary);
          cursor: pointer;
          text-decoration: underline;
          transition: color 0.3s ease;
        }

        .forgot-password-link:hover {
          color: #ffffff;
          text-shadow: 0 0 5px var(--primary);
        }

        .recovery-instruction {
          font-size: 0.85rem;
          line-height: 1.5;
          color: var(--text-secondary);
          margin-bottom: 1.5rem;
        }

        .recovery-loader-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.5rem;
          padding: 1rem 0;
        }

        .holographic-spinner {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          border: 2px solid rgba(0, 242, 254, 0.05);
          border-top-color: var(--primary);
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .loader-status-text {
          font-family: var(--font-display);
          font-size: 0.75rem;
          color: var(--text-muted);
          line-height: 1.5;
          text-align: center;
        }

        .simulation-banner {
          background: rgba(0, 242, 254, 0.05);
          border: 1px dashed rgba(0, 242, 254, 0.3);
          border-radius: 8px;
          padding: 1rem;
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
          text-align: center;
          margin-bottom: 1rem;
          box-shadow: 0 0 15px rgba(0, 242, 254, 0.1);
        }

        .simulation-banner span {
          font-size: 0.65rem;
          color: var(--primary);
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }

        .simulation-banner strong {
          font-size: 1.15rem;
          color: #ffffff;
          letter-spacing: 0.1em;
        }

        .recovery-status-ok {
          font-size: 0.75rem;
          color: #10b981;
          margin-bottom: 1rem;
          text-align: center;
        }

        .back-login-btn {
          background: none;
          border: none;
          color: var(--text-muted);
          cursor: pointer;
          font-size: 0.75rem;
          transition: color 0.3s ease;
          margin-top: 1rem;
        }

        .back-login-btn:hover {
          color: #ffffff;
        }

        .recovery-success-wrapper {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .success-instruction {
          font-size: 0.85rem;
          line-height: 1.5;
          color: var(--text-secondary);
        }

        .recovered-credentials-box {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 8px;
          padding: 1.25rem;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          text-align: left;
        }

        .recovered-credentials-box div {
          display: flex;
          justify-content: space-between;
          font-size: 0.85rem;
        }

        .recovered-credentials-box span {
          color: var(--text-muted);
        }

        .recovered-credentials-box strong {
          color: var(--primary);
          letter-spacing: 0.05em;
        }  
        `}</style>
      </div>
    );
  }

  // Active dataset variables for lists
  const activeDataset =
    activeTab === 'services' ? services :
      activeTab === 'capabilities' ? capabilities :
        activeTab === 'projects' ? projects :
          activeTab === 'careers' ? careers :
            activeTab === 'testimonials' ? testimonials : [];

  return (
    <div className="admin-console-wrapper">
      <div className="admin-console-container">

        {/* Sidebar Nav */}
        <aside className="admin-sidebar glass-panel">
          <div className="sidebar-brand">
            <img src="/logo1.png" alt="ZenelAit" className="admin-logo-img" />
          </div>

          <div className="sidebar-nav">
            <button
              className={`nav-tab-btn ${activeTab === 'services' ? 'active' : ''}`}
              onClick={() => setActiveTab('services')}
            >
              <Layers size={16} />
              <span>Core Services</span>
            </button>

            <button
              className={`nav-tab-btn ${activeTab === 'capabilities' ? 'active' : ''}`}
              onClick={() => setActiveTab('capabilities')}
            >
              <Terminal size={16} />
              <span>Capabilities</span>
            </button>

            <button
              className={`nav-tab-btn ${activeTab === 'projects' ? 'active' : ''}`}
              onClick={() => setActiveTab('projects')}
            >
              <Compass size={16} />
              <span>Projects Portfolio</span>
            </button>

            <button
              className={`nav-tab-btn ${activeTab === 'careers' ? 'active' : ''}`}
              onClick={() => setActiveTab('careers')}
            >
              <LogIn size={16} />
              <span>Careers Listings</span>
            </button>

            <button
              className={`nav-tab-btn ${activeTab === 'about' ? 'active' : ''}`}
              onClick={() => setActiveTab('about')}
            >
              <Info size={16} />
              <span>About Us Page</span>
            </button>

            <button
              className={`nav-tab-btn ${activeTab === 'testimonials' ? 'active' : ''}`}
              onClick={() => setActiveTab('testimonials')}
            >
              <Users size={16} />
              <span>Client Testimonials</span>
            </button>

            <button
              className={`nav-tab-btn inquiries-tab ${activeTab === 'inquiries' ? 'active' : ''}`}
              onClick={() => setActiveTab('inquiries')}
            >
              <MailOpen size={16} />
              <span>Inquiries Inbox</span>
              {inquiries.length > 0 && <span className="inbox-badge">{inquiries.length}</span>}
            </button>
          </div>

          <button className="sidebar-logout-btn" onClick={handleLogout}>
            <LogOut size={16} />
            <span>Close Console</span>
          </button>
        </aside>

        {/* Main Workspace Area */}
        <main className="admin-workspace">

          <div className="workspace-header">
            <div className="header-meta">
              <span className="workspace-badge">ADMIN CONTROL SHELL</span>
              <h1 className="workspace-title font-display">
                {activeTab === 'services' && 'Manage Public Services'}
                {activeTab === 'capabilities' && 'Manage Technical Capabilities'}
                {activeTab === 'projects' && 'Manage Showcase Projects'}
                {activeTab === 'careers' && 'Manage Career Opportunities'}
                {activeTab === 'about' && 'About Us Content Manager'}
                {activeTab === 'inquiries' && 'Inquiries Inbox Manager'}
                {activeTab === 'testimonials' && 'Client Reviews Manager'}
              </h1>
              <p className="workspace-desc text-muted">
                Create, read, update, and delete active frontend database records stored persistent in memory.
              </p>
            </div>

            {activeTab !== 'inquiries' && activeTab !== 'about' && (
              <button className="glow-btn add-new-btn" onClick={() => openModal()}>
                <Plus size={16} />
                <span>ADD NEW ENTRY</span>
              </button>
            )}
          </div>

          {/* Tab content listings */}
          <div className="workspace-body">
            {activeTab === 'about' ? (
              /* About Us page contents: Mission, Vision, History, Team CRUD */
              <div className="about-cms-container">
                <form onSubmit={handleSaveAboutTexts} className="glass-card about-texts-form">
                  <h3 className="form-section-title font-display">Edit Core Page Texts</h3>

                  <div className="form-group">
                    <label>Mission Statement</label>
                    <textarea
                      rows="3"
                      required
                      value={aboutTexts.mission}
                      onChange={(e) => setAboutTexts({ ...aboutTexts, mission: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label>Vision Statement</label>
                    <textarea
                      rows="3"
                      required
                      value={aboutTexts.vision}
                      onChange={(e) => setAboutTexts({ ...aboutTexts, vision: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label>History & Philosophy Context</label>
                    <textarea
                      rows="4"
                      required
                      value={aboutTexts.history}
                      onChange={(e) => setAboutTexts({ ...aboutTexts, history: e.target.value })}
                    />
                  </div>

                  <button type="submit" className="glow-btn save-texts-btn">
                    <span>Update Core Texts</span>
                    <CheckCircle size={14} />
                  </button>
                </form>

                <div className="about-team-cms">
                  <div className="team-header-row">
                    <h3 className="form-section-title font-display">Manage Team Architects</h3>
                    <button className="glow-btn add-member-btn" onClick={() => openModal(null, true)}>
                      <Plus size={14} />
                      <span>Add Member</span>
                    </button>
                  </div>

                  <div className="console-data-grid">
                    {about.team && about.team.map((member) => (
                      <div key={member.id} className="glass-card console-data-card">
                        <div className="card-top-id">
                          <span className="card-packet-id">ARCHITECT ID: {member.id}</span>
                          <span className="card-pill">{member.role}</span>
                        </div>

                        <h3 className="card-headline font-display">
                          {member.name}
                        </h3>

                        <p className="card-excerpt">
                          {member.bio}
                        </p>

                        <div className="card-crud-actions">
                          <button className="crud-action-btn edit-btn" onClick={() => openModal(member, true)}>
                            <Edit size={12} />
                            <span>Edit</span>
                          </button>
                          <button className="crud-action-btn delete-btn" onClick={() => handleDeleteItem(member.id, true)}>
                            <Trash2 size={12} />
                            <span>Delete</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : activeTab === 'inquiries' ? (
              /* Inquiries Inbox listing layout */
              <div className="inbox-inquiries-list">
                {inquiries.length === 0 ? (
                  <div className="empty-state glass-panel">
                    <CheckCircle size={32} className="empty-check" />
                    <h3>Your Inbox is Clean</h3>
                    <p>All client and applicant queries have been answered and resolved.</p>
                  </div>
                ) : (
                  inquiries.map((inq) => (
                    <div key={inq.id} className="glass-card inquiry-card">
                      <div className="inq-header">
                        <div className="inq-sender">
                          <User size={16} className="inq-icon" />
                          <div className="sender-meta">
                            <h4>{inq.name}</h4>
                            <a href={`mailto:${inq.email}`}>{inq.email}</a>
                          </div>
                        </div>
                        <div className="inq-date">
                          <Calendar size={12} />
                          <span>{new Date(inq.date).toLocaleString()}</span>
                        </div>
                      </div>
                      <p className="inq-msg">{inq.message}</p>

                      {inq.resume && (
                        <div className="inquiry-resume-box">
                          <div className="resume-info">
                            <FileText size={16} className="resume-icon" />
                            <span>{inq.resume}</span>
                          </div>
                          <button
                            className="glow-btn view-resume-btn"
                            onClick={() => setViewingResume(inq)}
                            type="button"
                          >
                            <Eye size={12} />
                            <span>VIEW APPLICANT RESUME</span>
                          </button>
                        </div>
                      )}

                      <button
                        className="inq-delete-btn"
                        onClick={() => handleDeleteItem(inq.id)}
                      >
                        <Trash2 size={14} />
                        <span>Resolve & Archive</span>
                      </button>
                    </div>
                  ))
                )}
              </div>
            ) : (
              /* Standard Data Grid listing layout */
              <div className="console-data-grid">
                {activeDataset.length === 0 ? (
                  <div className="empty-state glass-panel">
                    <p>No active record packets mapped in this tab matrix.</p>
                  </div>
                ) : (
                  activeDataset.map((item) => (
                    <div key={item.id} className="glass-card console-data-card">
                      <div className="card-top-id">
                        <span className="card-packet-id">PACKET ID: {item.id}</span>
                        {item.category && <span className="card-pill">{item.category}</span>}
                        {item.progress && <span className="card-pill">{item.progress}%</span>}
                        {item.rating && <span className="card-pill">RATING: {item.rating}★</span>}
                      </div>

                      <h3 className="card-headline font-display">
                        {item.title || item.name}
                      </h3>
                      {item.role && <p className="text-muted" style={{ fontSize: '0.85rem', marginTop: '-0.5rem', marginBottom: '0.5rem' }}>{item.role}</p>}

                      <p className="card-excerpt">
                        {item.content || item.description}
                      </p>

                      <div className="card-crud-actions">
                        <button className="crud-action-btn edit-btn" onClick={() => openModal(item)}>
                          <Edit size={12} />
                          <span>Edit</span>
                        </button>
                        <button className="crud-action-btn delete-btn" onClick={() => handleDeleteItem(item.id)}>
                          <Trash2 size={12} />
                          <span>Delete</span>
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

          </div>

        </main>

      </div>

      {/* CRUD Editor Form Modal Overlay */}
      {modalOpen && (
        <div className="modal-overlay">
          <div className="modal-content glass-panel">
            <div className="modal-header">
              <h3 className="modal-title font-display">
                {editingId ? 'Edit Record Packet' : 'Compile New Record'}
              </h3>
              <button className="modal-close-btn" onClick={() => setModalOpen(false)}>×</button>
            </div>

            <form onSubmit={handleSaveItem} className="modal-form">

              {/* Active forms adapting dynamically */}

              {/* SERVICES FIELDS */}
              {modalActiveTab === 'services' && (
                <>
                  <div className="form-group">
                    <label>Service Title</label>
                    <input
                      type="text"
                      required
                      value={formData.title || ''}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label>Lucide Icon Name Tag</label>
                    <input
                      type="text"
                      required
                      placeholder="Cpu, Layers, Terminal, Compass, Zap..."
                      value={formData.icon || ''}
                      onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label>Description Details</label>
                    <textarea
                      rows="4"
                      required
                      value={formData.description || ''}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    ></textarea>
                  </div>
                </>
              )}

              {/* CAPABILITIES FIELDS */}
              {modalActiveTab === 'capabilities' && (
                <>
                  <div className="form-group">
                    <label>Capability Label</label>
                    <input
                      type="text"
                      required
                      value={formData.title || ''}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label>Metrics Percentage Gauge (0-100)</label>
                    <input
                      type="number"
                      required
                      min="0"
                      max="100"
                      value={formData.progress || ''}
                      onChange={(e) => setFormData({ ...formData, progress: Number(e.target.value) })}
                    />
                  </div>
                  <div className="form-group">
                    <label>Metrics Scope Description</label>
                    <textarea
                      rows="3"
                      required
                      value={formData.description || ''}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    ></textarea>
                  </div>
                </>
              )}

              {/* PROJECTS FIELDS */}
              {modalActiveTab === 'projects' && (
                <>
                  <div className="form-group">
                    <label>Project Name</label>
                    <input
                      type="text"
                      required
                      value={formData.name || ''}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div className="form-row">
                    <div className="form-group half-width">
                      <label>Category Label</label>
                      <input
                        type="text"
                        required
                        placeholder="ERP, LMS, AI..."
                        value={formData.category || ''}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      />
                    </div>
                    <div className="form-group half-width">
                      <label>Deployment Year</label>
                      <input
                        type="text"
                        required
                        value={formData.year || ''}
                        onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Client Organization</label>
                    <input
                      type="text"
                      required
                      value={formData.client || ''}
                      onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label>Showcase Description</label>
                    <textarea
                      rows="3"
                      required
                      value={formData.description || ''}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    ></textarea>
                  </div>
                </>
              )}

              {/* CAREERS FIELDS */}
              {modalActiveTab === 'careers' && (
                <>
                  <div className="form-group">
                    <label>Job Title</label>
                    <input
                      type="text"
                      required
                      value={formData.title || ''}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    />
                  </div>
                  <div className="form-row">
                    <div className="form-group half-width">
                      <label>Corporate Department</label>
                      <input
                        type="text"
                        required
                        value={formData.department || ''}
                        onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                      />
                    </div>
                    <div className="form-group half-width">
                      <label>Salary Parameters</label>
                      <input
                        type="text"
                        required
                        placeholder="$140k - $170k"
                        value={formData.salary || ''}
                        onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Core Objectives Description</label>
                    <textarea
                      rows="3"
                      required
                      value={formData.description || ''}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    ></textarea>
                  </div>
                  <div className="form-group">
                    <label>Requirements Index</label>
                    <textarea
                      rows="3"
                      required
                      value={formData.requirements || ''}
                      onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                    ></textarea>
                  </div>
                </>
              )}

              {/* ABOUT TEAM FIELDS */}
              {modalActiveTab === 'about_team' && (
                <>
                  <div className="form-group">
                    <label>Architect Full Name</label>
                    <input
                      type="text"
                      required
                      value={formData.name || ''}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label>Role / Position Title</label>
                    <input
                      type="text"
                      required
                      placeholder="Lead Creative Architect"
                      value={formData.role || ''}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label>Biography Summary</label>
                    <textarea
                      rows="3"
                      required
                      value={formData.bio || ''}
                      onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    ></textarea>
                  </div>
                </>
              )}

              {/* TESTIMONIALS FIELDS */}
              {modalActiveTab === 'testimonials' && (
                <>
                  <div className="form-group">
                    <label>Client Name</label>
                    <input
                      type="text"
                      required
                      value={formData.name || ''}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label>Client Role / Position</label>
                    <input
                      type="text"
                      required
                      placeholder="CTO, TechCorp"
                      value={formData.role || ''}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label>Testimonial Review Content</label>
                    <textarea
                      rows="4"
                      required
                      value={formData.content || ''}
                      onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    ></textarea>
                  </div>
                  <div className="form-group">
                    <label>Rating (1-5 Stars)</label>
                    <input
                      type="number"
                      required
                      min="1"
                      max="5"
                      value={formData.rating || 5}
                      onChange={(e) => setFormData({ ...formData, rating: Number(e.target.value) })}
                    />
                  </div>
                </>
              )}

              <button type="submit" className="glow-btn submit-save-btn">
                <span>COMMIT CHANGES TO STORE</span>
                <LogIn size={14} />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Resume Viewer Modal */}
      {viewingResume && (
        <div className="modal-overlay resume-viewer-overlay">
          <div className="modal-content glass-panel resume-document-panel">
            <div className="modal-header">
              <div className="resume-modal-header-title">
                <FileText size={20} className="resume-header-icon" />
                <h3 className="modal-title font-display">APPLICANT RESUME ARCHIVE</h3>
              </div>
              <button className="modal-close-btn" onClick={() => setViewingResume(null)}>×</button>
            </div>

            <div className="resume-document-canvas">
              {/* Holographic Header */}
              <div className="resume-doc-header">
                <h2 className="doc-name font-display">{viewingResume.name}</h2>
                <div className="doc-meta-row">
                  <span>EMAIL: {viewingResume.email}</span>
                  <span>STATUS: SECURE DATA NODE</span>
                </div>
              </div>

              <div className="resume-divider"></div>

              {/* Resume simulated sections */}
              <div className="resume-section">
                <h4 className="resume-sec-title font-display">PROPOSED ROLE</h4>
                <p className="resume-sec-content">
                  {viewingResume.message && viewingResume.message.includes('[CAREER APPLICATION:')
                    ? viewingResume.message.split(']')[0].replace('[CAREER APPLICATION:', '').trim()
                    : 'System Architecture Engineer'}
                </p>
              </div>

              <div className="resume-section">
                <h4 className="resume-sec-title font-display">TECHNICAL MATRIX SKILLS</h4>
                <div className="resume-skills-tags">
                  <span className="skill-tag">React.js & Three.js</span>
                  <span className="skill-tag">WebGL / GLSL</span>
                  <span className="skill-tag">Node.js API Architecture</span>
                  <span className="skill-tag">Neural Computing</span>
                  <span className="skill-tag">Distributed Systems</span>
                </div>
              </div>

              <div className="resume-section">
                <h4 className="resume-sec-title font-display">PROFESSIONAL EXPERIENCE INDEX</h4>
                <div className="resume-exp-item">
                  <div className="exp-meta">
                    <strong>Senior Architecture Director</strong>
                    <span>2024 - PRESENT</span>
                  </div>
                  <p className="exp-desc">
                    Engineered premium dynamic browser portals and managed low-latency web matrix nodes.
                  </p>
                </div>
                <div className="resume-exp-item" style={{ marginTop: '0.75rem' }}>
                  <div className="exp-meta">
                    <strong>WebGL Developer</strong>
                    <span>2021 - 2024</span>
                  </div>
                  <p className="exp-desc">
                    Constructed 3D user interfaces with real-time mouse coordinate tilt vectors.
                  </p>
                </div>
              </div>

              <div className="resume-section">
                <h4 className="resume-sec-title font-display">ATTACHED DOCUMENTATION</h4>
                <div className="resume-file-attachment">
                  <FileText size={16} />
                  <span>{viewingResume.resume}</span>
                  <span className="attachment-size">(1.8 MB - Cryptographic Signed PDF)</span>
                </div>
              </div>
            </div>

            <div className="resume-viewer-actions">
              <button className="glow-btn download-resume-btn" onClick={() => handleDownloadResumeFile(viewingResume)}>
                <span>DOWNLOAD ORIGINAL TEXT RECORD</span>
              </button>
              <button className="back-login-btn" style={{ marginTop: 0 }} onClick={() => setViewingResume(null)}>
                Close Viewer
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .admin-console-wrapper {
          min-height: 100vh;
          background-color: #020203;
          padding: 3rem 1.5rem;
          color: #ffffff;
        }

        .inquiry-resume-box {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: rgba(0, 242, 254, 0.02);
          border: 1px solid rgba(0, 242, 254, 0.15);
          padding: 1rem;
          border-radius: 8px;
          margin-top: 0.5rem;
          margin-bottom: 0.5rem;
        }

        .resume-info {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.85rem;
          color: #ffffff;
        }

        .resume-icon {
          color: var(--primary);
        }

        .view-resume-btn {
          font-size: 0.75rem;
          padding: 0.4rem 0.8rem;
          gap: 0.35rem;
        }

        /* Resume Document Modal View */
        .resume-document-panel {
          max-width: 600px !important;
          background: rgba(10, 10, 15, 0.9) !important;
          border-color: rgba(0, 242, 254, 0.2) !important;
          box-shadow: 0 0 40px rgba(0, 242, 254, 0.1) !important;
        }

        .resume-modal-header-title {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .resume-header-icon {
          color: var(--primary);
          filter: drop-shadow(0 0 5px var(--primary));
        }

        .resume-document-canvas {
          background: rgba(255, 255, 255, 0.01);
          border: 1px solid rgba(255, 255, 255, 0.04);
          border-radius: 8px;
          padding: 2rem;
          margin-bottom: 1.5rem;
          text-align: left;
        }

        .resume-doc-header {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .doc-name {
          font-size: 1.8rem;
          font-weight: 800;
          color: #ffffff;
          letter-spacing: -0.01em;
        }

        .doc-meta-row {
          display: flex;
          justify-content: space-between;
          font-size: 0.75rem;
          color: var(--text-muted);
        }

        .resume-divider {
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(0, 242, 254, 0.3), transparent);
          margin: 1.5rem 0;
        }

        .resume-section {
          margin-bottom: 1.5rem;
        }

        .resume-sec-title {
          font-size: 0.8rem;
          font-weight: 700;
          color: var(--primary);
          letter-spacing: 0.08em;
          margin-bottom: 0.5rem;
          text-transform: uppercase;
        }

        .resume-sec-content {
          font-size: 0.95rem;
          color: #ffffff;
        }

        .resume-skills-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-top: 0.5rem;
        }

        .skill-tag {
          font-size: 0.75rem;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          padding: 0.25rem 0.65rem;
          border-radius: 4px;
          color: var(--text-secondary);
        }

        .resume-exp-item {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .exp-meta {
          display: flex;
          justify-content: space-between;
          font-size: 0.85rem;
        }

        .exp-meta strong {
          color: #ffffff;
        }

        .exp-meta span {
          color: var(--primary);
          font-weight: 600;
          font-size: 0.8rem;
        }

        .exp-desc {
          font-size: 0.85rem;
          color: var(--text-secondary);
          line-height: 1.4;
        }

        .resume-file-attachment {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(255, 255, 255, 0.02);
          border: 1px dashed rgba(255, 255, 255, 0.1);
          padding: 0.75rem 1rem;
          border-radius: 6px;
          font-size: 0.85rem;
          color: #ffffff;
        }

        .attachment-size {
          color: var(--text-muted);
          font-size: 0.75rem;
        }

        .resume-viewer-actions {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .download-resume-btn {
          padding: 0.7rem 1.5rem;
        }

        .admin-console-container {
          max-width: var(--max-width);
          margin: 0 auto;
          display: grid;
          grid-template-columns: 280px 1fr;
          gap: 2.5rem;
          align-items: start;
        }

        /* Sidebar Panels */
        .admin-sidebar {
          padding: 2rem;
          display: flex;
          flex-direction: column;
          gap: 2.5rem;
          position: sticky;
          top: 6rem;
          text-align: left;
        }

        .sidebar-brand {
          display: flex;
          align-items: center;
        }

        .admin-logo-img {
          height: 3.5rem;
          width: 12rem;
          display: block;
          border-radius: 4px;
          background-color: #ffffff;
          padding: 0.15rem 0.5rem;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
        }

        .sidebar-nav {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .nav-tab-btn {
          background: none;
          border: 1px solid transparent;
          color: var(--text-secondary);
          padding: 0.8rem 1.2rem;
          border-radius: 8px;
          display: flex;
          align-items: center;
          gap: 0.8rem;
          cursor: pointer;
          font-size: 0.85rem;
          font-weight: 500;
          transition: all 0.3s ease;
          width: 100%;
          text-align: left;
          position: relative;
        }

        .nav-tab-btn:hover {
          color: var(--text-primary);
          background: rgba(255,255,255,0.02);
        }

        .nav-tab-btn.active {
          background: rgba(0, 242, 254, 0.04);
          border-color: rgba(0, 242, 254, 0.15);
          color: var(--primary);
        }

        /* Inquiry special badge */
        .inquiries-tab {
          justify-content: space-between;
        }

        .inquiries-tab span {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .inbox-badge {
          background-color: var(--accent);
          color: #ffffff;
          padding: 0.15rem 0.5rem;
          border-radius: 50px;
          font-size: 0.7rem;
          font-weight: 700;
          box-shadow: 0 0 10px var(--accent-glow);
        }

        .sidebar-logout-btn {
          margin-top: 2rem;
          background: none;
          border: 1px solid rgba(239, 68, 68, 0.15);
          color: #ef4444;
          padding: 0.8rem 1.2rem;
          border-radius: 8px;
          display: flex;
          align-items: center;
          gap: 0.8rem;
          cursor: pointer;
          font-size: 0.85rem;
          font-weight: 600;
          transition: all 0.3s ease;
          width: 100%;
          text-align: left;
        }

        .sidebar-logout-btn:hover {
          background: rgba(239, 68, 68, 0.05);
          box-shadow: 0 0 10px rgba(239,68,68,0.1);
        }

        /* Workspace Panels */
        .admin-workspace {
          display: flex;
          flex-direction: column;
          gap: 2.5rem;
          text-align: left;
        }

        .workspace-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 2rem;
        }

        .header-meta {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          max-width: 600px;
        }

        .workspace-badge {
          display: inline-flex;
          align-self: flex-start;
          font-family: var(--font-display);
          font-size: 0.65rem;
          font-weight: 700;
          color: var(--primary);
          letter-spacing: 0.1em;
        }

        .workspace-title {
          font-size: 2.25rem;
          font-weight: 800;
          color: #ffffff;
        }

        .add-new-btn {
          gap: 0.5rem;
          flex-shrink: 0;
        }

        /* About Page CMS Layout Styling */
        .about-cms-container {
          display: flex;
          flex-direction: column;
          gap: 3rem;
          width: 100%;
        }

        .about-texts-form {
          padding: 2.5rem;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          text-align: left;
        }

        .form-section-title {
          font-size: 1.35rem;
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 0.5rem;
        }

        .save-texts-btn {
          align-self: flex-start;
          gap: 0.5rem;
          margin-top: 0.5rem;
        }

        .about-team-cms {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .team-header-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid rgba(255, 255, 255, 0.03);
          padding-bottom: 1rem;
        }

        .add-member-btn {
          font-size: 0.8rem;
          padding: 0.5rem 1rem;
          gap: 0.35rem;
        }

        /* Data grid styling */
        .console-data-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 2rem;
        }

        .console-data-card {
          padding: 2rem;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .card-top-id {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .card-packet-id {
          font-family: var(--font-display);
          font-size: 0.65rem;
          font-weight: 600;
          color: var(--text-muted);
          letter-spacing: 0.05em;
        }

        .card-pill {
          font-family: var(--font-display);
          font-size: 0.65rem;
          font-weight: 700;
          color: var(--primary);
          background: rgba(0,242,254,0.03);
          border: 1px solid rgba(0,242,254,0.15);
          padding: 0.2rem 0.6rem;
          border-radius: 4px;
          text-transform: uppercase;
        }

        .card-headline {
          font-size: 1.35rem;
          font-weight: 700;
          color: #ffffff;
        }

        .card-excerpt {
          font-size: 0.9rem;
          color: var(--text-secondary);
          line-height: 1.5;
        }

        .card-crud-actions {
          display: flex;
          align-items: center;
          gap: 1rem;
          border-top: 1px solid rgba(255, 255, 255, 0.03);
          padding-top: 1rem;
          margin-top: auto; /* push to bottom */
        }

        .crud-action-btn {
          background: none;
          border: none;
          display: flex;
          align-items: center;
          gap: 0.4rem;
          cursor: pointer;
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          padding: 0.4rem 0.8rem;
          border-radius: 4px;
          transition: all 0.3s ease;
        }

        .crud-action-btn.edit-btn {
          color: var(--text-secondary);
          border: 1px solid rgba(255, 255, 255, 0.06);
        }

        .crud-action-btn.edit-btn:hover {
          color: var(--primary);
          border-color: var(--primary);
          background: rgba(0,242,254,0.02);
        }

        .crud-action-btn.delete-btn {
          color: #ef4444;
          border: 1px solid rgba(239, 68, 68, 0.1);
        }

        .crud-action-btn.delete-btn:hover {
          background: rgba(239, 68, 68, 0.04);
          border-color: #ef4444;
          box-shadow: 0 0 10px rgba(239,68,68,0.1);
        }

        /* Inquiries Inbox Layout */
        .inbox-inquiries-list {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .inquiry-card {
          padding: 2.25rem;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .inq-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid rgba(255, 255, 255, 0.03);
          padding-bottom: 1rem;
        }

        .inq-sender {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .inq-icon {
          color: var(--primary);
        }

        .sender-meta {
          display: flex;
          flex-direction: column;
          gap: 0.15rem;
        }

        .sender-meta h4 {
          font-size: 1rem;
          color: #ffffff;
          font-weight: 600;
        }

        .sender-meta a {
          font-size: 0.8rem;
          color: var(--text-muted);
          text-decoration: none;
          transition: color 0.3s ease;
        }

        .sender-meta a:hover {
          color: var(--primary);
        }

        .inq-date {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.75rem;
          color: var(--text-muted);
        }

        .inq-msg {
          font-size: 0.95rem;
          line-height: 1.6;
          color: var(--text-secondary);
          white-space: pre-line; /* Support career application layouts */
        }

        .inq-delete-btn {
          align-self: flex-start;
          background: none;
          border: 1px solid rgba(16, 185, 129, 0.2);
          color: #10b981;
          padding: 0.5rem 1rem;
          border-radius: 6px;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          cursor: pointer;
          font-size: 0.8rem;
          font-weight: 600;
          transition: all 0.3s ease;
        }

        .inq-delete-btn:hover {
          background: rgba(16, 185, 129, 0.05);
          border-color: #10b981;
          box-shadow: 0 0 10px rgba(16,185,129,0.1);
        }

        /* Empty/Success state */
        .empty-state {
          padding: 5rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
          color: var(--text-secondary);
        }

        .empty-check {
          color: var(--primary);
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

        .submit-save-btn {
          width: 100%;
          justify-content: center;
          margin-top: 0.5rem;
          gap: 0.5rem;
        }

        @media (max-width: 1024px) {
          .admin-console-container {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
          
          .admin-sidebar {
            position: relative;
            top: 0;
          }
        }

        @media (max-width: 768px) {
          .admin-console-wrapper {
            padding: 2rem 1rem;
          }
          
          .workspace-header {
            flex-direction: column;
            gap: 1rem;
          }

          .add-new-btn {
            width: 100%;
            justify-content: center;
          }

          .console-data-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }

          .workspace-title {
            font-size: 1.8rem;
          }

          .modal-content {
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

export default AdminDashboard;
