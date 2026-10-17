import React from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import Services from '../components/Services';
import Testimonials from '../components/Testimonials';
import Faq from '../components/Faq';
import Contact from '../components/Contact';
import { DELIVERED_PROJECTS } from '../data/projectsData';
import { UPCOMING_COURSES } from '../data/coursesData';

export default function HomePage({ onNavigate }) {
  // Take top 3 projects for home preview
  const featuredProjects = DELIVERED_PROJECTS.slice(0, 3);
  // Take top 2 courses for home preview
  const featuredCourses = UPCOMING_COURSES.slice(0, 2);

  return (
    <div className="page-wrapper home-page-view">
      <Hero />
      <About />
      <Services />

      {/* Featured Delivered Projects Teaser Section on Home */}
      <section id="featured-projects" className="section-padding" style={{ position: 'relative' }}>
        <div className="container">
          <div className="section-header-centered reveal">
            <div className="section-glow-line"></div>
            <span className="section-tag-gold">FEATURED DELIVERABLES</span>
            <h2 className="section-title">
              Engineered for Production. <span className="gold-gradient-text">Delivered Projects.</span>
            </h2>
            <p className="section-subhead">
              A curated look into our production deliverables. Custom software, enterprise platforms, and mobile architectures built with sub-second speeds.
            </p>
          </div>

          <div className="projects-grid">
            {featuredProjects.map((project, idx) => (
              <article key={project.id} className="project-card reveal" style={{ animationDelay: `${idx * 0.08}s` }}>
                <div className="project-card-header">
                  <span className="project-category-badge">{project.category}</span>
                  <div className="project-status-badge">
                    <span className="status-live-dot"></span>
                    <span>{project.status}</span>
                  </div>
                </div>

                <h3 className="project-card-title">{project.title}</h3>

                <div className="project-metric-pill">
                  <span className="metric-glow-star">★</span>
                  <span>{project.metric}</span>
                </div>

                <p className="project-card-desc">{project.description}</p>

                <div className="project-tech-tags">
                  {project.tech.map((t) => (
                    <span key={t} className="tech-pill-sm">{t}</span>
                  ))}
                </div>

                <div className="project-card-footer">
                  <span className="project-client-type">{project.clientLocation}</span>
                  <button
                    onClick={() => onNavigate('projects')}
                    className="btn-project-inquire"
                    style={{ cursor: 'pointer' }}
                  >
                    <span>View Project Details</span>
                  </button>
                </div>
              </article>
            ))}
          </div>

          {/* Action to Explore Separate Projects Page */}
          <div className="home-teaser-cta-wrap reveal">
            <button
              onClick={() => onNavigate('projects')}
              className="btn-gold magnetic"
              style={{ cursor: 'pointer' }}
            >
              <span>Explore All Delivered Projects</span>
            </button>
          </div>
        </div>
      </section>

      {/* Featured Courses (Coming Soon) Teaser Section on Home */}
      <section id="featured-courses" className="section-padding" style={{ position: 'relative' }}>
        <div className="container">
          <div className="courses-early-access-card reveal">
            <div className="courses-launch-badge">
              <span className="launch-pulse-dot"></span>
              <span>ACADEMY · COMING SOON</span>
            </div>
            <h2 className="section-title" style={{ marginTop: '12px' }}>
              Master Practical Engineering. <span className="space-gradient-text">Courses Coming Soon.</span>
            </h2>
            <p className="section-subhead" style={{ marginBottom: '28px' }}>
              Taught directly by our senior developers. Master full-stack React 19 architecture, enterprise AI pipelines, and cloud automation.
            </p>

            <div className="home-courses-preview-row">
              {featuredCourses.map((course) => (
                <div key={course.id} className="home-course-mini-card">
                  <span className="course-badge-pill">{course.badge}</span>
                  <h4 style={{ color: '#fff', margin: '10px 0 6px', fontSize: '1.1rem' }}>{course.title}</h4>
                  <p style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem', margin: 0 }}>{course.subtitle}</p>
                </div>
              ))}
            </div>

            <div style={{ marginTop: '30px' }}>
              <button
                onClick={() => onNavigate('courses')}
                className="btn-gold magnetic"
                style={{ cursor: 'pointer' }}
              >
                <span>View Full Courses Page & Pre-Register</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      <Testimonials />
      <Faq />
      <Contact />
    </div>
  );
}
