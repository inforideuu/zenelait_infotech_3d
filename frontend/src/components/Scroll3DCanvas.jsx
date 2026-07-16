import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const FRAME_EXTENSION = "png"; // Configurable extension: "webp" or "png"

const SHORT_NOTES = [
  "Zenelait Infotech Leading digital transformations with robust, scalable enterprise ERP engines.",
  "Securing core corporate grids using multi-factor biometric authentication.",
  "Redefining workspace operations through cloud-managed digital learning systems.",
  "Powering microservice-driven billing pipelines handling ultra-high transaction metrics.",
  "Automating enterprise scale customer operations with neural conversational AI agents."
];

const Scroll3DCanvas = ({ onLoadProgress, onLoadComplete }) => {
  console.log('[Scroll3DCanvas] Component Rendered, setting up refs');
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const textRefs = useRef([]);
  textRefs.current = [];

  const buttonGroupRef = useRef(null);

  const [imagesLoaded, setImagesLoaded] = useState(false);
  const scrollObj = useRef({ currentFrame: 1 });

  // Performance Cache and Refs
  const imagesRef = useRef([]);
  const loadedFramesRef = useRef(new Set());
  const lastRenderedFrameRef = useRef(-1);
  const animationFrameIdRef = useRef(null);
  const resizeTimeoutRef = useRef(null);
  const canvasCtxRef = useRef(null);
  const canvasSizeRef = useRef({ width: 0, height: 0 });
  const imageScaleCacheRef = useRef({});
  const nextFrameToRenderRef = useRef(1);
  const isDrawingScheduledRef = useRef(false);

  // Accessibility Check
  const prefersReducedMotion = useRef(
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );

  const addToRefs = (el) => {
    if (el && !textRefs.current.includes(el)) {
      textRefs.current.push(el);
    }
  };

  // requestAnimationFrame Drawing Loop
  const performDraw = () => {
    isDrawingScheduledRef.current = false;
    const index = nextFrameToRenderRef.current;

    const canvas = canvasRef.current;
    if (!canvas) {
      console.warn('[Scroll3DCanvas] Draw failed: canvas is null');
      return;
    }

    if (!canvasCtxRef.current) {
      canvasCtxRef.current = canvas.getContext('2d');
    }
    const context = canvasCtxRef.current;

    // Retrieve image or find closest preloaded fallback frame
    let img = imagesRef.current[index];
    if (!img) {
      let closestIdx = -1;
      let minDiff = Infinity;
      loadedFramesRef.current.forEach((loadedIdx) => {
        const diff = Math.abs(loadedIdx - index);
        if (diff < minDiff) {
          minDiff = diff;
          closestIdx = loadedIdx;
        }
      });
      if (closestIdx !== -1) {
        img = imagesRef.current[closestIdx];
        console.log(`[Scroll3DCanvas] Requested frame ${index} not loaded. Using fallback ${closestIdx}`);
      }
    }

    if (!img) {
      console.warn(`[Scroll3DCanvas] Draw failed: image for frame ${index} (or fallback) is not available`);
      return;
    }

    if (!img.complete) {
      console.warn(`[Scroll3DCanvas] Draw failed: image for frame ${index} is not complete`);
      return;
    }

    if (img.naturalWidth === 0) {
      console.warn(`[Scroll3DCanvas] Draw failed: image for frame ${index} naturalWidth is 0`);
      return;
    }

    const canvasWidth = canvasSizeRef.current.width;
    const canvasHeight = canvasSizeRef.current.height;

    if (canvasWidth === 0 || canvasHeight === 0) {
      console.warn('[Scroll3DCanvas] Draw failed: canvas dimensions are 0', { canvasWidth, canvasHeight });
      return;
    }

    // Draw only when frame changes
    if (index === lastRenderedFrameRef.current) {
      // Re-draw is allowed if canvas size changes, but otherwise skip
      console.log(`[Scroll3DCanvas] Frame ${index} already rendered.`);
    }

    const cacheKey = `${canvasWidth}x${canvasHeight}_${img.naturalWidth}x${img.naturalHeight}`;
    let scaleData = imageScaleCacheRef.current[cacheKey];

    if (!scaleData) {
      const imgWidth = img.naturalWidth;
      const imgHeight = img.naturalHeight;
      // Over-scale by 5% to crop out edge watermarks/logos
      const ratio = Math.max(canvasWidth / imgWidth, canvasHeight / imgHeight) * 1.05;
      const newWidth = imgWidth * ratio;
      const newHeight = imgHeight * ratio;
      // Center horizontally, slightly shift upward to push the bottom-right watermark out of bounds
      const x = (canvasWidth - newWidth) / 2;
      const y = (canvasHeight - newHeight) * 0.4;

      scaleData = { x, y, width: newWidth, height: newHeight };
      imageScaleCacheRef.current[cacheKey] = scaleData;
    }

    context.clearRect(0, 0, canvasWidth, canvasHeight);
    context.drawImage(img, scaleData.x, scaleData.y, scaleData.width, scaleData.height);
    console.log(`[Scroll3DCanvas] Successfully drew frame ${index} on canvas`);
    lastRenderedFrameRef.current = index;
  };

  const cancelScheduledDraw = () => {
    if (animationFrameIdRef.current) {
      cancelAnimationFrame(animationFrameIdRef.current);
      animationFrameIdRef.current = null;
    }
    isDrawingScheduledRef.current = false;
  };

  const requestDraw = (index) => {
    nextFrameToRenderRef.current = index;
    if (!isDrawingScheduledRef.current) {
      isDrawingScheduledRef.current = true;
      animationFrameIdRef.current = requestAnimationFrame(performDraw);
    }
  };

  // 1. Progressive Image Loading System
  useEffect(() => {
    const totalFrames = 151;
    const stage1Count = 15;
    let loadedCount = 0;

    onLoadProgress(5);

    const decodeAndCacheImage = (index) => {
      return new Promise((resolve) => {
        const img = new Image();
        const frameNum = index.toString().padStart(3, '0');
        const srcUrl = `/hero_images/ezgif-frame-${frameNum}.${FRAME_EXTENSION}`;
        console.log(`[Scroll3DCanvas] decodeAndCacheImage called for index ${index}, src: ${srcUrl}`);

        const handleLoad = async () => {
          try {
            if ('decode' in img) {
              await img.decode();
            }
          } catch (e) {
            // Ignore decode failures and continue
          }

          imagesRef.current[index] = img;
          loadedFramesRef.current.add(index);

          loadedCount++;
          const progress = Math.round(5 + (loadedCount / totalFrames) * 95);
          onLoadProgress(progress);

          // Complete Stage 1 Immediately
          if (loadedFramesRef.current.size >= stage1Count && !imagesLoaded) {
            setImagesLoaded(true);
            onLoadComplete(true);
          }

          // Initial draw triggers once frame 1 is loaded
          if (index === 1 && lastRenderedFrameRef.current === -1) {
            requestDraw(1);
          }

          // If motion-reduced, render final frame directly
          if (prefersReducedMotion.current && index === totalFrames) {
            requestDraw(totalFrames);
          }
          resolve();
        };

        const handleError = (e) => {
          console.error(`[Scroll3DCanvas] Failed to load image at index ${index}`, e);
          loadedCount++;
          const progress = Math.round(5 + (loadedCount / totalFrames) * 95);
          onLoadProgress(progress);
          resolve();
        };

        img.onload = handleLoad;
        img.onerror = handleError;
        img.src = `/hero_images/ezgif-frame-${frameNum}.${FRAME_EXTENSION}`;
      });
    };

    // Load Stage 1 + Last frame immediately
    const stage1Indices = [];
    for (let i = 1; i <= stage1Count; i++) {
      stage1Indices.push(i);
    }
    if (!stage1Indices.includes(totalFrames)) {
      stage1Indices.push(totalFrames);
    }

    Promise.all(stage1Indices.map(decodeAndCacheImage)).then(() => {
      // Stage 2 background loads
      const stage2Indices = [];
      for (let i = 1; i <= totalFrames; i++) {
        if (!stage1Indices.includes(i)) {
          stage2Indices.push(i);
        }
      }
      // Load stage 2 sequentially
      stage2Indices.forEach((idx) => {
        decodeAndCacheImage(idx);
      });
    });

    return () => {
      imagesRef.current = [];
      loadedFramesRef.current.clear();
      cancelScheduledDraw();
    };
  }, []);

  // 2. Debounced Canvas Resize
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleResize = () => {
      canvasSizeRef.current.width = window.innerWidth;
      canvasSizeRef.current.height = window.innerHeight;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      imageScaleCacheRef.current = {};

      const frameToDraw = prefersReducedMotion.current ? 151 : scrollObj.current.currentFrame;
      requestDraw(frameToDraw);
    };

    const debouncedResize = () => {
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }
      resizeTimeoutRef.current = setTimeout(handleResize, 100);
    };

    window.addEventListener('resize', debouncedResize);
    handleResize(); // trigger initial call

    return () => {
      window.removeEventListener('resize', debouncedResize);
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }
    };
  }, [imagesLoaded]);

  // 3. ScrollTrigger Timeline setup
  useEffect(() => {
    if (!imagesLoaded) return;

    // Trigger initial frame render
    requestDraw(prefersReducedMotion.current ? 151 : 1);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: '+=400%',
        scrub: 0.5,
        pin: !prefersReducedMotion.current,
        onUpdate: (self) => {
          if (prefersReducedMotion.current) return;

          let frameIndex;
          // Final laptop frame stays visible for last 20% of scroll
          if (self.progress <= 0.8) {
            const normalizedProgress = self.progress / 0.8;
            frameIndex = Math.min(
              151,
              Math.max(1, Math.floor(normalizedProgress * 150) + 1)
            );
          } else {
            frameIndex = 151;
          }
          scrollObj.current.currentFrame = frameIndex;
          requestDraw(frameIndex);
        }
      }
    });

    if (!prefersReducedMotion.current) {
      // Synchronized Camera Zoom Animation (1.00 -> 1.08)
      tl.fromTo(canvasRef.current,
        { scale: 1 },
        { scale: 1.08, ease: 'none', duration: 1 },
        0
      );
    }

    // Sequence Keynote-grade animations for text
    const activeTextRange = 0.8;
    const segmentDuration = activeTextRange / SHORT_NOTES.length;

    textRefs.current.forEach((textEl, idx) => {
      if (prefersReducedMotion.current) {
        gsap.set(textEl, { opacity: idx === 0 ? 1 : 0 });
        return;
      }

      // Initial high-fidelity staging
      gsap.set(textEl, {
        opacity: 0,
        y: 60,
        scale: 0.9,
        z: -100,
        rotateX: -45,
        filter: 'blur(15px)',
        transformOrigin: 'center center'
      });

      const start = idx * segmentDuration;
      const mid = start + segmentDuration * 0.4;
      const holdEnd = start + segmentDuration * 0.7;

      // Fade In + Move + Scale + Sharp + RotateX + Z depth
      tl.to(textEl, {
        opacity: 1,
        y: 0,
        scale: 1,
        z: 0,
        rotateX: 0,
        filter: 'blur(0px)',
        duration: segmentDuration * 0.4,
        ease: 'power2.out',
      }, start);

      // Subtle hold drift
      tl.to(textEl, {
        y: -10,
        scale: 1.02,
        duration: segmentDuration * 0.3,
        ease: 'none'
      }, mid);

      // Outward transition
      tl.to(textEl, {
        opacity: 0,
        y: -50,
        scale: 1.05,
        filter: 'blur(10px)',
        duration: segmentDuration * 0.3,
        ease: 'power2.in',
      }, holdEnd);
    });

    // buttonGroupRef entry animation (at the end, progress 0.85 to 1.0)
    if (buttonGroupRef.current) {
      if (prefersReducedMotion.current) {
        gsap.set(buttonGroupRef.current, { opacity: 1, y: 0, scale: 1 });
      } else {
        gsap.set(buttonGroupRef.current, { opacity: 0, y: 30, scale: 0.95 });
        tl.to(buttonGroupRef.current, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.15,
          ease: 'power3.out'
        }, 0.85);
      }
    }



    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach(t => {
        if (t.trigger === containerRef.current) {
          t.kill();
        }
      });
      cancelScheduledDraw();
    };
  }, [imagesLoaded]);

  return (
    <div id="experience" ref={containerRef} className="cinematic-hero-section">
      {/* Scroll-Based Image Sequence Canvas */}
      <canvas ref={canvasRef} className="hero-bg-canvas" />

      {/* Volumetric Dark Overlay to keep text perfectly readable */}
      <div className="hero-video-tint-overlay"></div>

      {/* Cinematic Vignette */}
      <div className="cinematic-vignette"></div>

      {/* Subtle Ambient Glow */}
      <div className="ambient-glow"></div>

      {/* Film Grain Layer */}
      <div className="film-grain-container">
        <svg className="film-grain-svg">
          <filter id="noiseFilter">
            <feTurbulence type="fractalNoise" baseFrequency="0.6" numOctaves="3" stitchTiles="stitch" />
            <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.04 0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noiseFilter)" />
        </svg>
      </div>

      {/* Floating Center Narrative Perspective Viewport */}
      <div className="cinematic-perspective-portal">
        {SHORT_NOTES.map((note, idx) => (
          <h6
            key={idx}
            ref={addToRefs}
            className="hero-center-short-note font-display"
            style={{ position: 'absolute' }}
          >
            {note}
          </h6>
        ))}
      </div>

      {/* Hero CTA Button Group */}
      <div ref={buttonGroupRef} className="hero-cta-button-group">
        <button className="btn-premium-primary" onClick={() => window.location.hash = '#contact'}>
          Start Transformation
        </button>
        <button className="btn-premium-secondary" onClick={() => window.location.hash = '#services'}>
          Explore Solutions
        </button>
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

        .hero-bg-canvas {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: block;
          z-index: 1;
          filter: brightness(1.25) contrast(1.2) saturate(1.5);
          transform-origin: center center;
          will-change: transform;
        }

        /* Subtle linear dark tint for extreme typographic contrast */
        .hero-video-tint-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(2, 2, 3, 0.2);
          z-index: 2;
          pointer-events: none;
        }

        /* Premium Cinematic Vignette */
        .cinematic-vignette {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: radial-gradient(circle, transparent 40%, rgba(2, 2, 3, 0.7) 100%);
          z-index: 2;
          pointer-events: none;
        }

        /* Subtle Ambient Glow */
        .ambient-glow {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 80%;
          height: 80%;
          transform: translate(-50%, -50%);
          background: radial-gradient(circle, rgba(99, 102, 241, 0.07) 0%, transparent 70%);
          z-index: 2;
          pointer-events: none;
          mix-blend-mode: screen;
        }

        /* Animated Film Grain Overlay */
        .film-grain-container {
          position: absolute;
          top: -10%;
          left: -10%;
          width: 120%;
          height: 120%;
          z-index: 3;
          pointer-events: none;
          overflow: hidden;
        }

        .film-grain-svg {
          width: 100%;
          height: 100%;
          opacity: 0.8;
          animation: grainAnimation 1s steps(4) infinite;
        }

        @keyframes grainAnimation {
          0%, 100% { transform: translate(0, 0); }
          10% { transform: translate(-1%, -1%); }
          30% { transform: translate(-2%, -2%); }
          50% { transform: translate(-1%, -3%); }
          70% { transform: translate(-3%, -1%); }
          90% { transform: translate(-2%, -1%); }
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
          height: 200px;
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
          width: 100%;
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

        /* Hero CTA Button Group CSS */
        .hero-cta-button-group {
          position: absolute;
          bottom: 12%;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 16px;
          z-index: 7;
          pointer-events: auto;
        }

        .btn-premium-primary {
          padding: 14px 30px;
          background: linear-gradient(135deg, #6366f1 0%, #a855f7 100%);
          color: #ffffff;
          font-family: 'Poppins', sans-serif;
          font-weight: 600;
          font-size: 0.95rem;
          border-radius: 30px;
          border: none;
          cursor: pointer;
          box-shadow: 0 10px 25px rgba(99, 102, 241, 0.35);
          transition: transform 0.2s, box-shadow 0.2s, filter 0.2s;
        }

        .btn-premium-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 15px 30px rgba(99, 102, 241, 0.45);
          filter: brightness(1.1);
        }

        .btn-premium-secondary {
          padding: 14px 30px;
          background: rgba(255, 255, 255, 0.05);
          color: #ffffff;
          font-family: 'Poppins', sans-serif;
          font-weight: 600;
          font-size: 0.95rem;
          border-radius: 30px;
          border: 1px solid rgba(255, 255, 255, 0.15);
          cursor: pointer;
          backdrop-filter: blur(12px);
          transition: background-color 0.2s, transform 0.2s, border-color 0.2s;
        }

        .btn-premium-secondary:hover {
          background-color: rgba(255, 255, 255, 0.1);
          border-color: rgba(255, 255, 255, 0.3);
          transform: translateY(-2px);
        }

        @media (max-width: 768px) {
          .hero-cta-button-group {
            bottom: 8%;
            width: 90%;
            justify-content: center;
          }

          .btn-premium-primary, .btn-premium-secondary {
            padding: 12px 20px;
            font-size: 0.85rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Scroll3DCanvas;
