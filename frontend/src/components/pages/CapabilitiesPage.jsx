import React, { useState, useEffect, useRef } from 'react';
import {
  Cloud,
  Lock,
  Target,
  Fingerprint,
  FolderLock,
  UserCheck,
  KeyRound,
  Shield,
  Compass,
  ArrowRight,
  Sparkles,
  Zap,
  Cpu,
  RefreshCw,
  Play,
  Pause,
  AlignCenter,
  Users,
  Briefcase,
  UserPlus,
  Wrench,
  Code,
  Gauge,
  Activity
} from 'lucide-react';

const CAPABILITIES_DATA = [
  {
    id: 'sso',
    title: 'Adaptive single sign-on',
    centerTitle: 'Adaptive Single Sign-On',
    description: 'Authenticate users dynamically based on context, device health, and network location. Ensure secure, friction-free access to enterprise resources.',
    longDescription: 'Our Adaptive Single Sign-On (SSO) leverages intelligent risk scoring to prompt for step-up authentication only when anomalies are detected. It integrates seamlessly with your active directories, cloud identity systems, and legacy infrastructure to provide a unified portal for all corporate tools.',
    stats: [
      { label: 'SAML & OIDC Integration', value: 'Instant' },
      { label: 'Risk Assessment Speed', value: '< 15ms' }
    ],
    themeColor: 'rgba(99, 102, 241, 0.95)', // Indigo
    bgColor: '#eef2ff',
    iconColor: '#4f46e5',
    icon: (props) => (
      <div className="icon-stack" style={{ position: 'relative', width: 28, height: 28 }}>
        <Cloud size={24} {...props} style={{ color: '#4f46e5', position: 'absolute', top: 0, left: 0 }} />
        <Lock size={12} style={{ color: '#4f46e5', position: 'absolute', bottom: 2, right: 2, backgroundColor: '#eef2ff', borderRadius: '50%', padding: '1px' }} />
      </div>
    )
  },
  {
    id: 'endpoint',
    title: 'Endpoint management',
    centerTitle: 'Endpoint Management',
    description: 'Deploy, monitor, and secure corporate desktops, servers, and visual systems. Maintain strict patch compliance and device tracking across your global workspace.',
    longDescription: 'Ensure absolute control over your fleet. Our Endpoint Management suite provides deep telemetry, automated vulnerability patching, remote terminal execution, and hardware inventory tracking. It guarantees every connected device adheres to security baselines regardless of location.',
    stats: [
      { label: 'Compliance Tracking', value: 'Real-time' },
      { label: 'Automated Patching', value: '1-Click' }
    ],
    themeColor: 'rgba(239, 68, 68, 0.95)', // Peach / Soft Red
    bgColor: '#fff5f5',
    iconColor: '#e53e3e',
    icon: (props) => <Target size={24} {...props} style={{ color: '#e53e3e' }} />
  },
  {
    id: 'mfa',
    title: 'Multi-factor authentication',
    centerTitle: 'Multi-Factor Authentication',
    description: 'Enforce ultra-secure multi-layered authentication policies with biometrics, hardware keys, and time-based passcodes. Prevent unauthorized account takeovers.',
    longDescription: 'Go beyond passwords. Deploy biometric verification (TouchID/FaceID), FIDO2/WebAuthn hardware key support, and cryptographic push notifications. Our MFA pipeline shields accounts from 99.9% of credential-stuffing and phishing campaigns.',
    stats: [
      { label: 'Phishing Resistance', value: 'FIDO2 Level 3' },
      { label: 'Failed Login Block Rate', value: '99.9%' }
    ],
    themeColor: 'rgba(245, 158, 11, 0.95)', // Apricot / Orange
    bgColor: '#fffbeb',
    iconColor: '#d97706',
    icon: (props) => <Fingerprint size={24} {...props} style={{ color: '#d97706' }} />
  },
  {
    id: 'mdm',
    title: 'Mobile device management',
    centerTitle: 'Mobile Device Management',
    description: 'Configure secure sandboxes, enforce remote-wipe policies, and distribute private enterprise apps seamlessly across iOS, Android, and corporate mobile fleets.',
    longDescription: 'Unify mobile policy administration across all employee devices. Securely segregate personal and corporate data, deploy silent Wi-Fi and VPN configurations, distribute internal app binaries, and instantly isolate compromised systems via our remote-wipe dashboard.',
    stats: [
      { label: 'Supported Platforms', value: 'iOS, Android' },
      { label: 'Containerization Mode', value: 'Zero-Trust' }
    ],
    themeColor: 'rgba(56, 189, 248, 0.95)', // Light Blue
    bgColor: '#f0f9ff',
    iconColor: '#0284c7',
    icon: (props) => <FolderLock size={24} {...props} style={{ color: '#0284c7' }} />
  },
  {
    id: 'iam',
    title: 'Identity and access management',
    centerTitle: 'Identity & Access Management',
    description: 'Control user lifecycles, manage role-based access control (RBAC), and conduct compliance audits. Build a resilient foundation for zero-trust security.',
    longDescription: 'Maintain a single source of truth for corporate identities. Programmatically automate onboarding provisioning and offboarding revocation cycles. Map micro-permissions with robust dynamic attributes, enabling precise access matrices across all divisions.',
    stats: [
      { label: 'User Provisioning', value: 'Automated' },
      { label: 'Audit Log Durability', value: 'Immutable' }
    ],
    themeColor: 'rgba(244, 114, 182, 0.95)', // Pink
    bgColor: '#fdf2f8',
    iconColor: '#db2777',
    icon: (props) => <UserCheck size={24} {...props} style={{ color: '#db2777' }} />
  },
  {
    id: 'password',
    title: 'Password management',
    centerTitle: 'Password Management',
    description: 'Generate, share, and audit strong corporate passwords inside an encrypted, high-performance vault. Eliminate weak credential vulnerabilities across teams.',
    longDescription: 'Replace unsecure text files and shared documents with an end-to-end AES-256 GCM encrypted password manager. Share client credentials securely using group policies, enforce automatic password rotations, and generate detailed strength scores across your organization.',
    stats: [
      { label: 'Encryption Standard', value: 'AES-256-GCM' },
      { label: 'Zero-Knowledge Vault', value: 'Verified' }
    ],
    themeColor: 'rgba(52, 211, 153, 0.95)', // Mint Green
    bgColor: '#ecfdf5',
    iconColor: '#059669',
    icon: (props) => <KeyRound size={24} {...props} style={{ color: '#059669' }} />
  }
];

const PROBLEMS_RESOLUTIONS_DATA = [
  {
    problemTitle: 'Siloed Divisional Database Matrices',
    problemDesc: 'Different business branches operating on disjointed data pipelines, resulting in inventory mismatches, double billing, and severe operational overhead.',
    resolutionTitle: 'Unified Corporate ERP Mesh',
    resolutionDesc: 'Deploying a single, synchronized database platform mapping financials, warehousing, HR, and client billing in real time with sub-millisecond sync cycles.',
    stats: '100% Data Cohesion',
    latency: 'Real-time Sync'
  },
  {
    problemTitle: 'Global Microservice Caching Lag',
    problemDesc: 'Centralized database clusters encountering massive query bottlenecks and request timeouts during peak high-concurrency user spikes.',
    resolutionTitle: 'Distributed Edge Caching Networks',
    resolutionDesc: 'Architecting distributed caching nodes globally using Kubernetes clusters and high-performance Redis nodes, dropping database lookup latency to under 50ms.',
    stats: '64% Latency Drop',
    latency: '< 50ms Sync'
  },
  {
    problemTitle: 'Support Inbox & Ticket Backlog',
    problemDesc: 'Customer support agents overwhelmed with basic, repetitive queries, causing response times to stretch past 24 hours and tanking customer satisfaction.',
    resolutionTitle: 'Cognitive Semantic Neural Agents',
    resolutionDesc: 'Integrating natural language parsing AI chat agents trained on specialized product context databases to handle 90% of incoming tickets instantly 24/7.',
    stats: '90% Automated Resolution',
    latency: 'Instant 24/7 Support'
  }
];

