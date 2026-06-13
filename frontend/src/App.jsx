import React, { useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

// Global Layout Components
import Preloader from './components/Preloader';
import Navbar from './components/Navbar';
import Scroll3DCanvas from './components/Scroll3DCanvas';
import FeatureShowcase from './components/FeatureShowcase';
import FooterSection from './components/FooterSection';
import IntroSection from './components/IntroSection';
import StatsSection from './components/StatsSection';
import IndustriesSection from './components/IndustriesSection';

// Dynamic CMS Managed Sub-Pages
import AboutPage from './components/pages/AboutPage';
import ServicesPage from './components/pages/ServicesPage';
import CapabilitiesPage from './components/pages/CapabilitiesPage';
import ProjectsPage from './components/pages/ProjectsPage';
import CareersPage from './components/pages/CareersPage';
import GetInTouchPage from './components/pages/GetInTouchPage';
import AdminDashboard from './components/AdminDashboard';
import MethodologyPage from './components/pages/MethodologyPage';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [loadProgress, setLoadProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showContent, setShowContent] = useState(false);
  
  // Hash Routing State
  const [currentHash, setCurrentHash] = useState(window.location.hash);

  // 1. Reactive Hash Route Listener
  useEffect(() => {
    const handleHashChange = () => {
      setCurrentHash(window.location.hash);
      // Smoothly snap browser window to the top on page routes transition
      window.scrollTo({ top: 0, behavior: 'instant' });
      // Clear out active scroll triggers from previous views
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      ScrollTrigger.refresh();
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // 2. Initialize Lenis Smooth Scroll physics globally (synced with GSAP ScrollTrigger)
  useEffect(() => {
    // Only launch smoothscroll after loading completed or if we are loaded in other portals directly
    const isSubPage = currentHash !== '' && currentHash !== '#' && currentHash !== '#admin';
    if (!isLoaded && !isSubPage) return;

    const launchScroll = () => {
      setShowContent(true);
      
      const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Fast initial snap, organic momentum damping
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1.0,
        touchMultiplier: 1.5,
        infinite: false,
      });

      // Bind ScrollTrigger calculations to Lenis ticks
      lenis.on('scroll', ScrollTrigger.update);

      const updatePhysics = (time) => {
        lenis.raf(time * 1000);
      };
      
      gsap.ticker.add(updatePhysics);
      gsap.ticker.lagSmoothing(0); // Eliminate lag jumps on browser context switching
      
      ScrollTrigger.refresh();

      return () => {
        lenis.destroy();
        gsap.ticker.remove(updatePhysics);
      };
    };

    // Tiny timeout to let preloader fade completed smoothly
    const timer = setTimeout(launchScroll, isSubPage ? 100 : 800);
    return () => clearTimeout(timer);
  }, [isLoaded, currentHash]);

  // 3. Routing Switch Matrix
  const renderViewContent = () => {
    const baseHash = currentHash.split('?')[0];
    switch (baseHash) {
      case '#about-us':
        return <AboutPage />;
      case '#services':
        return <ServicesPage />;
      case '#methodology':
        return <MethodologyPage />;
      case '#capabilities':
        return <CapabilitiesPage />;
      case '#projects':
        return <ProjectsPage />;
      case '#careers':
        return <CareersPage />;
      case '#contact':
        return <GetInTouchPage />;
      case '#admin':
        return <AdminDashboard />;
      default:
        // Core Cinematic 3D Scroll Hero Homepage
        return (
          <>
            {/* Cinematic 3D Scroll Scrubbing Section */}
            <Scroll3DCanvas 
              onLoadProgress={setLoadProgress} 
              onLoadComplete={setIsLoaded} 
            />
            {showContent && (
              <>
                <IntroSection />
                <StatsSection />
                <FeatureShowcase />
                <IndustriesSection />
              </>
            )}
          </>
        );
    }
  };

  // Determine if we need loader overlay displays
  const baseHash = currentHash.split('?')[0];
  const isHomepage = baseHash === '' || baseHash === '#';
  const isAdminView = baseHash === '#admin';

  return (
    <>
      {/* Preloader overlay displayed strictly on initial homepage loads */}
      {isHomepage && <Preloader progress={loadProgress} isLoaded={isLoaded} />}

      {/* Main View Wrapper */}
      <div 
        className={`experience-root ${
          isHomepage ? (isLoaded ? 'loaded' : 'loading') : 'loaded'
        }`}
      >
        
        {/* Render sticky floating Navbar (bypassed inside Admin Console view) */}
        {!isAdminView && <Navbar />}

        {/* Dynamic page router body */}
        <div className="view-content-portal">
          {renderViewContent()}
        </div>

        {/* Footer Section appended globally (except inside Admin Console view) */}
        {!isAdminView && showContent && <FooterSection />}

      </div>

      <style>{`
        .experience-root {
          width: 100%;
          min-height: 100vh;
          background-color: #020203;
          opacity: 0;
          transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .experience-root.loaded {
          opacity: 1;
        }

        .experience-root.loading {
          pointer-events: none;
          max-height: 100vh;
          overflow: hidden;
        }

        .view-content-portal {
          position: relative;
          width: 100%;
        }
      `}</style>
    </>
  );
}

export default App;
