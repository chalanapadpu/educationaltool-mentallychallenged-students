Haven — Sensory-Friendly Special Education Learning Platform

A starter web app for a special-needs learning platform, built so every student can adjust it to fit how they see, move, and process the world: bigger text, calmer colors, less motion, a dyslexia-friendly font, and sound/vibration that can be turned off. It gives students a simple daily schedule they can drag into order, a quiet task screen for working through one activity at a time, and a judgment-free space to decompress — with gentle, non-flashing feedback (a soft chime, a little confetti) when they succeed.

Built with React, TypeScript, Tailwind CSS, and Zustand. See sped-platform-spec.md (shared earlier in this conversation) for the full architecture, wireframes, and design rationale this prototype implements.

Getting started

Requirements: Node.js 18+ and npm.

bash
npm install
npm run dev

Then open the URL Vite prints (usually http://localhost:5173).

To create a production build:

bash
npm run build
npm run preview
Enabling the dyslexia-friendly font

The OpenDyslexic font isn't bundled (it's a binary file this environment can't fetch for you). Download it free from https://opendyslexic.org and place these two files here:

public/fonts/OpenDyslexic-Regular.woff2
public/fonts/OpenDyslexic-Bold.woff2

The @font-face rules in src/index.css already point at these paths — no code changes needed once the files are in place.

What's implemented so far
Accessibility store (src/store/accessibilityStore.ts) — the single source of truth for theme, contrast, font, text scale, motion level, audio, haptics, timer visibility, and TTS auto-read. Persists to localStorage and syncs to <html> as data-attributes/CSS variables so plain CSS can react without re-rendering the whole tree.
Design tokens (src/index.css) — light, dark, and high-contrast color palettes as CSS custom properties, mapped into Tailwind via tailwind.config.ts.
<MotionSafe> — a wrapper every animation should go through; it downgrades or disables motion based on the user's setting and the OS-level prefers-reduced-motion flag.
<AccessibilityToggle> — the full settings panel (intended for the educator dashboard's Accessibility Profile tab, not the student view).
<VisualSchedule> — drag-and-drop daily schedule using @dnd-kit (keyboard-accessible out of the box) plus a non-numeric SVG sand-timer.
<CalmDownZone> — full-screen, no-scoring interactive space with a single, fixed "Return" exit.
<SensoryFeedback> — success/retry states with a gated soft chime (Web Audio API), gentle haptic pulse, and non-flashing particle animation.
What's not built yet
Student Canvas task flow wiring (components exist individually but aren't yet assembled into the full single-task-at-a-time screen from the spec)
Educator/Therapist dashboard shell (roster, IEP goals, behavioral notes)
Parent portal
Backend/API, auth, and real-time sync (see the architecture doc for the recommended stack: Node/NestJS, PostgreSQL, Redis, Socket.IO)
Text-to-speech / speech-to-text wiring (Web Speech API hooks)
Project structure
sped-platform/
├── public/
│   └── fonts/              # Drop OpenDyslexic .woff2 files here
├── src/
│   ├── components/
│   │   ├── AccessibilityToggle.tsx
│   │   ├── CalmDownZone.tsx
│   │   ├── MotionSafe.tsx
│   │   ├── SensoryFeedback.tsx
│   │   └── VisualSchedule.tsx
│   ├── store/
│   │   └── accessibilityStore.ts
│   ├── index.css           # Design tokens + global/base styles
│   ├── main.tsx
│   └── App.tsx
├── index.html
├── tailwind.config.ts
├── postcss.config.js
├── vite.config.ts
├── tsconfig.json
└── package.json
Design decisions worth knowing about
One typeface throughout (Atkinson Hyperlegible, designed for low-vision legibility), varied by weight/size only — fewer typographic decisions means less cognitive load, which matters more here than visual variety.
Calm, low-arousal palette — a grounded sage/teal rather than a bright or high-saturation scheme, with amber reserved as the one accent color for celebratory moments only.
Every animation, sound, and vibration is opt-in and gated through the accessibility store — nothing fires by default without checking the user's settings first.
