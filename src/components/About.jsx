import React from 'react';
import { CONFIG } from '../data/siteData';

const CORE_METRICS = [
  { value: "100%", label: "Direct Developer Access", sub: "Zero account manager silos" },
  { value: "Zero", label: "Middlemen Overhead", sub: "Direct milestone pricing" },
  { value: "2.5x", label: "Faster Sprint Velocity", sub: "Spec-to-deployment cadence" },
  { value: "100%", label: "Code & IP Ownership", sub: "Full repository rights" }
];

const ARCHITECTURAL_PILLARS = [
  {
    num: "01",
    title: "Direct Senior Engineering",
    desc: "Collaborate directly with the engineers architecting and writing your software — zero account managers, zero telephone games, and immediate technical execution.",
    tag: "Direct Access",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    )
  },
  {
    num: "02",
    title: "Full-Spectrum Architecture",
    desc: "End-to-end engineering covering high-performance web applications, native iOS & Android apps, and custom enterprise CRM platforms built for scale.",
    tag: "Web · Mobile · CRM",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 2 7 12 12 22 7 12 2" />
        <polyline points="2 17 12 22 22 17" />
        <polyline points="2 12 12 17 22 12" />
      </svg>
    )
  },
  {
    num: "03",
    title: "Practical AI & Automation",
    desc: "Automate repetitive business workflows with smart WhatsApp bots, autonomous data funnels, and enterprise API integrations that work 24/7.",
    tag: "Intelligent Workflows",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
      </svg>
    )
  },
  {
    num: "04",
    title: "100% IP & Asset Ownership",
    desc: "Clean milestone economics with unconditional transfer of all source repositories, architecture documentation, design files, and production servers.",
    tag: "Total IP Rights",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <polyline points="9 12 11 14 15 10" />
      </svg>
    )
  }
];

export default function About() {
  return (
    <section id="about">
      {/* Radiant ambient glow orbs for specular depth */}
      <div className="about-ambient-orb about-ambient-orb-1" aria-hidden="true" />
      <div className="about-ambient-orb about-ambient-orb-2" aria-hidden="true" />
      <div className="about-ambient-orb about-ambient-orb-center" aria-hidden="true" />

      <div className="container about-container">
        {/* Section Header with Multi-Layer Glow */}
        <div className="about-header reveal stagger-1">
          <div className="about-eyebrow about-eyebrow-glow">
            <span className="about-pulse-dot" />
            <span className="about-eyebrow-text">WHO WE ARE · HISTORY MAKER TECH</span>
            <span className="eyebrow-spark">✦</span>
          </div>

          <h2 className="section-heading about-heading">
            <span className="about-heading-lead">High-Impact Software Engineering.</span>
            <span className="gold-glowing-wrapper">
              <span className="gold-glowing-title">Zero Agency Bloat.</span>
              <span className="gold-glowing-aura" aria-hidden="true">Zero Agency Bloat.</span>
            </span>
          </h2>
        </div>

        {/* Narrative Split: Vision & Partnership with Luminous Top Conduits */}
        <div className="about-narrative-grid reveal stagger-2">
          <div className="about-narrative-card narrative-left narrative-glow-card">
            <div className="narrative-glow-line" aria-hidden="true" />
            <div className="narrative-tag narrative-tag-glow">ENGINEERING FIRST</div>
            <p className="narrative-text">
              History Maker Tech is an engineering-first digital studio built to eliminate the inefficiencies of traditional IT agencies. We craft modern web platforms, iOS & Android applications, custom enterprise CRMs, and autonomous AI automations that help forward-thinking businesses scale with agility.
            </p>
          </div>

          <div className="about-narrative-card narrative-right narrative-glow-card">
            <div className="narrative-glow-line" aria-hidden="true" />
            <div className="narrative-tag narrative-tag-glow">DIRECT ACCOUNTABILITY</div>
            <p className="narrative-text">
              We cut out non-technical middlemen, inflated retainers, and endless communication layers. When you work with us, you speak directly with senior software engineers who write your code, respect your deadlines, and hold themselves accountable to measurable commercial outcomes.
            </p>
          </div>
        </div>

        {/* Executive Metric Ribbon with Radiant Gold Halo */}
        <div className="about-metrics-ribbon about-ribbon-glow reveal stagger-3">
          <div className="ribbon-glow-ambient" aria-hidden="true" />
          {CORE_METRICS.map((metric, i) => (
            <div key={i} className="about-metric-cell">
              <div className="metric-value about-metric-glow">{metric.value}</div>
              <div className="metric-label">{metric.label}</div>
              <div className="metric-sub">{metric.sub}</div>
            </div>
          ))}
        </div>

        {/* 4 Architectural Pillars Grid with Neon Halo Icon Boxes & Light Sweeps */}
        <div className="about-pillars-grid reveal stagger-3">
          {ARCHITECTURAL_PILLARS.map((pillar, idx) => (
            <div key={idx} className="about-pillar-card about-pillar-glow-card">
              <div className="pillar-card-glow" aria-hidden="true" />
              <div className="pillar-ambient-halo" aria-hidden="true" />
              <div className="pillar-header">
                <div className="pillar-icon-box pillar-icon-glow">{pillar.icon}</div>
                <div className="pillar-meta">
                  <span className="pillar-number">{pillar.num}</span>
                  <span className="pillar-tag pillar-tag-glow">{pillar.tag}</span>
                </div>
              </div>
              <h3 className="pillar-title">{pillar.title}</h3>
              <p className="pillar-desc">{pillar.desc}</p>
            </div>
          ))}
        </div>

        {/* Bottom Partnership Bar with Gold Action Flare */}
        <div className="about-footer-bar reveal stagger-4">
          <div className="about-cta-group">
            <a
              href={`https://wa.me/${CONFIG.whatsappNumber}?text=Hello%20History%20Maker%20Tech,%20I'd%20like%20to%20discuss%20a%20project%20directly%20with%20your%20developers.`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold magnetic hero-btn-glow about-btn-radiant"
            >
              <span>Talk With Our Developers</span>
              <span className="btn-shine-sweep"></span>
            </a>
            <a href="#services" className="about-footer-link about-link-glow">
              <span>Explore Our Services</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </a>
          </div>

          <div className="about-assurance-tag">
            <span className="assurance-bullet assurance-bullet-glow">✦</span>
            <span>Enterprise-Grade Engineering · Milestone Economics · NDA-Protected</span>
          </div>
        </div>
      </div>
    </section>
  );
}
