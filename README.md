# History Maker Tech — Official React Application

> **Direct-to-Developer Engineering. Zero Agency Bloat.**  
> Built with modern **React 19**, **Vite**, **Three.js**, and **Swiper.js** for an ultra-fast, cinematic 3D digital studio experience.

---

## 🚀 Overview

This repository has been professionally structured as a modern **React + Vite** single-page application. It incorporates:
- **Interactive Three.js 3D WebGL Canvas:** Floating particle sphere simulation with post-processing bloom, mouse parallax, and scroll dynamics.
- **Native Swiper.js 3D Stacked Cards:** Interactive service cards with real-time cursor tilt (`rotateX`, `rotateY`), soft glowing borders, dynamic mouse spotlighting, and slide counters.
- **Autonomous Preloader:** Calibration sequence (000% → 100%) with non-blocking failover safety.
- **Direct WhatsApp & Phone Dialers:** Instant communication pipelines with zero agency overhead.
- **Cinematic Atmosphere:** Ambient glowing orbs, scroll progress indicator, and custom dual-ring cursor tracking.

---

## 📁 Professional React Folder Structure

```plaintext
History Maker Tech/
├── index.html                   # Vite entry point HTML5 document
├── vite.config.js               # Vite + React plugin configuration
├── package.json                 # Project dependencies & scripts (React 19, Three.js, Swiper)
├── .gitignore                   # Version control ignore rules
├── README.md                    # Project documentation & guidelines
├── public/                      # Static assets served at root
│   └── assets/
│       └── images/
│           ├── logo.png         # Primary brand logo
│           └── logo.jpg         # High-resolution fallback logo
└── src/                         # React source code
    ├── main.jsx                 # React root mount (ReactDOM.createRoot)
    ├── App.jsx                  # Main application orchestrator
    ├── index.css                # Master consolidated design system & animations
    ├── data/
    │   └── siteData.js          # Centralized configuration, services, and content
    └── components/
        ├── Preloader.jsx        # Calibration progress loader
        ├── ThreeCanvas.jsx      # Three.js 3D sphere WebGL simulation
        ├── CinematicEffects.jsx # Ambient glow, cursor follower, scroll progress
        ├── Header.jsx           # Fixed glassmorphism navbar & mobile drawer
        ├── Hero.jsx             # Headline, metric chips, and primary CTAs
        ├── About.jsx            # Direct-to-Developer philosophy & values
        ├── Services.jsx         # 3D Swiper cards carousel with cursor tilt
        ├── Features.jsx         # Engineering advantages grid
        ├── Process.jsx          # 4-stage transparent sprint roadmap
        ├── Work.jsx             # Selected case studies with ROI metrics
        ├── TechStack.jsx        # Interactive tech stack matrix
        ├── Testimonials.jsx     # Client ratings & endorsements
        ├── Faq.jsx              # Collapsible accordion FAQ
        ├── Contact.jsx          # WhatsApp / call direct links & brief inquiry form
        └── Footer.jsx           # Brand, solutions directory, and copyright
```

---

## 🛠️ Development & Production Scripts

### Start Local Development Server
```bash
npm run dev
# or: npm start
```
Starts the high-speed Vite dev server at **`http://localhost:8080`** with Hot Module Replacement (HMR).

### Build for Production
```bash
npm run build
```
Generates optimized and minified static assets in the `dist/` directory.

### Preview Production Build
```bash
npm run preview
```
Previews the production `dist/` bundle locally on port 8080.

---

## 📞 Direct Engineering Contacts

- **WhatsApp:** [+91 89034 11738](https://wa.me/918903411738)
- **Phone:** [+91 94763 97228](tel:+919476397228)

---

© 2026 History Maker Tech. All rights reserved.
