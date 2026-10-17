import React, { useState, useEffect } from 'react';
import { CONFIG } from '../data/siteData';

const NAV_ITEMS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Delivered Projects', href: '#projects' },
  { label: 'Courses', href: '#courses' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' }
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = NAV_ITEMS.map((item) => item.href.substring(1));
      const current = sections.find((section) => {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          return rect.top <= 160 && rect.bottom >= 160;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <>
      <header id="site-header" className={isScrolled ? 'scrolled' : ''}>
        <div className="container header-inner">
          {/* Brand Logo */}
          <a href="#home" className="brand-link" aria-label="History Maker Tech">
            <img
              src="/assets/images/logo.png"
              alt="History Maker Tech"
              className="brand-logo-img"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = '/assets/images/logo.jpg';
              }}
            />
          </a>

          {/* Desktop Navigation Links */}
          <nav aria-label="Main Navigation">
            <ul className="nav-links-desktop">
              {NAV_ITEMS.map((item) => {
                const id = item.href.substring(1);
                return (
                  <li key={item.href} className="nav-item">
                    <a
                      href={item.href}
                      className={activeSection === id ? 'active' : ''}
                    >
                      {item.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Header Action Button */}
          <div className="header-actions">
            <a href="#contact" className="btn-header-cta magnetic">
              <span>Let's Talk</span>
            </a>

            {/* Mobile Hamburger Button */}
            <button
              id="mobile-menu-toggle-btn"
              className="mobile-menu-btn"
              aria-label="Toggle mobile menu"
              aria-expanded={mobileMenuOpen}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer (Only visible on mobile when toggled open) */}
      {mobileMenuOpen && (
        <>
          <div
            className="mobile-nav-backdrop open"
            onClick={closeMobileMenu}
            aria-hidden="true"
          ></div>

          <div id="mobile-nav" className="open" aria-label="Mobile Navigation">
            <div className="mobile-nav-header">
              <img
                src="/assets/images/logo.png"
                alt="History Maker Tech"
                style={{ height: '36px', width: 'auto' }}
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = '/assets/images/logo.jpg';
                }}
              />
              <button
                className="btn-icon-glass"
                aria-label="Close menu"
                onClick={closeMobileMenu}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>

            <ul className="mobile-nav-links">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={closeMobileMenu}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>

            <div style={{ marginTop: 'auto', paddingTop: '20px' }}>
              <a
                href={`https://wa.me/${CONFIG.whatsappNumber}?text=Hello%20History%20Maker%20Tech,%20I'd%20like%20to%20discuss%20a%20project.`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold"
                style={{ width: '100%', textAlign: 'center', display: 'flex', justifyContent: 'center' }}
                onClick={closeMobileMenu}
              >
                <span>WhatsApp Direct</span>
              </a>
            </div>
          </div>
        </>
      )}
    </>
  );
}
