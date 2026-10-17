import React, { useState, useEffect } from 'react';
import { UPCOMING_COURSES, COURSE_PERKS } from '../data/coursesData';
import { CONFIG } from '../data/siteData';
import Contact from '../components/Contact';

export default function CoursesPage({ onNavigate }) {
  const [waitlistSubmitted, setWaitlistSubmitted] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    if (window.__lenis) {
      window.__lenis.scrollTo(0, { immediate: true });
    }
  }, []);

  const handleWaitlistSubmit = (e) => {
    e.preventDefault();
    if (userEmail.trim()) {
      setWaitlistSubmitted(true);
    }
  };

  return (
    <div className="page-wrapper courses-page-view">
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
            <span className="breadcrumb-current">Courses (Coming Soon)</span>
          </nav>

          <div className="page-hero-content reveal stagger-1">
            <div className="space-hero-tag">
              <span className="space-tag-pulse"></span>
              <span>HISTORY MAKER TECH ACADEMY · COMING SOON</span>
            </div>
            <h1 className="page-hero-title">
              Industry-Grade Engineering. <span className="space-gradient-text">Courses Coming Soon.</span>
            </h1>
            <p className="page-hero-subhead">
              No generic theory slides. Real-world, project-driven technical curricula designed and mentored directly by practicing senior developers. Master next-gen full-stack architecture, applied enterprise AI, and high-availability cloud systems.
            </p>

            <div className="page-hero-stats-strip">
              <div className="hero-stat-box">
                <span className="stat-number">1:1</span>
                <span className="stat-label">Senior Dev Mentorship</span>
              </div>
              <div className="hero-stat-box">
                <span className="stat-number">100%</span>
                <span className="stat-label">Production Repositories</span>
              </div>
              <div className="hero-stat-box">
                <span className="stat-number">-30%</span>
                <span className="stat-label">Early Bird VIP Discount</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="section-padding" style={{ paddingTop: '10px' }}>
        <div className="container">
          {/* Early Access Waitlist Card */}
          <div className="courses-early-access-card reveal">
            <div className="early-access-badge-cluster">
              <span className="early-badge-highlight">✦ VIP EARLY BIRD PERK</span>
              <span className="early-badge-date">LAUNCHING 2026</span>
            </div>
            <h2 className="early-access-title">
              Pre-register today for 30% launch discount & direct senior code reviews.
            </h2>
            <p className="early-access-desc">
              Cohort sizes will be strictly limited to preserve high-touch 1-on-1 mentorship, code reviews, and direct architecture feedback from our senior engineers.
            </p>

            {waitlistSubmitted ? (
              <div className="waitlist-success-banner">
                <span className="success-icon">✓</span>
                <div>
                  <strong>You are on the VIP Early Bird list!</strong>
                  <p>We will email you the moment enrollment goes live with your 30% discount access pass.</p>
                </div>
              </div>
            ) : (
              <form className="courses-waitlist-form" onSubmit={handleWaitlistSubmit}>
                <input
                  type="email"
                  required
                  placeholder="Enter your email address..."
                  className="courses-input"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  aria-label="Email address for course waitlist"
                />
                <button type="submit" className="btn-gold magnetic">
                  <span>Join Early Bird Waitlist</span>
                </button>
              </form>
            )}

            <div className="courses-whatsapp-alt">
              <span>Prefer WhatsApp? </span>
              <a
                href={`https://wa.me/${CONFIG.whatsappNumber}?text=Hello%20History%20Maker%20Tech,%20I'd%20like%20to%20pre-register%20for%20your%20upcoming%20engineering%20courses.`}
                target="_blank"
                rel="noopener noreferrer"
                className="gold-text-link"
              >
                Pre-Register via WhatsApp Directly
              </a>
            </div>
          </div>

          {/* Upcoming Masterclasses Grid */}
          <div className="courses-grid">
            {UPCOMING_COURSES.map((course, idx) => (
              <div key={course.id} className="course-card reveal" style={{ animationDelay: `${idx * 0.1}s` }}>
                {/* Coming Soon Top Badge */}
                <div className="course-card-top">
                  <span className="course-badge-pill">{course.badge}</span>
                  <span className="course-status-coming-soon">COMING SOON</span>
                </div>

                {/* Title & Subtitle */}
                <h3 className="course-card-title">{course.title}</h3>
                <p className="course-card-subtitle">{course.subtitle}</p>

                {/* Course Meta Info */}
                <div className="course-meta-strip">
                  <span className="course-meta-item">⏱ {course.duration}</span>
                  <span className="course-meta-item">🎯 {course.level}</span>
                </div>

                {/* Key Curriculum Modules */}
                <div className="course-curriculum-box">
                  <div className="curriculum-heading">Curriculum Highlights:</div>
                  <ul className="course-topics-list">
                    {course.topics.map((topic, i) => (
                      <li key={i} className="course-topic-item">
                        <span className="topic-bullet">◈</span>
                        <span>{topic}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Audience Target */}
                <div className="course-audience-tag">
                  <span className="audience-label">Target Learner: </span>
                  <span>{course.audience}</span>
                </div>

                {/* Card CTA */}
                <div className="course-card-actions">
                  <a
                    href={`https://wa.me/${CONFIG.whatsappNumber}?text=Hello%20History%20Maker%20Tech,%20I'd%20like%20more%20information%20on%20the%20"${encodeURIComponent(course.title)}"%20course.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-course-notify"
                  >
                    <span>Pre-Register Interest</span>
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Course Perks Grid */}
          <div className="courses-perks-grid reveal">
            {COURSE_PERKS.map((perk, i) => (
              <div key={i} className="course-perk-card">
                <div className="perk-number">0{i + 1}</div>
                <h4 className="perk-title">{perk.title}</h4>
                <p className="perk-desc">{perk.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Embedded Contact Section */}
      <Contact />
    </div>
  );
}
