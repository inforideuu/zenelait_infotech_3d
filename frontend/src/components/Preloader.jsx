import React, { useEffect, useState } from 'react';

const Preloader = ({ progress, isLoaded }) => {
  const [shouldRender, setShouldRender] = useState(true);
  const [fadeClass, setFadeClass] = useState('');
  const [loadingText, setLoadingText] = useState('Initializing Core Engine...');

  useEffect(() => {
    // Elegant cycling of loading status messages
    if (progress < 25) {
      setLoadingText('Initializing Neural Engine...');
    } else if (progress < 50) {
      setLoadingText('Preloading High-Res 3D Textures...');
    } else if (progress < 75) {
      setLoadingText('Compiling Shader Pipelines...');
    } else if (progress < 100) {
      setLoadingText('Calibrating Canvas Matrix...');
    } else {
      setLoadingText('Aura Core Loaded.');
    }
  }, [progress]);

  useEffect(() => {
    if (isLoaded) {
      // Trigger elegant exit transition
      setFadeClass('fade-out');
      const timer = setTimeout(() => {
        setShouldRender(false);
      }, 900); // Must match transition duration
      return () => clearTimeout(timer);
    }
  }, [isLoaded]);

  if (!shouldRender) return null;

  // SVG parameters for the sleek circular loader
  const radius = 60;
  const strokeWidth = 3;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className={`preloader-overlay ${fadeClass}`}>
      {/* Dynamic ambient cyber glow blobs */}
      <div className="loader-blob primary-blob"></div>
      <div className="loader-blob secondary-blob"></div>

      <div className="loader-container">
        {/* Dynamic circular loader ring */}
        <div className="svg-wrapper">
          <svg className="spin-slow" width="140" height="140">
            {/* Background ring */}
            <circle
              cx="70"
              cy="70"
              r={radius}
              fill="transparent"
              stroke="rgba(255, 255, 255, 0.03)"
              strokeWidth={strokeWidth}
            />
            {/* Active animated progress ring */}
            <circle
              cx="70"
              cy="70"
              r={radius}
              fill="transparent"
              stroke="url(#loaderGradient)"
              strokeWidth={strokeWidth + 1}
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              transform="rotate(-90 70 70)"
              style={{ transition: 'stroke-dashoffset 0.15s ease-out' }}
            />
            <defs>
              <linearGradient id="loaderGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00f2fe" />
                <stop offset="50%" stopColor="#4facfe" />
                <stop offset="100%" stopColor="#aa3bff" />
              </linearGradient>
            </defs>
          </svg>
          <div className="progress-number">
            <span>{Math.round(progress)}</span>
            <span className="percent-sign">%</span>
          </div>
        </div>

        {/* Status Messages */}
        <div className="loader-text-group">
          <h2 className="loader-title font-display">Zenelait Infotech</h2>
          <p className="loader-status-msg">{loadingText}</p>
          <div className="loading-bar-track">
            <div 
              className="loading-bar-fill" 
              style={{ width: `${progress}%`, transition: 'width 0.15s ease-out' }}
            ></div>
          </div>
          <p className="loader-subtext">Preloading premium 3D mesh vectors and interactive layout frame components.</p>
        </div>
      </div>

      <style>{`
        .preloader-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background-color: #020203;
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          transition: transform 0.9s cubic-bezier(0.85, 0, 0.15, 1), opacity 0.8s ease-out;
        }

        .preloader-overlay.fade-out {
          transform: translateY(-100%);
          opacity: 0;
          pointer-events: none;
        }

        /* Ambient neon lights in loading screen */
        .loader-blob {
          position: absolute;
          width: 400px;
          height: 400px;
          border-radius: 50%;
          filter: blur(120px);
          opacity: 0.15;
          z-index: 1;
          pointer-events: none;
        }

        .primary-blob {
          top: 20%;
          left: 15%;
          background: radial-gradient(circle, var(--primary) 0%, transparent 70%);
          animation: floatBlob1 12s infinite alternate ease-in-out;
        }

        .secondary-blob {
          bottom: 20%;
          right: 15%;
          background: radial-gradient(circle, var(--accent) 0%, transparent 70%);
          animation: floatBlob2 15s infinite alternate ease-in-out;
        }

        @keyframes floatBlob1 {
          0% { transform: translate(0, 0) scale(1); }
          100% { transform: translate(50px, -40px) scale(1.1); }
        }

        @keyframes floatBlob2 {
          0% { transform: translate(0, 0) scale(1.1); }
          100% { transform: translate(-60px, 30px) scale(0.9); }
        }

        .loader-container {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2.5rem;
          text-align: center;
        }

        .svg-wrapper {
          position: relative;
          width: 140px;
          height: 140px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .progress-number {
          position: absolute;
          display: flex;
          align-items: baseline;
          justify-content: center;
          font-family: var(--font-display);
          font-weight: 800;
          font-size: 2.25rem;
          color: var(--text-primary);
          text-shadow: 0 0 20px rgba(0, 242, 254, 0.4);
        }

        .percent-sign {
          font-size: 1rem;
          font-weight: 500;
          color: var(--primary);
          margin-left: 1px;
        }

        .loader-text-group {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.75rem;
          max-width: 400px;
          padding: 0 1rem;
        }

        .loader-title {
          font-size: 1.5rem;
          font-weight: 900;
          letter-spacing: 0.6em;
          color: var(--text-primary);
          margin-bottom: 0.5rem;
          padding-left: 0.6em; /* balance letter spacing */
          background: linear-gradient(135deg, #fff 0%, #708090 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .loader-status-msg {
          font-size: 0.9rem;
          color: var(--text-secondary);
          font-weight: 500;
          min-height: 1.5rem;
          letter-spacing: 0.05em;
        }

        .loading-bar-track {
          width: 220px;
          height: 2px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 4px;
          overflow: hidden;
          margin: 0.5rem 0;
        }

        .loading-bar-fill {
          height: 100%;
          background: linear-gradient(90deg, var(--primary) 0%, var(--accent) 100%);
          box-shadow: 0 0 8px var(--primary);
          border-radius: 4px;
        }

        .loader-subtext {
          font-size: 0.75rem;
          color: var(--text-muted);
          line-height: 1.4;
        }
      `}</style>
    </div>
  );
};

export default Preloader;
