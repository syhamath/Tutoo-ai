# 🎯 Tutoo - AI-Powered Learning Platform

<div align="center">
  <h3>An AI-powered mentoring and tutoring platform for students in Mauritania (ages 8–18)</h3>
  
  ![React](https://img.shields.io/badge/React-18.2.0-blue)
  ![TypeScript](https://img.shields.io/badge/TypeScript-5.2.2-blue)
  ![Tailwind](https://img.shields.io/badge/Tailwind-4.0-blue)
  ![Vite](https://img.shields.io/badge/Vite-5.2.0-purple)
  ![PWA](https://img.shields.io/badge/PWA-Ready-green)
  ![Offline](https://img.shields.io/badge/Offline-First-orange)
</div>

## 🌟 Features

### 🎓 Educational Excellence
- **Short Video Lessons** - Bite-sized content perfect for young learners
- **AI Coaching** - Personalized learning assistance
- **Exam Preparation** - Mauritanian curriculum-focused content
- **Progress Tracking** - Detailed analytics for students and parents
- **Gamification** - XP system, badges, and achievements

### 🌍 Accessibility & Localization
- **Bilingual Support** - French/Arabic with RTL layout
- **Voice Assistant** - AI-powered help in both languages
- **Offline-First Design** - Works perfectly without internet
- **Low Bandwidth Optimized** - Designed for Mauritanian infrastructure
- **Mobile-First** - Optimized for smartphones and tablets

### 👥 Multiple User Roles
- **Students** - Interactive learning dashboard with gamification
- **Teachers** - Content upload and management tools
- **Parents** - Progress monitoring and oversight

### 🎨 Child-Friendly Design
- **Bright Color Scheme** - Sky blue (#1D9BF0) and warm yellow (#FFD34E)
- **Rounded Typography** - Easy-to-read, friendly interface
- **Large Touch Targets** - Perfect for young fingers
- **Smooth Animations** - Engaging micro-interactions

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm 8+

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/tutoo.git
   cd tutoo
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:5173
   ```

The app will work immediately with sample educational content!

## 📱 Demo Mode

Tutoo works perfectly in **demo mode** without any setup:

- ✅ **Sample Courses** - Math, French, Science content
- ✅ **User Profiles** - Student/Teacher/Parent roles  
- ✅ **Gamification** - XP, badges, and progress tracking
- ✅ **Offline Storage** - All data saved locally
- ✅ **AI Assistant** - Mock responses for testing
- ✅ **Bilingual Interface** - Switch between French/Arabic

## 🛠️ Technology Stack

### Frontend
- **React 18** - Modern UI library
- **TypeScript** - Type-safe development
- **Tailwind CSS v4** - Utility-first styling
- **Vite** - Fast build tool
- **Lucide React** - Beautiful icons

### Backend (Optional)
- **Supabase** - Database and authentication
- **Edge Functions** - Serverless API endpoints
- **Real-time Features** - Live progress updates

### PWA Features
- **Service Worker** - Offline caching
- **Web App Manifest** - Install prompts
- **Responsive Design** - Mobile-optimized
- **Performance Optimized** - Fast loading times

## 📊 Project Structure

```
tutoo/
├── components/              # React components
│   ├── ui/                 # Reusable UI components (shadcn/ui)
│   ├── AIVoiceAssistant.tsx
│   ├── EnhancedStudentDashboard.tsx
│   └── ...
├── hooks/                  # Custom React hooks
│   └── useAppState.ts      # Global state management
├── types/                  # TypeScript definitions
│   └── app.ts             # Core app types
├── utils/                 # Utility functions
│   ├── supabaseService.ts # Backend integration
│   └── offlineManager.ts  # Offline data handling
├── styles/                # Global CSS
│   └── globals.css        # Tailwind + custom styles
├── supabase/             # Backend functions
│   └── functions/server/  # Edge functions
└── public/               # Static assets
    └── manifest.json     # PWA configuration
```

## 🎯 Key Components

### State Management
- **useAppState Hook** - Centralized app state
- **Offline-First Architecture** - Local storage fallbacks
- **Progressive Enhancement** - Graceful degradation

### Educational Features
- **Course Management** - Structured learning paths
- **Lesson Tracking** - Progress and completion states
- **Gamification System** - XP, levels, and achievements
- **Assessment Tools** - Quizzes and interactive content

### User Experience
- **Smooth Navigation** - Bottom tab bar design
- **Loading States** - Friendly loading animations
- **Error Handling** - Graceful error messages
- **Accessibility** - Screen reader support

## 🌐 Environment Configuration

Copy `.env.example` to `.env.local` for optional features:

```env
# Optional: Supabase Backend
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# Optional: AI Features
VITE_OPENAI_API_KEY=your_openai_api_key
```

**Note**: The app works perfectly without any environment variables!

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm run build
# Deploy dist/ folder
```

### Manual Deployment
```bash
npm run build
# Upload dist/ folder to your hosting provider
```

## 📱 PWA Installation

Users can install Tutoo as a native app:

1. **Mobile** - "Add to Home Screen" prompt
2. **Desktop** - Install button in address bar
3. **Offline Usage** - Works without internet connection

## 🎨 Design System

### Colors
- **Primary**: Sky Blue (#1D9BF0)
- **Secondary**: Warm Yellow (#FFD34E)
- **Success**: Green (#27AE60)
- **Error**: Red (#FF5A5F)

### Typography
- **Font Family**: Inter
- **Sizes**: Responsive scale (0.75rem - 2.25rem)
- **Weights**: Normal (400), Medium (500)

### Components
- **Rounded Borders** - 1.5rem radius for cards
- **Large Touch Targets** - Minimum 44px
- **Gentle Animations** - Smooth transitions
- **Kid-Friendly Icons** - Clear, recognizable symbols

## 🧪 Testing

```bash
# Type checking
npm run type-check

# Linting
npm run lint

# Fix linting issues
npm run lint:fix

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🔧 Development Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production  
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix linting issues
- `npm run type-check` - TypeScript validation

## 📈 Features Roadmap

### ✅ Completed
- Offline-first architecture
- Bilingual support (French/Arabic)
- Gamification system
- User role management
- AI voice assistant
- Progress tracking
- PWA functionality

### 🔄 In Progress
- Enhanced assessment tools
- Social learning features
- Advanced analytics
- Content authoring tools

### 📋 Planned
- Video streaming optimization
- Peer-to-peer learning
- Advanced AI tutoring
- Curriculum expansion

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🌍 About Mauritania

Tutoo is specifically designed for the educational needs of Mauritanian students, considering:

- **Infrastructure Challenges** - Limited internet connectivity
- **Language Requirements** - Arabic and French bilingual education
- **Cultural Context** - Age-appropriate, culturally sensitive content
- **Curriculum Alignment** - Mauritanian educational standards

## 📞 Support

For questions or support:
- 📧 Email: support@tutoo.app
- 💬 GitHub Issues: [Create an issue](https://github.com/yourusername/tutoo/issues)
- 📱 Mobile: Works offline, no support needed!

---

<div align="center">
  <p><strong>Built with ❤️ for Mauritanian students</strong></p>
  <p>تُوتُو - مساعد التعلم الذكي</p>
</div>