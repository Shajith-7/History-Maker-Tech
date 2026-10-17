import React, { useRef, useState } from 'react';
import { CONFIG } from '../data/siteData';

const COMPANY_PILLARS = [
  {
    num: "01",
    badge: "ENGINEERING & AUTOMATION",
    title: "Web, Mobile App, CRM & AI Automation",
    subtitle: "Custom Digital Solutions · Intelligent Software",
    desc: "We engineer high-performance web platforms, native iOS & Android applications, tailored CRM pipelines, and intelligent AI automation workflows designed to streamline operations and drive business growth.",
    capabilities: [
      "Website & Custom Web Applications",
      "Native iOS & Android Mobile Apps",
      "Tailored CRM & Pipeline Systems",
      "AI Automations & Intelligent Workflows"
    ],
    tags: ["Web Engineering", "iOS & Android", "Custom CRM", "AI Automations", "Cloud APIs"],
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
        <polyline points="2 17 12 22 22 17"></polyline>
        <polyline points="2 12 12 17 22 12"></polyline>
      </svg>
    )
  },
  {
    num: "02",
    badge: "GROWTH & ENTERPRISE SCALE",
    title: "Digital Marketing, E-Commerce, SEO & Process Automation",
    subtitle: "Revenue Expansion · Operational Excellence",
    desc: "Accelerate your market visibility and conversion velocity. We deploy data-informed digital marketing, high-ranking SEO strategies, complete e-commerce stores, automated WhatsApp funnels, and enterprise process automations.",
    capabilities: [
      "Digital Marketing & Growth Campaigns",
      "Search Engine Optimization (SEO)",
      "High-Converting E-Commerce Stores",
      "Business Process & WhatsApp Automation"
    ],
    tags: ["Digital Marketing", "SEO Strategy", "E-Commerce", "Process Automation", "WhatsApp Bots"],
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="2" y1="12" x2="22" y2="12"></line>
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
      </svg>
    )
  }
];

const COMPANY_KEY_POINTS = [
  {
    title: "Direct Senior Developer Access",
    desc: "Collaborate directly with the engineers writing your code — zero account managers, zero telephone games, and immediate technical execution."
  },
  {
    title: "Full-Spectrum Digital Engineering",
    desc: "End-to-end development covering modern web apps, native iOS/Android applications, and bespoke CRM architectures built for scale."
  },
  {
    title: "Practical AI & Process Automation",
    desc: "Eliminate repetitive manual tasks with automated WhatsApp routing, intelligent customer pipelines, and backend system integrations."
  },
  {
    title: "100% Code & Intellectual Property Ownership",
    desc: "Transparent milestone economics with unconditional transfer of all code repositories, design assets, and production environments."
  }
];

const METRIC_PILLS = [
  { value: "100%", label: "Direct Developer Access" },
  { value: "Zero", label: "Middlemen Overhead" },
  { value: "2.5x", label: "Faster Sprint Velocity" },
  { value: "100%", label: "Code & IP Ownership" }
];

