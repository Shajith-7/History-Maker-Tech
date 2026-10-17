import React, { useState, useEffect } from 'react';
import Preloader from './components/Preloader';
import AmbientBackground from './components/AmbientBackground';
import CinematicEffects from './components/CinematicEffects';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ProjectsPage from './pages/ProjectsPage';
import CoursesPage from './pages/CoursesPage';

function getInitialPage() {
  const path = window.location.pathname.toLowerCase();
  if (path.includes('project')) return 'projects';
  if (path.includes('course')) return 'courses';
  return 'home';
}

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [currentPage, setCurrentPage] = useState(getInitialPage);

  // Sync with browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPage(getInitialPage());
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleNavigate = (page, hash = null) => {
    let url = '/';
    if (page === 'projects') url = '/projects';
    else if (page === 'courses') url = '/courses';
    else if (hash && hash !== 'home') url = `/#${hash}`;

    if (window.location.pathname !== url) {
      window.history.pushState(null, '', url);
    }

    setCurrentPage(page);

    // If navigating to projects or courses, scroll to top
    if (page !== 'home') {
      window.scrollTo({ top: 0, behavior: 'instant' });
      if (window.__lenis) {
        window.__lenis.scrollTo(0, { immediate: true });
      }
    } else if (hash) {
      // Allow DOM to render home then scroll to section
      setTimeout(() => {
        const el = document.getElementById(hash);
        if (el) {
          if (window.__lenis) {
            window.__lenis.scrollTo(el, { offset: -72, duration: 1.2 });
          } else {
            el.scrollIntoView({ behavior: 'smooth' });
          }
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }, 60);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      if (window.__lenis) {
        window.__lenis.scrollTo(0, { immediate: false, duration: 1.0 });
      }
    }
  };

  return (
    <div className="app-root">
      {/* Autonomous Preloader */}
      <Preloader onComplete={() => setLoaded(true)} />

      {/* Cyberpunk 3D Scrolling Background */}
      <AmbientBackground />

      {/* Lenis Butter-Smooth Scrolling & Cinematic Glows */}
      <CinematicEffects />

      {/* Main Website Structure */}
      <div className="site-wrapper">
        <Header currentPage={currentPage} onNavigate={handleNavigate} />
        <main>
          {currentPage === 'projects' && (
            <ProjectsPage onNavigate={handleNavigate} />
          )}
          {currentPage === 'courses' && (
            <CoursesPage onNavigate={handleNavigate} />
          )}
          {currentPage === 'home' && (
            <HomePage onNavigate={handleNavigate} />
          )}
        </main>
        <Footer onNavigate={handleNavigate} />
      </div>
    </div>
  );
}
