# Tutoo Project Structure

## Core Screens (Cleaned Up)

### Essential Screens Kept:
- ✅ **SplashScreen** - Initial loading screen with animated Tutoo owl
- ✅ **OnboardingScreen** - Language and role selection (original)  
- ✅ **LoginScreen** - NEW: User authentication with role-based login
- ✅ **StudentDashboard** - Main student interface (original)
- ✅ **ParentView** - Parent monitoring interface (original)
- ✅ **TeacherUpload** - Teacher content management (original)
- ✅ **LessonScreen** - Individual lesson interface (kept - functional)

### Removed Components:
- ❌ ProfileSetupScreen - Simplified to login flow
- ❌ ProgressScreen - Integrated into dashboard  
- ❌ TutorAIAssistant - Simplified to lesson AI feature

## Updated App Flow

```
Splash (3s) → Onboarding → Login → Dashboard
                                   ↓
                              [Student/Parent/Teacher Views]
                                   ↓
                              Lesson Screen (for students)
```

## File Organization

### Assets Structure
```
/src/assets/
├── icons/
│   └── OwlIcon.tsx     # Main Tutoo mascot
├── images/             # Future static images
├── sounds/             # Future audio assets  
└── README.md           # Asset documentation
```

### Components Structure
```
/components/
├── SplashScreen.tsx    # NEW - App initialization
├── LoginScreen.tsx     # NEW - Authentication
├── OnboardingScreen.tsx # Language/role selection
├── StudentDashboard.tsx # Main student interface
├── LessonScreen.tsx    # Individual lessons
├── ParentView.tsx      # Parent monitoring
├── TeacherUpload.tsx   # Teacher tools
├── Navigation.tsx      # Bottom navigation
├── OfflineIndicator.tsx # Network status
├── LessonSidebar.tsx   # Lesson navigation
└── ui/                 # ShadCN components (unchanged)
```

## Key Features

### Authentication Flow
- Role-based login (Student/Parent/Teacher)
- Guest access available
- Bilingual support (French/Arabic)

### Student Features
- Gamified learning with XP/levels
- Weekly progress tracking
- Badge achievement system
- Course progression
- AI assistance within lessons

### Parent Features
- Child progress monitoring
- Learning analytics
- Goal setting capabilities

### Teacher Features
- Content upload and management
- Student progress tracking
- Course creation tools

## Technical Stack

- **React** with TypeScript
- **Tailwind CSS v4** with custom Tutoo design tokens
- **ShadCN UI** components
- **Motion** for animations
- **Lucide Icons** for interface icons
- **Custom OwlIcon** SVG component

## Design System

### Colors (from globals.css)
- Primary: `#1D9BF0` (Sky Blue)
- Secondary: `#FFD34E` (Warm Yellow) 
- Success: `#27AE60` (Green)
- Accent colors for gamification

### Responsive Design
- Mobile-first approach
- RTL support for Arabic
- Touch-friendly interface
- Bandwidth-optimized for Mauritania

## Next Steps

1. Replace hardcoded text with translation system
2. Add API integration capabilities
3. Implement offline functionality
4. Add more gamification features
5. Create parent and teacher specific flows
6. Add audio/voice features for AI assistance

## Development Guidelines

- Use semantic HTML elements
- Maintain accessibility standards
- Follow mobile-first responsive design
- Keep animations subtle and child-friendly
- Ensure RTL layout support
- Optimize for low-bandwidth conditions