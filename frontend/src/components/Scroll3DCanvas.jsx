import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const SHORT_NOTES = [
  "Zenelait Infotech Leading digital transformations with robust, scalable enterprise ERP engines.",
  "Securing core corporate grids using multi-factor biometric authentication.",
  "Redefining workspace operations through cloud-managed digital learning systems.",
  "Powering microservice-driven billing pipelines handling ultra-high transaction metrics.",
  "Automating enterprise scale customer operations with neural conversational AI agents."
];

const Scroll3DCanvas = ({ onLoadProgress, onLoadComplete }) => {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const textRef = useRef(null);
  const [noteIdx, setNoteIdx] = useState(0);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  // Video Load Monitoring
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    onLoadProgress(30);

    const handleCanPlay = () => {
      onLoadProgress(100);
      setIsVideoLoaded(true);
      onLoadComplete(true);
    };

    video.addEventListener('canplaythrough', handleCanPlay);

    const timer = setTimeout(() => {
      if (!isVideoLoaded) {
        onLoadProgress(100);
        setIsVideoLoaded(true);
        onLoadComplete(true);
      }
    }, 2000);

    return () => {
      video.removeEventListener('canplaythrough', handleCanPlay);
      clearTimeout(timer);
    };
  }, []);

  // Initial Hollywood 3D Fade-in when Video loads
  useEffect(() => {
    if (isVideoLoaded && textRef.current) {
      gsap.set(textRef.current, {
        z: 300,
        rotateX: -45,
        filter: 'blur(20px)',
        opacity: 0
      });
      gsap.to(textRef.current, {
        opacity: 1,
        z: 0,
        rotateX: 0,
        filter: 'blur(0px)',
        duration: 2.8,
        ease: 'power3.out',
        delay: 0.5
      });
    }
  }, [isVideoLoaded]);

  // Synchronized 5-Second Scene Text Switcher with 3D Fade In Transitions
  useEffect(() => {
    if (!isVideoLoaded) return;

    const interval = setInterval(() => {
      const element = textRef.current;
      if (element) {
        // 3D Fade Out transition: sinks back in space with motion-blur and opacity
        gsap.timeline()
          .to(element, {
            opacity: 0,
            z: -200,
            rotateX: 25,
            filter: 'blur(12px)',
            duration: 0.6,
            ease: 'power2.in',
            onComplete: () => {
              // Advance to next short note
              setNoteIdx((prev) => (prev + 1) % SHORT_NOTES.length);
              // Instantly stage in front space for a dramatic fade forward
              gsap.set(element, {
                z: 300,
                rotateX: -35,
                filter: 'blur(16px)',
                opacity: 0
              });
            }
          })
          // 3D Fade In transition: emerges forward, gains clarity and settles perfectly sharp
          .to(element, {
            opacity: 1,
            z: 0,
            rotateX: 0,
            filter: 'blur(0px)',
            duration: 2.2,
            ease: 'power2.out'
          });
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [isVideoLoaded]);

  return (
    <div id="experience" ref={containerRef} className="cinematic-hero-section">

      {/* Background Autoplay Video */}
      <video
        ref={videoRef}
        src="/hero.webm"
        autoPlay
        muted
        loop
        playsInline
        className="hero-bg-video"
      />

      {/* Volumetric Dark Overlay to keep text perfectly readable & clear over video */}
      <div className="hero-video-tint-overlay"></div>

      {/* Floating Center Narrative Perspective Viewport (Pure Text, No Container) */}
      <div className="cinematic-perspective-portal">
        <h6 ref={textRef} className="hero-center-short-note font-display">
          {SHORT_NOTES[noteIdx]}
        </h6>
      </div>

      <style>{`
        .cinematic-hero-section {
          position: relative;
          width: 100vw;
          height: 100vh;
          overflow: hidden;
          background-color: #020203;
          z-index: 10;
        }

        .hero-bg-video {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          z-index: 1;
          pointer-events: none;
        }

        /* Subtle linear dark tint for extreme typographic contrast */
        .hero-video-tint-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(2, 2, 3, 0.45);
          z-index: 2;
          pointer-events: none;
        }

        /* Pure Perspective Portal centered in viewport */
        .cinematic-perspective-portal {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 5;
          width: 90%;
          max-width: 960px;
          perspective: 1200px;
          transform-style: preserve-3d;
          display: flex;
          justify-content: center;
          align-items: center;
          pointer-events: none;
        }

        /* Crystal clear premium headline typography */
        .hero-center-short-note {
          font-family: 'Poppins', sans-serif;
          font-size: 3.5rem;
          font-weight: 700;
          line-height: 1.45;
          color: #ffffff;
          text-align: center;
          letter-spacing: -0.01em;
          text-shadow: 
            0 10px 30px rgba(0, 0, 0, 0.95), 
            0 4px 10px rgba(0, 0, 0, 0.85);
          will-change: transform, opacity, filter;
          transform-style: preserve-3d;
        }

        @media (max-width: 1024px) {
          .hero-center-short-note {
            font-size: 2.65rem;
            line-height: 1.4;
          }
        }

        @media (max-width: 768px) {
          .hero-center-short-note {
            font-size: 1.95rem;
            line-height: 1.35;
          }
        }
      `}</style>

    </div>
  );
};

export default Scroll3DCanvas;
