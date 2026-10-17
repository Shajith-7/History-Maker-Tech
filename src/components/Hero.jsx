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
            </a>
            <a href="#services" className="btn-secondary magnetic">
              <span>Explore Our Services</span>
            </a>
          </div>
        </div>

        {/* Full-Width Bottom Bar Anchoring the 100vh Screen */}
        <div className="hero-bottom-bar reveal stagger-4" style={{ justifyContent: 'center' }}>
          <div className="hero-trust">
            <span className="trust-dot"></span>
            <span>BUILD · AUTOMATE · GROWTH</span>
          </div>
        </div>
      </div>
    </section>
  );
}
