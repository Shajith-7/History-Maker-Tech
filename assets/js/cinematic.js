import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

document.documentElement.classList.add('js-cinematic');

export const motion = {
  lenis: null,
  scrollY: 0,
  progress: 0,
  reduceMotion
};

function getScrollY() {
  if (motion.lenis) return motion.lenis.scroll;
  return window.scrollY || 0;
}

window.__getScrollY = getScrollY;

function initLenis() {
  if (reduceMotion) return null;

  const lenis = new Lenis({
    lerp: 0.08,
    wheelMultiplier: 0.92,
    smoothWheel: true,
    syncTouch: false,
    touchMultiplier: 1.15
  });

  motion.lenis = lenis;
  window.__lenis = lenis;

  lenis.on('scroll', ({ scroll, limit }) => {
    motion.scrollY = scroll;
    motion.progress = limit > 0 ? scroll / limit : 0;
    const bar = document.getElementById('scroll-progress');
    if (bar) bar.style.width = `${motion.progress * 100}%`;
    ScrollTrigger.update();
  });

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (event) => {
      const id = link.getAttribute('href');
      if (!id || id === '#') return;
      const target = document.querySelector(id);
      if (!target) return;
      event.preventDefault();
      lenis.scrollTo(target, { offset: -72, duration: 1.35 });
    });
  });

  return lenis;
}

function initCursor() {
  const dot = document.getElementById('cinematic-cursor');
  const ring = document.getElementById('cinematic-cursor-ring');
  if (!dot || !ring || !finePointer || reduceMotion) return;

  const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
  const ringPos = { x: pos.x, y: pos.y };

  window.addEventListener('pointermove', (event) => {
    pos.x = event.clientX;
    pos.y = event.clientY;
    gsap.to(dot, { x: pos.x, y: pos.y, duration: 0.12, ease: 'power3.out' });
  }, { passive: true });

  gsap.ticker.add(() => {
    ringPos.x += (pos.x - ringPos.x) * 0.16;
    ringPos.y += (pos.y - ringPos.y) * 0.16;
    ring.style.transform = `translate3d(${ringPos.x}px, ${ringPos.y}px, 0)`;
  });

  const hoverTargets = 'a, button, input, select, textarea, .palette-card, .service-card, .faq-question-btn';
  document.addEventListener('pointerover', (event) => {
    if (event.target.closest(hoverTargets)) ring.classList.add('is-hover');
  });
  document.addEventListener('pointerout', (event) => {
    if (event.target.closest(hoverTargets)) ring.classList.remove('is-hover');
  });
}

function initMagnetic() {
  if (!finePointer || reduceMotion) return;

  document.querySelectorAll('.btn-gold, .btn-header-cta, .btn-icon-glass, .services-nav-btn').forEach((el) => {
    el.classList.add('magnetic');
    el.addEventListener('pointermove', (event) => {
      const rect = el.getBoundingClientRect();
      const x = event.clientX - rect.left - rect.width / 2;
      const y = event.clientY - rect.top - rect.height / 2;
      gsap.to(el, { x: x * 0.22, y: y * 0.22, duration: 0.35, ease: 'power3.out' });
    });
    el.addEventListener('pointerleave', () => {
      gsap.to(el, { x: 0, y: 0, duration: 0.55, ease: 'elastic.out(1, 0.45)' });
    });
  });
}

function initAmbientGlows() {
  const glowA = document.querySelector('.ambient-glow.glow-a');
  const glowB = document.querySelector('.ambient-glow.glow-b');
  if (!glowA || !glowB || reduceMotion) return;

  gsap.to(glowA, {
    x: 80,
    y: 40,
    duration: 12,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut'
  });
  gsap.to(glowB, {
    x: -60,
    y: -50,
    duration: 16,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut'
  });

  ScrollTrigger.create({
    start: 0,
    end: 'max',
    onUpdate: (self) => {
      const p = self.progress;
      gsap.set(glowA, { opacity: 0.28 + Math.sin(p * Math.PI) * 0.22 });
      gsap.set(glowB, { opacity: 0.18 + p * 0.28 });
    }
  });
}

function splitWords(element) {
  if (!element || element.dataset.split === 'true') return;
  const html = element.innerHTML;
  const parts = html.split(/(<[^>]+>)/g);
  element.innerHTML = parts.map((part) => {
    if (part.startsWith('<')) return part;
    return part.replace(/\S+/g, (word) => `<span class="word-split"><span class="word-inner">${word}</span></span>`);
  }).join('');
  element.dataset.split = 'true';

  element.querySelectorAll('.word-split').forEach((wrap) => {
    wrap.style.display = 'inline-block';
    wrap.style.overflow = 'hidden';
    wrap.style.verticalAlign = 'bottom';
  });
  element.querySelectorAll('.word-inner').forEach((inner) => {
    inner.style.display = 'inline-block';
    inner.style.willChange = 'transform, opacity';
  });
}

function initScrollScenes() {
  if (reduceMotion) {
    document.querySelectorAll('.reveal').forEach((el) => el.classList.add('is-visible'));
    return;
  }

  const hero = document.querySelector('.hero-heading');
  if (hero) {
    splitWords(hero);
    gsap.from(hero.querySelectorAll('.word-inner'), {
      yPercent: 110,
      opacity: 0,
      duration: 1.15,
      ease: 'power4.out',
      stagger: 0.055,
      delay: 0.15
    });
  }

  gsap.from('.hero-eyebrow, .hero-subhead, .hero-ctas, .hero-trust', {
    y: 28,
    opacity: 0,
    duration: 1,
    ease: 'power3.out',
    stagger: 0.1,
    delay: 0.35
  });

  document.querySelectorAll('section').forEach((section) => {
    const items = section.querySelectorAll('.section-heading, .section-subhead, .section-eyebrow, .vm-card, .testimonial-card, .faq-item, .contact-method-card, .contact-form-card, .about-intro-text');
    if (!items.length) return;

    gsap.from(items, {
      y: 48,
      opacity: 0,
      filter: 'blur(10px)',
      duration: 1.05,
      ease: 'power3.out',
      stagger: 0.08,
      scrollTrigger: {
        trigger: section,
        start: 'top 78%',
        once: true
      }
    });
  });

  gsap.to('.hero-content', {
    y: 80,
    opacity: 0.15,
    ease: 'none',
    scrollTrigger: {
      trigger: '#home',
      start: 'top top',
      end: 'bottom top',
      scrub: true
    }
  });

  document.querySelectorAll('.vm-card, .testimonial-card, .contact-form-card').forEach((card) => {
    gsap.to(card, {
      y: -36,
      ease: 'none',
      scrollTrigger: {
        trigger: card,
        start: 'top 90%',
        end: 'bottom top',
        scrub: 1.1
      }
    });
  });

  gsap.from('.footer-cta-block', {
    scale: 0.94,
    opacity: 0,
    duration: 1.1,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '#site-footer',
      start: 'top 85%',
      once: true
    }
  });
}

export function bootCinematic() {
  initLenis();
  initCursor();
  initMagnetic();
  initAmbientGlows();
  initScrollScenes();
  ScrollTrigger.refresh();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootCinematic);
} else {
  bootCinematic();
}
