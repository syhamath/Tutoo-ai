# 🎨 Murshidi Design System Export
**Complete Design Specifications for AI Mentoring App (Mauritania)**

---

## 📋 Table of Contents
1. [Color Palette](#color-palette)
2. [Typography System](#typography-system)
3. [Spacing Scale](#spacing-scale)
4. [Icon Library](#icon-library)
5. [Component Specifications](#component-specifications)
6. [Layout System](#layout-system)
7. [Animation System](#animation-system)
8. [Cultural Adaptations](#cultural-adaptations)

---

## 🎨 Color Palette

### Primary Colors
```css
/* Main Brand Colors */
--murshidi-sky-blue: #1D9BF0;     /* Primary actions, headers, progress */
--murshidi-yellow: #FFD34E;       /* Secondary actions, highlights, joy */
--murshidi-green: #27AE60;        /* Success, completed items, teacher UI */
--murshidi-red: #FF5A5F;          /* Alerts, important notifications */

/* Gamification Colors */
--murshidi-purple: #8B5CF6;       /* Parent UI, AI features, premium */
--murshidi-orange: #F97316;       /* Progress indicators, streak counters */
--murshidi-pink: #EC4899;         /* Special achievements, celebrations */
--murshidi-indigo: #6366F1;       /* Advanced features, night mode */
```

### Light Variations
```css
/* Light backgrounds for cards and sections */
--murshidi-light-blue: #E8F4FD;   /* Blue card backgrounds */
--murshidi-light-yellow: #FFF9E6; /* Yellow highlights */
--murshidi-light-green: #E8F5E8;  /* Success states */
--murshidi-light-red: #FFE8E8;    /* Error states */
--murshidi-light-purple: #F3F0FF; /* AI/Premium backgrounds */
--murshidi-light-orange: #FFF7ED; /* Warning states */
--murshidi-light-pink: #FDF2F8;   /* Special celebrations */
--murshidi-light-indigo: #EEF2FF; /* Advanced features */
```

### Neutral Colors
```css
/* Text and UI elements */
--foreground: oklch(0.145 0 0);           /* #030213 - Primary text */
--muted-foreground: #717182;              /* Secondary text */
--background: #ffffff;                    /* Main background */
--card: #ffffff;                          /* Card backgrounds */
--border: rgba(0, 0, 0, 0.1);            /* Subtle borders */
--input-background: #f3f3f5;             /* Form inputs */
```

### Gradient Combinations
```css
/* Main app gradient */
.murshidi-gradient {
  background: linear-gradient(135deg, #1D9BF0 0%, #FFD34E 100%);
}

/* Kid-friendly background */
.murshidi-kid-gradient {
  background: linear-gradient(135deg, #87CEEB 0%, #FFE4B5 50%, #98FB98 100%);
}

/* Subject-specific gradients */
.math-gradient { background: linear-gradient(135deg, #8B5CF6, #6366F1); }
.french-gradient { background: linear-gradient(135deg, #27AE60, #10B981); }
.science-gradient { background: linear-gradient(135deg, #1D9BF0, #3B82F6); }
.geography-gradient { background: linear-gradient(135deg, #F97316, #EA580C); }
```

---

## 📝 Typography System

### Font Family
```css
font-family: 'Inter', system-ui, -apple-system, sans-serif;
```

### Font Sizes (Kid-Friendly Scale)
```css
--text-xs: 0.75rem;    /* 12px - Small labels */
--text-sm: 0.875rem;   /* 14px - Body text */
--text-base: 1rem;     /* 16px - Standard text */
--text-lg: 1.125rem;   /* 18px - Subheadings */
--text-xl: 1.25rem;    /* 20px - Section titles */
--text-2xl: 1.5rem;    /* 24px - Page titles */
--text-3xl: 1.875rem;  /* 30px - Hero text */
--text-4xl: 2.25rem;   /* 36px - Display text */
```

### Font Weights
```css
--font-weight-normal: 400;  /* Regular text */
--font-weight-medium: 500;  /* Buttons, labels */
--font-weight-semibold: 600; /* Subheadings */
--font-weight-bold: 700;    /* Headings */
```

### Typography Usage Guide
```css
/* Headers */
h1 { font-size: 1.5rem; font-weight: 500; line-height: 1.4; letter-spacing: -0.025em; }
h2 { font-size: 1.25rem; font-weight: 500; line-height: 1.4; letter-spacing: -0.025em; }
h3 { font-size: 1.125rem; font-weight: 500; line-height: 1.4; }
h4 { font-size: 1rem; font-weight: 500; line-height: 1.5; }

/* Body text */
p { font-size: 1rem; font-weight: 400; line-height: 1.6; }

/* UI elements */
button { font-size: 1rem; font-weight: 500; line-height: 1.5; }
label { font-size: 1rem; font-weight: 500; line-height: 1.5; }
input { font-size: 1rem; font-weight: 400; line-height: 1.5; }
```

---

## 📏 Spacing Scale

### Base Spacing System
```css
--space-1: 0.25rem;  /* 4px */
--space-2: 0.5rem;   /* 8px */
--space-3: 0.75rem;  /* 12px */
--space-4: 1rem;     /* 16px */
--space-5: 1.25rem;  /* 20px */
--space-6: 1.5rem;   /* 24px */
--space-8: 2rem;     /* 32px */
--space-10: 2.5rem;  /* 40px */
--space-12: 3rem;    /* 48px */
--space-16: 4rem;    /* 64px */
--space-20: 5rem;    /* 80px */
```

### Component Spacing
```css
/* Cards */
.card-padding: 20px;          /* Internal card spacing */
.card-margin: 16px;           /* Space between cards */
.card-gap: 12px;              /* Gap between card elements */

/* Buttons */
.button-padding-y: 12px;      /* Vertical button padding */
.button-padding-x: 24px;      /* Horizontal button padding */
.button-gap: 8px;             /* Gap between button elements */

/* Forms */
.input-padding: 16px;         /* Input field padding */
.form-gap: 16px;              /* Space between form fields */
.form-section-gap: 24px;      /* Space between form sections */

/* Layout */
.container-padding: 16px;     /* Main container padding */
.section-gap: 32px;           /* Space between major sections */
.element-gap: 8px;            /* Small element spacing */
```

### Border Radius Scale
```css
--radius-sm: 0.375rem;   /* 6px - Small elements */
--radius-md: 0.5rem;     /* 8px - Standard radius */
--radius-lg: 0.75rem;    /* 12px - Medium radius */
--radius-xl: 1rem;       /* 16px - Large radius */
--radius-2xl: 1.25rem;   /* 20px - Button radius */
--radius-3xl: 1.5rem;    /* 24px - Card radius */
--radius-full: 9999px;   /* Perfect circles */
```

---

## 🎯 Icon Library

### Emoji Icons (Cultural & Educational)
```javascript
// Subject Icons
const subjectIcons = {
  math: '🧮',           // Calculator/Abacus
  french: '📚',         // Books
  science: '🔬',        // Microscope
  geography: '🌍',      // Earth
  history: '🏛️',       // Classical building
  arabic: '📖',         // Open book
  english: '🇬🇧',      // British flag
  physics: '⚛️',        // Atom
  chemistry: '🧪',      // Test tube
  biology: '🧬',        // DNA
};

// Avatar Theme Icons
const avatarIcons = {
  football: '⚽',        // Very popular in Mauritania
  wizard: '🧙‍♂️',       // Fantasy learning
  dragon: '🐉',         // Adventure theme
  space: '🚀',          // Exploration theme
};

// Achievement Badges
const badgeIcons = {
  firstStep: '🎯',       // Target (first lesson)
  mathMaster: '🧮',      // Math expertise
  streak: '🔥',          // Consistency
  champion: '🏆',        // Excellence
  speedLearner: '⚡',    // Quick learning
  perfectWeek: '🌟',     // Complete week
  bookworm: '📚',        // Reading achievements
  scientist: '🔬',       // Science progress
  explorer: '🌍',        // Geography mastery
  star: '⭐',           // General achievement
};

// Cultural & Local Icons
const culturalIcons = {
  camel: '🐪',          // Desert/Mauritanian culture
  mosque: '🕌',         // Religious context
  dates: '🌴',          // Local agriculture
  desert: '🏜️',        // Geography
  family: '👨‍👩‍👧‍👦',   // Strong family values
};

// UI Action Icons
const actionIcons = {
  play: '▶️',           // Start lesson
  pause: '⏸️',         // Pause content
  check: '✅',          // Completed
  lock: '🔒',           // Locked content
  unlock: '🔓',         // Unlocked content
  help: '❓',           // Need help
  idea: '💡',           // Learning tip
  celebration: '🎉',    // Success
  thinking: '🤔',       // AI processing
  microphone: '🎤',     // Voice input
};
```

### Lucide Icons (Technical UI)
```javascript
import {
  // Navigation
  Home, ArrowLeft, Menu, ChevronRight, ChevronLeft,
  
  // Education
  BookOpen, Play, Pause, Volume2, Video, FileText,
  
  // Progress & Gamification
  Trophy, Star, Zap, Target, TrendingUp, Award,
  
  // Communication
  MessageSquare, Mic, Send, Sparkles, Brain,
  
  // Actions
  Edit3, Save, Upload, Download, Copy, Trash2,
  
  // System
  Settings, User, Users, Languages, Globe,
  
  // Feedback
  CheckCircle, AlertCircle, Info, Plus, Minus
} from 'lucide-react';
```

---

## 🧩 Component Specifications

### Button Components
```css
/* Primary Button */
.btn-primary {
  background: linear-gradient(135deg, #1D9BF0, #FFD34E);
  color: white;
  padding: 12px 24px;
  border-radius: 20px;
  font-size: 16px;
  font-weight: 500;
  border: none;
  box-shadow: 0 4px 12px rgba(29, 155, 240, 0.3);
  transition: all 0.3s ease;
}

.btn-primary:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 20px rgba(29, 155, 240, 0.4);
}

/* Secondary Button */
.btn-secondary {
  background: white;
  color: #1D9BF0;
  border: 2px solid #1D9BF0;
  padding: 12px 24px;
  border-radius: 20px;
  font-size: 16px;
  font-weight: 500;
}

/* Icon Button */
.btn-icon {
  width: 48px;
  height: 48px;
  border-radius: 24px;
  background: #F3F0FF;
  color: #8B5CF6;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
}
```

### Card Components
```css
/* Base Card */
.card {
  background: white;
  border-radius: 24px;
  padding: 20px;
  box-shadow: 0 4px 20px rgba(29, 155, 240, 0.1);
  border: 1px solid rgba(0, 0, 0, 0.05);
}

/* Subject Card */
.subject-card {
  background: white;
  border-radius: 24px;
  padding: 16px;
  box-shadow: 0 4px 20px rgba(29, 155, 240, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;
}

.subject-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 30px rgba(29, 155, 240, 0.15);
}

/* Progress Card */
.progress-card {
  background: linear-gradient(135deg, #F97316, #FFD34E);
  border-radius: 32px;
  padding: 24px;
  color: white;
  position: relative;
  overflow: hidden;
}
```

### Form Components
```css
/* Input Field */
.input {
  background: #F3F3F5;
  border: 2px solid transparent;
  border-radius: 16px;
  padding: 16px;
  font-size: 16px;
  width: 100%;
  transition: all 0.3s ease;
}

.input:focus {
  background: white;
  border-color: #1D9BF0;
  outline: none;
  box-shadow: 0 0 0 4px rgba(29, 155, 240, 0.1);
}

/* Textarea */
.textarea {
  background: #F3F3F5;
  border: 2px solid transparent;
  border-radius: 16px;
  padding: 16px;
  font-size: 16px;
  min-height: 100px;
  resize: vertical;
}
```

### Navigation Components
```css
/* Bottom Navigation */
.bottom-nav {
  position: fixed;
  bottom: 16px;
  left: 16px;
  right: 16px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 24px;
  padding: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-around;
  align-items: center;
}

/* Nav Item */
.nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 8px 12px;
  border-radius: 16px;
  transition: all 0.3s ease;
  color: #717182;
}

.nav-item.active {
  background: #E8F4FD;
  color: #1D9BF0;
}
```

### Progress Components
```css
/* XP Progress Bar */
.xp-progress {
  width: 100%;
  height: 12px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 6px;
  overflow: hidden;
}

.xp-progress-fill {
  height: 100%;
  background: linear-gradient(90deg, white, #FFD34E);
  border-radius: 6px;
  transition: width 0.5s ease;
}

/* Circular Progress */
.circular-progress {
  width: 60px;
  height: 60px;
  border-radius: 30px;
  background: conic-gradient(
    #1D9BF0 var(--progress-angle),
    #E5E7EB var(--progress-angle)
  );
  display: flex;
  align-items: center;
  justify-content: center;
}
```

---

## 📱 Layout System

### Mobile-First Breakpoints
```css
/* Mobile (Primary) */
@media (min-width: 375px) { /* iPhone SE and up */ }

/* Large Mobile */
@media (min-width: 414px) { /* iPhone Plus and up */ }

/* Tablet */
@media (min-width: 768px) { /* iPad and up */ }

/* Desktop */
@media (min-width: 1024px) { /* Laptop and up */ }

/* Large Desktop */
@media (min-width: 1280px) { /* Desktop and up */ }
```

### Container Sizes
```css
.container {
  width: 100%;
  max-width: 428px;  /* Large phone size */
  margin: 0 auto;
  padding: 0 16px;
}

.container-tablet {
  max-width: 768px;
}

.container-desktop {
  max-width: 1200px;
}
```

### Grid System
```css
/* 2-column grid for subjects */
.grid-subjects {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

/* 3-column grid for badges */
.grid-badges {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}

/* 7-column grid for week view */
.grid-week {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 8px;
}
```

---

## 🎬 Animation System

### Keyframe Animations
```css
/* Gentle bounce for achievements */
@keyframes bounce-gentle {
  0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
  40% { transform: translateY(-10px); }
  60% { transform: translateY(-5px); }
}

/* Wiggle for interactive elements */
@keyframes wiggle {
  0%, 7% { transform: rotateZ(0); }
  15% { transform: rotateZ(-15deg); }
  20% { transform: rotateZ(10deg); }
  25% { transform: rotateZ(-10deg); }
  30% { transform: rotateZ(6deg); }
  35% { transform: rotateZ(-4deg); }
  40%, 100% { transform: rotateZ(0); }
}

/* Celebration animation */
@keyframes celebrate {
  0% { transform: scale(1) rotate(0deg); }
  25% { transform: scale(1.1) rotate(-5deg); }
  50% { transform: scale(1.15) rotate(5deg); }
  75% { transform: scale(1.05) rotate(-2deg); }
  100% { transform: scale(1) rotate(0deg); }
}

/* Star trail for buttons */
@keyframes star-trail-move {
  0% { left: -20px; opacity: 0; }
  50% { opacity: 1; }
  100% { left: 100%; opacity: 0; }
}
```

### Transition Classes
```css
.transition-gentle { transition: all 0.3s ease; }
.transition-fast { transition: all 0.15s ease; }
.transition-bounce { transition: all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55); }

.hover-lift:hover { transform: translateY(-4px); }
.hover-scale:hover { transform: scale(1.05); }
.hover-glow:hover { box-shadow: 0 0 20px rgba(29, 155, 240, 0.3); }
```

---

## 🌍 Cultural Adaptations

### RTL Language Support
```css
/* Arabic RTL Layout */
.rtl {
  direction: rtl;
  text-align: right;
}

.rtl .flex-row {
  flex-direction: row-reverse;
}

.rtl .text-left {
  text-align: right;
}

.rtl .ml-4 {
  margin-left: 0;
  margin-right: 1rem;
}
```

### Cultural Color Meanings
```javascript
const culturalColors = {
  // Islamic Context
  green: {
    meaning: "Islamic symbolism, nature, success",
    usage: "Success states, completed lessons, Islamic content",
    avoid: "Error states"
  },
  
  // Sky & Peace
  blue: {
    meaning: "Sky, water, peace, trust",
    usage: "Primary actions, calm states, learning",
    avoid: "Aggressive actions"
  },
  
  // Energy & Joy
  yellow: {
    meaning: "Sun, energy, happiness, desert",
    usage: "Highlights, achievements, positive feedback",
    avoid: "Warning states in Islamic context"
  },
  
  // Careful Usage
  red: {
    meaning: "Attention, urgency (can signal danger)",
    usage: "Sparingly for critical alerts only",
    avoid: "General notifications, Islamic content"
  }
};
```

### Language-Specific Fonts
```css
/* Multi-language font stack */
.font-french {
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
}

.font-arabic {
  font-family: 'Inter', 'Noto Sans Arabic', system-ui, sans-serif;
  font-weight: 400; /* Arabic fonts often appear heavier */
}

.font-future-local {
  font-family: 'Inter', 'Noto Sans', system-ui, sans-serif;
  /* Ready for Wolof, Pulaar, Soninke when fonts available */
}
```

---

## 📦 Asset Export Guidelines

### Image Requirements
```javascript
// Icon Sizes
const iconSizes = {
  small: '16px',      // UI icons
  medium: '24px',     // Navigation icons
  large: '32px',      // Subject icons
  hero: '48px',       // Avatar icons
  emoji: '24px'       // Emoji standardization
};

// Image Formats
const imageFormats = {
  icons: 'SVG (preferred) or PNG 2x',
  photos: 'WebP with JPG fallback',
  illustrations: 'SVG (preferred) or PNG 2x',
  avatars: 'PNG 2x with transparent background'
};
```

### Export Specifications
```css
/* For developers exporting from Figma */
.export-specs {
  /* Icons: Export at 2x resolution (48px for 24px icons) */
  /* Cards: Export backgrounds as CSS gradients, not images */
  /* Shadows: Use CSS box-shadow, not baked-in shadows */
  /* Text: Always use CSS fonts, never export as images */
  /* Colors: Use CSS variables, not hard-coded hex values */
}
```

---

## 🔧 Developer Implementation Guide

### CSS Custom Properties Setup
```css
/* Add to your CSS root */
:root {
  /* Import all Murshidi colors */
  --murshidi-sky-blue: #1D9BF0;
  --murshidi-yellow: #FFD34E;
  --murshidi-green: #27AE60;
  /* ... all other colors from above */
  
  /* Import spacing scale */
  --space-1: 0.25rem;
  --space-2: 0.5rem;
  /* ... all spacing values */
  
  /* Import typography */
  --text-xs: 0.75rem;
  --text-sm: 0.875rem;
  /* ... all text sizes */
}
```

### Component Library Structure
```
src/
├── components/
│   ├── ui/              # Base components
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   └── ...
│   ├── icons/           # Icon components
│   │   ├── SubjectIcons.tsx
│   │   ├── BadgeIcons.tsx
│   │   └── ...
│   └── layout/          # Layout components
│       ├── Container.tsx
│       ├── Grid.tsx
│       └── ...
├── styles/
│   ├── globals.css      # Base styles & variables
│   ├── components.css   # Component styles
│   └── animations.css   # Animation keyframes
└── assets/
    ├── icons/          # SVG icons
    ├── images/         # Photos/illustrations
    └── fonts/          # Custom fonts (if any)
```

---

## ✅ Quality Checklist

### Accessibility Compliance
- [ ] Color contrast ratio ≥ 4.5:1 for normal text
- [ ] Color contrast ratio ≥ 3:1 for large text
- [ ] Touch targets ≥ 44px for mobile
- [ ] Focus indicators visible and clear
- [ ] Alternative text for all images/icons
- [ ] Screen reader compatible markup

### Cultural Sensitivity
- [ ] Colors appropriate for Islamic context
- [ ] RTL layout support for Arabic
- [ ] Local cultural icons and references
- [ ] Respectful representation of Mauritanian culture
- [ ] Family-friendly content throughout

### Performance Optimization
- [ ] SVG icons instead of icon fonts
- [ ] CSS animations instead of GIF/video
- [ ] Optimized image formats (WebP with fallbacks)
- [ ] Minimal external font loading
- [ ] Efficient CSS with minimal unused styles

---

🎯 **This design system ensures consistent, culturally appropriate, and engaging educational technology for children in Mauritania while maintaining high technical standards for modern web development.**