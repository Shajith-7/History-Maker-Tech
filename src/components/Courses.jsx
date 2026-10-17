import React, { useState } from 'react';
import { UPCOMING_COURSES, COURSE_PERKS } from '../data/coursesData';
import { CONFIG } from '../data/siteData';

export default function Courses() {
  const [waitlistSubmitted, setWaitlistSubmitted] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('All Courses');

  const handleWaitlistSubmit = (e) => {
    e.preventDefault();
    if (userEmail.trim()) {
      setWaitlistSubmitted(true);
    }
  };

  return (
    <section id="courses" className="section-padding" style={{ position: 'relative', overflow: 'hidden' }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header-centered reveal">
          <div className="section-glow-line"></div>
          <div className="courses-launch-badge">
            <span className="launch-pulse-dot"></span>
            <span>ACADEMY · COMING SOON</span>
          </div>
          <h2 className="section-title">
            Industry-Grade Engineering. <span className="gold-gradient-text">Courses Coming Soon.</span>
          </h2>
          <p className="section-subhead">
            Practical, project-driven technical curricula designed and mentored directly by senior developers. Learn to architect, code, and deploy production-scale systems with zero fluff.
          </p>
        </div>

        {/* Early Access Waitlist Hero Banner */}
        <div className="courses-early-access-card reveal">
          <div className="early-access-badge-cluster">
            <span className="early-badge-highlight">✦ VIP EARLY BIRD PERK</span>
            <span className="early-badge-date">LAUNCHING 2026</span>
          </div>
          <h3 className="early-access-title">
            Pre-register today for 30% off launch pricing & direct mentorship.
          </h3>
          <p className="early-access-desc">
            Seats will be strictly capped to maintain direct, high-touch code reviews and 1-on-1 guidance with our senior software engineers.
          </p>

          {waitlistSubmitted ? (
            <div className="waitlist-success-banner">
              <span className="success-icon">✓</span>
              <div>
                <strong>You are on the VIP Early Bird list!</strong>
                <p>We will notify you the moment enrollment opens with your exclusive 30% discount voucher.</p>
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

        {/* Upcoming Courses Grid */}
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
                <span className="audience-label">Best for: </span>
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
  );
}
