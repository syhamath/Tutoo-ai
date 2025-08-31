# 🎨 Figma Import Guide for Murshidi App

This guide helps you import and work with the Murshidi design system in Figma, complementing your React prototype.

## 📋 Quick Import Instructions

### Method 1: Direct JSON Import (if Figma supports it)
1. Open Figma
2. Create new file: "Murshidi - AI Mentoring App"
3. Import `figma-frames.json` using Figma's JSON import feature
4. The frames will appear with all styling and components

### Method 2: AI Prompt Generation (Recommended)
Copy-paste this prompt into **Figma AI** or **FigJam AI**:

```
Design a playful, kid-friendly AI Mentoring App for Mauritania (ages 8–18).
Use rounded shapes, bright colors (#1D9BF0 blue, #FFD34E yellow, #27AE60 green, #6A0DAD purple), and culturally relevant icons.

Create 4 mobile screens (375x812px):

1. **Student Lesson View** 📚
   - Header: Sky blue (#1D9BF0) with "Mathématiques ⚽" title
   - Video player (rounded corners, play button)
   - Practice question card with multiple choice options
   - AI help box (purple accent) with mic + text input
   - Bottom navigation

2. **Teacher Upload View** 🍃  
   - Header: Green (#27AE60) with "Nouveau Contenu" title
   - Form fields: lesson title, subject dropdown, file upload area
   - Dashed border upload zone with cloud icon
   - Large green "Publier" button at bottom

3. **Student Progress View** 🌟
   - Header: Orange gradient with football avatar, XP bar, "Niveau 3"
   - Streak calendar: 7 day grid, 5 days completed (green), 2 pending (gray)
   - Recent lessons list with subject icons (🧮📚🌍)
   - Badge stars grid: some earned (glowing), some locked (faded)

4. **Parent Dashboard** 👨‍👩‍👧‍👦
   - Header: Purple (#6A0DAD) with "Progrès d'Ahmed" title
   - Weekly bar chart showing XP progress (Mon-Sun)
   - "À Améliorer" section with 3 topics and progress bars
   - Engagement stats: study time, AI questions, badges earned

Design specifications:
- Border radius: 24px for cards, 16px for inputs
- Font: Inter, 14px base with kid-friendly scaling
- Shadows: Soft shadows for depth
- Icons: Use emojis + Lucide icons
- Support French/Arabic (RTL layouts)
- Cultural elements: Football theme, desert colors, inclusive imagery

Make it fun, accessible, and optimized for touch on mobile devices.
```

## 🎯 Key Design Elements

### Color System
| Color | Hex | Usage |
|-------|-----|-------|
| Sky Blue | `#1D9BF0` | Primary actions, headers, progress |
| Yellow | `#FFD34E` | Secondary actions, highlights, joy |
| Green | `#27AE60` | Success, completed items, teacher UI |
| Purple | `#6A0DAD` | Parent UI, AI features, premium |
| Orange | `#F97316` | Progress indicators, streak counters |

### Typography Scale
- **Headers**: 20-24px, Bold
- **Subheaders**: 18px, Semibold  
- **Body**: 16px, Regular
- **Captions**: 14px, Medium
- **Small**: 12px, Regular

### Border Radius System
- **Cards**: 24px (rounded-3xl)
- **Buttons**: 20px (rounded-2xl)
- **Inputs**: 16px (rounded-xl)
- **Small elements**: 12px (rounded-xl)

### Spacing System
- **Component padding**: 20px
- **Card margins**: 16px
- **Element gaps**: 12px
- **Button padding**: 16px vertical, 24px horizontal

## 🔄 React vs Figma Differences

### What's Better in React
- **Functional interactions** (real button clicks, navigation)
- **Dynamic data** (XP updates, progress tracking)
- **State management** (user profiles, lesson completion)
- **Responsive behavior** (screen size adaptations)

### What's Better in Figma
- **Visual refinement** (pixel-perfect spacing, gradients)
- **Design system documentation** (color tokens, component variants)
- **Collaboration** (designer feedback, stakeholder reviews)
- **Animation prototyping** (smooth transitions, micro-interactions)

