import React, { useEffect, useRef, useState } from 'react';
import Swiper from 'swiper';
import { Navigation, Pagination, Keyboard, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { SERVICES, CONFIG } from '../data/siteData';

function renderIcon(iconType) {
  switch (iconType) {
    case 'monitor':
      return (
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
          <line x1="8" y1="21" x2="16" y2="21"></line>
          <line x1="12" y1="17" x2="12" y2="21"></line>
        </svg>
      );
    case 'code':
      return (
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="16 18 22 12 16 6"></polyline>
          <polyline points="8 6 2 12 8 18"></polyline>
          <line x1="14" y1="4" x2="10" y2="20"></line>
        </svg>
      );
    case 'smartphone':
      return (
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
          <line x1="12" y1="18" x2="12.01" y2="18"></line>
        </svg>
      );
    case 'users':
      return (
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
          <circle cx="9" cy="7" r="4"></circle>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
        </svg>
      );
    case 'cpu':
      return (
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="11" width="18" height="10" rx="2"></rect>
          <circle cx="12" cy="5" r="2"></circle>
          <path d="M12 7v4"></path>
          <line x1="8" y1="16" x2="8" y2="16"></line>
          <line x1="16" y1="16" x2="16" y2="16"></line>
        </svg>
      );
    case 'message':
      return (
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
        </svg>
      );
    case 'trending':
      return (
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
          <polyline points="17 6 23 6 23 12"></polyline>
        </svg>
      );
    case 'bag':
      return (
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <path d="M16 10a4 4 0 0 1-8 0"></path>
        </svg>
      );
    case 'zap':
    default:
      return (
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="6" y1="3" x2="6" y2="15"></line>
          <circle cx="18" cy="6" r="3"></circle>
          <circle cx="6" cy="18" r="3"></circle>
          <path d="M18 9a9 9 0 0 1-9 9"></path>
        </svg>
      );
  }
}

const CATEGORY_TABS = [
  { label: "All Solutions (09)", index: 0 },
  { label: "Web & Mobile", index: 0 },
  { label: "Custom CRM", index: 3 },
  { label: "AI & Automations", index: 4 },
  { label: "Growth & E-Commerce", index: 6 }
];

function ServiceCardItem({ service }) {
  const cardRef = useRef(null);
  const [coords, setCoords] = useState({ x: 50, y: 50 });
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -5;
    const rotateY = ((x - centerX) / centerX) * 5;

    setCoords({ x, y });
    setTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  const handleDiscuss = (title) => {
    const text = `Hello History Maker Tech, I am interested in discussing your ${title} service.`;
    const url = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <article
      ref={cardRef}
      className={`service-card ${isHovered ? 'is-hovered' : ''}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: isHovered
          ? `perspective(800px) rotateX(${tilt.x.toFixed(2)}deg) rotateY(${tilt.y.toFixed(2)}deg) translateY(-6px)`
          : 'perspective(800px) rotateX(0deg) rotateY(0deg) translateY(0)',
        transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)'
      }}
    >
      {/* Real-time Cursor Spotlight Glow */}
      <div
        className="service-card-spotlight"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(320px circle at ${coords.x}px ${coords.y}px, rgba(214, 168, 63, 0.2), rgba(47, 105, 255, 0.12), transparent 70%)`
        }}
        aria-hidden="true"
      />

      {/* Traveling Luminous Shimmer Border */}
      <div className="service-card-top-shimmer" aria-hidden="true" />

      <div className="service-card-inner">
        {/* Top Meta: Category Badge & Service Number */}
        <div className="service-card-top-meta">
          <div className="service-category-badge">
            <span className="badge-dot"></span>
            <span>{service.category}</span>
          </div>
          <span className="service-card-num">// {service.num}</span>
        </div>

        {/* Header: Icon Box & Title */}
        <div className="service-card-header">
          <div className="service-icon-box">
            {renderIcon(service.iconType)}
          </div>
          <h3 className="service-card-title">{service.title}</h3>
        </div>

        {/* Description */}
        <p className="service-card-desc">{service.desc}</p>

        {/* Tags */}
        <div className="service-card-tags">
          {service.tags.map((tag) => (
            <span key={tag} className="service-tag">
              {tag}
            </span>
          ))}
        </div>

        {/* Footer: Direct Discuss CTA */}
        <div className="service-card-footer">
          <button
            className="btn-discuss-service"
            onClick={() => handleDiscuss(service.title)}
          >
            <span>Discuss this service</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </button>
        </div>
      </div>
    </article>
  );
}

