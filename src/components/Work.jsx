import React from 'react';
import { PROJECTS, CONFIG } from '../data/siteData';

export default function Work() {
  return (
    <section id="work" className="section-work">
      <div className="container">
        <div className="section-glow-line" aria-hidden="true"></div>
        <div className="section-header text-center reveal">
          <div className="section-badge">SELECTED CASE STUDIES</div>
          <h2 className="section-title">Engineered for Measurable ROI</h2>
          <p className="section-subtitle">
            Explore sample high-impact digital systems engineered for reliability, high conversion, and real operational savings.
          </p>
        </div>

        <div className="projects-grid reveal">
          {PROJECTS.map((proj, i) => (
            <div key={i} className="project-card">
              <div className="project-card-header">
                <span className="project-cat">{proj.category}</span>
                <span className="project-stat-badge">{proj.stat}</span>
              </div>
              <h3 className="project-title">{proj.title}</h3>
              <div className="project-tech-line">{proj.tag}</div>
              <p className="project-desc">{proj.desc}</p>
              <div className="project-footer">
                <a
                  href={`https://wa.me/${CONFIG.whatsappNumber}?text=Hi,%20I'd%20like%20to%20learn%20more%20about%20your%20case%20study:%20${encodeURIComponent(proj.title)}.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-link"
                >
                  Request Similar Architecture ↗
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
