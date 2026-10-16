import React, { useState } from 'react';

const FAQ_ITEMS = [
  {
    q: "What services does History Maker Tech provide?",
    a: "We engineer website development, custom software solutions, mobile applications (iOS & Android), CRM systems, AI workflow automations, WhatsApp automations, digital marketing, and e-commerce platforms."
  },
  {
    q: "How does your 'Direct-to-Developer' model work?",
    a: "You work directly with the developers building your software. By removing non-technical middlemen, communication remains clear, feedback cycles are faster, and project requirements are implemented accurately."
  },
  {
    q: "How do you handle project pricing and milestones?",
    a: "We provide structured milestone-based pricing with clear deliverables for each phase. You know exactly what is being engineered, what the timeline is, and what each milestone costs before development begins."
  },
  {
    q: "Who owns the code and intellectual property?",
    a: "You do. Upon milestone delivery and payment, you own 100% of the custom code, design files, and digital assets created for your business."
  },
  {
    q: "How long does a typical project take to build?",
    a: "Timelines depend on complexity and scope. A high-performance website typically takes 1–3 weeks, while custom software or mobile apps take 3–8 weeks. We define precise sprint timelines before kickoff."
  },
  {
    q: "Can you automate my WhatsApp communication and business processes?",
    a: "Yes. We assess your workflow and deploy automated triggers for customer inquiries, lead capture, alerts, order updates, and CRM synchronization."
  },
  {
    q: "Will I receive support after delivery?",
    a: "Yes. Every project includes post-launch testing, warranty support, and optional ongoing maintenance arrangements tailored to your needs."
  },
  {
    q: "How do I start a project with History Maker Tech?",
    a: "Contact us directly via WhatsApp (+91 89034 11738) or phone (+91 94763 97228), or submit the project inquiry form below. We will review your goals and schedule a direct technical consultation."
  }
];

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (idx) => {
    setOpenIndex(openIndex === idx ? -1 : idx);
  };

  return (
    <section id="faq">
      <div className="container">
        <div className="faq-header reveal">
          <div className="section-glow-line" aria-hidden="true"></div>
          <h2 className="section-heading">
            Questions Before <span className="gold-gradient-text">We Build?</span>
          </h2>
          <p className="section-subhead" style={{ margin: '0 auto' }}>
            Here are a few things to know about working with History Maker Tech.
          </p>
        </div>

        <div className="faq-accordion reveal">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={`faq-item ${isOpen ? 'is-open' : ''}`}
              >
                <button
                  className="faq-question-btn"
                  aria-expanded={isOpen}
                  onClick={() => toggle(idx)}
                >
                  <span>{item.q}</span>
                  <span className="faq-chevron">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </span>
                </button>
                <div
                  className="faq-answer-pane"
                  style={{
                    maxHeight: isOpen ? '300px' : '0px',
                    opacity: isOpen ? 1 : 0,
                    overflow: 'hidden',
                    transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)'
                  }}
                >
                  <div className="faq-answer-inner">
                    {item.a}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
