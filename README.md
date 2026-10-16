# History Maker Tech — Official Website

> **Digital Solutions for Your Business.**  
> **Direct-to-Developer Engineering · Zero Agency Bloat.**  
> Built with modern **React 19**, **Vite**, and **Swiper.js** for an ultra-fast, smooth, and luxury digital studio experience.

---

## 🚀 Overview & Key Features

This repository contains the production-ready **React 19 + Vite** single-page application for **History Maker Tech**:

- **Full-Screen Hero Section:** 100vh viewport presentation featuring the glowing `BUILD · AUTOMATE · GROWTH` trust badge and direct project actions.
- **Full-Screen About Section:** Frosted glassmorphism with ambient refractive cyan & gold glowing orbs, 3D tilt cards, 4 value pillars, and direct developer communication channels.
- **Smooth Multi-Card Services Showcase:** Multi-slide horizontal carousel (3 full cards at once on desktop, responsive peeks on tablet/mobile), interactive category filter tabs, live counter, and clickable progress pagination.
- **High-Performance Ambient Background:** Sleek obsidian dark mode with subtle radial ambient auras (zero WebGL/balloon lag).
- **Dual Custom Cursor & Smooth Lenis Scrolling:** Cinematic cursor ring tracking with fluid, non-blocking page scrolling.
- **Vercel-Ready Architecture:** Includes `vercel.json` for seamless SPA routing and instant one-click deployment.

---

## 📁 Project Architecture & Structure

```plaintext
History Maker Tech/
├── index.html                   # Vite entry point HTML document
├── vite.config.js               # Vite + React plugin configuration
├── package.json                 # Dependencies & scripts (React 19, Swiper, Lucide icons)
├── vercel.json                  # Single-page application rewrites for Vercel deployment
├── .gitignore                   # Version control exclusions
├── README.md                    # Project documentation & guides
├── public/                      # Static assets
│   └── assets/images/           # Brand logo files
└── src/                         # React application source code
    ├── main.jsx                 # React root mount
    ├── App.jsx                  # Master app component orchestrator
    ├── index.css                # Master consolidated design system & animations
    ├── data/
    │   └── siteData.js          # Centralized services, metrics, and business configuration
    └── components/
        ├── Preloader.jsx        # Autonomous calibration loader
        ├── AmbientBackground.jsx# GPU-efficient ambient obsidian background
        ├── CinematicEffects.jsx # Cursor follower & Lenis smooth scroll
        ├── Header.jsx           # Fixed glassmorphic navigation bar & mobile drawer
        ├── Hero.jsx             # 100vh hero section with glowing trust badge
        ├── About.jsx            # Full-screen glassmorphism About section with 3D tilt
        ├── Services.jsx         # Smooth multi-card carousel showcase with category filters
        ├── Testimonials.jsx     # Client ratings & endorsements
        ├── Faq.jsx              # Collapsible FAQ accordion
        ├── Contact.jsx          # Direct WhatsApp and call inquiries
        └── Footer.jsx           # Brand directory and legal
```

---

## 🛠️ Local Development & Build

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
Runs the local Vite dev server at **`http://localhost:8080`** with instant Hot Module Replacement (HMR).

### 3. Build for Production
```bash
npm run build
```
Creates an optimized static bundle in the `dist/` folder.

---

## 🌐 Deploying to Vercel

### Option 1: Via GitHub Integration (Recommended)
1. Go to [vercel.com](https://vercel.com) and log in with your GitHub account (`Shajith-7`).
2. Click **Add New...** → **Project**.
3. Select your repository: **`History-Maker-Tech`**.
4. Vercel automatically detects **Vite**:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
5. Click **Deploy**. Your site will be live on a `*.vercel.app` URL with automatic SSL and continuous deployment!

---

## 📞 Direct Engineering Contacts

- **WhatsApp:** [+91 89034 11738](https://wa.me/918903411738)
- **Phone:** [+91 94763 97228](tel:+919476397228)

---

© 2026 History Maker Tech. All rights reserved.
