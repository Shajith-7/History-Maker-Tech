import React, { useEffect, useRef, useState } from 'react';

/**
 * VideoScrollBackground
 * 
 * Strict Requirements:
 * - Only HMT_BACKGROUND.mp4 as the background
 * - Video NEVER plays automatically when idle (completely static holding frame)
 * - Video animates/runs purely driven by scrolling effort:
 *   - Scrolling down (forward) scrubs the video forward
 *   - Scrolling up (backward) scrubs the video in reverse
 *   - Idle / No scroll: stays 100% static on current frame
 * - Sequential seek lock ensures zero dropped frames or browser decoder choking
 * - Zero sound (muted, playsInline)
 */
export default function VideoScrollBackground() {
  const videoRef = useRef(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.volume = 0;
    video.playsInline = true;
    video.pause();

    let targetTime = 0;
    let currentTime = 0;
    let isSeeking = false;
    let animationFrameId = null;

    // Helper to calculate accurate scroll progress across native scroll and Lenis
    const getProgress = () => {
      let scroll = 0;
      let limit = 1;

      if (window.__lenis && typeof window.__lenis.scroll === 'number') {
        scroll = window.__lenis.scroll;
        limit = window.__lenis.limit || (document.documentElement.scrollHeight - window.innerHeight);
      } else {
        scroll = window.scrollY || window.pageYOffset || document.documentElement.scrollTop || 0;
        limit = document.documentElement.scrollHeight - window.innerHeight;
      }

      limit = Math.max(1, limit);
      return Math.min(Math.max(scroll / limit, 0), 1);
    };

    const updateSeek = () => {
      const duration = (video.duration && !isNaN(video.duration) && video.duration > 0)
        ? video.duration
        : 10.0;

      const progress = getProgress();
      targetTime = progress * duration;

      const diff = targetTime - currentTime;

      // When difference is noticeable and decoder is not currently seeking
      if (Math.abs(diff) > 0.003 && !isSeeking) {
        // Effort-responsive lerp factor (0.24 gives fast, fluid response)
        currentTime += diff * 0.24;
        const clamped = Math.min(Math.max(currentTime, 0.001), duration - 0.001);

        try {
          isSeeking = true;
          video.currentTime = clamped;
        } catch (e) {
          isSeeking = false;
        }
      }
    };

    const onSeeked = () => {
      isSeeking = false;
      updateSeek();
    };

    video.addEventListener('seeked', onSeeked);

    const onScroll = () => {
      updateSeek();
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    // Hook Lenis if present
    if (window.__lenis && typeof window.__lenis.on === 'function') {
      window.__lenis.on('scroll', onScroll);
    }

    // Smooth animation loop to glide effortlessly with momentum
    const loop = () => {
      animationFrameId = requestAnimationFrame(loop);
      updateSeek();
    };

    // When video metadata is available, initialize frame position
    const onLoaded = () => {
      setIsReady(true);
      video.pause();
      const duration = (video.duration && !isNaN(video.duration)) ? video.duration : 10.0;
      const initialProgress = getProgress();
      const initialTime = Math.min(Math.max(initialProgress * duration, 0.001), duration - 0.001);
      currentTime = initialTime;
      targetTime = initialTime;
      try {
        video.currentTime = initialTime;
      } catch (e) {}
      loop();
    };

    video.addEventListener('loadedmetadata', onLoaded);
    video.addEventListener('canplay', () => setIsReady(true));

    if (video.readyState >= 1) {
      onLoaded();
    } else {
      // Start loop anyway with fallback duration
      loop();
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      video.removeEventListener('seeked', onSeeked);
      video.removeEventListener('loadedmetadata', onLoaded);
      if (window.__lenis && typeof window.__lenis.off === 'function') {
        window.__lenis.off('scroll', onScroll);
      }
    };
  }, []);

  return (
    <div className="video-scroll-bg-container" aria-hidden="true">
      {/* Solo Scroll-Driven Background Video */}
      <video
        ref={videoRef}
        className="video-scroll-element"
        src="/assets/HMT_BACKGROUND.mp4"
        preload="auto"
        muted
        playsInline
        webkit-playsinline="true"
        disablePictureInPicture
        disableRemotePlayback
        aria-hidden="true"
      />

      {/* Cinematic Contrast Overlay & Edge Vignette */}
      <div className="video-scroll-overlay"></div>
      <div className="video-scroll-vignette"></div>
    </div>
  );
}
