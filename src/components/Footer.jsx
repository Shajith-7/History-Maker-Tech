import React from 'react';
import { CONFIG } from '../data/siteData';

export default function Footer({ onNavigate }) {
  const handleNav = (e, page, hash) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate(page, hash);
    }
  };

  return (
    <footer id="site-footer" className="space-footer-glow">
      {/* Radiant Deep Space Nebula Back-Glow */}
      <div className="footer-glow-ambient" aria-hidden="true"></div>

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        {/* Footer Top Strip CTA */}
        <div className="footer-top-strip space-strip-glow reveal">
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
            <span>Talk With Us on WhatsApp</span>
          </a>
        </div>

        {/* Footer Columns */}
        <div className="footer-columns-grid">
          <div className="footer-brand-col">
            <a
              href="/"
              onClick={(e) => handleNav(e, 'home', 'home')}
              aria-label="History Maker Tech Home"
            >
              <img
                src="/assets/images/logo.png"
                alt="History Maker Tech Logo"
                className="footer-logo-img space-logo-glow"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = '/assets/images/logo.jpg';
                }}
              />
            </a>
            <div className="footer-slogan space-slogan-glow">IDEAS → TECHNOLOGY → GROWTH</div>
            <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', lineHeight: '1.6', maxWidth: '320px' }}>
              Direct-to-Developer Engineering. Zero Agency Bloat. Practical digital solutions built for scalable modern enterprise.
            </p>
          </div>

          <div>
            <h4 className="footer-col-title">Navigation</h4>
            <ul className="footer-links-list">
              <li><a href="/" onClick={(e) => handleNav(e, 'home', 'home')}>Home</a></li>
              <li><a href="/#about" onClick={(e) => handleNav(e, 'home', 'about')}>About</a></li>
              <li><a href="/#services" onClick={(e) => handleNav(e, 'home', 'services')}>Services</a></li>
              <li><a href="/projects" onClick={(e) => handleNav(e, 'projects')}>Delivered Projects</a></li>
              <li><a href="/courses" onClick={(e) => handleNav(e, 'courses')}>Courses (Coming Soon)</a></li>
              <li><a href="/#testimonials" onClick={(e) => handleNav(e, 'home', 'testimonials')}>Testimonials</a></li>
              <li><a href="/#faq" onClick={(e) => handleNav(e, 'home', 'faq')}>FAQ</a></li>
              <li><a href="/#contact" onClick={(e) => handleNav(e, 'home', 'contact')}>Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="footer-col-title">Solutions</h4>
            <ul className="footer-links-list">
              <li><a href="/#services" onClick={(e) => handleNav(e, 'home', 'services')}>Website Development</a></li>
              <li><a href="/#services" onClick={(e) => handleNav(e, 'home', 'services')}>Custom Software</a></li>
              <li><a href="/#services" onClick={(e) => handleNav(e, 'home', 'services')}>Mobile App Development</a></li>
              <li><a href="/#services" onClick={(e) => handleNav(e, 'home', 'services')}>AI Automation Solutions</a></li>
              <li><a href="/#services" onClick={(e) => handleNav(e, 'home', 'services')}>WhatsApp Automation</a></li>
              <li><a href="/#services" onClick={(e) => handleNav(e, 'home', 'services')}>CRM Development</a></li>
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
                  WhatsApp: {CONFIG.displayWhatsapp}
                </a>
              </li>
              <li>
                <a href={`tel:${CONFIG.phoneNumber}`}>
                  Phone: {CONFIG.displayPhone}
                </a>
              </li>
              <li>
                <a href="mailto:contact@historymakertech.com">
                  Email: contact@historymakertech.com
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
          <div className="footer-space-badge">
            DIRECT ACCESS · TRANSPARENT PRICING · ZERO BLOAT
          </div>
        </div>
      </div>
    </footer>
  );
}