const FEATURED_SOLUTIONS_DATA = [
  {
    id: 'sol_zenith',
    title: 'Zenith Ledger ERP Suite',
    tag: 'FLAGSHIP PLATFORM',
    description: 'Bespoke corporate logistics ecosystem engineered to manage accounting, inventory, human resources, and branches operations seamlessly.',
    specs: ['Immutable Ledger Security', 'Multi-Node Synchronization', 'Dynamic Attributes Flow'],
    color: '#00f2fe'
  },
  {
    id: 'sol_aura',
    title: 'Aura Cognitive Neural AI',
    tag: 'COGNITIVE LAYER',
    description: 'Deep semantic conversational NLP engines delivering automated customer care, intelligent intent analysis, and system integrations.',
    specs: ['98.7% Intent Accuracy', 'Procedural Context Tuning', 'Sub-15ms AI Processing'],
    color: '#aa3bff'
  },
  {
    id: 'sol_chronos',
    title: 'Chronos Smart Billing Core',
    tag: 'FINANCIAL MICROSERVICE',
    description: 'High-frequency transaction scheduler designed to automate invoice processing, recurring subscriptions, tax filing, and localized routing.',
    specs: ['AES-256 GCM Vaulting', '100k+ TPS Scale Cap', '1-Click Compliance Reports'],
  }
];

const ENGAGEMENT_MODELS = [
  {
    id: 'em_dedicated',
    title: 'Dedicated Team',
    description: 'A full team focused exclusively on your project.',
    tag: 'EXCLUSIVITY',
    color: '#00f2fe',
    icon: Users
  },
  {
    id: 'em_project',
    title: 'Project-Based Development',
    description: 'End-to-end delivery with fixed scope and timeline.',
    tag: 'FIXED BUDGET',
    color: '#aa3bff',
    icon: Briefcase
  },
  {
    id: 'em_staff',
    title: 'Staff Augmentation',
    description: 'Extend your existing team with our experts.',
    tag: 'FLEXIBLE SCALE',
    color: '#f59e0b',
    icon: UserPlus
  },
  {
    id: 'em_support',
    title: 'Support & Maintenance',
    description: 'Continuous improvements and technical support.',
    tag: 'CONTINUOUS SLA',
    color: '#f43f5e',
    icon: Wrench
  }
];

const QA_CHECKPOINTS = [
  { id: 'qa_code', title: 'Code Reviews', description: 'Systematic peer review protocols scanning for memory leaks, complexity coefficients, and strict design guidelines compliance.', color: '#00f2fe', icon: Code },
  { id: 'qa_perf', title: 'Performance Testing', description: 'Simulating high-concurrency requests, load spikes, and endurance limits to isolate query bottlenecks and response latencies.', color: '#aa3bff', icon: Gauge },
  { id: 'qa_sec', title: 'Security Testing', description: 'Continuous automated vulnerability scans, deep static analysis (SAST), penetration testing, and zero-knowledge vaulting sweeps.', color: '#f59e0b', icon: Shield },
  { id: 'qa_cross', title: 'Cross-Platform Compatibility', description: 'Verifying responsive interface viewport grid coordinates and rendering cycles across multiple modern web browsers and mobile fleets.', color: '#f43f5e', icon: Cpu },
  { id: 'qa_user', title: 'User Acceptance Testing', description: 'Coordinating interactive user feedback loops, behavioral telemetry parsing, and comprehensive client workflow validations.', color: '#00f2fe', icon: UserCheck },
  { id: 'qa_mon', title: 'Continuous Monitoring', description: 'Deploying deep telemetry metrics, auto-scaling operational thresholds triggers, and immediate response systems.', color: '#aa3bff', icon: Activity }
];

