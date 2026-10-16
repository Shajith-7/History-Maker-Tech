import React from 'react';
import { PROCESS_STEPS } from '../data/siteData';

export default function Process() {
  return (
    <section id="process" className="section-process">
      <div className="container">
        <div className="section-glow-line" aria-hidden="true"></div>
        <div className="section-header text-center reveal">
          <div className="section-badge">SPRINT METHODOLOGY</div>
          <h2 className="section-title">Transparent & Predictable Delivery</h2>
          <p className="section-subtitle">
            A battle-tested 4-stage engineering sprint model that eliminates uncertainty, keeps milestones on schedule, and ships high-quality code.
          </p>
        </div>

        <div className="process-timeline reveal">
          {PROCESS_STEPS.map((step) => (
            <div key={step.step} className="timeline-card">
              <div className="timeline-step-badge">{step.step}</div>
              <h3 className="timeline-title">{step.phase}</h3>
              <p className="timeline-desc">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
