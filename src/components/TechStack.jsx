import React from 'react';
import { TECH_STACK } from '../data/siteData';

export default function TechStack() {
  return (
    <section id="tech-stack" className="section-tech-stack">
      <div className="container">
        <div className="section-glow-line" aria-hidden="true"></div>
        <div className="section-header text-center reveal">
          <div className="section-badge">MODERN INFRASTRUCTURE</div>
          <h2 className="section-title">The Technologies We Master</h2>
          <p className="section-subtitle">
            We intentionally select best-of-breed open-source and modern cloud primitives to deliver high resilience, low latency, and zero licensing overhead.
          </p>
        </div>

        <div className="tech-stack-grid reveal">
          {TECH_STACK.map((group, idx) => (
            <div key={idx} className="tech-group-card">
              <h3 className="tech-group-title">{group.category}</h3>
              <div className="tech-badge-container">
                {group.items.map((item) => (
                  <span key={item} className="tech-pill">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
