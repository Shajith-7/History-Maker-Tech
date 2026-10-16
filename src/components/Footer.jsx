import React from 'react';
import { CONFIG } from '../data/siteData';

export default function Footer() {
  return (
    <footer id="site-footer">
      <div className="container">
        {/* Footer Top Strip CTA */}
        <div className="footer-top-strip reveal">
          <div>
            <h3 className="footer-strip-title">Ready to build something meaningful?</h3>
            <p className="footer-strip-sub">Direct access to experienced developers. Zero agency bloat.</p>
          </div>
          <a
            href={`https://wa.me/${CONFIG.whatsappNumber}?text=Hello%20History%20Maker%20Tech,%20I'd%20like%20to%20discuss%20a%20project.`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold magnetic"
          >
            <span>Talk With Us on WhatsApp ↗</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </a>
        </div>

        {/* Footer Columns */}
        <div className="footer-columns-grid">
          <div className="footer-brand-col">
            <a href="#home" aria-label="History Maker Tech Home">
              <img
                src="/assets/images/logo.png"
                alt="History Maker Tech Logo"
                className="footer-logo-img"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = '/assets/images/logo.jpg';
                }}
              />
            </a>
            <div className="footer-slogan">IDEAS → TECHNOLOGY → GROWTH</div>
            <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', lineHeight: '1.6', maxWidth: '320px' }}>
              Direct-to-Developer Engineering. Zero Agency Bloat. Practical digital solutions built for scalable modern enterprise.
            </p>
          </div>

          <div>
            <h4 className="footer-col-title">Navigation</h4>
            <ul className="footer-links-list">
              <li><a href="#home">Home</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="#services">Services</a></li>
              <li><a href="#testimonials">Testimonials</a></li>
              <li><a href="#faq">FAQ</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="footer-col-title">Solutions</h4>
            <ul className="footer-links-list">
              <li><a href="#services">Website Development</a></li>
              <li><a href="#services">Custom Software</a></li>
              <li><a href="#services">Mobile App Development</a></li>
              <li><a href="#services">AI Automation Solutions</a></li>
              <li><a href="#services">WhatsApp Automation</a></li>
              <li><a href="#services">CRM Development</a></li>
            </ul>
          </div>

          <div>
            <h4 className="footer-col-title">Direct Connect</h4>
            <ul className="footer-links-list">
              <li>
                <a
                  href={`https://wa.me/${CONFIG.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  WhatsApp: {CONFIG.displayWhatsapp} ↗
                </a>
              </li>
              <li>
                <a href={`tel:${CONFIG.phoneNumber}`}>
                  Phone: {CONFIG.displayPhone} ↗
                </a>
              </li>
              <li>
                <a href="mailto:contact@historymakertech.com">
                  Email: contact@historymakertech.com ↗
                </a>
              </li>
              <li style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem', paddingTop: '4px' }}>
                Engineering Hours: Mon – Sat
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="copyright-text">
            © {new Date().getFullYear()} History Maker Tech. All rights reserved.
          </div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>
            DIRECT ACCESS · TRANSPARENT PRICING · ZERO BLOAT
          </div>
        </div>
      </div>
    </footer>
  );
}