const CapabilitiesPage = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [rotationAngle, setRotationAngle] = useState(0);
  const [isRotating, setIsRotating] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedProblemIdx, setSelectedProblemIdx] = useState(0);
  const [solutionHoveredId, setSolutionHoveredId] = useState(null);
  const [hoveredModelId, setHoveredModelId] = useState(null);
  const [hoveredQaId, setHoveredQaId] = useState(null);
  const requestRef = useRef();
  const previousTimeRef = useRef();
  const modelRefs = useRef({});

  const handleModelMouseMove = (e, id) => {
    const card = modelRefs.current[id];
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const normalizedX = (x / rect.width) - 0.5;
    const normalizedY = (y / rect.height) - 0.5;

    const tiltX = -normalizedY * 20;
    const tiltY = normalizedX * 20;

    card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.04, 1.04, 1.04)`;

    const glow = card.querySelector('.model-glow-follower');
    if (glow) {
      glow.style.left = `${x}px`;
      glow.style.top = `${y}px`;
      glow.style.opacity = '1';
    }
  };

  const handleModelMouseLeave = (id) => {
    const card = modelRefs.current[id];
    if (!card) return;

    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    const glow = card.querySelector('.model-glow-follower');
    if (glow) {
      glow.style.opacity = '0';
    }
    setHoveredModelId(null);
  };

  // Animation Loop for Orbit
  useEffect(() => {
    const animate = (time) => {
      if (previousTimeRef.current !== undefined) {
        const deltaTime = time - previousTimeRef.current;
        if (isRotating && activeIndex === null) {
          // Slow continuous rotation (0.015 degrees per millisecond)
          setRotationAngle((prevAngle) => (prevAngle + 0.015 * deltaTime) % 360);
        }
      }
      previousTimeRef.current = time;
      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, [isRotating, activeIndex]);

  const handleNodeClick = (index, cap) => {
    setSelectedItem(cap);
    setActiveIndex(index);
    setIsRotating(false);
  };

  const handleReset = () => {
    setSelectedItem(null);
    setActiveIndex(null);
    setIsRotating(true);
  };

  const activeData = selectedItem || (activeIndex !== null ? CAPABILITIES_DATA[activeIndex] : null);

  return (
    <div className="subpage-wrapper capabilities-3d-theme">
      {/* Dynamic Cosmic Glow Backdrop */}
      <div className="ambient-glow glow-1" style={{ background: activeData ? activeData.themeColor : 'var(--primary)', opacity: activeData ? 0.08 : 0.04 }}></div>
      <div className="ambient-glow glow-2" style={{ background: activeData ? 'var(--secondary)' : 'var(--accent)', opacity: activeData ? 0.08 : 0.04 }}></div>

      {/* Cyber Grid Backdrop */}
      <div className="cyber-grid-overlay"></div>

      <div className="container">

        {/* Page Title Header */}
        <div className="subpage-header text-center">
          <div className="section-badge animate-fade-in">
            <Compass size={14} className="spin-slow" style={{ color: 'var(--primary)' }} />
            <span style={{ fontSize: '1.25rem' }}>ENTERPRISE CAPABILITIES</span>
          </div>
          <h1 className="subpage-title font-display animate-slide-up">
            Security and <span className="cyber-text">IT Management</span>
          </h1>
          <p className="subpage-subtitle animate-slide-up-delay">
            Interact with our 3D Security Matrix to explore how we unify access control, device health, and threat response into a unified operations theater.
          </p>
        </div>

        {/* 3D Orbit Playground */}
        <div className="orbit-arena-container">

          <div className="orbit-arena-wrapper">

            {/* Interactive Control Deck */}
            <div className="control-deck">
              <button
                onClick={() => setIsRotating(!isRotating)}
                className="deck-btn"
                title={isRotating ? "Pause Orbit" : "Play Orbit"}
              >
                {isRotating ? <Pause size={16} /> : <Play size={16} />}
                <span>{isRotating ? 'Pause' : 'Auto-Orbit'}</span>
              </button>
              <button
                onClick={handleReset}
                className={`deck-btn ${activeData ? 'active' : ''}`}
                title="Reset View to Core System"
              >
                <RefreshCw size={16} className={activeIndex !== null ? 'spin-slow' : ''} />
                <span>Reset View</span>
              </button>
            </div>

            {/* Core 3D Space */}
            <div className="arena-3d-viewport">

              {/* Radial Grid lines representing the orbital gravity waves */}
              <div className="orbital-path-circle path-inner"></div>
              <div className="orbital-path-circle path-middle"></div>
              <div className="orbital-path-circle path-outer"></div>

              {/* The Orbiting Node Ring */}
              <div className="orbit-nodes-ring">
                {CAPABILITIES_DATA.map((cap, idx) => {
                  // Angle offset for each node to position them uniformly around the circle (360 / 6 = 60 degrees apart)
                  const baseAngle = (idx * 60 + rotationAngle) * (Math.PI / 180);

                  // Radius for the orbit
                  const radiusX = 380; // horizontal stretch
                  const radiusY = 160; // vertical foreshortening for isometric 3D feel

                  // Coordinate math (center is 0,0 relative to viewport center)
                  const x = Math.cos(baseAngle) * radiusX;
                  const z = Math.sin(baseAngle) * radiusX; // Depth factor
                  const y = Math.sin(baseAngle) * radiusY; // Isometric Y stretch

                  // 3D Visual Scales & Opacity shifts based on Z depth position
                  // Front points (z > 0) are larger and fully opaque. Back points (z < 0) are smaller and faded.
                  const maxZ = radiusX;
                  const normalizedZ = (z + maxZ) / (2 * maxZ); // 0 (deep back) to 1 (front center)

                  const scale = 0.75 + normalizedZ * 0.45; // Nodes range from 75% to 120% scale
                  const opacity = 0.4 + normalizedZ * 0.6; // Nodes range from 40% to 100% opacity
                  const zIndex = Math.round(100 + normalizedZ * 200); // 100 to 300 to overlay center section (which will be at 200)

                  const isActive = activeIndex === idx;

                  return (
                    <div
                      key={cap.id}
                      className={`orbiting-node-wrap ${isActive ? 'is-active' : ''} ${activeIndex !== null && !isActive ? 'is-dimmed' : ''}`}
                      style={{
                        transform: `translate3d(calc(-50% + ${x}px), calc(-50% + ${y}px), ${z}px) scale(${scale})`,
                        opacity: opacity,
                        zIndex: zIndex,
                      }}
                      onClick={() => handleNodeClick(idx, cap)}
                      onMouseEnter={() => {
                        if (activeIndex === null) {
                          setActiveIndex(idx);
                        }
                      }}
                      onMouseLeave={() => {
                        if (selectedItem === null && activeIndex === idx) {
                          setActiveIndex(null);
                        }
                      }}
                    >
                      {/* Orb Circle */}
                      <div
                        className="node-circle"
                        style={{
                          backgroundColor: cap.bgColor,
                          borderColor: isActive ? cap.themeColor : 'rgba(255, 255, 255, 0.08)',
                          boxShadow: isActive
                            ? `0 0 25px ${cap.themeColor}, inset 0 2px 10px rgba(255,255,255,0.8)`
                            : `0 8px 16px rgba(0,0,0,0.4), inset 0 2px 5px rgba(255,255,255,0.05)`
                        }}
                      >
                        <div className="node-icon-wrapper" style={{ transform: isActive ? 'scale(1.15) rotate(10deg)' : 'none' }}>
                          {cap.icon({ className: "node-svg-icon" })}
                        </div>
                      </div>

                      {/* Title Underneath Circle */}
                      <div className="node-label-wrap">
                        <span className="node-label-text">{cap.title}</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Centered Command Display Board */}
              <div
                className="center-command-board"
                style={{
                  zIndex: 200,
                  border: activeData ? `1px solid ${activeData.themeColor}` : '1px solid var(--border-color)',
                  boxShadow: activeData ? `0 0 40px ${activeData.themeColor}1a` : '0 20px 50px rgba(0,0,0,0.5)'
                }}
              >
                <div className="board-decor-lines"></div>
                <div className="board-scan-line"></div>

                {/* Dynamically switching content based on selection/hover */}
                <div className="board-content-wrapper">
                  {activeData ? (
                    <div className="detailed-view-state animate-fade-in">
                      <div className="active-badge" style={{ backgroundColor: activeData.bgColor, border: `1px solid ${activeData.themeColor}33`, color: activeData.iconColor }}>
                        {activeData.icon({ size: 14 })}
                        <span>{activeData.centerTitle.toUpperCase()}</span>
                      </div>

                      <h2 className="active-title font-display">{activeData.centerTitle}</h2>
                      <p className="active-desc">{activeData.description}</p>

                      <div className="active-spec-grid">
                        {activeData.stats.map((stat, sIdx) => (
                          <div key={sIdx} className="spec-card" style={{ borderLeft: `2px solid ${activeData.themeColor}` }}>
                            <span className="spec-label">{stat.label}</span>
                            <span className="spec-val" style={{ color: activeData.iconColor }}>{stat.value}</span>
                          </div>
                        ))}
                      </div>

                      <div className="board-action-row">
                        <button
                          className="subpage-action-btn hover-glow"
                          style={{ background: activeData.themeColor, boxShadow: `0 4px 15px ${activeData.themeColor}40` }}
                          onClick={() => {
                            window.location.hash = `#contact?service=${activeData.id}`;
                          }}
                        >
                          <span>Deploy Capability</span>
                          <ArrowRight size={14} />
                        </button>
                        <button className="text-link-btn" onClick={handleReset}>
                          Back to overview
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="default-view-state text-center animate-fade-in">
                      <div className="security-icon-shield">
                        <Shield className="shield-pulsate" size={32} style={{ color: 'var(--primary)' }} />
                      </div>

                      <h2 className="default-title font-display" style={{ textAlign: 'center' }}>Security and IT management</h2>
                      <p className="default-desc">
                        Streamline IT and enterprise service operations with a complete toolkit—from cloud access management and endpoint security to mobile device management.
                      </p>

                      <div className="default-action-row">
                        <button
                          className="glow-btn"
                          onClick={() => {
                            window.location.hash = '#contact';
                          }}
                        >
                          <span>LEARN MORE</span>
                          <ArrowRight size={14} />
                        </button>
                      </div>

                      <div className="board-info-tip">
                        <Sparkles size={12} className="tip-icon" />
                        <span>Hover or tap any outer node to filter individual subsystems.</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

            </div>

          </div>

        </div>

        {/* In-depth Secondary Showcase Block */}
        {activeData && (
          <div className="deep-capability-details glass-card animate-slide-up" style={{ borderLeft: `4px solid ${activeData.themeColor}` }}>
            <div className="row-align">
              <div className="details-text-col">
                <h3 className="section-title-sm" style={{ color: activeData.iconColor }}>Detailed Infrastructure Specs</h3>
                <h2 className="details-header font-display">{activeData.centerTitle} Systems Integration</h2>
                <p className="details-paragraph">{activeData.longDescription}</p>
                <div className="features-bullets">
                  <div className="bullet-item">
                    <Zap size={14} className="bullet-icon" style={{ color: activeData.iconColor }} />
                    <span>Integrates natively with Zenelait Distributed Hub Architecture.</span>
                  </div>
                  <div className="bullet-item">
                    <Cpu size={14} className="bullet-icon" style={{ color: activeData.iconColor }} />
                    <span>Real-time microservice synchronization with &lt; 50ms sync latency.</span>
                  </div>
                </div>
              </div>
              <div className="details-cta-col">
                <div className="cta-specs-box">
                  <span className="specs-box-heading">VERIFIED BENCHMARK</span>
                  <div className="box-stat">
                    <span className="box-num cyber-text">99.99%</span>
                    <span className="box-label">System Availability SLA</span>
                  </div>
                  <div className="box-action">
                    <button
                      className="glow-btn full-width"
                      onClick={() => {
                        window.location.hash = `#contact?ref=capability_${activeData.id}`;
                      }}
                    >
                      <span>Request Integration Proposal</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= SECTION: FEATURED SOLUTIONS (3D) ================= */}
        <div className="content-section solutions-3d-showcase">
          <div className="section-title-wrap">
            <div className="section-badge inline-badge" style={{ marginLeft: '40%' }}>
              <Sparkles size={14} className="spin-slow" style={{ color: 'var(--primary)' }} />
              <span style={{ fontSize: '1.25rem' }}>FLAGSHIP BLUEPRINTS</span>
            </div>
            <h1 className="section-main-title font-display text-center" style={{ textAlign: 'center', fontSize: '3rem' }}>Featured Solutions</h1>
            <p className="section-subtitle" style={{ margin: '0.5rem auto 0 auto', maxWidth: 600, textAlign: 'center' }}>
              Deployable high-integrity computational frameworks engineered to accelerate operations scales.
            </p>
          </div>

          <div className="solutions-3d-grid">
            {FEATURED_SOLUTIONS_DATA.map((sol) => {
              const isHovered = solutionHoveredId === sol.id;

              return (
                <div
                  key={sol.id}
                  className="border-glow-wrapper solution-card-wrap"
                  style={{
                    background: isHovered
                      ? `linear-gradient(135deg, ${sol.color} 0%, transparent 100%)`
                      : 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.01) 100%)'
                  }}
                  onMouseEnter={() => setSolutionHoveredId(sol.id)}
                  onMouseLeave={() => setSolutionHoveredId(null)}
                >
                  <div className="glass-card solution-card" style={{ transformStyle: 'preserve-3d', perspective: 1000 }}>
                    <span className="solution-tag" style={{ color: sol.color, borderColor: `${sol.color}33`, background: `${sol.color}0a` }}>
                      {sol.tag}
                    </span>
                    <h3 className="solution-title font-display" style={{ transform: isHovered ? 'translateZ(30px)' : 'none' }}>
                      {sol.title}
                    </h3>
                    <p className="solution-desc" style={{ transform: isHovered ? 'translateZ(20px)' : 'none' }}>
                      {sol.description}
                    </p>

                    <div className="solution-specs-list" style={{ transform: isHovered ? 'translateZ(10px)' : 'none' }}>
                      {sol.specs.map((spec, sIdx) => (
                        <div key={sIdx} className="spec-bullet">
                          <div className="bullet-glow" style={{ backgroundColor: sol.color, boxShadow: `0 0 10px ${sol.color}` }}></div>
                          <span>{spec}</span>
                        </div>
                      ))}
                    </div>

                    <div className="solution-footer">
                      <button
                        className="glow-btn"
                        onClick={() => {
                          window.location.hash = `#contact?ref=solution_${sol.id}`;
                        }}
                      >
                        <span>Integrate Architecture</span>
                        <ArrowRight size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ================= SECTION: PROBLEMS WE SOLVE (3D CONSOLE) ================= */}
        <div className="content-section problems-solve-section">
          <div className="section-title-wrap text-center">
            <div className="section-badge inline-badge" style={{ marginLeft: '35%' }}>
              <Compass size={14} className="spin-slow" style={{ color: 'var(--primary)' }} />
              <span style={{ textAlign: 'center', fontSize: '1.25rem' }}>PROBLEM ELIMINATION MATRIX</span>
            </div>
            <h2 className="section-main-title font-display" style={{ textAlign: 'center', fontSize: '3rem' }}>Business Problems We Solve</h2>
            <p className="section-subtitle" style={{ margin: '0.5rem auto 0 auto', maxWidth: 600, textAlign: 'center' }}>
              Convert architectural friction into high-tech resolutions using systematic computational hardening.
            </p>
          </div>

          <div className="friction-resolution-console glass-panel">
            {/* Left Column: Friction Nodes (Friction list) */}
            <div className="friction-sidebar">
              <div className="sidebar-banner">
                <span style={{ fontSize: '1rem' }}>ENTERPRISE FRICTION POINT</span>
              </div>
              <div className="friction-list">
                {PROBLEMS_RESOLUTIONS_DATA.map((prob, idx) => (
                  <button
                    key={idx}
                    className={`friction-node-btn ${selectedProblemIdx === idx ? 'active' : ''}`}
                    onClick={() => setSelectedProblemIdx(idx)}
                  >
                    <div className="node-marker">0{idx + 1}</div>
                    <span>{prob.problemTitle}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Right Column: Dynamic Resolution Engine */}
            <div className="resolution-theater">
              <div className="theater-banner">
                <span style={{ fontSize: '1rem' }}>ENGINEERED ARCHITECTURAL RESOLUTION</span>
              </div>

              <div className="resolution-card-viewport">
                {PROBLEMS_RESOLUTIONS_DATA.map((prob, idx) => {
                  const isActive = selectedProblemIdx === idx;
                  if (!isActive) return null;

                  return (
                    <div key={idx} className="resolution-card-content animate-fade-in">
                      <div className="friction-context-block">
                        <span className="context-label">DURABILITY ANOMALY DIAGNOSED</span>
                        <h4 className="friction-headline">“ {prob.problemTitle} ”</h4>
                        <p className="friction-detailed-text">{prob.problemDesc}</p>
                      </div>

                      <div className="resolution-connector-line">
                        <div className="connector-pulse"></div>
                      </div>

                      <div className="resolution-result-block border-glow-wrapper">
                        <div className="glass-card result-panel">
                          <span className="sys-status-badge">DEPLOYED STACK ACTIVE</span>
                          <h3 className="resolution-headline font-display">{prob.resolutionTitle}</h3>
                          <p className="resolution-detailed-text">{prob.resolutionDesc}</p>

                          <div className="resolution-metrics-footer">
                            <div className="metrics-box">
                              <span className="metrics-num cyber-text">{prob.stats}</span>
                              <span className="metrics-lbl">EFFICACY COEFFICIENT</span>
                            </div>
                            <div className="metrics-box">
                              <span className="metrics-num cyber-text">{prob.latency}</span>
                              <span className="metrics-lbl">SYNCHRONICITY</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* ================= SECTION: ENGAGEMENT MODELS (3D) ================= */}
        <div className="content-section engagement-models-section">
          <div className="section-title-wrap text-center">
            <div className="section-badge inline-badge" style={{ marginLeft: '40%' }}>
              <Compass size={14} className="spin-slow" style={{ color: 'var(--primary)' }} />
              <span style={{ textAlign: 'center', fontSize: '1.25rem' }}>ENGAGEMENT MODELS</span>
            </div>
            <h2 className="section-main-title font-display" style={{ textAlign: 'center', fontSize: '3rem' }}>How We Work</h2>
            <p className="section-subtitle" style={{ margin: '0.5rem auto 0 auto', maxWidth: 600, textAlign: 'center' }}>
              Shows flexibility to clients through optimized deployment framework paradigms.
            </p>
          </div>

          <div className="engagement-models-grid">
            {ENGAGEMENT_MODELS.map((model, idx) => {
              const IconComponent = model.icon;
              const isHovered = hoveredModelId === model.id;

              return (
                <div
                  key={model.id}
                  className={`border-glow-wrapper model-card-wrap model-stagger-${idx}`}
                  style={{
                    background: isHovered
                      ? `linear-gradient(135deg, ${model.color} 0%, transparent 100%)`
                      : 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.01) 100%)',
                    borderRadius: '24px'
                  }}
                >
                  <div
                    ref={el => modelRefs.current[model.id] = el}
                    className="glass-card engagement-3d-card"
                    style={{
                      transformStyle: 'preserve-3d',
                      perspective: 1000,
                      backgroundColor: 'rgba(10, 10, 15, 0.55)',
                      borderColor: 'rgba(255, 255, 255, 0.05)',
                    }}
                    onMouseMove={(e) => {
                      setHoveredModelId(model.id);
                      handleModelMouseMove(e, model.id);
                    }}
                    onMouseLeave={() => handleModelMouseLeave(model.id)}
                  >
                    {/* Dynamic Follower Glow */}
                    <div className="model-glow-follower" style={{ background: `radial-gradient(circle 80px at center, ${model.color}18, transparent 80%)` }}></div>

                    <div className="model-header-row" style={{ transform: isHovered ? 'translateZ(40px)' : 'none', transition: 'transform 0.4s ease' }}>
                      <span className="model-pill" style={{ color: model.color, borderColor: `${model.color}33`, background: `${model.color}0a` }}>
                        {model.tag}
                      </span>
                    </div>

                    <div className="model-icon-circle" style={{ borderColor: isHovered ? model.color : 'rgba(255, 255, 255, 0.08)', transform: isHovered ? 'translateZ(60px)' : 'none', transition: 'transform 0.4s ease, border-color 0.4s' }}>
                      <IconComponent size={22} style={{ color: isHovered ? '#ffffff' : model.color, filter: isHovered ? `drop-shadow(0 0 10px ${model.color})` : 'none' }} />
                    </div>

                    <h3 className="model-card-title font-display" style={{ transform: isHovered ? 'translateZ(30px)' : 'none', transition: 'transform 0.4s ease' }}>
                      {model.title}
                    </h3>

                    <p className="model-card-desc" style={{ transform: isHovered ? 'translateZ(20px)' : 'none', transition: 'transform 0.4s ease' }}>
                      {model.description}
                    </p>

                    <div className="model-card-footer" style={{ transform: isHovered ? 'translateZ(10px)' : 'none', transition: 'transform 0.4s ease' }}>
                      <span style={{ color: isHovered ? model.color : 'var(--text-muted)' }}>Learn integration</span>
                      <ArrowRight size={12} className="footer-arrow-icon" style={{ color: isHovered ? model.color : 'var(--text-muted)' }} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ================= SECTION: QUALITY ASSURANCE (3D) ================= */}
        <div className="content-section qa-showcase-section">
          <div className="section-title-wrap text-center">
            <div className="section-badge inline-badge" style={{ marginLeft: '40%' }}>
              <Sparkles size={14} className="spin-slow" style={{ color: 'var(--primary)' }} />
              <span style={{ fontSize: '1.25rem' }}>QUALITY ASSURANCE</span>
            </div>
            <h2 className="section-main-title font-display" style={{ textAlign: 'center', fontSize: '3rem' }}>Commitment to Quality</h2>
            <p className="section-subtitle" style={{ margin: '0.5rem auto 0 auto', maxWidth: 600, textAlign: 'center' }}>
              Relentless systems verification grids keeping enterprise apps flawless, durable, and highly resilient.
            </p>
          </div>

          <div className="qa-interactive-theater glass-panel">
            {/* Left Hologram column */}
            <div className="qa-hologram-shield">
              <div className="hologram-circles-stack">
                <div className="holo-circle outer-holo" style={{ borderColor: hoveredQaId ? (QA_CHECKPOINTS.find(q => q.id === hoveredQaId)?.color || 'var(--primary)') : 'var(--primary)' }}></div>
                <div className="holo-circle middle-holo" style={{ borderColor: hoveredQaId ? (QA_CHECKPOINTS.find(q => q.id === hoveredQaId)?.color || 'var(--accent)') : 'var(--accent)' }}></div>
                <div className="holo-circle inner-holo" style={{ borderColor: hoveredQaId ? (QA_CHECKPOINTS.find(q => q.id === hoveredQaId)?.color || 'var(--primary)') : 'var(--primary)' }}></div>

                {/* pulsing core logo */}
                <div className="holo-core-shield" style={{ background: hoveredQaId ? `${QA_CHECKPOINTS.find(q => q.id === hoveredQaId)?.color || 'var(--primary)'}15` : 'rgba(0, 242, 254, 0.05)' }}>
                  <Shield className="holo-shield-icon spin-slow" size={36} style={{ color: hoveredQaId ? (QA_CHECKPOINTS.find(q => q.id === hoveredQaId)?.color || 'var(--primary)') : 'var(--primary)' }} />
                </div>
              </div>
              <div className="holo-scanner-sweeper" style={{ background: `linear-gradient(180deg, transparent, ${hoveredQaId ? (QA_CHECKPOINTS.find(q => q.id === hoveredQaId)?.color || 'var(--primary)') : 'var(--primary)'}, transparent)` }}></div>
              <span className="holo-status-label">SYSSECURE SHIELD ACTIVE</span>
            </div>

            {/* Right QA Grid column */}
            <div className="qa-checkpoints-grid">
              {QA_CHECKPOINTS.map((qa) => {
                const IconComponent = qa.icon;
                const isHovered = hoveredQaId === qa.id;

                return (
                  <div
                    key={qa.id}
                    className={`qa-checkpoint-card ${isHovered ? 'active' : ''}`}
                    style={{
                      borderColor: isHovered ? qa.color : 'rgba(255, 255, 255, 0.04)',
                      background: isHovered ? `${qa.color}08` : 'rgba(255, 255, 255, 0.01)'
                    }}
                    onMouseEnter={() => setHoveredQaId(qa.id)}
                    onMouseLeave={() => setHoveredQaId(null)}
                  >
                    <div className="checkpoint-header">
                      <div className="checkpoint-icon-box" style={{ background: `${qa.color}15`, borderColor: `${qa.color}33` }}>
                        <IconComponent size={16} style={{ color: qa.color }} />
                      </div>
                      <h4 className="checkpoint-title font-display">{qa.title}</h4>
                    </div>
                    <p className="checkpoint-desc">{qa.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

      </div>

      <style>{`
        /* 3D Solutions Grid CSS */
        .solutions-3d-showcase {
          margin-top: 6rem;
        }

        .solutions-3d-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2.5rem;
          margin-top: 3.5rem;
        }

        .solution-card-wrap {
          border-radius: 20px;
          height: 100%;
        }

        .solution-card {
          padding: 3rem 2.5rem;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 1.5rem;
          background: rgba(13, 13, 17, 0.4);
          border-color: rgba(255, 255, 255, 0.05);
          text-align: left;
          position: relative;
        }

        .solution-tag {
          font-family: var(--font-display);
          font-size: 0.65rem;
          font-weight: 800;
          letter-spacing: 0.08em;
          padding: 0.25rem 0.65rem;
          border-radius: 4px;
          border: 1px solid transparent;
        }

        .solution-title {
          font-size: 1.45rem;
          font-weight: 800;
          color: #ffffff;
          transition: transform 0.4s ease;
        }

        .solution-desc {
          font-size: 0.95rem;
          line-height: 1.6;
          color: var(--text-secondary);
          transition: transform 0.4s ease;
        }

        .solution-specs-list {
          display: flex;
          flex-direction: column;
          gap: 0.65rem;
          width: 100%;
          transition: transform 0.4s ease;
        }

        .spec-bullet {
          display: flex;
          align-items: center;
          gap: 0.65rem;
          font-size: 0.85rem;
          color: var(--text-secondary);
        }

        .bullet-glow {
          width: 6px;
          height: 6px;
          border-radius: 50%;
        }

        .solution-footer {
          margin-top: auto;
          width: 100%;
        }

        .solution-footer .glow-btn {
          width: 100%;
          justify-content: center;
          padding: 0.75rem 1.5rem;
          font-size: 0.8rem;
          border-radius: 8px;
        }

        /* Business Problems Solve Console CSS */
        .problems-solve-section {
          margin-top: 6rem;
          margin-bottom: 3rem;
        }

        .friction-resolution-console {
          margin-top: 3.5rem;
          display: grid;
          grid-template-columns: 280px 1fr;
          min-height: 520px;
          background: rgba(13, 13, 17, 0.45);
          backdrop-filter: blur(20px);
          border-radius: 24px;
          overflow: hidden;
          text-align: left;
        }

        .friction-sidebar {
          background: rgba(255, 255, 255, 0.01);
          border-right: 1px solid rgba(255, 255, 255, 0.03);
          display: flex;
          flex-direction: column;
        }

        .sidebar-banner,
        .theater-banner {
          background: rgba(255, 255, 255, 0.02);
          border-bottom: 1px solid rgba(255, 255, 255, 0.03);
          padding: 0.75rem 1.5rem;
          font-family: var(--font-display);
          font-size: 0.65rem;
          font-weight: 700;
          color: var(--text-muted);
          letter-spacing: 0.08em;
        }

        .friction-list {
          display: flex;
          flex-direction: column;
          padding: 1.5rem;
          gap: 0.75rem;
        }

        .friction-node-btn {
          background: none;
          border: 1px solid transparent;
          border-radius: 8px;
          padding: 1rem 1.25rem;
          color: var(--text-secondary);
          display: flex;
          align-items: center;
          gap: 0.75rem;
          cursor: pointer;
          transition: all 0.3s ease;
          text-align: left;
        }

        .friction-node-btn:hover {
          color: #ffffff;
          background: rgba(255, 255, 255, 0.02);
        }

        .friction-node-btn.active {
          color: var(--primary);
          background: rgba(0, 242, 254, 0.03);
          border-color: rgba(0, 242, 254, 0.15);
          box-shadow: 0 0 10px rgba(0, 242, 254, 0.05);
        }

        .node-marker {
          font-family: var(--font-display);
          font-size: 0.75rem;
          font-weight: 800;
          opacity: 0.6;
        }

        .resolution-theater {
          display: flex;
          flex-direction: column;
          height: 100%;
        }

        .resolution-card-viewport {
          padding: 3rem;
          flex-grow: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .resolution-card-content {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .context-label {
          font-family: var(--font-display);
          font-size: 0.65rem;
          font-weight: 700;
          color: #ef4444;
          letter-spacing: 0.05em;
          margin-bottom: 0.5rem;
          display: block;
        }

        .friction-headline {
          font-size: 1.5rem;
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 0.5rem;
        }

        .friction-detailed-text,
        .resolution-detailed-text {
          font-size: 0.95rem;
          color: var(--text-secondary);
          line-height: 1.6;
        }

        .resolution-connector-line {
          position: relative;
          height: 2px;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.05), transparent);
          width: 100%;
          margin: 0.5rem 0;
        }

        .connector-pulse {
          position: absolute;
          top: 0;
          left: 0;
          width: 40px;
          height: 100%;
          background: linear-gradient(90deg, transparent, var(--primary), transparent);
          animation: connectPulse 2.5s infinite linear;
        }

        @keyframes connectPulse {
          0% { left: 0%; }
          100% { left: 100%; }
        }

        .result-panel {
          padding: 2.25rem 2.5rem;
          background: rgba(13, 13, 17, 0.7);
          backdrop-filter: blur(16px);
          border-color: rgba(255, 255, 255, 0.05);
        }

        .sys-status-badge {
          font-family: var(--font-display);
          font-size: 0.65rem;
          font-weight: 800;
          color: #10b981;
          letter-spacing: 0.08em;
          display: block;
          margin-bottom: 0.5rem;
        }

        .resolution-headline {
          font-size: 1.75rem;
          font-weight: 800;
          color: #ffffff;
          margin-bottom: 0.75rem;
        }

        .resolution-metrics-footer {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
          margin-top: 1.5rem;
          padding-top: 1.5rem;
          border-top: 1px solid rgba(255, 255, 255, 0.03);
        }

        .metrics-box {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .metrics-num {
          font-family: var(--font-display);
          font-size: 1.85rem;
          font-weight: 900;
          line-height: 1;
        }

        .metrics-lbl {
          font-size: 0.7rem;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        @media (max-width: 1024px) {
          .solutions-3d-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
          .friction-resolution-console {
            grid-template-columns: 1fr;
          }
          .friction-sidebar {
            border-right: none;
            border-bottom: 1px solid rgba(255, 255, 255, 0.03);
          }
          .friction-list {
            flex-direction: row;
            overflow-x: auto;
            white-space: nowrap;
          }
          .friction-node-btn {
            flex-shrink: 0;
          }
        }

        /* capabilities 3d theme wrapper */
        .capabilities-3d-theme {
          background-color: var(--bg-darker);
          min-height: 100vh;
          padding: 8rem 0 8rem 0;
          position: relative;
          overflow: hidden;
        }

        /* Ambient Glow Backdrop Orbs */
        .ambient-glow {
          position: absolute;
          width: 600px;
          height: 600px;
          border-radius: 50%;
          filter: blur(140px);
          pointer-events: none;
          z-index: 0;
          transition: background 0.8s ease, opacity 0.8s ease;
        }
        .glow-1 { top: 10%; left: -200px; }
        .glow-2 { bottom: 10%; right: -200px; }

        /* Cyber grid line backdrop overlay */
        .cyber-grid-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: 
            linear-gradient(rgba(255, 255, 255, 0.01) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.01) 1px, transparent 1px);
          background-size: 50px 50px;
          mask-image: radial-gradient(circle at 50% 50%, black 40%, transparent 90%);
          -webkit-mask-image: radial-gradient(circle at 50% 50%, black 40%, transparent 90%);
          pointer-events: none;
          z-index: 1;
        }

        .subpage-header {
          position: relative;
          z-index: 2;
          margin-bottom: 3rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
        }

        .subpage-title {
          font-size: 3.5rem;
          font-weight: 800;
          letter-spacing: -0.02em;
          margin-top: 0.5rem;
        }

        .subpage-subtitle {
          max-width: 700px;
          font-size: 1.15rem;
          color: var(--text-secondary);
          line-height: 1.6;
          text-align: center;
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

        /* 3D Orbit Stage Styling */
        .orbit-arena-container {
          position: relative;
          z-index: 2;
          width: 100%;
          min-height: 650px;
          margin: 2rem 0;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .orbit-arena-wrapper {
          position: relative;
          width: 100%;
          max-width: 1100px;
          height: 600px;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .control-deck {
          position: absolute;
          top: 0;
          right: 2rem;
          display: flex;
          gap: 0.75rem;
          z-index: 300;
        }

        .deck-btn {
          background: rgba(13, 13, 17, 0.6);
          border: 1px solid var(--border-color);
          color: var(--text-secondary);
          padding: 0.5rem 1rem;
          border-radius: 8px;
          font-size: 0.8rem;
          font-weight: 500;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          transition: all 0.3s ease;
        }

        .deck-btn:hover {
          color: var(--text-primary);
          border-color: var(--primary);
          background: rgba(0, 242, 254, 0.05);
        }

        .deck-btn.active {
          color: var(--primary);
          border-color: var(--primary);
          box-shadow: 0 0 10px rgba(0, 242, 254, 0.2);
        }

        .arena-3d-viewport {
          position: relative;
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          perspective: 1200px;
          transform-style: preserve-3d;
        }

        /* Ambient Orbit Ring GridLines */
        .orbital-path-circle {
          position: absolute;
          border: 1px dashed rgba(255, 255, 255, 0.03);
          border-radius: 50%;
          transform: rotateX(75deg);
          pointer-events: none;
          z-index: 10;
        }

        .path-inner { width: 450px; height: 450px; }
        .path-middle { width: 760px; height: 760px; border-color: rgba(255, 255, 255, 0.04); }
        .path-outer { width: 1000px; height: 1000px; border-color: rgba(255, 255, 255, 0.02); }

        .orbit-nodes-ring {
          position: absolute;
          width: 100%;
          height: 100%;
          transform-style: preserve-3d;
          z-index: 120;
          pointer-events: none;
        }

        /* Orbiting Node Container */
        .orbiting-node-wrap {
          position: absolute;
          top: 50%;
          left: 50%;
          transform-style: preserve-3d;
          display: flex;
          flex-direction: column;
          align-items: center;
          cursor: pointer;
          transition: transform 0.15s linear, opacity 0.4s ease; /* snap responsive transforms fast, smooth opacity shifts */
          pointer-events: auto;
          width: 140px;
        }

        .orbiting-node-wrap.is-dimmed {
          opacity: 0.25 !important;
          filter: grayscale(40%) blur(1px);
        }

        /* Node circular wrapper */
        .node-circle {
          width: 70px;
          height: 70px;
          border-radius: 50%;
          border: 1px solid rgba(255,255,255,0.08);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          position: relative;
        }

        .node-icon-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .orbiting-node-wrap:hover .node-circle {
          transform: translateY(-8px) scale(1.1);
          border-color: rgba(255, 255, 255, 0.25);
          box-shadow: 0 12px 28px rgba(0,0,0,0.6);
        }

        /* Node label texts */
        .node-label-wrap {
          margin-top: 0.75rem;
          text-align: center;
          max-width: 140px;
          background: rgba(2, 2, 3, 0.8);
          padding: 0.25rem 0.6rem;
          border-radius: 6px;
          border: 1px solid rgba(255,255,255,0.02);
          transition: all 0.3s ease;
        }

        .node-label-text {
          font-family: var(--font-sans);
          font-size: 0.75rem;
          font-weight: 500;
          color: var(--text-secondary);
          line-height: 1.3;
          display: block;
          white-space: pre-line; /* preserves \n formatting for clean stack */
        }

        .orbiting-node-wrap:hover .node-label-wrap {
          border-color: rgba(255, 255, 255, 0.1);
          background: rgba(255,255,255,0.04);
        }

        .orbiting-node-wrap:hover .node-label-text {
          color: #ffffff;
        }

        .orbiting-node-wrap.is-active .node-label-text {
          color: #ffffff;
          font-weight: 700;
        }

        /* Centered display board */
        .center-command-board {
          position: absolute;
          width: 520px;
          min-height: 380px;
          background: rgba(7, 7, 9, 0.85);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-radius: 24px;
          padding: 3rem;
          overflow: hidden;
          transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .board-decor-lines {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent);
        }

        .board-scan-line {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 100px;
          background: linear-gradient(180deg, rgba(255,255,255,0.01) 0%, transparent 100%);
          animation: scanDown 6s linear infinite;
          pointer-events: none;
        }

        @keyframes scanDown {
          0% { transform: translateY(-100px); }
          100% { transform: translateY(400px); }
        }

        .board-content-wrapper {
          position: relative;
          z-index: 5;
        }

        /* Default center text view styling */
        .security-icon-shield {
          width: 60px;
          height: 60px;
          border-radius: 12px;
          background: rgba(0, 242, 254, 0.05);
          border: 1px solid rgba(0, 242, 254, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1.5rem auto;
        }

        .shield-pulsate {
          animation: pulseIcon 2.5s ease-in-out infinite;
        }

        @keyframes pulseIcon {
          0%, 100% { filter: drop-shadow(0 0 5px rgba(0, 242, 254, 0.2)); opacity: 0.8; }
          50% { filter: drop-shadow(0 0 15px rgba(0, 242, 254, 0.5)); opacity: 1; }
        }

        .default-title {
          font-size: 2.25rem;
          font-weight: 800;
          color: #ffffff;
          margin-bottom: 1rem;
          line-height: 1.2;
          letter-spacing: -0.01em;
        }

        .default-desc {
          font-size: 0.95rem;
          color: var(--text-secondary);
          line-height: 1.6;
          margin-bottom: 2rem;
        }

        .default-action-row {
          display: flex;
          justify-content: center;
          margin-bottom: 1.5rem;
        }

        .board-info-tip {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.72rem;
          color: var(--text-muted);
        }

        .tip-icon {
          color: var(--primary);
          animation: spinSlow 6s linear infinite;
        }

        /* Detailed view state panel styling */
        .active-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.35rem 0.8rem;
          border-radius: 50px;
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.05em;
          margin-bottom: 1.25rem;
        }

        .active-title {
          font-size: 2rem;
          font-weight: 800;
          color: #ffffff;
          margin-bottom: 0.75rem;
          line-height: 1.2;
        }

        .active-desc {
          font-size: 0.92rem;
          color: var(--text-secondary);
          line-height: 1.55;
          margin-bottom: 1.5rem;
        }

        .active-spec-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
          margin-bottom: 1.75rem;
        }

        .spec-card {
          background: rgba(255,255,255,0.01);
          padding: 0.6rem 0.8rem;
          border-radius: 6px;
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
        }

        .spec-label {
          font-size: 0.68rem;
          text-transform: uppercase;
          color: var(--text-muted);
          letter-spacing: 0.05em;
        }

        .spec-val {
          font-family: var(--font-display);
          font-size: 0.95rem;
          font-weight: 700;
        }

        .board-action-row {
          display: flex;
          align-items: center;
          gap: 1.25rem;
        }

        .subpage-action-btn {
          border: none;
          color: #000000;
          font-family: var(--font-display);
          font-weight: 700;
          font-size: 0.85rem;
          padding: 0.75rem 1.5rem;
          border-radius: 8px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          transition: all 0.3s ease;
        }

        .subpage-action-btn:hover {
          transform: translateY(-2px);
          filter: brightness(1.1);
        }

        .text-link-btn {
          background: none;
          border: none;
          color: var(--text-secondary);
          font-size: 0.8rem;
          font-weight: 600;
          cursor: pointer;
          text-decoration: underline;
          transition: color 0.2s ease;
        }

        .text-link-btn:hover {
          color: #ffffff;
        }

        /* In-depth Secondary Showcase Block styling */
        .deep-capability-details {
          margin-top: 4rem;
          z-index: 2;
          background: rgba(13, 13, 17, 0.45);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 20px;
          padding: 3rem;
          position: relative;
        }

        .row-align {
          display: grid;
          grid-template-columns: 3fr 2fr;
          gap: 4rem;
          align-items: center;
        }

        .section-title-sm {
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          margin-bottom: 0.5rem;
        }

        .details-header {
          font-size: 2.25rem;
          font-weight: 800;
          margin-bottom: 1.25rem;
        }

        .details-paragraph {
          font-size: 1rem;
          line-height: 1.7;
          color: var(--text-secondary);
          margin-bottom: 1.75rem;
        }

        .features-bullets {
          display: flex;
          flex-direction: column;
          gap: 0.8rem;
        }

        .bullet-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 0.9rem;
          color: var(--text-primary);
        }

        .bullet-icon {
          flex-shrink: 0;
        }

        .cta-specs-box {
          background: rgba(255,255,255,0.01);
          border: 1px solid rgba(255,255,255,0.04);
          border-radius: 12px;
          padding: 2rem;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          text-align: center;
        }

        .specs-box-heading {
          font-size: 0.65rem;
          font-weight: 600;
          color: var(--text-muted);
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }

        .box-stat {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .box-num {
          font-family: var(--font-display);
          font-size: 3rem;
          font-weight: 900;
          line-height: 1;
        }

        .box-label {
          font-size: 0.8rem;
          color: var(--text-secondary);
        }

        .glow-btn.full-width {
          width: 100%;
          justify-content: center;
        }

        /* Animations */
        .animate-fade-in { animation: fadeIn 0.6s ease forwards; }
        .animate-slide-up { animation: slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .animate-slide-up-delay { opacity: 0; animation: slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.15s forwards; }

        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }

        /* Responsive Breakpoints */
        @media (max-width: 1100px) {
          .orbiting-node-wrap {
            width: 120px;
          }
          .node-circle {
            width: 60px;
            height: 60px;
          }
          .node-label-wrap {
            max-width: 120px;
          }
          .center-command-board {
            width: 440px;
            padding: 2rem;
          }
          .default-title { font-size: 1.85rem; }
          .active-title { font-size: 1.75rem; }
        }

        @media (max-width: 991px) {
          .orbit-arena-container {
            min-height: 800px;
          }
          .orbit-arena-wrapper {
            height: 750px;
          }
          .arena-3d-viewport {
            flex-direction: column;
            gap: 2rem;
          }
          /* Flatten layout on tablets to keep it legible */
          .orbit-nodes-ring {
            position: relative;
            width: 100%;
            height: auto;
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 1.5rem;
            z-index: 100;
            pointer-events: auto;
          }
          .orbiting-node-wrap {
            position: relative;
            top: auto !important;
            left: auto !important;
            transform: none !important;
            width: 100%;
            opacity: 1 !important;
          }
          .orbital-path-circle {
            display: none;
          }
          .center-command-board {
            position: relative;
            top: auto;
            left: auto;
            width: 100%;
            min-height: auto;
            margin-top: 1rem;
          }
          .row-align {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
          .control-deck {
            display: none;
          }
        }

        @media (max-width: 768px) {
          .capabilities-3d-theme {
            padding: 6rem 0;
          }
          .subpage-title {
            font-size: 2.5rem;
          }
          .orbit-nodes-ring {
            grid-template-columns: repeat(2, 1fr);
          }
          .deep-capability-details {
            padding: 2rem;
          }
          .details-header {
            font-size: 1.75rem;
          }
        }
        /* Engagement Models CSS */
        .engagement-models-section {
          margin-top: 6rem;
          margin-bottom: 4rem;
        }

        .engagement-models-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 2rem;
          margin-top: 3.5rem;
          perspective: 1200px;
        }

        .model-card-wrap {
          height: 100%;
          transition: all 0.3s ease;
        }

        /* Staggered Passive 3D Levitation */
        .model-stagger-0 { animation: modelLevitate 6s ease-in-out infinite; animation-delay: 0s; }
        .model-stagger-1 { animation: modelLevitate 6s ease-in-out infinite; animation-delay: 0.8s; }
        .model-stagger-2 { animation: modelLevitate 6s ease-in-out infinite; animation-delay: 1.6s; }
        .model-stagger-3 { animation: modelLevitate 6s ease-in-out infinite; animation-delay: 2.4s; }

        .model-card-wrap:hover {
          animation-play-state: paused;
        }

        @keyframes modelLevitate {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        .engagement-3d-card {
          padding: 2.5rem 2rem;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 1.25rem;
          border-radius: 24px;
          position: relative;
          overflow: hidden;
          transition: transform 0.1s ease-out, border-color 0.4s ease, box-shadow 0.4s ease;
        }

        .model-glow-follower {
          position: absolute;
          width: 160px;
          height: 160px;
          transform: translate(-50%, -50%);
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.5s ease;
          z-index: 0;
        }

        .model-header-row {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .model-pill {
          font-family: var(--font-display);
          font-size: 0.62rem;
          font-weight: 800;
          letter-spacing: 0.08em;
          padding: 0.2rem 0.55rem;
          border-radius: 4px;
          border: 1px solid transparent;
        }

        .model-icon-circle {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.08);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.4s ease;
        }

        .model-card-title {
          font-size: 1.25rem;
          font-weight: 800;
          color: #ffffff;
          transition: transform 0.4s ease;
        }

        .model-card-desc {
          font-size: 0.9rem;
          line-height: 1.55;
          color: var(--text-secondary);
          transition: transform 0.4s ease;
        }

        .model-card-footer {
          margin-top: auto;
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-family: var(--font-display);
          font-size: 0.78rem;
          font-weight: 600;
          transition: transform 0.4s ease;
        }

        .footer-arrow-icon {
          transition: transform 0.3s ease;
        }

        .model-card-wrap:hover .footer-arrow-icon {
          transform: translateX(4px);
        }

        @media (max-width: 1200px) {
          .engagement-models-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 1.75rem;
          }
        }

        @media (max-width: 768px) {
          .engagement-models-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
        }
        /* Quality Assurance CSS */
        .qa-showcase-section {
          margin-top: 6rem;
          margin-bottom: 5rem;
        }

        .qa-interactive-theater {
          margin-top: 3.5rem;
          display: grid;
          grid-template-columns: 360px 1fr;
          min-height: 480px;
          background: rgba(13, 13, 17, 0.45);
          backdrop-filter: blur(20px);
          border-radius: 24px;
          overflow: hidden;
          text-align: left;
        }

        .qa-hologram-shield {
          background: rgba(255, 255, 255, 0.01);
          border-right: 1px solid rgba(255, 255, 255, 0.03);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          position: relative;
          padding: 3rem;
          overflow: hidden;
        }

        .hologram-circles-stack {
          position: relative;
          width: 200px;
          height: 200px;
          display: flex;
          align-items: center;
          justify-content: center;
          perspective: 800px;
          transform-style: preserve-3d;
        }

        .holo-circle {
          position: absolute;
          border: 1px dashed transparent;
          border-radius: 50%;
          transition: border-color 0.6s ease, transform 0.6s ease;
        }

        .outer-holo {
          width: 200px;
          height: 200px;
          border-color: var(--primary);
          transform: rotateX(70deg) rotateY(10deg) translateZ(0px);
          animation: spinSlow 12s linear infinite;
        }

        .middle-holo {
          width: 150px;
          height: 150px;
          border-color: var(--accent);
          transform: rotateX(70deg) rotateY(-15deg) translateZ(0px);
          animation: spinSlow 8s linear infinite reverse;
        }

        .inner-holo {
          width: 100px;
          height: 100px;
          border-color: var(--primary);
          transform: rotateX(70deg) rotateY(5deg) translateZ(0px);
          animation: spinSlow 5s linear infinite;
        }

        .holo-core-shield {
          position: absolute;
          width: 70px;
          height: 70px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(255, 255, 255, 0.05);
          transition: background 0.6s ease;
        }

        .holo-shield-icon {
          transition: color 0.6s ease, transform 0.6s ease;
        }

        .holo-scanner-sweeper {
          position: absolute;
          width: 100%;
          height: 3px;
          top: 0;
          animation: sweepUpAndDown 4s ease-in-out infinite;
          opacity: 0.25;
        }

        @keyframes sweepUpAndDown {
          0% { top: 10%; }
          50% { top: 90%; }
          100% { top: 10%; }
        }

        .holo-status-label {
          font-family: var(--font-display);
          font-size: 0.65rem;
          font-weight: 800;
          color: var(--text-muted);
          letter-spacing: 0.08em;
          margin-top: 2rem;
          text-transform: uppercase;
        }

        .qa-checkpoints-grid {
          padding: 3rem;
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 2rem;
          height: 100%;
          align-content: center;
        }

        .qa-checkpoint-card {
          padding: 1.75rem;
          border-radius: 16px;
          border: 1px solid transparent;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          display: flex;
          flex-direction: column;
          gap: 0.8rem;
          cursor: pointer;
        }

        .qa-checkpoint-card:hover,
        .qa-checkpoint-card.active {
          transform: translateY(-4px) scale(1.02);
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.4);
        }

        .checkpoint-header {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .checkpoint-icon-box {
          width: 32px;
          height: 32px;
          border-radius: 8px;
          border: 1px solid transparent;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .checkpoint-title {
          font-size: 1.15rem;
          font-weight: 800;
          color: #ffffff;
        }

        .checkpoint-desc {
          font-size: 0.88rem;
          line-height: 1.55;
          color: var(--text-secondary);
        }

        @media (max-width: 1024px) {
          .qa-interactive-theater {
            grid-template-columns: 1fr;
          }
          .qa-hologram-shield {
            border-right: none;
            border-bottom: 1px solid rgba(255, 255, 255, 0.03);
            padding: 2.5rem;
          }
          .qa-checkpoints-grid {
            padding: 2rem;
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
};

export default CapabilitiesPage;
