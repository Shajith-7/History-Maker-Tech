import React, { useState } from 'react';
import { CONFIG } from '../data/siteData';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'Website Development',
    budget: 'Not decided yet',
    details: '',
    consent: false
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.details || !formData.consent) {
      alert('Please fill in all required fields and check the consent box.');
      return;
    }

    const text = `Hello History Maker Tech!%0A%0A*Name:* ${encodeURIComponent(formData.name)}%0A*Email:* ${encodeURIComponent(formData.email)}%0A*Phone:* ${encodeURIComponent(formData.phone || 'N/A')}%0A*Service:* ${encodeURIComponent(formData.service)}%0A*Budget:* ${encodeURIComponent(formData.budget)}%0A*Project Details:* ${encodeURIComponent(formData.details)}`;
    const url = `https://wa.me/${CONFIG.whatsappNumber}?text=${text}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    setSubmitted(true);
  };

  return (
    <section id="contact">
      <div className="container">
        <div className="contact-grid">
          {/* Left Column: Contact Methods */}
          <div className="contact-info-col reveal">
            <div>
              <h2 className="section-heading">
                Have an Idea <span className="gold-gradient-text">Worth Building?</span>
              </h2>
              <p className="section-subhead">
                Tell us what you want to create, improve, or automate. We'll discuss your requirements and explore a practical digital solution for your business.
              </p>
            </div>

            {/* WhatsApp Card */}
            <a
              href={`https://wa.me/${CONFIG.whatsappNumber}?text=Hello%20History%20Maker%20Tech%2C%20I%20would%20like%20to%20discuss%20a%20digital%20solution%20for%20my%20business.`}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-method-card magnetic"
            >
              <div className="contact-icon-box">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                </svg>
              </div>
              <div className="contact-method-meta">
                <div className="contact-method-label">WhatsApp Direct</div>
                <div className="contact-method-value">{CONFIG.displayWhatsapp}</div>
              </div>
              <div className="contact-badge-status">Chat Now ↗</div>
            </a>

            {/* Phone Card */}
            <a href={`tel:${CONFIG.phoneNumber}`} className="contact-method-card magnetic">
              <div className="contact-icon-box">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
              </div>
              <div className="contact-method-meta">
                <div className="contact-method-label">Telephone</div>
                <div className="contact-method-value">{CONFIG.displayPhone}</div>
              </div>
              <div className="contact-badge-status">Call Us ↗</div>
            </a>

            {/* Turnaround Card */}
            <div className="contact-method-card">
              <div className="contact-icon-box" style={{ background: 'rgba(214, 168, 63, 0.1)', color: 'var(--color-gold)' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
              </div>
              <div className="contact-method-meta">
                <div className="contact-method-label">Direct Developer SLA</div>
                <div className="contact-method-value">Response within 4 business hours</div>
              </div>
              <div className="contact-badge-status">Active</div>
            </div>
          </div>

          {/* Right Column: Interactive Inquiry Form */}
          <div className="contact-form-card reveal stagger-1">
            <h3 className="form-heading">Project Inquiry Form</h3>
            <p className="form-subhead">Prepare your project details for rapid developer review and WhatsApp handoff.</p>

            {submitted ? (
              <div style={{ textAlign: 'center', padding: '36px 20px' }}>
                <div style={{ fontSize: '2.4rem', color: 'var(--color-gold)', marginBottom: '14px' }}>✓</div>
                <h4 style={{ color: 'var(--color-gold-light)', fontSize: '1.25rem', marginBottom: '8px' }}>Inquiry Prepared!</h4>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.92rem', marginBottom: '22px' }}>
                  Your brief has been forwarded directly to WhatsApp. You can also message or call us anytime at {CONFIG.displayWhatsapp}.
                </p>
                <button
                  className="btn-secondary"
                  onClick={() => setSubmitted(false)}
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <div className="form-group-row">
                  <div className="form-group">
                    <label htmlFor="contact-name" className="form-label">
                      <span>Full Name</span>
                      <span className="required-star">*</span>
                    </label>
                    <input
                      type="text"
                      id="contact-name"
                      className="form-input"
                      placeholder="e.g. Rajesh Kumar"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="contact-email" className="form-label">
                      <span>Email Address</span>
                      <span className="required-star">*</span>
                    </label>
                    <input
                      type="email"
                      id="contact-email"
                      className="form-input"
                      placeholder="rajesh@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="form-group-row">
                  <div className="form-group">
                    <label htmlFor="contact-phone" className="form-label">
                      <span>Phone Number</span>
                      <span style={{ fontSize: '0.76rem', color: 'var(--color-text-muted)' }}>(optional)</span>
                    </label>
                    <input
                      type="tel"
                      id="contact-phone"
                      className="form-input"
                      placeholder="e.g. +91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="contact-service" className="form-label">
                      <span>Service Interested In</span>
                      <span className="required-star">*</span>
                    </label>
                    <select
                      id="contact-service"
                      className="form-select"
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      required
                    >
                      <option value="Website Development">Website Development</option>
                      <option value="Custom Software Development">Custom Software Development</option>
                      <option value="Mobile App Development">Mobile App Development</option>
                      <option value="CRM Development">CRM Development</option>
                      <option value="AI Automation Solutions">AI Automation Solutions</option>
                      <option value="WhatsApp Automation">WhatsApp Automation</option>
                      <option value="Digital Marketing and SEO">Digital Marketing and SEO</option>
                      <option value="E-commerce Solutions">E-commerce Solutions</option>
                      <option value="Business Process Automation">Business Process Automation</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="contact-budget" className="form-label">
                    <span>Project Budget (INR)</span>
                    <span style={{ fontSize: '0.76rem', color: 'var(--color-text-muted)' }}>(optional)</span>
                  </label>
                  <select
                    id="contact-budget"
                    className="form-select"
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                  >
                    <option value="Not decided yet">Not decided yet</option>
                    <option value="Under ₹10,000">Under ₹10,000</option>
                    <option value="₹10,000–₹25,000">₹10,000–₹25,000</option>
                    <option value="₹25,000–₹50,000">₹25,000–₹50,000</option>
                    <option value="₹50,000–₹1,00,000">₹50,000–₹1,00,000</option>
                    <option value="Above ₹1,00,000">Above ₹1,00,000</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="contact-details" className="form-label">
                    <span>Project Details</span>
                    <span className="required-star">*</span>
                  </label>
                  <textarea
                    id="contact-details"
                    className="form-textarea"
                    placeholder="Tell us about your objectives, timeline, workflow requirements, or challenges you're looking to solve..."
                    value={formData.details}
                    onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                    required
                  ></textarea>
                </div>

                <div className="form-consent-box">
                  <input
                    type="checkbox"
                    id="contact-consent"
                    checked={formData.consent}
                    onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                    required
                  />
                  <label htmlFor="contact-consent" className="form-consent-text">
                    I acknowledge and agree that the submitted information may be used by History Maker Tech to review and respond to this project inquiry.
                  </label>
                </div>

                <button type="submit" className="btn-gold" style={{ width: '100%', marginTop: '16px' }}>
                  <span>Prepare My Inquiry & Open WhatsApp</span>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </button>

                <div className="form-privacy-note">
                  Your information is used strictly to evaluate your project scope with direct engineers.
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
