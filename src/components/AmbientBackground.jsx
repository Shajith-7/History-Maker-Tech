import React from 'react';
import VideoScrollBackground from './VideoScrollBackground';

/**
 * AmbientBackground
 * 
 * Exclusively renders the user's uploaded video (HMT BACKGROUND)
 * as the interactive scroll-driven background for the entire website.
 */
export default function AmbientBackground() {
  return (
    <div className="ambient-background" aria-hidden="true">
      {/* Scroll-Driven Video Background (HMT BACKGROUND) */}
      <VideoScrollBackground />
    </div>
  );
}
