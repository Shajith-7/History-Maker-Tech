import './cinematic.js';
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import Swiper from 'swiper';
import { EffectCards, Navigation, Pagination, Keyboard, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-cards';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

    // -------------------------------------------------------------------------
    // Configuration & Constants
    // -------------------------------------------------------------------------
    const CONFIG = {
      companyName: "History Maker Tech",
      tagline: "Digital Solutions for Your Business.",
      positioning: "Direct-to-Developer Engineering. Zero Agency Bloat.",
      slogan: "IDEAS → TECHNOLOGY → GROWTH",
      whatsappNumber: "918903411738",
      displayWhatsapp: "89034 11738",
      phoneNumber: "+919476397228",
      displayPhone: "9476397228",
      email: null,        // Configurable placeholder
      instagram: null,    // Configurable placeholder
      currentPalette: "royalBlueGold"
    };

    // Color Palette Definitions for the 3D Sphere Field
    const PALETTES = {
      royalBlueGold: {
        name: "Royal Blue & Gold",
        dominant: 0x2F69FF,
        gold: 0xD6A83F,
        goldLight: 0xFFE29A,
        pearlWhite: 0xF6F7FA,
        deepBlue: 0x0E2AC5,
        glassBlue: 0x4D80FF
      },
      goldOnyx: {
        name: "Gold & Onyx",
        dominant: 0xD6A83F,
        gold: 0xF4C75B,
        goldLight: 0xFFE29A,
        pearlWhite: 0x1B2230,
        deepBlue: 0x94691B,
        glassBlue: 0xF4C75B
      },
      pearlMidnight: {
        name: "Pearl & Midnight",
        dominant: 0xF6F7FA,
        gold: 0x2F69FF,
        goldLight: 0x96C5FF,
        pearlWhite: 0xFFFFFF,
        deepBlue: 0x0B101D,
        glassBlue: 0xC8D8FA
      },
      arcticCrystal: {
        name: "Arctic Blue & Crystal",
        dominant: 0x96E5FF,
        gold: 0x2F69FF,
        goldLight: 0xFFFFFF,
        pearlWhite: 0xE2F4FF,
        deepBlue: 0x0E2AC5,
        glassBlue: 0x66C7FF
      }
    };

    // -------------------------------------------------------------------------
    // Preloader Dismiss Bridge
    // -------------------------------------------------------------------------
    function notifySceneReady() {
      if (typeof window.__dismissPreloader === 'function') {
        window.__dismissPreloader(() => {
          startSphereFlyIn();
          if (typeof checkReveals === 'function') checkReveals();
        });
      }
    }

    // -------------------------------------------------------------------------
    // Three.js 3D WebGL Simulation Engine
    // -------------------------------------------------------------------------
    const canvas = document.getElementById('webgl-canvas');
    let renderer, scene, camera, composer, bloomPass;
    let sphereMeshes = [];
    let sphereData = [];
    let heartTargets = [];
    let isSimulationRunning = true;
    let isFlyInActive = false;
    let flyInStartTime = 0;
    const FLY_IN_DURATION = 2400; // ms
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const _acc = new THREE.Vector3();

    // Physics parameters from specification
    const PHYSICS = {
      gravity: 0,
      rebound: -0.3,
      mouseRepulsionForce: 0.05,
      mouseRepulsionRadius: 4.4,
      damping: 0.91,
      centerAttractionForce: 0.0035,
      bounciness: 0.02,
      mouseDownRadiusMultiplier: 1.4,
      mouseDownForceMultiplier: 1.7,
      mouseSpeedBoost: 3.2,
      maxMouseSpeed: 3,
      collisionSubsteps: 4,
      zBoundary: 2.0,
      borderPadding: 0.2
    };

    // Global cursor tracking in 3D world space
    const mousePos = { x: 0, y: 0 };
    const mouseNDC = new THREE.Vector2(-999, -999);
    const mouseWorld = new THREE.Vector3(0, 0, 0);
    let prevMouseWorld = new THREE.Vector3(0, 0, 0);
    let mouseSpeed = 0;
    let isMouseDown = false;

    // Scratch math vectors to avoid allocation in render loop
    const _diff = new THREE.Vector3();
    const _rayPlaneZ = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
    const _raycaster = new THREE.Raycaster();
    const _planeIntersect = new THREE.Vector3();

    // Check Heart Equation
    const inHeart = (x, y) => {
      const a = x * x + y * y - 1;
      return a * a * a - x * x * y * y * y <= 0;
    };

    function generateHeartTargets(count, aspect) {
      const targets = [];
      const scaleX = Math.min(3.4, aspect * 2.2);
      const scaleY = 3.2;
      let attempts = 0;
      while (targets.length < count && attempts < 40000) {
        attempts++;
        const hx = (Math.random() * 2.6 - 1.3);
        const hy = (Math.random() * 2.6 - 1.2);
        if (inHeart(hx, hy)) {
          // Invert y so heart points downwards, center properly
          const worldX = hx * scaleX;
          const worldY = hy * scaleY + 0.2;
          const worldZ = (Math.random() - 0.5) * 1.8;
          targets.push(new THREE.Vector3(worldX, worldY, worldZ));
        }
      }
      while (targets.length < count) {
        targets.push(new THREE.Vector3((Math.random() - 0.5) * scaleX, (Math.random() - 0.5) * scaleY, 0));
      }
      return targets;
    }

    function initThree() {
      try {
        const width = window.innerWidth;
        const height = window.innerHeight;
        const aspect = width / height;

        // Camera setup: PerspectiveCamera(38, aspect, 0.1, 100), position (0, 0, 11)
        camera = new THREE.PerspectiveCamera(38, aspect, 0.1, 100);
        camera.position.set(0, 0, 11);

        scene = new THREE.Scene();

        // WebGL Renderer
        renderer = new THREE.WebGLRenderer({
          canvas: canvas,
          antialias: true,
          alpha: true,
          powerPreference: "high-performance"
        });
        renderer.setSize(width, height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.08;
        renderer.setClearColor(0x000000, 0);

        if (!reduceMotion) {
          composer = new EffectComposer(renderer);
          composer.setSize(width, height);
          composer.addPass(new RenderPass(scene, camera));
          bloomPass = new UnrealBloomPass(new THREE.Vector2(width, height), 0.62, 0.42, 0.18);
          composer.addPass(bloomPass);
        }

        // Lighting Rig
        const hemiLight = new THREE.HemisphereLight(0xfff6e5, 0x050609, 0.65);
        scene.add(hemiLight);

        // Key Light
        const keyLight = new THREE.DirectionalLight(0xffe8ba, 1.4);
        keyLight.position.set(6, 8, 9);
        scene.add(keyLight);

        // Rim Light
        const rimLight = new THREE.DirectionalLight(0x5175ff, 1.8);
        rimLight.position.set(-8, -4, -4);
        scene.add(rimLight);

        // Front Fill Light
        const frontLight = new THREE.DirectionalLight(0xffffff, 0.5);
        frontLight.position.set(0, 0, 10);
        scene.add(frontLight);

        // Side Bounce Light
        const bounceLight = new THREE.PointLight(0xd6a83f, 1.2, 16);
        bounceLight.position.set(5, -3, 3);
        scene.add(bounceLight);

        // Build Spheres
        buildSpheres(CONFIG.currentPalette);

        // Canvas is ready
        canvas.classList.add('is-ready');

        // Warm up shaders with 2 render passes
        if (composer) {
          composer.render();
          composer.render();
        } else {
          renderer.render(scene, camera);
          renderer.render(scene, camera);
        }

        sceneReady = true;
        notifySceneReady();

        // Start render loop
        requestAnimationFrame(renderLoop);

      } catch (err) {
        console.warn("WebGL initialization encountered an error. Falling back safely:", err);
        sceneReady = true;
        if (typeof window.__dismissPreloader === 'function') {
          window.__dismissPreloader();
        }
      }
    }

    function buildSpheres(paletteKey) {
      // Clean up any existing meshes
      sphereMeshes.forEach(mesh => {
        scene.remove(mesh);
        if (mesh.material) mesh.material.dispose();
      });
      sphereMeshes = [];
      sphereData = [];

      const p = PALETTES[paletteKey] || PALETTES.royalBlueGold;
      const isMobile = window.innerWidth < 768;
      const count = reduceMotion ? 18 : (isMobile ? 42 : 72);
      const aspect = window.innerWidth / (window.innerHeight || 1);

      heartTargets = generateHeartTargets(count, aspect);

      // Shared base sphere geometry for optimum GPU performance
      const baseGeometry = new THREE.SphereGeometry(1, isMobile ? 32 : 44, isMobile ? 32 : 44);

      for (let i = 0; i < count; i++) {
        // Radius distribution: mostly small/medium, some larger heroes
        let radius;
        const rand = Math.random();
        if (rand < 0.68) {
          radius = 0.22 + Math.random() * 0.22; // 0.22 - 0.44
        } else if (rand < 0.90) {
          radius = 0.44 + Math.random() * 0.24; // 0.44 - 0.68
        } else {
          radius = 0.68 + Math.random() * 0.26; // 0.68 - 0.94
        }

        const mass = radius * radius * radius;

        // Material selection: ~22% glass probability
        const isGlass = Math.random() < 0.22;
        let color;
        const colorRand = Math.random();
        if (colorRand < 0.52) {
          color = p.dominant;
        } else if (colorRand < 0.76) {
          color = p.gold;
        } else if (colorRand < 0.90) {
          color = p.pearlWhite;
        } else {
          color = p.deepBlue;
        }

        let material;
        if (isGlass) {
          material = new THREE.MeshPhysicalMaterial({
            color: p.glassBlue,
            roughness: 0.08,
            clearcoat: 1.0,
            clearcoatRoughness: 0.03,
            transmission: 0.95,
            ior: 1.485,
            thickness: 2.2,
            specularIntensity: 1.0,
            attenuationDistance: 1.0,
            emissive: color,
            emissiveIntensity: 0.32,
            transparent: true,
            opacity: 0.88
          });
        } else {
          material = new THREE.MeshPhysicalMaterial({
            color: color,
            roughness: 0.44,
            clearcoat: 0.24,
            clearcoatRoughness: 0.35,
            emissive: color,
            emissiveIntensity: 0.22
          });
        }

        const mesh = new THREE.Mesh(baseGeometry, material);
        mesh.scale.setScalar(radius);

        // Park spheres offscreen for initial fly-in
        const angle = Math.random() * Math.PI * 2;
        const offDistance = 18 + Math.random() * 12;
        const parkX = Math.cos(angle) * offDistance + (Math.random() - 0.5) * 8;
        const parkY = Math.sin(angle) * offDistance + (Math.random() - 0.5) * 8;
        const parkZ = (Math.random() - 0.5) * 14;

        mesh.position.set(parkX, parkY, parkZ);
        scene.add(mesh);
        sphereMeshes.push(mesh);

        // Home target (elliptical cluster centered / right of hero)
        const targetOffsetX = isMobile ? 0 : (widthRatio() > 1.2 ? 1.6 : 0.8);
        const homeX = (Math.random() - 0.5) * (isMobile ? 3.8 : 5.2) + targetOffsetX;
        const homeY = (Math.random() - 0.5) * 3.6;
        const homeZ = (Math.random() - 0.5) * 2.2;

        sphereData.push({
          pos: new THREE.Vector3(parkX, parkY, parkZ),
          prevPos: new THREE.Vector3(parkX, parkY, parkZ),
          parkPos: new THREE.Vector3(parkX, parkY, parkZ),
          homeTarget: new THREE.Vector3(homeX, homeY, homeZ),
          heartTarget: heartTargets[i] || new THREE.Vector3(0, 0, 0),
          radius: radius,
          mass: mass,
          isGlass: isGlass,
          baseColor: color,
          initialRotationSpeed: (Math.random() - 0.5) * 0.02
        });
      }
    }

    function widthRatio() {
      return window.innerWidth / (window.innerHeight || 1);
    }

    function startSphereFlyIn() {
      isFlyInActive = true;
      flyInStartTime = performance.now();
    }

    // -------------------------------------------------------------------------
    // Animation & Physics Render Loop
    // -------------------------------------------------------------------------
    let prevTime = performance.now();
    let scrollLerp = 0;

    function renderLoop(now) {
      if (!isSimulationRunning) return;
      requestAnimationFrame(renderLoop);

      // Handle tab visibility pause
      if (document.hidden) {
        prevTime = now;
        return;
      }

      const dt = Math.min((now - prevTime) / 1000, 0.05);
      prevTime = now;

      // Smooth scroll tracking
      const currentScrollY = typeof window.__getScrollY === 'function' ? window.__getScrollY() : window.scrollY;
      scrollLerp += (currentScrollY - scrollLerp) * 0.12;
      const vh = window.innerHeight || 1;
      const scrollProgress = scrollLerp / vh;

      // Update background stage gradient according to scroll progress
      updateBackgroundStage(scrollProgress);

      // Update Cursor Raycasting in 3D
      updateMouseRaycast();

      // Camera Frustum Limits at Z = 0
      const vFOV = THREE.MathUtils.degToRad(camera.fov);
      const visibleHeight = 2 * Math.tan(vFOV / 2) * camera.position.z;
      const visibleWidth = visibleHeight * camera.aspect;

      const halfW = visibleWidth / 2 - PHYSICS.borderPadding;
      const halfH = visibleHeight / 2 - PHYSICS.borderPadding;
      const floorY = -halfH;

      // Stage weights computation:
      // Stage 0: 0 -> 0.8 (Home)
      // Stage 1: 0.8 -> 1.8 (About)
      // Stage 2: 1.8 -> 3.2 (Services)
      // Stage 3: 3.2 -> 4.8 (Testimonials & FAQ)
      // Stage 4: 4.8+ (Contact & Liftoff)

      let w0 = 0, w1 = 0, w2 = 0, w3 = 0, w4 = 0;
      if (scrollProgress < 0.8) {
        w0 = 1;
      } else if (scrollProgress < 1.8) {
        const t = (scrollProgress - 0.8) / 1.0;
        w0 = 1 - t;
        w1 = t;
      } else if (scrollProgress < 3.2) {
        const t = (scrollProgress - 1.8) / 1.4;
        w1 = 1 - t;
        w2 = t;
      } else if (scrollProgress < 4.8) {
        const t = (scrollProgress - 3.2) / 1.6;
        w2 = 1 - t;
        w3 = t;
      } else {
        const t = Math.min((scrollProgress - 4.8) / 1.2, 1.0);
        w3 = 1 - t;
        w4 = t;
      }

      // Fly-in progress calculation
      let flyProgress = 1;
      if (isFlyInActive) {
        const elapsed = now - flyInStartTime;
        flyProgress = Math.min(elapsed / FLY_IN_DURATION, 1);
        if (flyProgress >= 1) {
          isFlyInActive = false;
        }
      }

      // Mouse repulsion parameters
      const effectiveRepulsionRadius = PHYSICS.mouseRepulsionRadius * (isMouseDown ? PHYSICS.mouseDownRadiusMultiplier : 1.0);
      const effectiveRepulsionForce = PHYSICS.mouseRepulsionForce * (isMouseDown ? PHYSICS.mouseDownForceMultiplier : 1.0) * (1 + Math.min(mouseSpeed, PHYSICS.maxMouseSpeed) * PHYSICS.mouseSpeedBoost);

      // Physics integration step
      const substeps = PHYSICS.collisionSubsteps;
      const subDt = dt / substeps;

      for (let s = 0; s < substeps; s++) {
        for (let i = 0; i < sphereData.length; i++) {
          const sd = sphereData[i];
          const mesh = sphereMeshes[i];

          // Fly-in lerp from park position
          if (isFlyInActive) {
            const ease = 1 - Math.pow(1 - flyProgress, 3);
            sd.pos.lerpVectors(sd.parkPos, sd.homeTarget, ease);
            sd.prevPos.copy(sd.pos);
            mesh.position.copy(sd.pos);
            continue;
          }

          // Compute Velocity from Verlet
          const vel = _diff.copy(sd.pos).sub(sd.prevPos).multiplyScalar(PHYSICS.damping);
          sd.prevPos.copy(sd.pos);

          // Accumulate Forces
          const acc = _acc.set(0, 0, 0);

          // Force 1: Stage 0 & 1 Home/About floating cluster
          if (w0 > 0.001 || w1 > 0.001) {
            const homeW = (w0 + w1 * 0.5);
            const toHome = _diff.copy(sd.homeTarget).sub(sd.pos).multiplyScalar(PHYSICS.centerAttractionForce * 1.5 * homeW);
            acc.add(toHome);

            // Subtle organic wave motion
            const waveX = Math.sin(now * 0.0012 + i * 0.5) * 0.004 * (w0 + w1 * 1.5);
            const waveY = Math.cos(now * 0.0016 + i * 0.7) * 0.004 * (w0 + w1 * 1.5);
            acc.x += waveX;
            acc.y += waveY;
          }

          // Force 2: Stage 2 Services Gravity & Floor tumble
          if (w2 > 0.001) {
            // Downward gravity force
            acc.y -= 0.018 * w2;
            // Floor bounce
            if (sd.pos.y - sd.radius < floorY) {
              sd.pos.y = floorY + sd.radius;
              vel.y *= PHYSICS.rebound;
              vel.x += (Math.random() - 0.5) * 0.02 * w2;
            }
          }

          // Force 3: Stage 3 Testimonials & FAQ Heart Reassembly
          if (w3 > 0.001) {
            const heartTarget = sd.heartTarget;
            const toHeart = _diff.copy(heartTarget).sub(sd.pos).multiplyScalar(0.012 * w3);
            acc.add(toHeart);
          }

          // Force 4: Stage 4 Contact Accelerate towards Camera & Liftoff
          if (w4 > 0.001) {
            // Upward lift
            acc.y += 0.025 * w4;
            // Z forward acceleration towards camera (camera at z=11)
            acc.z += 0.035 * w4;

            // Fade opacity towards camera
            if (mesh.material && mesh.material.opacity) {
              const distToCam = camera.position.z - sd.pos.z;
              mesh.material.opacity = Math.max(0, Math.min(1, (distToCam - 2) / 6));
            }
          }

          // Force 5: Interactive Cursor Repulsion
          const distToMouse = sd.pos.distanceTo(mouseWorld);
          if (distToMouse < effectiveRepulsionRadius && distToMouse > 0.001) {
            const repelStrength = (1 - distToMouse / effectiveRepulsionRadius) * effectiveRepulsionForce;
            const repelDir = _diff.copy(sd.pos).sub(mouseWorld).normalize().multiplyScalar(repelStrength);
            acc.add(repelDir);
          }

          // Boundary containment
          if (sd.pos.x - sd.radius < -halfW) {
            sd.pos.x = -halfW + sd.radius;
            vel.x *= PHYSICS.rebound;
          } else if (sd.pos.x + sd.radius > halfW) {
            sd.pos.x = halfW - sd.radius;
            vel.x *= PHYSICS.rebound;
          }

          if (sd.pos.y + sd.radius > halfH) {
            sd.pos.y = halfH - sd.radius;
            vel.y *= PHYSICS.rebound;
          }

          if (sd.pos.z < -PHYSICS.zBoundary) {
            sd.pos.z = -PHYSICS.zBoundary;
            vel.z *= PHYSICS.rebound;
          } else if (sd.pos.z > PHYSICS.zBoundary + 4 && w4 <= 0.001) {
            sd.pos.z = PHYSICS.zBoundary + 4;
            vel.z *= PHYSICS.rebound;
          }

          // Verlet position step
          sd.pos.add(vel).add(acc);
          mesh.position.copy(sd.pos);
          mesh.rotation.y += sd.initialRotationSpeed;
        }

        // Pairwise Sphere Collisions (Verlet projection)
        for (let i = 0; i < sphereData.length; i++) {
          const s1 = sphereData[i];
          for (let j = i + 1; j < sphereData.length; j++) {
            const s2 = sphereData[j];
            const dist = s1.pos.distanceTo(s2.pos);
            const minDist = s1.radius + s2.radius;
            if (dist < minDist && dist > 0.0001) {
              const overlap = (minDist - dist);
              const norm = _diff.copy(s1.pos).sub(s2.pos).normalize();
              const totalMass = s1.mass + s2.mass;
              const ratio1 = s2.mass / totalMass;
              const ratio2 = s1.mass / totalMass;

              s1.pos.addScaledVector(norm, overlap * ratio1 * (1 + PHYSICS.bounciness));
              s2.pos.addScaledVector(norm, -overlap * ratio2 * (1 + PHYSICS.bounciness));
            }
          }
        }
      }

      if (camera) {
        camera.position.x += ((mouseNDC.x * 0.45) - camera.position.x) * 0.04;
        camera.position.y += ((mouseNDC.y * 0.28) - camera.position.y) * 0.04;
        camera.position.z = 11 - Math.min(scrollProgress, 5) * 0.22;
        camera.lookAt(0, 0, 0);
      }

      if (bloomPass) {
        bloomPass.strength = 0.48 + Math.min(scrollProgress, 4) * 0.06;
      }

      if (composer) composer.render();
      else renderer.render(scene, camera);
    }

    // -------------------------------------------------------------------------
    // Background Dynamic Stage Blending
    // -------------------------------------------------------------------------
    const bgLayer = document.getElementById('bg-gradient-layer');
    let currentStageClass = 'bg-stage-0';

    function updateBackgroundStage(progress) {
      if (!bgLayer) return;
      let targetStage = 'bg-stage-0';
      if (progress < 1.0) {
        targetStage = 'bg-stage-0';
      } else if (progress < 2.5) {
        targetStage = 'bg-stage-1';
      } else if (progress < 4.2) {
        targetStage = 'bg-stage-2';
      } else {
        targetStage = 'bg-stage-3';
      }

      if (targetStage !== currentStageClass) {
        bgLayer.classList.remove(currentStageClass);
        bgLayer.classList.add(targetStage);
        currentStageClass = targetStage;
      }
    }

    // -------------------------------------------------------------------------
    // Global Pointer & Raycasting Event Handlers
    // -------------------------------------------------------------------------
    function updateMouseRaycast() {
      if (!camera) return;
      _raycaster.setFromCamera(mouseNDC, camera);
      if (_raycaster.ray.intersectPlane(_rayPlaneZ, _planeIntersect)) {
        mouseWorld.copy(_planeIntersect);
        mouseSpeed = mouseWorld.distanceTo(prevMouseWorld) * 12;
        prevMouseWorld.copy(mouseWorld);
      }
    }

    window.addEventListener('pointermove', (e) => {
      mousePos.x = e.clientX;
      mousePos.y = e.clientY;
      mouseNDC.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseNDC.y = -(e.clientY / window.innerHeight) * 2 + 1;
    }, { passive: true });

    window.addEventListener('pointerdown', (e) => {
      isMouseDown = true;
    }, { passive: true });

    window.addEventListener('pointerup', () => {
      isMouseDown = false;
    }, { passive: true });

    // Handle Window Resizing
    window.addEventListener('resize', () => {
      if (!camera || !renderer) return;
      const width = window.innerWidth;
      const height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      if (composer) composer.setSize(width, height);

      // Regenerate heart targets for updated aspect ratio
      const count = sphereData.length;
      heartTargets = generateHeartTargets(count, camera.aspect);
      for (let i = 0; i < count; i++) {
        if (sphereData[i]) {
          sphereData[i].heartTarget = heartTargets[i] || new THREE.Vector3(0, 0, 0);
        }
      }
    }, { passive: true });

    // WebGL Context Loss Handlers
    canvas.addEventListener('webglcontextlost', (e) => {
      e.preventDefault();
      console.warn("WebGL Context Lost. Simulation paused.");
      isSimulationRunning = false;
    }, false);

    canvas.addEventListener('webglcontextrestored', () => {
      console.log("WebGL Context Restored. Reinitializing scene.");
      initThree();
      isSimulationRunning = true;
    }, false);

    // -------------------------------------------------------------------------
    // Smooth Scroll Integration & Navigation Spy
    // -------------------------------------------------------------------------
    const siteHeader = document.getElementById('site-header');
    const navLinks = document.querySelectorAll('.nav-item a');
    const sections = ['home', 'about', 'services', 'testimonials', 'faq', 'contact'];

    window.addEventListener('scroll', () => {
      // Header shadow and blur transition
      if (window.scrollY > 40) {
        siteHeader.classList.add('scrolled');
      } else {
        siteHeader.classList.remove('scrolled');
      }

      // Active Section Spy
      let activeId = 'home';
      const scrollMiddle = window.scrollY + window.innerHeight * 0.35;
      sections.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const bottom = top + el.offsetHeight;
          if (scrollMiddle >= top && scrollMiddle < bottom) {
            activeId = id;
          }
        }
      });

      navLinks.forEach(link => {
        if (link.getAttribute('href') === `#${activeId}`) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      });

      checkReveals();
    }, { passive: true });

    // -------------------------------------------------------------------------
    // Swiper.js Native 3D Cards Effect Engine for Services Section
    // -------------------------------------------------------------------------
    function initServicesSwiper() {
      const swiperEl = document.getElementById('services-swiper');
      if (!swiperEl) return;

      const currentCounter = document.getElementById('service-counter-current');
      const totalCounter = document.getElementById('service-counter-total');
      const totalSlides = 9;

      if (totalCounter) {
        totalCounter.textContent = String(totalSlides).padStart(2, '0');
      }

      function updateCounter(swiper) {
        if (!currentCounter) return;
        const realIndex = (typeof swiper.realIndex === 'number' ? swiper.realIndex : swiper.activeIndex) % totalSlides;
        currentCounter.textContent = String(realIndex + 1).padStart(2, '0');
      }

      const servicesSwiper = new Swiper('#services-swiper', {
        modules: [EffectCards, Navigation, Pagination, Keyboard, A11y],
        effect: 'cards',
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: 1,
        loop: true,
        speed: 650,
        cardsEffect: {
          perSlideOffset: 10,
          perSlideRotate: 3,
          rotate: true,
          slideShadows: false, // Custom CSS ambient shadows and glowing borders
        },
        keyboard: {
          enabled: true,
          onlyInViewport: true,
        },
        a11y: {
          enabled: true,
          prevSlideMessage: 'Previous service',
          nextSlideMessage: 'Next service',
          firstSlideMessage: 'This is the first service',
          lastSlideMessage: 'This is the last service',
        },
        navigation: {
          nextEl: '.services-swiper-next',
          prevEl: '.services-swiper-prev',
        },
        pagination: {
          el: '.services-swiper-pagination',
          clickable: true,
          renderBullet: function (index, className) {
            return `<button class="${className}" aria-label="Go to service ${index + 1}" type="button"></button>`;
          },
        },
        on: {
          init: function () {
            updateCounter(this);
          },
          slideChange: function () {
            updateCounter(this);
          },
        },
      });

      // Desktop Mouse-Following Spotlight on Active Card
      if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
        let isMoving = false;
        let lastEvent = null;

        swiperEl.addEventListener('pointermove', (e) => {
          lastEvent = e;
          if (!isMoving) {
            isMoving = true;
            requestAnimationFrame(() => {
              isMoving = false;
              if (!lastEvent) return;
              const activeSlide = swiperEl.querySelector('.swiper-slide-active');
              if (!activeSlide) return;
              const activeCard = activeSlide.querySelector('.service-card');
              if (!activeCard) return;

              const rect = activeCard.getBoundingClientRect();
              const x = lastEvent.clientX - rect.left;
              const y = lastEvent.clientY - rect.top;

              activeCard.style.setProperty('--pointer-x', `${x.toFixed(1)}px`);
              activeCard.style.setProperty('--pointer-y', `${y.toFixed(1)}px`);
            });
          }
        }, { passive: true });

        swiperEl.addEventListener('pointerleave', () => {
          lastEvent = null;
          const activeCard = swiperEl.querySelector('.swiper-slide-active .service-card');
          if (activeCard) {
            activeCard.style.removeProperty('--pointer-x');
            activeCard.style.removeProperty('--pointer-y');
          }
        }, { passive: true });
      }

      window.__servicesSwiper = servicesSwiper;
    }

    // Initialize Swiper on script execution / DOMContentLoaded
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initServicesSwiper);
    } else {
      initServicesSwiper();
    }

    // -------------------------------------------------------------------------
    // Intersection Observer Reveal Animations
    // -------------------------------------------------------------------------
    const revealElements = document.querySelectorAll('.reveal');

    function checkReveals() {
      const triggerBottom = window.innerHeight * 0.88;
      revealElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top <= triggerBottom) {
          el.classList.add('is-visible');
        }
      });
    }
    window.__triggerReveals = checkReveals;

    if ('IntersectionObserver' in window) {
      const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px'
      });

      revealElements.forEach(el => revealObserver.observe(el));
    }

    // -------------------------------------------------------------------------
    // Service "Discuss this service" Auto-Select Handoff
    // -------------------------------------------------------------------------
    const serviceSelect = document.getElementById('contact-service');
    document.addEventListener('click', (e) => {
      const btn = e.target.closest('.btn-discuss-service');
      if (!btn) return;
      const serviceName = btn.getAttribute('data-service');
      if (serviceSelect && serviceName) {
        serviceSelect.value = serviceName;
      }
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
        setTimeout(() => {
          if (serviceSelect) {
            serviceSelect.focus();
            serviceSelect.style.borderColor = 'var(--color-gold)';
            setTimeout(() => {
              serviceSelect.style.borderColor = '';
            }, 1800);
          }
        }, 600);
      }
    });

    // -------------------------------------------------------------------------
    // FAQ Accordion Functionality
    // -------------------------------------------------------------------------
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
      const btn = item.querySelector('.faq-question-btn');
      const pane = item.querySelector('.faq-answer-pane');

      btn.addEventListener('click', () => {
        const isOpen = item.classList.contains('is-open');

        // Close all other items
        faqItems.forEach(other => {
          if (other !== item) {
            other.classList.remove('is-open');
            other.querySelector('.faq-question-btn').setAttribute('aria-expanded', 'false');
            other.querySelector('.faq-answer-pane').style.maxHeight = null;
          }
        });

        // Toggle current item
        if (isOpen) {
          item.classList.remove('is-open');
          btn.setAttribute('aria-expanded', 'false');
          pane.style.maxHeight = null;
        } else {
          item.classList.add('is-open');
          btn.setAttribute('aria-expanded', 'true');
          pane.style.maxHeight = `${pane.scrollHeight + 30}px`;
        }
      });
    });

    // -------------------------------------------------------------------------
    // Contact Form Validation & WhatsApp Inquiry Modal
    // -------------------------------------------------------------------------
    const inquiryForm = document.getElementById('project-inquiry-form');
    const inputName = document.getElementById('contact-name');
    const inputEmail = document.getElementById('contact-email');
    const inputPhone = document.getElementById('contact-phone');
    const selectService = document.getElementById('contact-service');
    const selectBudget = document.getElementById('contact-budget');
    const textareaDetails = document.getElementById('contact-details');
    const checkboxConsent = document.getElementById('contact-consent');

    const nameError = document.getElementById('name-error');
    const emailError = document.getElementById('email-error');
    const serviceError = document.getElementById('service-error');
    const detailsError = document.getElementById('details-error');
    const consentError = document.getElementById('consent-error');

    const inquiryModal = document.getElementById('inquiry-modal');
    const modalCloseBtn = document.getElementById('modal-close-btn');
    const modalPreviewText = document.getElementById('inquiry-preview-text');
    const modalWhatsappLink = document.getElementById('modal-whatsapp-link');
    const modalCopyBtn = document.getElementById('modal-copy-btn');
    const copyBtnLabel = document.getElementById('copy-btn-label');

    function validateEmail(email) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    inquiryForm.addEventListener('submit', (e) => {
      e.preventDefault();

      let isValid = true;

      // Validate Name
      if (!inputName.value.trim()) {
        nameError.classList.add('visible');
        inputName.classList.add('is-invalid');
        isValid = false;
      } else {
        nameError.classList.remove('visible');
        inputName.classList.remove('is-invalid');
      }

      // Validate Email
      if (!inputEmail.value.trim() || !validateEmail(inputEmail.value.trim())) {
        emailError.classList.add('visible');
        inputEmail.classList.add('is-invalid');
        isValid = false;
      } else {
        emailError.classList.remove('visible');
        inputEmail.classList.remove('is-invalid');
      }

      // Validate Service
      if (!selectService.value) {
        serviceError.classList.add('visible');
        selectService.classList.add('is-invalid');
        isValid = false;
      } else {
        serviceError.classList.remove('visible');
        selectService.classList.remove('is-invalid');
      }

      // Validate Details
      if (!textareaDetails.value.trim()) {
        detailsError.classList.add('visible');
        textareaDetails.classList.add('is-invalid');
        isValid = false;
      } else {
        detailsError.classList.remove('visible');
        textareaDetails.classList.remove('is-invalid');
      }

      // Validate Consent
      if (!checkboxConsent.checked) {
        consentError.classList.add('visible');
        isValid = false;
      } else {
        consentError.classList.remove('visible');
      }

      if (!isValid) return;

      // Compile neat WhatsApp message
      const formattedMessage =
`*New Project Inquiry — History Maker Tech*
---------------------------------------
*Name:* ${inputName.value.trim()}
*Email:* ${inputEmail.value.trim()}
*Phone:* ${inputPhone.value.trim() || 'Not specified'}
*Service:* ${selectService.value}
*Budget:* ${selectBudget.value}

*Project Details:*
${textareaDetails.value.trim()}
---------------------------------------
_Submitted via History Maker Tech Web Portal_`;

      modalPreviewText.textContent = formattedMessage;

      const encodedMsg = encodeURIComponent(formattedMessage);
      modalWhatsappLink.href = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodedMsg}`;

      inquiryModal.classList.add('open');
      document.body.style.overflow = 'hidden';
    });

    modalCloseBtn.addEventListener('click', () => {
      inquiryModal.classList.remove('open');
      document.body.style.overflow = '';
    });

    inquiryModal.addEventListener('click', (e) => {
      if (e.target === inquiryModal) {
        inquiryModal.classList.remove('open');
        document.body.style.overflow = '';
      }
    });

    modalCopyBtn.addEventListener('click', () => {
      const textToCopy = modalPreviewText.textContent;
      navigator.clipboard.writeText(textToCopy).then(() => {
        copyBtnLabel.textContent = "Copied to Clipboard!";
        setTimeout(() => {
          copyBtnLabel.textContent = "Copy Message";
        }, 2200);
      }).catch(err => {
        console.error("Clipboard copy error:", err);
      });
    });

    // -------------------------------------------------------------------------
    // Studio Controls Drawer & Palette Switching
    // -------------------------------------------------------------------------
    const studioDrawer = document.getElementById('studio-drawer');
    const studioBackdrop = document.getElementById('studio-drawer-backdrop');
    const studioOpenBtn = document.getElementById('studio-drawer-open-btn');
    const mobileControlsOpenBtn = document.getElementById('mobile-controls-open-btn');
    const studioCloseBtn = document.getElementById('studio-drawer-close-btn');
    const paletteCards = document.querySelectorAll('.palette-card');
    const resetPaletteBtn = document.getElementById('reset-palette-btn');

    function openStudioDrawer() {
      studioDrawer.classList.add('open');
      studioBackdrop.classList.add('open');
      document.body.style.overflow = 'hidden';
    }

    function closeStudioDrawer() {
      studioDrawer.classList.remove('open');
      studioBackdrop.classList.remove('open');
      document.body.style.overflow = '';
    }

    studioOpenBtn.addEventListener('click', openStudioDrawer);
    if (mobileControlsOpenBtn) mobileControlsOpenBtn.addEventListener('click', () => {
      closeMobileMenu();
      setTimeout(openStudioDrawer, 300);
    });
    studioCloseBtn.addEventListener('click', closeStudioDrawer);
    studioBackdrop.addEventListener('click', closeStudioDrawer);

    paletteCards.forEach(card => {
      card.addEventListener('click', () => {
        const paletteKey = card.getAttribute('data-palette');
        if (paletteKey && PALETTES[paletteKey]) {
          paletteCards.forEach(c => c.classList.remove('active'));
          card.classList.add('active');
          CONFIG.currentPalette = paletteKey;
          buildSpheres(paletteKey);
        }
      });
    });

    resetPaletteBtn.addEventListener('click', () => {
      const defaultKey = 'royalBlueGold';
      paletteCards.forEach(c => {
        if (c.getAttribute('data-palette') === defaultKey) {
          c.classList.add('active');
        } else {
          c.classList.remove('active');
        }
      });
      CONFIG.currentPalette = defaultKey;
      buildSpheres(defaultKey);
    });

    // -------------------------------------------------------------------------
    // Mobile Navigation Drawer
    // -------------------------------------------------------------------------
    const mobileMenuToggleBtn = document.getElementById('mobile-menu-toggle-btn');
    const mobileMenuCloseBtn = document.getElementById('mobile-menu-close-btn');
    const mobileNav = document.getElementById('mobile-nav');
    const mobileNavBackdrop = document.getElementById('mobile-nav-backdrop');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

    function openMobileMenu() {
      mobileNav.classList.add('open');
      mobileNavBackdrop.classList.add('open');
      mobileMenuToggleBtn.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    }

    function closeMobileMenu() {
      mobileNav.classList.remove('open');
      mobileNavBackdrop.classList.remove('open');
      mobileMenuToggleBtn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }

    mobileMenuToggleBtn.addEventListener('click', openMobileMenu);
    mobileMenuCloseBtn.addEventListener('click', closeMobileMenu);
    mobileNavBackdrop.addEventListener('click', closeMobileMenu);

    mobileNavLinks.forEach(link => {
      link.addEventListener('click', () => {
        closeMobileMenu();
      });
    });

    // Global Escape Key to close modals/drawers
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        if (inquiryModal.classList.contains('open')) {
          inquiryModal.classList.remove('open');
          document.body.style.overflow = '';
        }
        if (studioDrawer.classList.contains('open')) {
          closeStudioDrawer();
        }
        if (mobileNav.classList.contains('open')) {
          closeMobileMenu();
        }
      }
    });

    // -------------------------------------------------------------------------
    // Bootstrapping
    // -------------------------------------------------------------------------
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initThree);
    } else {
      initThree();
    }