function AboutGlassCard({ pillar, index }) {
  const cardRef = useRef(null);
  const [coords, setCoords] = useState({ x: 50, y: 50 });
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -4.5;
    const rotateY = ((x - centerX) / centerX) * 4.5;

    setCoords({ x, y });
    setTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div
      ref={cardRef}
      className={`about-glass-card ${isHovered ? 'is-hovered' : ''}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: isHovered
          ? `perspective(900px) rotateX(${tilt.x.toFixed(2)}deg) rotateY(${tilt.y.toFixed(2)}deg) translateY(-4px) scale3d(1.01, 1.01, 1.01)`
          : 'perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0) scale3d(1, 1, 1)',
        transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)'
      }}
    >
      {/* Real-time Cursor Spotlight Glow */}
      <div
        className="about-card-spotlight"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(340px circle at ${coords.x}px ${coords.y}px, rgba(214, 168, 63, 0.22), rgba(47, 105, 255, 0.14), transparent 70%)`
        }}
        aria-hidden="true"
      />

      {/* Traveling Luminous Shimmer Border */}
      <div className="about-glass-card-glow" aria-hidden="true" />

      {/* Top Header with Icon and Badge */}
      <div className="about-card-header">
        <div className="about-card-icon-wrap">
          {pillar.icon}
        </div>
        <div className="about-card-badge-wrap">
          <span className="about-card-number">{pillar.num}</span>
          <span className="about-card-badge">{pillar.badge}</span>
        </div>
      </div>

      <div className="about-card-body">
        <h3 className="about-card-title">{pillar.title}</h3>
        <p className="about-card-subtitle">{pillar.subtitle}</p>
        <p className="about-card-desc">{pillar.desc}</p>

        {/* 4 Core Capabilities Grid */}
        <div className="about-card-capabilities">
          {pillar.capabilities.map((cap, cIndex) => (
            <div key={cIndex} className="about-cap-item">
              <span className="about-cap-dot" />
              <span className="about-cap-text">{cap}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Micro-Tags Footer */}
      <div className="about-card-tags">
        {pillar.tags.map((tag, tIndex) => (
          <span key={tIndex} className="about-card-tag">
            <span className="about-card-tag-dot" />
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function About() {
  return (
    <section id="about">
      {/* Ambient Glow Orbs for Real Frosted Glass Refraction */}
      <div className="about-ambient-orb about-ambient-orb-1" aria-hidden="true" />
      <div className="about-ambient-orb about-ambient-orb-2" aria-hidden="true" />

      <div className="container about-fullscreen-container">
        <div className="about-fullscreen-grid">
          {/* Left Column: Company Story, Identity & Added Key Points */}
          <div className="about-left-col reveal stagger-1">
            <div className="about-left-top">
              {/* Live Studio Status Eyebrow Badge */}
              <div className="about-live-badge">
                <span className="about-pulse-dot" />
                <span className="about-live-text">DIRECT-TO-DEVELOPER ENGINEERING STUDIO</span>
              </div>

              <h2 className="section-heading about-main-heading">
                High-Impact Software Engineering. <br />
                <span className="gold-gradient-text">Zero Agency Bloat.</span>
              </h2>

              <p className="about-intro-text">
                History Maker Tech is an engineering-first digital studio. We eliminate non-technical intermediaries, inflated agency overheads, and communication silos to deliver modern web apps, enterprise systems, and intelligent automations designed for measurable business growth.
              </p>

              {/* Added Key Points Below the Paragraph as Requested */}
              <div className="about-company-points">
                {COMPANY_KEY_POINTS.map((pt, pIdx) => (
                  <div key={pIdx} className="about-point-item">
                    <span className="about-point-icon">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </span>
                    <div className="about-point-content">
                      <strong className="about-point-title">{pt.title}: </strong>
                      <span className="about-point-desc">{pt.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="about-left-bottom">
              {/* 4 Interactive Metric Pills */}
              <div className="about-metrics-pills">
                {METRIC_PILLS.map((pill, i) => (
                  <div key={i} className="about-pill-item">
                    <div className="about-pill-top">
                      <span className="about-pill-value gold-gradient-text">{pill.value}</span>
                      <span className="about-pill-dot" />
                    </div>
                    <span className="about-pill-text">{pill.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: 2 Glowing 3D Glassmorphism Cards + 2 Action CTAs */}
          <div className="about-right-cards reveal stagger-2">
            {COMPANY_PILLARS.map((pillar, index) => (
              <AboutGlassCard key={index} pillar={pillar} index={index} />
            ))}

            {/* Direct Action Buttons on the Right Side as Requested */}
            <div className="about-cta-row">
              <a
                href={`https://wa.me/${CONFIG.whatsappNumber}?text=Hello%20History%20Maker%20Tech,%20I'd%20like%20to%20discuss%20a%20project%20directly%20with%20your%20developers.`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold magnetic"
              >
                <span>Talk With Our Developers</span>
              </a>
              <a href="#services" className="about-secondary-link">
                <span>Explore All Services</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
