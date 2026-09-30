# AuraAble 🌟
### Accessible Special Education & Sensory-Friendly Computer-Based Learning Platform

[![WCAG 2.1 AAA Compliant](https://img.shields.io/badge/Accessibility-WCAG%202.1%20AAA-success)](#accessibility--assistive-technology)
[![React 19](https://img.shields.io/badge/React-19-blue.svg)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg)](https://www.typescriptlang.org/)
[![Switch Access Ready](https://img.shields.io/badge/Input-Switch%20Access%20Ready-orange)](#switch-access--motor-accommodations)
[![Sensory Friendly](https://img.shields.io/badge/Sensory-Overload%20Protected-teal)](#sensory-architecture)
App link: https://auraable-accessible-special-education-learning-pl.ai.studio
**AuraAble** is an open-source, highly accessible, and sensory-friendly interactive learning platform designed for special education schools, occupational therapists, speech-language pathologists, and families. 

Tailored specifically for students with **Intellectual and Developmental Disabilities (IDD)**, **Autism Spectrum Disorder (ASD)**, **Down Syndrome**, **Cerebral Palsy**, **Dyslexia**, and **Low-Vision/Fine-Motor challenges**, AuraAble eliminates sensory triggers (harsh alarms, strobe effects, countdown pressure) and replaces them with evidence-based cognitive scaffolds.

---

## 📑 Table of Contents
- [Key Features & Modules](#key-features--modules)
- [Evidence-Based Pedagogical Foundations](#evidence-based-pedagogical-foundations)
- [Accessibility & Assistive Technology](#accessibility--assistive-technology)
- [Tech Stack](#tech-stack)
- [Getting Started & Local Setup](#getting-started--local-setup)
- [Project Structure](#project-structure)
- [Role-Based Workflows](#role-based-workflows)
- [Contributing & License](#contributing--license)

---

## 🎯 Key Features & Modules

### 1. 🗂️ Visual Schedule & "First—Then" Board
- **First—Then Mode**: Implements the Premack Principle to break overwhelming day plans into simple two-step pairings (*"First: Phonics, Then: Sensory Break"*).
- **Filling Sand Timer & Sweep Clock**: Converts the abstract concept of time into concrete, visual geometry—watching sand physically drain into the bottom chamber reduces transition anxiety.
- **Customizable Routines**: Add custom tasks with visual category colors, durations, and reinforcer rewards.

### 2. 🧪 Computer-Based Learning Tool (CBLT) Lab
- **Step-by-Step Task Chaining (ABA Task Analysis)**: Micro-step guidance for daily living skills (Handwashing, Classroom Readiness, Snack Preparation) with forward-progress tracking.
- **Concrete 1-to-1 Ten-Frame Math**: Two rows of five boxes with draggable/clickable tokens (stars, apples, hearts, cubes) and synchronized spoken counting (*"One!", "Two!", "Three!"*).
- **Errorless Learning Mode**: Proactively highlights target answers and subdues distractors to build neural pathways without failure frustration.
- **Cause-and-Effect Sandbox ("Touch & Bloom")**: Free-touch canvas where touching or clicking plays soothing pentatonic xylophone notes and blooms gentle shapes, plus a **Target Catch** mode for switch and mouse skills.
- **Picture-Supported Social Stories**: Carol Gray framework stories (*"When My Room Gets Too Loud"*, *"Taking Turns with Friends"*) with page-by-page read-aloud support.
- **Visual Choice Maker**: Structured, 2-to-4 option visual choice board to promote student self-determination and autonomy.

### 3. 🗣️ AAC Phonics & High-Contrast Communication Board
- **PECS-Inspired Pictogram Cards**: Minimum 48px+ touch targets for immediate functional communication (*"I Need Help"*, *"I Need A Break"*, *"Drink Water"*, *"Restroom"*, *"Yes/No"*).
- **Live Sentence Strip**: Allows students with expressive language delays to assemble phrases and click **Speak Out** to articulate their needs.

### 4. 🧘 Sensory Calm-Down Space
- **60fps Fluid Starfield & Ripple Field**: WebGL/HTML5 canvas where touch/drag gestures produce soft, floating starlight ripples that dissolve gently.
- **Guided Breathing Bubble**: Visual 4-7-8 breathing pacer with an expanding and contracting concentric circle.
- **Synthesized Nature Soundscapes**: Built-in Web Audio API engine providing mathematically generated ocean wave swells, gentle rain, and Tibetan singing bowl drones with zero external audio dependencies.

### 5. 📊 Educator & Therapist IEP Dashboard
- **Milestone Tracking**: Log trial mastery percentages, target dates, and clinical notes across Communication, Emotional Regulation, Fine Motor, and Literacy domains.
- **Behavioral & Sensory Regulation Log**: Record antecedents, states (Calm, Mild Overwhelm, Seeking Input), and supports applied.
- **Per-Student Accessibility Profiles**: Switch between student profiles (e.g., Maya, Leo, Jordan) with saved individual accessibility presets.
- **Printable IEP Reports**: Formatted for Multi-Disciplinary Team (MDT) reviews.

### 6. 🏡 Caregiver Continuity Portal & Printable Flashcards
- **Home Consistency Guides**: Tips from the classroom team on morning/evening routines and calming strategies currently working at school.
- **Printable PECS-Style Flashcards**: Print-optimized CSS grid ready for cutting, laminating, and home Velcro routine boards.

---

## 🧠 Evidence-Based Pedagogical Foundations

AuraAble is engineered around validated methodologies in Special Education (SPED) and Occupational Therapy (OT):

| Principle | Research Source | Implementation in AuraAble |
| :--- | :--- | :--- |
| **Premack Principle** | Behavioral Psychology | First—Then binary routine boards |
| **Concrete Time Representation** | TEACCH Autism Program | SVG draining sand timer & non-ticking sweep clock |
| **Errorless Learning** | Applied Behavior Analysis (ABA) | Proactive target highlighting; zero negative failure buzzers |
| **Task Analysis & Chaining** | Instructional Design | Micro-step sequential breakdown of life skills |
| **One-to-One Correspondence** | Cognitive Number Development | Interactive Ten-Frame with synchronized audio counting |
| **Social Stories™** | Carol Gray Method | Illustrated perspective-taking and calming narratives |
| **PECS / AAC** | Bondy & Frost (1994) | High-contrast category communication tiles & sentence ribbon |

---

## ♿ Accessibility & Assistive Technology

- **Universal Design for Learning (UDL)**: Multi-modal representation of all content (visual icons + plain text + spoken audio).
- **Switch-Access Auto-Scanning**: Auto-steps focus across elements with configurable scan speed (1.0s to 2.5s) and triggers action via `Spacebar`, `Enter`, or an external switch peripheral.
- **Adaptive Visual Themes**:
  - *Balanced Soft* (Standard warm neutral)
  - *Sensory Pastel* (Muted teal and cream)
  - *Yellow-on-Black* (Low vision / high acuity standard)
  - *High Contrast Dark & Light* (Pure black/white)
  - *Muted Slate Dark* (Low-glare night mode)
- **Dyslexia & Reading Fonts**: Native integration of **Lexend** (designed to reduce visual crowding) and **Atkinson Hyperlegible** (Braille Institute font maximizing character distinction).
- **Focus Reading Ruler**: Follows the mouse/cursor to isolate one line of text at a time, preventing visual line skipping.
- **Text Scaling**: 100%, 125%, 150%, 175%, and 200% scalable interface without clipping.
- **Web Audio API Synth**: Non-jarring, sinusoidal pentatonic chimes (C-E-G-C) replace piercing alarms.
- **Tactile Haptics**: Subtle vibrations (`navigator.vibrate`) reinforce clicks on touchscreen tablets.

---

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript, Vite
- **Styling**: Tailwind CSS (Tailwind v4 with `@tailwindcss/vite`)
- **Animation & Motion**: Native HTML5 Canvas 2D + Motion (with complete `prefers-reduced-motion` overrides)
- **Audio Synthesis**: Native Web Audio API (`AudioContext`, `OscillatorNode`, `BiquadFilterNode`)
- **Speech**: Web Speech API (`SpeechSynthesisUtterance`)
- **Icons**: Lucide React
- **Celebrations**: Canvas-Confetti (calibrated for slow, non-flashing pastel bursts)

---

## 🚀 Getting Started & Local Setup

### Prerequisites
- [Node.js](https://nodejs.org/) (version 18.0 or higher)
- npm or pnpm

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/auraable-learning-platform.git
   cd auraable-learning-platform
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```
   Open your browser and visit `http://localhost:3000` (or `http://localhost:5173`).

4. **Build for production**:
   ```bash
   npm run build
   ```

5. **Lint and Type Check**:
   ```bash
   npm run lint
   ```

---

## 📁 Project Structure

```
├── index.html                   # HTML entry point with Lexend & Atkinson fonts
├── metadata.json                # Applet configuration & metadata
├── package.json                 # Project dependencies & scripts
├── src/
│   ├── assets/                  # High-fidelity student mascots & sensory classroom art
│   ├── components/
│   │   ├── AccessibilityDrawer.tsx # Central sensory & access configuration deck
│   │   ├── CBLTLearningLab.tsx     # Computer-Based Learning: Chaining, Math, Sandbox
│   │   ├── EducatorDashboard.tsx   # IEP milestones, student profiles, behavior logs
│   │   ├── GamifiedTaskCanvas.tsx  # AAC board, emotion matcher, category sorter
│   │   ├── Navbar.tsx              # Strict 3-zone top bar with accessibility shortcuts
│   │   ├── ParentPortal.tsx        # Caregiver continuity & printable flashcards
│   │   ├── ReadingRuler.tsx        # Yellow visual cursor guide strip
│   │   ├── SensoryCalmZone.tsx     # 60fps Starfield ripple canvas & breathing pacer
│   │   ├── StudentRoom.tsx         # Distraction-free student home with urgent help buttons
│   │   └── VisualSchedule.tsx      # First-Then board & animated SVG sand-timer
│   ├── context/
│   │   └── AccessibilityContext.tsx # Central state for roles, switch scanning & speech
│   ├── data/
│   │   └── mockData.ts             # Pre-configured student presets, IEP goals & AAC tiles
│   ├── types/
│   │   └── index.ts                # TypeScript interfaces for accessibility & learning models
│   ├── utils/
│   │   ├── audioSynth.ts           # Web Audio API procedural synthesizer (tones & ambient)
│   │   └── speech.ts               # Web Speech synthesis & haptic pulse triggers
│   ├── App.tsx                     # Main view routing & accessibility wrapper
│   ├── index.css                   # Tailwind v4 styles, contrast themes & print rules
│   └── main.tsx                    # React DOM entry point
```

---

## 👥 Role-Based Workflows

- **Student Room (`Student View`)**: Minimal clutter, large urgent-help buttons (*"I Need Help"*, *"I Need A Break"*, *"Drink Water"*), customizable mascot avatars (Barnaby Owl, Ollie Otter, Toby Turtle), and positive star rewards.
- **Educator Dashboard (`Educator View`)**: IEP goal tracking, milestone trial updates, real-time sensory regulation notes, and printable summary exports.
- **Caregiver Portal (`Caregiver View`)**: At-a-glance weekly progress, classroom strategies for the home, and printable visual card sheets.

---

## 📄 License
This project is licensed under the Apache 2.0 License.

---

*Built with ❤️ for inclusive education, neurodiversity, and empowered learning.*
