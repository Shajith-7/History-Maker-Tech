import React from 'react';
import SpaceBackground from './SpaceBackground';

export default function AmbientBackground() {
  return (
    <div className="ambient-background" aria-hidden="true">
      {/* 3D Deep Space Simulation Canvas (Planet, Atmosphere, Starfields, Nebulae, Meteors) */}
      <SpaceBackground />

      {/* Realistic Deep Cosmos Nebula Glows */}
      <div className="ambient-orb orb-deep-space"></div>
      <div className="ambient-orb orb-cosmic-purple"></div>
      <div className="ambient-orb orb-stellar-gold"></div>

      {/* Deep Space Atmospheric Vignette */}
      <div className="space-vignette-overlay"></div>
    </div>
  );
}
