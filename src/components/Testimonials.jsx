import React from 'react';

const TESTIMONIAL_ITEMS = [
  {
    tag: "Website Engineering",
    text: "History Maker Tech rebuilt our corporate website from scratch. Their direct engineering model meant zero agency telephone games—our Core Web Vitals hit 99/100, and our lead conversion rate doubled within 60 days.",
    stars: 5,
    initials: "RS",
    author: "Rajesh Sharma",
    role: "Founder & CEO, Apex Digital Logistics"
  },
  {
    tag: "Business & WhatsApp Automation",
    text: "They automated our customer dispatch notifications and lead qualification directly into WhatsApp and our CRM. Our operations team now saves over 25 hours every week with zero missed customer inquiries.",
    stars: 5,
    initials: "KP",
    author: "Kavita Patel",
    role: "Head of Operations, Novafy Systems"
  },
  {
    tag: "Custom Software Architecture",
    text: "Honest milestone pricing, clean source code, and exceptional turnaround. When we requested architecture adjustments, they were deployed to staging the same afternoon. Absolutely top-tier developers.",
    stars: 5,
    initials: "MF",
    author: "Marcus Fernandes",
    role: "VP of Product, Aura Health Cloud"
  }
];

export default function Testimonials() {
  return (
    <section id="testimonials">
      <div className="container">
        <div className="testimonials-header reveal">
          <div className="section-glow-line" aria-hidden="true"></div>
          <h2 className="section-heading">
            Trusted Engineering. <span className="gold-gradient-text">Real Business ROI.</span>
          </h2>
          <p className="section-subhead" style={{ margin: '0 auto' }}>
            We partner directly with founders, product leaders, and enterprise teams to ship robust digital solutions with measurable impact.
          </p>
        </div>

        <div className="testimonials-grid">
          {TESTIMONIAL_ITEMS.map((item, idx) => (
            <div key={idx} className={`testimonial-card reveal stagger-${idx + 1}`}>
              <div>
                <div className="test-card-top">
                  <span className="service-category-badge">
                    <span className="badge-dot"></span>
                    <span>{item.tag}</span>
                  </span>
                  <span className="quote-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                    </svg>
                  </span>
                </div>
                <h3 className="test-service-tag">{item.tag}</h3>
                <p className="test-text">{item.text}</p>
              </div>
              <div>
                <div className="test-stars" aria-label="5 stars">
                  <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                </div>
                <div className="test-author-box">
                  <div className="test-avatar">{item.initials}</div>
                  <div className="test-author-meta">
                    <h4>{item.author}</h4>
                    <p>{item.role}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