## 🌍 Cultural Adaptations for Mauritania

### Language Support
```figma
Text Layers:
- Primary: French (LTR)
- Secondary: Arabic (RTL) 
- Future: Wolof, Pulaar, Soninke

Font Stack:
- Latin: Inter
- Arabic: Inter + Noto Sans Arabic
- Fallback: System fonts
```

### Cultural Icons & Imagery
- **Football**: ⚽ (extremely popular)
- **Desert**: 🏜️ (geographical relevance)
- **Education**: 📚🎓 (high value)
- **Technology**: 📱💻 (growing adoption)
- **Family**: 👨‍👩‍👧‍👦 (strong family values)

### Color Cultural Meanings
- **Green**: Islamic symbolism, nature, success ✅
- **Blue**: Sky, water, peace, trust ✅  
- **Yellow**: Sun, energy, happiness ✅
- **Red**: Use sparingly (can signal danger) ⚠️
- **Purple**: Wisdom, premium features ✅

## 📱 Responsive Breakpoints

```css
Mobile:     375px - 414px  (Primary target)
Tablet:     768px - 1024px (Secondary)
Desktop:    1280px+        (Admin/Teacher)
```

### Mobile-First Approach
1. Design for 375px width first
2. Scale up for larger screens
3. Maintain touch-friendly 44px+ targets
4. Keep navigation thumb-friendly

## 🎮 Gamification Elements

### Avatar Themes
```figma
Football Theme 🏈:
- Colors: Green gradient
- Icons: ⚽🏟️🏆
- Animations: Goal celebration

Wizard Theme 🧙‍♂️:
- Colors: Purple gradient  
- Icons: 🏰✨🔮
- Animations: Spell casting

Dragon Theme 🐉:
- Colors: Red-orange gradient
- Icons: 🐲🏔️🔥
- Animations: Dragon growth

Space Theme 🚀:
- Colors: Blue-purple gradient
- Icons: 🌌🚀🛸
- Animations: Rocket launch
```

### Progress Indicators
- **XP Bars**: Animated fill with gradient
- **Streak Counters**: Fire emoji with number
- **Level Badges**: Circular with theme colors
- **Star Ratings**: 3-star system for lessons

## 🔧 Component Library Structure

### Recommended Figma Organization
```
📁 Murshidi Design System
├── 🎨 Colors & Tokens
├── 📝 Typography
├── 🧩 Base Components
│   ├── Buttons
│   ├── Cards  
│   ├── Form Elements
│   └── Navigation
├── 📱 Screen Templates
│   ├── Student Lesson
│   ├── Teacher Upload
│   ├── Progress View
│   └── Parent Dashboard
└── 🌍 Cultural Variants
    ├── French (LTR)
    ├── Arabic (RTL)
    └── Future Languages
```

## 🚀 Next Steps

### Phase 1: Visual Design
1. Import/create the 4 core screens
2. Build component library
3. Create responsive variants
4. Add micro-interactions

### Phase 2: Prototyping  
1. Link screens with Figma prototyping
2. Add animation transitions
3. Create user flow demonstrations
4. Test with stakeholders

### Phase 3: Handoff
1. Generate design tokens
2. Export assets for development
3. Document interaction states
4. Create animation specifications

## 💡 Pro Tips

### Figma Best Practices
- **Use Auto Layout** for responsive components
- **Create Components** for repeated elements
- **Organize with Pages** (Designs, Prototypes, Assets)
- **Use Variants** for different states (hover, active, disabled)

### Testing Your Designs
- **Preview on mobile** using Figma mobile app
- **Test RTL layouts** by flipping text alignment
- **Check color contrast** with accessibility plugins
- **Validate touch targets** (minimum 44px)

### Collaboration
- **Share with teachers** in Mauritania for feedback
- **Test with kids** (if possible) for usability
- **Get cultural validation** from local stakeholders
- **Iterate based on real usage** patterns

---

🎯 **Goal**: Create engaging, culturally appropriate educational technology that helps kids in Mauritania succeed in their studies while having fun!