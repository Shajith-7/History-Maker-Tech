import React from 'react';
import { CONFIG } from '../data/siteData';

export default function Hero() {
  return (
    <section id="home">
      <div className="container hero-container">
        {/* Main Centered Content */}
        <div className="hero-content">
          <h1 className="hero-heading reveal stagger-1">
            Digital Solutions for <span className="gold-gradient-text">Your Business</span>
          </h1>

          <p className="hero-subhead reveal stagger-2">
            We build powerful websites, custom software, mobile applications, and intelligent automation solutions that help businesses work smarter, scale faster, and grow with confidence.
          </p>

          <div className="hero-ctas reveal stagger-3">
            <a
              href={`https://wa.me/${CONFIG.whatsappNumber}?text=Hello%20History%20Maker%20Tech,%20I'd%20like%20to%20start%20a%20project.`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold magnetic"
            >
              <span>Start Your Project</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </a>
            <a href="#services" className="btn-secondary magnetic">
              <span>Explore Our Services</span>
            </a>
          </div>
        </div>

        {/* Full-Width Bottom Bar Anchoring the 100vh Screen */}
        <div className="hero-bottom-bar reveal stagger-4">
          <div className="hero-trust">
            <span className="trust-dot"></span>
            <span>BUILD · AUTOMATE · GROWTH</span>
          </div>

          <a href="#about" className="hero-scroll-indicator" aria-label="Scroll down to About section">
            <span>SCROLL TO EXPLORE</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <polyline points="19 12 12 19 5 12"></polyline>
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
