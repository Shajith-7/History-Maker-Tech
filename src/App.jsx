import React, { useState } from 'react';
import Preloader from './components/Preloader';
import AmbientBackground from './components/AmbientBackground';
import CinematicEffects from './components/CinematicEffects';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Testimonials from './components/Testimonials';
import Faq from './components/Faq';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="app-root">
      {/* Autonomous Preloader */}
      <Preloader onComplete={() => setLoaded(true)} />

      {/* Clean, High-End Ambient Background (Zero balloon lag) */}
      <AmbientBackground />

      {/* Lenis Smooth Scrolling, Subtle Glows & Dual Cursor */}
      <CinematicEffects />

      {/* Main Website Structure */}
      <div className="site-wrapper">
        <Header />
        <main>
          <Hero />
          <About />
          <Services />
          <Testimonials />
          <Faq />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  );
}
