import React, { useState } from 'react';
import { DELIVERED_PROJECTS, PROJECT_CATEGORIES } from '../data/projectsData';
import { CONFIG } from '../data/siteData';

export default function DeliveredProjects() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredProjects = activeCategory === 'All'
    ? DELIVERED_PROJECTS
    : DELIVERED_PROJECTS.filter((p) => p.category === activeCategory);

  return (
    <section id="projects" className="section-padding" style={{ position: 'relative' }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header-centered reveal">
          <div className="section-glow-line"></div>
          <span className="section-tag-gold">PORTFOLIO & CASE STUDIES</span>
          <h2 className="section-title">
            Proven Engineering. <span className="gold-gradient-text">Delivered Projects.</span>
          </h2>
          <p className="section-subhead">
            Explore production-grade web applications, custom software, mobile platforms, and automated systems engineered and delivered directly by our senior development team.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="projects-filter-bar reveal">
          {PROJECT_CATEGORIES.map((category) => (
            <button
              key={category}
              className={`projects-filter-pill ${activeCategory === category ? 'is-active' : ''}`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="projects-grid">
          {filteredProjects.map((project, idx) => (
            <article key={project.id} className="project-card reveal" style={{ animationDelay: `${idx * 0.08}s` }}>
              {/* Card Header & Status */}
              <div className="project-card-header">
                <span className="project-category-badge">{project.category}</span>
                <div className="project-status-badge">
                  <span className="status-live-dot"></span>
                  <span>{project.status}</span>
                </div>
              </div>

              {/* Title & Metric Highlight */}
              <h3 className="project-card-title">{project.title}</h3>

              <div className="project-metric-pill">
                <span className="metric-glow-star">★</span>
                <span>{project.metric}</span>
              </div>

              {/* Project Description */}
              <p className="project-card-desc">{project.description}</p>

              {/* Tech Stack Pills */}
              <div className="project-tech-tags">
                {project.tech.map((t) => (
                  <span key={t} className="tech-pill-sm">{t}</span>
                ))}
              </div>

              {/* Card Footer / Action */}
              <div className="project-card-footer">
                <span className="project-client-type">{project.clientLocation}</span>
                <a
                  href={`https://wa.me/${CONFIG.whatsappNumber}?text=Hello%20History%20Maker%20Tech,%20I'm%20interested%20in%20a%20solution%20similar%20to%20"${encodeURIComponent(project.title)}".`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-project-inquire"
                >
                  <span>Build Similar Solution</span>
                </a>
              </div>
            </article>
          ))}
        </div>

        {/* Bottom Callout for Client Collaboration */}
        <div className="projects-custom-banner reveal">
          <div className="banner-content">
            <div className="banner-pill">CUSTOM ARCHITECTURE</div>
            <h3 className="banner-title">Need a custom system built to your exact specifications?</h3>
            <p className="banner-desc">
              Every project we deliver includes 100% intellectual property transfer, direct senior engineer access, and milestone-based economics.
            </p>
          </div>
          <div className="banner-action">
            <a
              href={`https://wa.me/${CONFIG.whatsappNumber}?text=Hello%20History%20Maker%20Tech,%20I'd%20like%20to%20discuss%20a%20new%20project%20for%20my%20business.`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold magnetic"
            >
              <span>Discuss Your Deliverable</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
