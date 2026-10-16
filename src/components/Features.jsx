import React from 'react';

const FEATURES = [
  {
    icon: "⚡",
    title: "Extreme Performance",
    desc: "Sub-second load times, sub-50ms TTFB edge CDN routing, and 100/100 Core Web Vitals targets engineered from line one."
  },
  {
    icon: "🛡️",
    title: "Bank-Grade Security",
    desc: "Strict Content Security Policies, TLS 1.3 hardening, encrypted databases, and OWASP top-10 defense benchmarks."
  },
  {
    icon: "📐",
    title: "Scalable Architecture",
    desc: "Modular clean code principles designed to seamlessly scale from 1,000 to 1,000,000+ daily active users without technical debt."
  },
  {
    icon: "🤝",
    title: "Zero Middlemen",
    desc: "Communicate directly with the senior engineers writing your application. Instant feedback, rapid iterations, zero latency."
  }
];

export default function Features() {
  return (
    <section id="features" className="section-features">
      <div className="container">
        <div className="section-glow-line" aria-hidden="true"></div>
        <div className="section-header text-center reveal">
          <div className="section-badge">ENGINEERING ADVANTAGE</div>
          <h2 className="section-title">Built for Modern Competitive Edge</h2>
          <p className="section-subtitle">
            We don't rely on bloated WordPress themes or drag-and-drop website builders. We engineer purpose-built custom software that outpaces your competition.
          </p>
        </div>

        <div className="features-grid reveal">
          {FEATURES.map((feat, i) => (
            <div key={i} className="feature-card">
              <div className="feature-icon-wrap">
                <span className="feature-icon">{feat.icon}</span>
              </div>
              <h3 className="feature-title">{feat.title}</h3>
              <p className="feature-desc">{feat.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
