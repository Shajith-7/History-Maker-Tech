import React, { useState, useEffect } from 'react';
import { DELIVERED_PROJECTS, PROJECT_CATEGORIES } from '../data/projectsData';
import { CONFIG } from '../data/siteData';
import Contact from '../components/Contact';

export default function ProjectsPage({ onNavigate }) {
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    if (window.__lenis) {
      window.__lenis.scrollTo(0, { immediate: true });
    }
  }, []);

  const filteredProjects = activeCategory === 'All'
    ? DELIVERED_PROJECTS
    : DELIVERED_PROJECTS.filter((p) => p.category === activeCategory);

  return (
    <div className="page-wrapper projects-page-view">
      {/* Dedicated Page Hero Banner */}
      <section className="page-hero-section">
        <div className="container">
          {/* Breadcrumb Navigation */}
          <nav className="page-breadcrumb reveal" aria-label="Breadcrumb">
            <button
              onClick={() => onNavigate('home')}
              className="breadcrumb-link-btn"
            >
              Home
            </button>
            <span className="breadcrumb-separator">/</span>
            <span className="breadcrumb-current">Delivered Projects</span>
          </nav>

          <div className="page-hero-content reveal stagger-1">
            <div className="space-hero-tag">
              <span className="space-tag-pulse"></span>
              <span>VERIFIED PRODUCTION REPOSITORIES</span>
            </div>
            <h1 className="page-hero-title">
              Proven Engineering. <span className="space-gradient-text">Delivered Projects.</span>
            </h1>
            <p className="page-hero-subhead">
              Explore bespoke web architectures, mission-critical custom CRMs, cross-platform mobile apps, and autonomous AI automation pipelines designed, engineered, and delivered directly to production.
            </p>

            <div className="page-hero-stats-strip">
              <div className="hero-stat-box">
                <span className="stat-number">100%</span>
                <span className="stat-label">Source Code Transfer</span>
              </div>
              <div className="hero-stat-box">
                <span className="stat-number">0</span>
                <span className="stat-label">Agency Bureaucracy</span>
              </div>
              <div className="hero-stat-box">
                <span className="stat-number">99.9%</span>
                <span className="stat-label">Uptime Architecture</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Filterable Projects Showcase */}
      <section className="section-padding" style={{ paddingTop: '10px' }}>
        <div className="container">
          {/* Filter Pills */}
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
                <h2 className="project-card-title">{project.title}</h2>

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

          {/* Custom Collaboration Banner */}
          <div className="projects-custom-banner reveal">
            <div className="banner-content">
              <div className="banner-pill">CUSTOM ARCHITECTURE</div>
              <h3 className="banner-title">Need a custom system built to your exact business workflow?</h3>
              <p className="banner-desc">
                Every project we build includes 100% intellectual property transfer, direct senior engineer communication, and milestone-based economics.
              </p>
            </div>
            <div className="banner-action">
              <a
                href={`https://wa.me/${CONFIG.whatsappNumber}?text=Hello%20History%20Maker%20Tech,%20I'd%20like%20to%20discuss%20a%20new%20deliverable.`}
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

      {/* Embedded Contact Section */}
      <Contact />
    </div>
  );
}
