import React from 'react';
import { CONFIG } from '../data/siteData';

export default function Hero() {
  const capabilities = [
    'Bespoke Web Engineering',
    'Custom CRM & ERP Platforms',
    'iOS & Android Mobile Apps',
    'Autonomous AI Automation',
    'Cloud Architecture & DevOps',
    'Direct-to-Developer Speed',
    'Enterprise Security & SLA'
  ];

  return (
    <section id="home">
      <div className="container hero-container">
        {/* Main Centered Content */}
        <div className="hero-content">
          {/* Glowing Eyebrow Pill with Pulse Beacon */}
          <div className="hero-eyebrow-pill reveal stagger-1 hanging-pill">
            <span className="eyebrow-pulse-core"></span>
            <span className="eyebrow-text">BUILD · AUTOMATE · GROWTH</span>
            <span className="eyebrow-spark">✦</span>
          </div>

          {/* Multi-Layer Glowing & Shimmering Heading */}
          <h1 className="hero-heading reveal stagger-2">
            <span className="hero-heading-lead">Digital Solutions for</span>
            <span className="gold-glowing-wrapper">
              <span className="gold-glowing-title">Your Business</span>
              <span className="gold-glowing-aura" aria-hidden="true">Your Business</span>
            </span>
          </h1>

          <p className="hero-subhead reveal stagger-3">
            We build powerful websites, custom software, mobile applications, and intelligent automation solutions that help businesses work smarter, scale faster, and grow with confidence.
          </p>

          {/* Action CTAs with Glowing Hover Auroras */}
          <div className="hero-ctas reveal stagger-3">
            <a
              href={`https://wa.me/${CONFIG.whatsappNumber}?text=Hello%20History%20Maker%20Tech,%20I'd%20like%20to%20start%20a%20project.`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold magnetic hero-btn-glow"
            >
              <span>Start Your Project</span>
              <span className="btn-shine-sweep"></span>
            </a>
            <a href="#services" className="btn-secondary magnetic hero-btn-glass">
              <span>Explore Our Services</span>
            </a>
          </div>

          {/* Sliding Capabilities Marquee Ticker */}
          <div className="hero-sliding-tape-wrap reveal stagger-4" aria-label="Core Capabilities">
            <div className="hero-sliding-track">
              {[...capabilities, ...capabilities].map((cap, idx) => (
                <span key={idx} className="hero-tape-item">
                  <span className="tape-dot">✦</span>
                  <span className="tape-text">{cap}</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