export default function Services() {
  const swiperRef = useRef(null);
  const swiperInstanceRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeFilter, setActiveFilter] = useState("All Solutions (09)");

  useEffect(() => {
    if (!swiperRef.current) return;

    const swiper = new Swiper(swiperRef.current, {
      modules: [Navigation, Pagination, Keyboard, A11y],
      slidesPerView: 1.15,
      spaceBetween: 20,
      speed: 650,
      grabCursor: true,
      keyboard: {
        enabled: true,
        onlyInViewport: true
      },
      navigation: {
        nextEl: '.services-swiper-next',
        prevEl: '.services-swiper-prev'
      },
      pagination: {
        el: '.services-swiper-pagination',
        clickable: true,
        dynamicBullets: true
      },
      breakpoints: {
        640: {
          slidesPerView: 1.75,
          spaceBetween: 22
        },
        992: {
          slidesPerView: 2.45,
          spaceBetween: 26
        },
        1200: {
          slidesPerView: 3,
          spaceBetween: 28
        }
      },
      on: {
        slideChange: (s) => {
          setActiveIndex(s.realIndex ?? s.activeIndex);
        }
      }
    });

    swiperInstanceRef.current = swiper;

    return () => {
      swiper.destroy(true, true);
    };
  }, []);

  const handleFilterClick = (tab) => {
    setActiveFilter(tab.label);
    if (swiperInstanceRef.current) {
      swiperInstanceRef.current.slideTo(tab.index, 650);
    }
  };

  return (
    <section id="services">
      <div className="container">
        {/* Header with Title and Modern Top Navigation Controls */}
        <div className="services-top-bar reveal">
          <div className="services-header-text">
            <div className="section-glow-line" aria-hidden="true"></div>
            <h2 className="section-heading">
              Technology That Moves Your <span className="gold-gradient-text">Business Forward.</span>
            </h2>
            <p className="section-subhead">
              From responsive websites and custom web apps to mobile engineering, custom CRM systems, and AI-powered workflows.
            </p>
          </div>

          {/* Navigation Arrows Cluster */}
          <div className="services-nav-cluster">
            <div className="services-counter-badge">
              <span className="services-counter-num">{String(activeIndex + 1).padStart(2, '0')}</span>
              <span className="services-counter-sep">/</span>
              <span className="services-counter-max">0{SERVICES.length}</span>
            </div>
            <button
              className="services-nav-btn services-swiper-prev"
              aria-label="Previous service"
              title="Previous Service"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>
            <button
              className="services-nav-btn services-swiper-next"
              aria-label="Next service"
              title="Next Service"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          </div>
        </div>

        {/* Quick Filter Category Pills */}
        <div className="services-filter-pills reveal">
          {CATEGORY_TABS.map((tab, idx) => (
            <button
              key={idx}
              className={`services-filter-pill ${activeFilter === tab.label ? 'is-active' : ''}`}
              onClick={() => handleFilterClick(tab)}
            >
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Swiper Multi-Card Showcase Carousel */}
        <div className="services-showcase-wrapper reveal">
          <div className="swiper services-swiper" ref={swiperRef}>
            <div className="swiper-wrapper">
              {SERVICES.map((service) => (
                <div key={service.num} className="swiper-slide">
                  <ServiceCardItem service={service} />
                </div>
              ))}
            </div>
          </div>

          {/* Pagination Track & Interaction Hint */}
          <div className="services-bottom-meta">
            <div className="services-swiper-pagination"></div>
            <div className="services-swipe-hint">
              <span>← Drag or swipe cards smoothly →</span>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="services-bottom-cta reveal">
          <a href="#contact" className="btn-secondary">
            <span>Have a Different Requirement? Let's Discuss</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
