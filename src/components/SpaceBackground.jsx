import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * Photorealistic 3D Space Background with Dynamic Company 3D Model Structures on Scroll
 * 
 * Features:
 * - At top (Hero): High-detail planet with oceanic specular shine, city night lights, Saturn-like rings, atmospheric Rayleigh halo
 * - ON SCROLL: Planet smoothly recedes to upper horizon as majestic COMPANY 3D MODEL STRUCTURES materialize in zero-gravity!
 *   - Central "History Maker Tech" (HMT) architectural monolith with glowing golden/cyan circuit traces & energy core
 *   - Triple quantum gyroscope containment rings orbiting the monolith
 *   - 4 modular orbiting tech satellite stations representing company pillars (Web Engineering, Custom Software & CRM, Mobile Platforms, AI Automation)
 *   - Glowing laser data link beams connecting all company modules to the central monolith
 * - 4,000+ stars with realistic stellar temperatures & scientific twinkle scintillation
 * - Deep interstellar nebulas & dynamic scroll-velocity meteors
 * - Smooth camera flight path and complete WebGL memory cleanup
 */
export default function SpaceBackground() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth < 768;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x020308, 0.012);

    const camera = new THREE.PerspectiveCamera(
      48,
      window.innerWidth / window.innerHeight,
      0.1,
      400
    );
    camera.position.set(0, 0, 18);

    const renderer = new THREE.WebGLRenderer({
      powerPreference: 'high-performance',
      antialias: true,
      alpha: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.4;
    container.appendChild(renderer.domElement);

    // 2. Procedural Planet Textures
    const createPlanetDayTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 1024;
      canvas.height = 512;
      const ctx = canvas.getContext('2d');

      const oceanGrad = ctx.createLinearGradient(0, 0, 0, 512);
      oceanGrad.addColorStop(0, '#040d24');
      oceanGrad.addColorStop(0.2, '#061738');
      oceanGrad.addColorStop(0.5, '#0a2a5c');
      oceanGrad.addColorStop(0.8, '#061738');
      oceanGrad.addColorStop(1, '#020713');
      ctx.fillStyle = oceanGrad;
      ctx.fillRect(0, 0, 1024, 512);

      ctx.fillStyle = '#0f382e';
      for (let i = 0; i < 48; i++) {
        const x = Math.random() * 1024;
        const y = 70 + Math.random() * 370;
        const r = 20 + Math.random() * 70;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#1c5e46';
        ctx.beginPath();
        ctx.arc(x + Math.random() * 20 - 10, y + Math.random() * 20 - 10, r * 0.65, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#114234';
      }

      ctx.fillStyle = '#4a402e';
      for (let j = 0; j < 18; j++) {
        const x = Math.random() * 1024;
        const y = 140 + Math.random() * 230;
        ctx.beginPath();
        ctx.ellipse(x, y, 35 + Math.random() * 45, 12 + Math.random() * 15, Math.random() * 0.3, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.fillStyle = 'rgba(56, 189, 248, 0.12)';
      for (let k = 0; k < 30; k++) {
        const y = Math.random() * 512;
        ctx.fillRect(0, y, 1024, 6 + Math.random() * 14);
      }

      return new THREE.CanvasTexture(canvas);
    };

    const createNightLightsTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 1024;
      canvas.height = 512;
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, 1024, 512);

      for (let i = 0; i < 35; i++) {
        const cx = Math.random() * 1024;
        const cy = 90 + Math.random() * 330;
        const radGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 28);
        radGrad.addColorStop(0, 'rgba(255, 214, 138, 0.95)');
        radGrad.addColorStop(0.3, 'rgba(251, 191, 36, 0.7)');
        radGrad.addColorStop(0.7, 'rgba(217, 119, 6, 0.3)');
        radGrad.addColorStop(1, 'transparent');
        ctx.fillStyle = radGrad;
        ctx.beginPath();
        ctx.arc(cx, cy, 28, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = 'rgba(255, 214, 138, 0.4)';
        ctx.lineWidth = 0.8;
        for (let l = 0; l < 8; l++) {
          ctx.beginPath();
          ctx.moveTo(cx, cy);
          ctx.lineTo(cx + Math.random() * 60 - 30, cy + Math.random() * 60 - 30);
          ctx.stroke();
        }
      }

      return new THREE.CanvasTexture(canvas);
    };

    const createCloudsTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 1024;
      canvas.height = 512;
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, 1024, 512);

      ctx.fillStyle = 'rgba(255, 255, 255, 0.38)';
      for (let i = 0; i < 110; i++) {
        const x = Math.random() * 1024;
        const y = Math.random() * 512;
        const rx = 35 + Math.random() * 95;
        const ry = 12 + Math.random() * 30;
        ctx.beginPath();
        ctx.ellipse(x, y, rx, ry, Math.random() * 0.4 - 0.2, 0, Math.PI * 2);
        ctx.fill();
      }

      return new THREE.CanvasTexture(canvas);
    };

    const createRingTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 512;
      canvas.height = 64;
      const ctx = canvas.getContext('2d');

      const grad = ctx.createLinearGradient(0, 0, 512, 0);
      grad.addColorStop(0, 'rgba(0, 0, 0, 0)');
      grad.addColorStop(0.12, 'rgba(56, 189, 248, 0.35)');
      grad.addColorStop(0.28, 'rgba(226, 232, 240, 0.65)');
      grad.addColorStop(0.45, 'rgba(251, 191, 36, 0.55)');
      grad.addColorStop(0.55, 'rgba(0, 0, 0, 0.05)');
      grad.addColorStop(0.65, 'rgba(125, 211, 252, 0.5)');
      grad.addColorStop(0.85, 'rgba(226, 232, 240, 0.4)');
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');

      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 512, 64);

      for (let i = 0; i < 60; i++) {
        const x = Math.random() * 512;
        ctx.fillStyle = Math.random() > 0.5 ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.25)';
        ctx.fillRect(x, 0, 2 + Math.random() * 4, 64);
      }

      const tex = new THREE.CanvasTexture(canvas);
      tex.wrapS = THREE.RepeatWrapping;
      tex.wrapT = THREE.RepeatWrapping;
      return tex;
    };

    // 3. 3D Planet Construction
    const planetGroup = new THREE.Group();
    const basePlanetX = isMobile ? 3.0 : 8.2;
    const basePlanetY = isMobile ? 1.2 : 2.2;
    planetGroup.position.set(basePlanetX, basePlanetY, -20);
    scene.add(planetGroup);

    const planetRadius = isMobile ? 4.0 : 5.6;

    const dayTex = createPlanetDayTexture();
    const nightTex = createNightLightsTexture();

    const planetGeo = new THREE.SphereGeometry(planetRadius, 64, 64);
    const planetMat = new THREE.MeshStandardMaterial({
      map: dayTex,
      roughness: 0.68,
      metalness: 0.12,
      emissiveMap: nightTex,
      emissive: new THREE.Color(0xffe6aa),
      emissiveIntensity: 0.45
    });
    const planetMesh = new THREE.Mesh(planetGeo, planetMat);
    planetGroup.add(planetMesh);

    const cloudsTex = createCloudsTexture();
    const cloudsGeo = new THREE.SphereGeometry(planetRadius * 1.018, 64, 64);
    const cloudsMat = new THREE.MeshStandardMaterial({
      map: cloudsTex,
      transparent: true,
      opacity: 0.58,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    const cloudsMesh = new THREE.Mesh(cloudsGeo, cloudsMat);
    planetGroup.add(cloudsMesh);

    const atmosphereGeo = new THREE.SphereGeometry(planetRadius * 1.09, 48, 48);
    const atmosphereMat = new THREE.ShaderMaterial({
      vertexShader: `
        varying vec3 vNormal;
        varying vec3 vPosition;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          vPosition = position;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        varying vec3 vPosition;
        void main() {
          float viewDot = dot(vNormal, vec3(0.0, 0.0, 1.0));
          float intensity = pow(0.72 - viewDot, 2.6);
          vec3 skyCyan = vec3(0.22, 0.74, 1.0);
          vec3 sunsetAmber = vec3(1.0, 0.65, 0.3);
          vec3 atmColor = mix(sunsetAmber, skyCyan, clamp(viewDot + 0.35, 0.0, 1.0));
          gl_FragColor = vec4(atmColor, intensity * 0.92);
        }
      `,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      transparent: true,
      depthWrite: false
    });
    const atmosphereMesh = new THREE.Mesh(atmosphereGeo, atmosphereMat);
    planetGroup.add(atmosphereMesh);

    // Planetary Ring System
    const ringInner = planetRadius * 1.32;
    const ringOuter = planetRadius * 2.38;
    const ringGeo = new THREE.RingGeometry(ringInner, ringOuter, 64);
    const ringTex = createRingTexture();

    const ringPos = ringGeo.attributes.position;
    const ringUvs = ringGeo.attributes.uv;
    for (let i = 0; i < ringPos.count; i++) {
      const x = ringPos.getX(i);
      const y = ringPos.getY(i);
      const dist = Math.sqrt(x * x + y * y);
      const u = (dist - ringInner) / (ringOuter - ringInner);
      ringUvs.setXY(i, u, 0.5);
    }
    ringGeo.attributes.uv.needsUpdate = true;

    const ringMat = new THREE.MeshBasicMaterial({
      map: ringTex,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.78,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.x = Math.PI * 0.58;
    ringMesh.rotation.y = -Math.PI * 0.12;
    planetGroup.add(ringMesh);

    // Moon
    const moonGeo = new THREE.SphereGeometry(planetRadius * 0.24, 32, 32);
    const moonMat = new THREE.MeshStandardMaterial({
      color: 0x94a3b8,
      roughness: 0.85,
      metalness: 0.08
    });
    const moonMesh = new THREE.Mesh(moonGeo, moonMat);
    moonMesh.position.set(-planetRadius * 3.2, planetRadius * 1.4, -6);
    planetGroup.add(moonMesh);

    // =========================================================================
    // 4. COMPANY 3D MODEL STRUCTURES (Reveals & Materializes on Scroll!)
    // =========================================================================
    const createCompanyMonolithTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 512;
      canvas.height = 1024;
      const ctx = canvas.getContext('2d');

      // Deep obsidian space titanium
      ctx.fillStyle = '#060a14';
      ctx.fillRect(0, 0, 512, 1024);

      // Cybernetic circuit grid
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.2)';
      ctx.lineWidth = 1;
      for (let y = 0; y < 1024; y += 45) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(512, y);
        ctx.stroke();
      }
      for (let x = 0; x < 512; x += 45) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, 1024);
        ctx.stroke();
      }

      // Golden Header Slogan
      ctx.fillStyle = '#fbbf24';
      ctx.font = 'bold 36px monospace';
      ctx.textAlign = 'center';
      ctx.fillText('HISTORY MAKER', 256, 260);

      ctx.fillStyle = '#38bdf8';
      ctx.font = 'bold 28px monospace';
      ctx.fillText('TECH CORE', 256, 310);

      // Central HMT Monolith Emissary Crest
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 4;
      ctx.strokeRect(146, 380, 220, 220);

      ctx.strokeStyle = '#fbbf24';
      ctx.lineWidth = 2;
      ctx.strokeRect(160, 394, 192, 192);

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 76px monospace';
      ctx.fillText('HMT', 256, 515);

      // Golden Microchips and Power Bus Lines
      ctx.strokeStyle = '#fbbf24';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(256, 600);
      ctx.lineTo(256, 780);
      ctx.lineTo(400, 840);
      ctx.moveTo(256, 780);
      ctx.lineTo(112, 840);
      ctx.stroke();

      ctx.font = 'bold 20px monospace';
      ctx.fillStyle = 'rgba(56, 189, 248, 0.9)';
      ctx.fillText('ENTERPRISE DIGITAL ENGINE', 256, 920);

      const tex = new THREE.CanvasTexture(canvas);
      return tex;
    };

    const companyGroup = new THREE.Group();
    // Initially hidden / collapsed at top of Hero
    companyGroup.position.set(0, -22, -45);
    companyGroup.scale.set(0.001, 0.001, 0.001);
    scene.add(companyGroup);

    // A) Central HMT Tech Monolith
    const monolithTex = createCompanyMonolithTexture();
    const monolithGeo = new THREE.BoxGeometry(2.6, 7.2, 2.6);
    const monolithMat = new THREE.MeshStandardMaterial({
      map: monolithTex,
      metalness: 0.88,
      roughness: 0.22,
      emissive: new THREE.Color(0x0284c7),
      emissiveIntensity: 0.35
    });
    const monolithMesh = new THREE.Mesh(monolithGeo, monolithMat);
    companyGroup.add(monolithMesh);

    // Glowing wireframe outer cage on Monolith
    const monolithWireGeo = new THREE.WireframeGeometry(monolithGeo);
    const monolithWireMat = new THREE.LineBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending
    });
    const monolithWire = new THREE.LineSegments(monolithWireGeo, monolithWireMat);
    monolithMesh.add(monolithWire);

    // Central Pulsating Energy Core
    const coreGeo = new THREE.IcosahedronGeometry(1.0, 1);
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.85
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    coreMesh.position.y = 0;
    companyGroup.add(coreMesh);

    // Core Point Light
    const corePointLight = new THREE.PointLight(0x38bdf8, 2.5, 25);
    corePointLight.position.set(0, 0, 0);
    companyGroup.add(corePointLight);

    // B) Triple Quantum Gyroscope Containment Rings
    const gyroRing1 = new THREE.Mesh(
      new THREE.TorusGeometry(3.6, 0.06, 16, 80),
      new THREE.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.75, blending: THREE.AdditiveBlending })
    );
    const gyroRing2 = new THREE.Mesh(
      new THREE.TorusGeometry(4.4, 0.05, 16, 80),
      new THREE.MeshBasicMaterial({ color: 0xfbbf24, transparent: true, opacity: 0.7, blending: THREE.AdditiveBlending })
    );
    const gyroRing3 = new THREE.Mesh(
      new THREE.TorusGeometry(5.2, 0.04, 16, 80),
      new THREE.MeshBasicMaterial({ color: 0xc084fc, transparent: true, opacity: 0.65, blending: THREE.AdditiveBlending })
    );
    companyGroup.add(gyroRing1);
    companyGroup.add(gyroRing2);
    companyGroup.add(gyroRing3);

    // C) 4 Modular Orbiting Tech Satellite Pods (Company Pillars)
    const satellitePods = [];
    const podColors = [0x38bdf8, 0xfbbf24, 0x60a5fa, 0xa855f7];
    const podOffsets = [
      { x: 5.8, y: 2.2, z: 0 },    // Pod 0: Web Engineering
      { x: -5.8, y: -1.6, z: 2.2 }, // Pod 1: Custom Software & CRM
      { x: 3.8, y: -3.8, z: -3.6 }, // Pod 2: Mobile Platforms
      { x: -4.6, y: 3.4, z: -2.8 }  // Pod 3: AI Automation
    ];

    const podGeometries = [
      new THREE.OctahedronGeometry(0.85, 0),
      new THREE.BoxGeometry(1.1, 1.1, 1.1),
      new THREE.DodecahedronGeometry(0.8, 0),
      new THREE.IcosahedronGeometry(0.85, 1)
    ];

    for (let p = 0; p < 4; p++) {
      const pGroup = new THREE.Group();
      pGroup.position.set(podOffsets[p].x, podOffsets[p].y, podOffsets[p].z);

      const pMesh = new THREE.Mesh(
        podGeometries[p],
        new THREE.MeshStandardMaterial({
          color: 0x0f172a,
          metalness: 0.85,
          roughness: 0.25,
          emissive: new THREE.Color(podColors[p]),
          emissiveIntensity: 0.65
        })
      );
      pGroup.add(pMesh);

      // Wireframe overlay
      const pWire = new THREE.LineSegments(
        new THREE.WireframeGeometry(podGeometries[p]),
        new THREE.LineBasicMaterial({ color: podColors[p], transparent: true, opacity: 0.85, blending: THREE.AdditiveBlending })
      );
      pMesh.add(pWire);

      // Small satellite solar wings / panels
      const wingGeo = new THREE.BoxGeometry(1.6, 0.04, 0.5);
      const wingMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.7 });
      const wings = new THREE.Mesh(wingGeo, wingMat);
      pGroup.add(wings);

      companyGroup.add(pGroup);
      satellitePods.push({ group: pGroup, mesh: pMesh, offset: podOffsets[p], rotSpeed: 0.02 + p * 0.005 });
    }

    // D) Glowing Laser Data Beams (Connecting Satellites to HMT Monolith)
    const laserBeams = [];
    for (let l = 0; l < 4; l++) {
      const beamGeo = new THREE.BufferGeometry();
      const beamPos = new Float32Array([
        0, 0, 0, // Origin at Monolith center
        podOffsets[l].x, podOffsets[l].y, podOffsets[l].z // Destination at Pod
      ]);
      beamGeo.setAttribute('position', new THREE.BufferAttribute(beamPos, 3));
      const beamMat = new THREE.LineBasicMaterial({
        color: podColors[l],
        transparent: true,
        opacity: 0.7,
        blending: THREE.AdditiveBlending
      });
      const beamLine = new THREE.Line(beamGeo, beamMat);
      companyGroup.add(beamLine);
      laserBeams.push({ line: beamLine, podIdx: l });
    }

    // 5. Asteroid Belt / Drifting Space Rocks
    const asteroidCount = isMobile ? 18 : 36;
    const asteroidGroup = new THREE.Group();
    scene.add(asteroidGroup);

    const asteroidMeshes = [];
    const rockGeo = new THREE.DodecahedronGeometry(0.35, 1);
    const rockMat = new THREE.MeshStandardMaterial({
      color: 0x64748b,
      roughness: 0.9,
      metalness: 0.1
    });

    for (let i = 0; i < asteroidCount; i++) {
      const rock = new THREE.Mesh(rockGeo, rockMat);
      const scale = 0.5 + Math.random() * 1.4;
      rock.scale.set(scale, scale * (0.8 + Math.random() * 0.4), scale);

      const angle = (i / asteroidCount) * Math.PI * 2;
      const dist = 14 + Math.random() * 12;
      const rx = Math.cos(angle) * dist + (Math.random() - 0.5) * 6;
      const ry = Math.sin(angle) * (dist * 0.4) + (Math.random() - 0.5) * 5;
      const rz = -Math.random() * 35 - 5;

      rock.position.set(rx, ry, rz);

      const rotVel = {
        x: (Math.random() - 0.5) * 0.018,
        y: (Math.random() - 0.5) * 0.022,
        z: (Math.random() - 0.5) * 0.015
      };

      asteroidGroup.add(rock);
      asteroidMeshes.push({ mesh: rock, rotVel, basePos: { x: rx, y: ry, z: rz }, angle, dist });
    }

    // 6. Sun & Anamorphic Lens Flare
    const sunLight = new THREE.DirectionalLight(0xfff7ed, 3.2);
    sunLight.position.set(-35, 20, 25);
    scene.add(sunLight);

    const spaceAmbientLight = new THREE.AmbientLight(0x0f1c3f, 0.95);
    scene.add(spaceAmbientLight);

    const sunFlareCanvas = document.createElement('canvas');
    sunFlareCanvas.width = 256;
    sunFlareCanvas.height = 256;
    const fctx = sunFlareCanvas.getContext('2d');
    const flareGrad = fctx.createRadialGradient(128, 128, 0, 128, 128, 128);
    flareGrad.addColorStop(0, 'rgba(255, 250, 230, 0.95)');
    flareGrad.addColorStop(0.18, 'rgba(253, 224, 71, 0.7)');
    flareGrad.addColorStop(0.4, 'rgba(56, 189, 248, 0.3)');
    flareGrad.addColorStop(1, 'transparent');
    fctx.fillStyle = flareGrad;
    fctx.fillRect(0, 0, 256, 256);

    const sunFlareTex = new THREE.CanvasTexture(sunFlareCanvas);
    const sunFlareGeo = new THREE.PlaneGeometry(16, 16);
    const sunFlareMat = new THREE.MeshBasicMaterial({
      map: sunFlareTex,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    const sunFlareMesh = new THREE.Mesh(sunFlareGeo, sunFlareMat);
    sunFlareMesh.position.set(-36, 21, -30);
    scene.add(sunFlareMesh);

    // 7. Multi-Layered Starfields with Scintillation
    const starCountA = isMobile ? 1800 : 3600;
    const starGeoA = new THREE.BufferGeometry();
    const posA = new Float32Array(starCountA * 3);
    const colorsA = new Float32Array(starCountA * 3);

    const stellarPalettes = [
      new THREE.Color(0xa5c4ff),
      new THREE.Color(0xffffff),
      new THREE.Color(0xfff5eb),
      new THREE.Color(0xffd2a1),
      new THREE.Color(0x7dd3fc)
    ];

    for (let i = 0; i < starCountA; i++) {
      const i3 = i * 3;
      posA[i3] = (Math.random() - 0.5) * 160;
      posA[i3 + 1] = (Math.random() - 0.5) * 105;
      posA[i3 + 2] = -Math.random() * 190 + 15;

      const c = stellarPalettes[Math.floor(Math.random() * stellarPalettes.length)];
      colorsA[i3] = c.r;
      colorsA[i3 + 1] = c.g;
      colorsA[i3 + 2] = c.b;
    }

    starGeoA.setAttribute('position', new THREE.BufferAttribute(posA, 3));
    starGeoA.setAttribute('color', new THREE.BufferAttribute(colorsA, 3));

    const starMatA = new THREE.PointsMaterial({
      size: isMobile ? 0.22 : 0.28,
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    const starFieldA = new THREE.Points(starGeoA, starMatA);
    scene.add(starFieldA);

    const starCountB = isMobile ? 300 : 650;
    const starGeoB = new THREE.BufferGeometry();
    const posB = new Float32Array(starCountB * 3);
    const colorsB = new Float32Array(starCountB * 3);

    for (let i = 0; i < starCountB; i++) {
      const i3 = i * 3;
      posB[i3] = (Math.random() - 0.5) * 90;
      posB[i3 + 1] = (Math.random() - 0.5) * 70;
      posB[i3 + 2] = (Math.random() - 0.5) * 75 - 5;

      const c = stellarPalettes[i % stellarPalettes.length];
      colorsB[i3] = c.r;
      colorsB[i3 + 1] = c.g;
      colorsB[i3 + 2] = c.b;
    }

    starGeoB.setAttribute('position', new THREE.BufferAttribute(posB, 3));
    starGeoB.setAttribute('color', new THREE.BufferAttribute(colorsB, 3));

    const starMatB = new THREE.PointsMaterial({
      size: 0.45,
      vertexColors: true,
      transparent: true,
      opacity: 0.95,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    const starFieldB = new THREE.Points(starGeoB, starMatB);
    scene.add(starFieldB);

    // 8. Volumetric Nebula Dust Clouds
    const nebulaGroup = new THREE.Group();
    scene.add(nebulaGroup);

    const createNebulaCloud = (colorHex, x, y, z, scale) => {
      const canvas = document.createElement('canvas');
      canvas.width = 256;
      canvas.height = 256;
      const ctx = canvas.getContext('2d');
      const radGrad = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
      radGrad.addColorStop(0, colorHex);
      radGrad.addColorStop(0.38, 'rgba(50, 20, 90, 0.42)');
      radGrad.addColorStop(0.72, 'rgba(12, 28, 65, 0.15)');
      radGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = radGrad;
      ctx.fillRect(0, 0, 256, 256);

      const tex = new THREE.CanvasTexture(canvas);
      const geo = new THREE.PlaneGeometry(scale, scale);
      const mat = new THREE.MeshBasicMaterial({
        map: tex,
        transparent: true,
        opacity: 0.44,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(x, y, z);
      return mesh;
    };

    const nebula1 = createNebulaCloud('rgba(14, 116, 244, 0.55)', -16, 6, -38, 55);
    const nebula2 = createNebulaCloud('rgba(147, 51, 234, 0.45)', 14, -8, -42, 65);
    const nebula3 = createNebulaCloud('rgba(217, 119, 6, 0.28)', -8, -14, -48, 50);
    nebulaGroup.add(nebula1);
    nebulaGroup.add(nebula2);
    nebulaGroup.add(nebula3);

    // 9. Shooting Stars (Meteors)
    const meteors = [];
    const meteorCount = 4;

    for (let i = 0; i < meteorCount; i++) {
      const meteorGeo = new THREE.BufferGeometry();
      const meteorPositions = new Float32Array(6);
      meteorGeo.setAttribute('position', new THREE.BufferAttribute(meteorPositions, 3));

      const meteorMat = new THREE.LineBasicMaterial({
        color: 0x93c5fd,
        transparent: true,
        opacity: 0,
        blending: THREE.AdditiveBlending
      });

      const line = new THREE.Line(meteorGeo, meteorMat);
      scene.add(line);

      meteors.push({
        line,
        active: false,
        head: new THREE.Vector3(),
        tail: new THREE.Vector3(),
        velocity: new THREE.Vector3(),
        life: 0,
        maxLife: 1.0,
        cooldown: Math.random() * 3 + 0.8
      });
    }

    const spawnMeteor = (m) => {
      m.active = true;
      m.life = 0;
      m.maxLife = 0.65 + Math.random() * 0.75;
      const startX = (Math.random() - 0.5) * 55;
      const startY = 16 + Math.random() * 12;
      const startZ = -Math.random() * 25;
      m.head.set(startX, startY, startZ);
      m.tail.copy(m.head);
      m.velocity.set(
        -9 - Math.random() * 14,
        -14 - Math.random() * 18,
        -Math.random() * 6
      );
    };

    // 10. Scroll Tracking & Cinematic Camera Flight
    let targetScrollY = window.scrollY;
    let currentScrollY = window.scrollY;
    let scrollVelocity = 0;
    let mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };

    const onScroll = () => {
      targetScrollY = window.scrollY;
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    const onMouseMove = (e) => {
      mouse.targetX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.targetY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMouseMove, { passive: true });

    const onResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    };
    window.addEventListener('resize', onResize);

    // 11. Animation Loop with Dynamic Company 3D Transition
    let animationFrameId = null;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const delta = clock.getDelta();
      const elapsedTime = clock.getElapsedTime();

      scrollVelocity = (targetScrollY - currentScrollY);
      currentScrollY += scrollVelocity * 0.085;

      mouse.x += (mouse.targetX - mouse.x) * 0.045;
      mouse.y += (mouse.targetY - mouse.y) * 0.045;

      if (!prefersReducedMotion) {
        const docHeight = Math.max(
          1,
          document.documentElement.scrollHeight - window.innerHeight
        );
        const scrollProgress = Math.min(Math.max(currentScrollY / docHeight, 0), 1);

        // --- A) CAMERA CINEMATIC TRAJECTORY ---
        const cameraFlightX = Math.sin(scrollProgress * Math.PI * 1.5) * 3.8;
        const cameraFlightY = -scrollProgress * 9.5;
        const cameraFlightZ = 18 - (scrollProgress * 9.0);

        camera.position.x = cameraFlightX + (mouse.x * 0.85);
        camera.position.y = cameraFlightY - (mouse.y * 0.55);
        camera.position.z = cameraFlightZ;

        const rollAngle = (mouse.x * -0.04) + (scrollVelocity * 0.00035);
        camera.rotation.z = rollAngle;
        camera.rotation.y = -mouse.x * 0.05 + (scrollProgress * 0.15);
        camera.rotation.x = mouse.y * 0.035 - (scrollProgress * 0.12);

        // --- B) DYNAMIC TRANSITION: PLANET -> COMPANY 3D STRUCTURE ---
        // At top of Hero (scrollProgress < 0.06): Planet is in full focus, Company Structure hidden
        // As you scroll (scrollProgress > 0.06): Planet shifts to horizon, Company 3D Structure materializes!
        const structT = Math.min(Math.max((scrollProgress - 0.05) / 0.32, 0), 1);

        // Planet smoothly shifts into upper-horizon
        planetGroup.position.x = THREE.MathUtils.lerp(basePlanetX, isMobile ? -5 : -14, structT);
        planetGroup.position.y = THREE.MathUtils.lerp(basePlanetY, isMobile ? 6 : 9, structT) - (scrollProgress * 4.0);
        planetGroup.position.z = THREE.MathUtils.lerp(-20, -55, structT);
        const planetScale = THREE.MathUtils.lerp(1.0, 0.65, structT);
        planetGroup.scale.set(planetScale, planetScale, planetScale);

        // Company 3D Structures smoothly scale up and take stage
        const compScale = THREE.MathUtils.lerp(0.001, 1.0, structT);
        companyGroup.scale.set(compScale, compScale, compScale);

        const compTargetX = isMobile ? 0 : 4.8;
        const compTargetY = isMobile ? -0.5 : 0.6;
        companyGroup.position.x = THREE.MathUtils.lerp(0, compTargetX, structT) + Math.sin(scrollProgress * Math.PI) * 1.2;
        companyGroup.position.y = THREE.MathUtils.lerp(-22, compTargetY, structT) - (scrollProgress * 4.2);
        companyGroup.position.z = THREE.MathUtils.lerp(-45, isMobile ? -14 : -9, structT);

        // Continuous Majestic Zero-Gravity Rotation of Company 3D Model
        companyGroup.rotation.y = elapsedTime * 0.15 + (scrollProgress * Math.PI * 1.4);
        companyGroup.rotation.x = Math.sin(elapsedTime * 0.4) * 0.08 + (scrollProgress * 0.1);

        // Animate Gyroscope Rings
        gyroRing1.rotation.x = elapsedTime * 0.55;
        gyroRing1.rotation.y = elapsedTime * 0.45;
        gyroRing2.rotation.y = -elapsedTime * 0.65;
        gyroRing2.rotation.z = elapsedTime * 0.35;
        gyroRing3.rotation.z = elapsedTime * 0.75;
        gyroRing3.rotation.x = -elapsedTime * 0.5;

        // Animate Central Core Pulsation
        const corePulse = 0.85 + Math.sin(elapsedTime * 3.5) * 0.15;
        coreMesh.scale.set(corePulse, corePulse, corePulse);
        coreMesh.rotation.y = elapsedTime * 0.8;
        corePointLight.intensity = 2.0 + Math.sin(elapsedTime * 4.0) * 0.8;

        // Animate Orbiting Satellite Pods & update Laser Beams
        satellitePods.forEach((pod, idx) => {
          pod.mesh.rotation.x += pod.rotSpeed;
          pod.mesh.rotation.y += pod.rotSpeed * 1.2;

          // Pod gentle orbital wobble
          const wobble = Math.sin(elapsedTime * 1.2 + idx) * 0.4;
          pod.group.position.y = pod.offset.y + wobble;

          // Update Laser beam geometry
          const beamPosAttr = laserBeams[idx].line.geometry.attributes.position;
          beamPosAttr.setXYZ(0, 0, 0, 0); // Origin at Core
          beamPosAttr.setXYZ(1, pod.group.position.x, pod.group.position.y, pod.group.position.z);
          beamPosAttr.needsUpdate = true;
        });

        // --- C) PLANET AXIAL ROTATION ---
        const spinSpeed = 0.022 + Math.abs(scrollVelocity) * 0.0003;
        planetMesh.rotation.y += spinSpeed * delta;
        cloudsMesh.rotation.y += (spinSpeed * 1.35) * delta;
        moonMesh.rotation.y += (spinSpeed * 0.6) * delta;

        // --- D) ASTEROID BELT ROTATION ---
        asteroidMeshes.forEach((item) => {
          item.mesh.rotation.x += item.rotVel.x;
          item.mesh.rotation.y += item.rotVel.y;
          item.mesh.rotation.z += item.rotVel.z;

          item.angle += 0.008 * delta;
          item.mesh.position.x = Math.cos(item.angle) * item.dist;
          item.mesh.position.y = item.basePos.y - (scrollProgress * 5.0);
          item.mesh.position.z = item.basePos.z + (scrollProgress * 6.0);
        });

        // --- E) NEBULA & STARS TWINKLE ---
        nebula1.rotation.z = elapsedTime * 0.007;
        nebula2.rotation.z = -elapsedTime * 0.005;
        nebula3.rotation.z = elapsedTime * 0.004;
        nebulaGroup.position.y = -scrollProgress * 4.0;

        const starTwinkle = 0.82 + Math.sin(elapsedTime * 2.8) * 0.18;
        starMatA.opacity = starTwinkle;

        starFieldB.position.y = -scrollProgress * 14.0;
        starFieldA.position.y = -scrollProgress * 4.0;

        // --- F) METEORS WITH SCROLL SENSITIVITY ---
        meteors.forEach((m) => {
          if (!m.active) {
            m.cooldown -= delta;
            if (Math.abs(scrollVelocity) > 8) {
              m.cooldown -= 0.15;
            }
            if (m.cooldown <= 0) {
              spawnMeteor(m);
            }
          } else {
            m.life += delta;
            const progress = m.life / m.maxLife;

            m.head.addScaledVector(m.velocity, delta);
            m.tail.lerp(m.head, 0.48);

            const posArray = m.line.geometry.attributes.position.array;
            posArray[0] = m.head.x;
            posArray[1] = m.head.y;
            posArray[2] = m.head.z;
            posArray[3] = m.tail.x;
            posArray[4] = m.tail.y;
            posArray[5] = m.tail.z;
            m.line.geometry.attributes.position.needsUpdate = true;

            const alpha = Math.sin(progress * Math.PI);
            m.line.material.opacity = alpha * 0.88;

            if (m.life >= m.maxLife) {
              m.active = false;
              m.line.material.opacity = 0;
              m.cooldown = Math.random() * 4 + 1.5;
            }
          }
        });
      }

      renderer.render(scene, camera);
    };

    animate();

    // 12. Complete WebGL Cleanup on Unmount
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);

      planetGeo.dispose();
      planetMat.dispose();
      dayTex.dispose();
      nightTex.dispose();
      cloudsGeo.dispose();
      cloudsMat.dispose();
      cloudsTex.dispose();
      atmosphereGeo.dispose();
      atmosphereMat.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      ringTex.dispose();
      moonGeo.dispose();
      moonMat.dispose();

      monolithGeo.dispose();
      monolithMat.dispose();
      monolithTex.dispose();
      monolithWireGeo.dispose();
      monolithWireMat.dispose();
      coreGeo.dispose();
      coreMat.dispose();
      gyroRing1.geometry.dispose();
      gyroRing1.material.dispose();
      gyroRing2.geometry.dispose();
      gyroRing2.material.dispose();
      gyroRing3.geometry.dispose();
      gyroRing3.material.dispose();
      podGeometries.forEach((g) => g.dispose());
      laserBeams.forEach((l) => {
        l.line.geometry.dispose();
        l.line.material.dispose();
      });

      rockGeo.dispose();
      rockMat.dispose();
      sunFlareGeo.dispose();
      sunFlareMat.dispose();
      sunFlareTex.dispose();
      starGeoA.dispose();
      starMatA.dispose();
      starGeoB.dispose();
      starMatB.dispose();
      meteors.forEach((m) => {
        m.line.geometry.dispose();
        m.line.material.dispose();
      });
      renderer.dispose();

      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="space-3d-canvas-wrap"
      aria-hidden="true"
    />
  );
}
