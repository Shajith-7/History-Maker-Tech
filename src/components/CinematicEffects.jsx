import React, { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function CinematicEffects() {
  const cursorDotRef = useRef(null);
  const cursorRingRef = useRef(null);
  const progressBarRef = useRef(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

    document.documentElement.classList.add('js-cinematic');

    // 1. Lenis Butter-Smooth Scrolling
    let lenis = null;
    let tickerHandler = null;

    if (!reduceMotion) {
      lenis = new Lenis({
        lerp: 0.08,
        wheelMultiplier: 0.92,
        smoothWheel: true,
        touchMultiplier: 1.15
      });

      window.__lenis = lenis;

      lenis.on('scroll', ({ scroll, limit }) => {
        const progress = limit > 0 ? scroll / limit : 0;
        if (progressBarRef.current) {
          progressBarRef.current.style.width = `${progress * 100}%`;
        }
        ScrollTrigger.update();
      });

      tickerHandler = (time) => {
        lenis.raf(time * 1000);
      };
      gsap.ticker.add(tickerHandler);
      gsap.ticker.lagSmoothing(0);

      // Smooth anchor scrolling
      const handleAnchorClick = (e) => {
        const link = e.target.closest('a[href^="#"]');
        if (!link) return;
        const id = link.getAttribute('href');
        if (!id || id === '#') return;
        const target = document.querySelector(id);
        if (!target) return;
        e.preventDefault();
        lenis.scrollTo(target, { offset: -72, duration: 1.35 });
      };
      document.addEventListener('click', handleAnchorClick);

      // Clean anchor event
      var cleanAnchor = () => document.removeEventListener('click', handleAnchorClick);
    } else {
      // Fallback scroll progress
      const handleNativeScroll = () => {
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0;
        if (progressBarRef.current) {
          progressBarRef.current.style.width = `${progress}%`;
        }
      };
      window.addEventListener('scroll', handleNativeScroll, { passive: true });
      var cleanAnchor = () => window.removeEventListener('scroll', handleNativeScroll);
    }

    // 2. Dual-Ring Custom Ambient Cursor (Non-intrusive)
    const dot = cursorDotRef.current;
    const ring = cursorRingRef.current;
    let cursorMoveCleanup = null;
    let cursorHoverCleanup = null;

    if (dot && ring && finePointer && !reduceMotion) {
      const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
      const ringPos = { x: pos.x, y: pos.y };

      const onPointerMove = (e) => {
        pos.x = e.clientX;
        pos.y = e.clientY;
        gsap.to(dot, { x: pos.x, y: pos.y, duration: 0.1, ease: 'power3.out' });
      };
      window.addEventListener('pointermove', onPointerMove, { passive: true });

      const ringTicker = () => {
        ringPos.x += (pos.x - ringPos.x) * 0.16;
        ringPos.y += (pos.y - ringPos.y) * 0.16;
        ring.style.transform = `translate3d(${ringPos.x}px, ${ringPos.y}px, 0)`;
      };
      gsap.ticker.add(ringTicker);

      const hoverTargets = 'a, button, input, select, textarea, .service-card, .vm-card, .project-card, .faq-item';
      const onPointerOver = (e) => {
        if (e.target.closest(hoverTargets)) ring.classList.add('is-hover');
      };
      const onPointerOut = (e) => {
        if (e.target.closest(hoverTargets)) ring.classList.remove('is-hover');
      };

      document.addEventListener('pointerover', onPointerOver);
      document.addEventListener('pointerout', onPointerOut);

      cursorMoveCleanup = () => {
        window.removeEventListener('pointermove', onPointerMove);
        gsap.ticker.remove(ringTicker);
      };
      cursorHoverCleanup = () => {
        document.removeEventListener('pointerover', onPointerOver);
        document.removeEventListener('pointerout', onPointerOut);
      };
    }

    // 3. Floating Ambient Glow Animations
    const glowA = document.querySelector('.ambient-glow.glow-a');
    const glowB = document.querySelector('.ambient-glow.glow-b');
    let glowTweenA = null;
    let glowTweenB = null;

    if (glowA && glowB && !reduceMotion) {
      glowTweenA = gsap.to(glowA, {
        x: 60,
        y: 35,
        duration: 10,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });
      glowTweenB = gsap.to(glowB, {
        x: -50,
        y: -40,
        duration: 14,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });
    }

    return () => {
      if (cleanAnchor) cleanAnchor();
      if (cursorMoveCleanup) cursorMoveCleanup();
      if (cursorHoverCleanup) cursorHoverCleanup();
      if (glowTweenA) glowTweenA.kill();
      if (glowTweenB) glowTweenB.kill();

      if (tickerHandler) gsap.ticker.remove(tickerHandler);
      if (lenis) lenis.destroy();
    };
  }, []);

  return (
    <>
      <div className="ambient-glow glow-a" aria-hidden="true"></div>
      <div className="ambient-glow glow-b" aria-hidden="true"></div>
      <div id="scroll-progress" className="scroll-progress" ref={progressBarRef} aria-hidden="true"></div>
      <div id="cinematic-cursor" className="cinematic-cursor" ref={cursorDotRef} aria-hidden="true"></div>
      <div id="cinematic-cursor-ring" className="cinematic-cursor-ring" ref={cursorRingRef} aria-hidden="true"></div>
    </>
  );
}
