import React from 'react';

export default function AmbientBackground() {
  return (
    <div className="ambient-background" aria-hidden="true">
      {/* Dynamic Radial Glows */}
      <div className="ambient-orb orb-primary"></div>
      <div className="ambient-orb orb-secondary"></div>
      <div className="ambient-orb orb-gold"></div>
      {/* Subtle Digital Studio Grid Overlay */}
      <div className="ambient-grid-overlay"></div>
      {/* Soft Vignette */}
      <div className="ambient-vignette-overlay"></div>
    </div>
  );
}
