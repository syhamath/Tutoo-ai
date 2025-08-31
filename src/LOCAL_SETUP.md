# Tutoo PWA - Local Development Setup

## 🚀 Quick Start

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```

3. **Build for Production**
   ```bash
   npm run build
   ```

4. **Preview Production Build**
   ```bash
   npm run preview
   ```

## 📋 Prerequisites

- **Node.js**: v18 or higher
- **npm**: v8 or higher (or yarn/pnpm)
- **Modern Browser**: Chrome, Firefox, Safari, Edge

## 🛠️ Available Scripts

- `npm run dev` - Start development server (http://localhost:5173)
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues automatically
- `npm run type-check` - Run TypeScript type checking

## 🌐 Environment Variables

Create a `.env.local` file in the root directory for environment variables:

```env
# Supabase Configuration (Optional - app works offline)
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# AI Assistant Configuration (Optional)
VITE_OPENAI_API_KEY=your_openai_api_key
```

## 📱 PWA Features

The app includes PWA capabilities:

- **Offline functionality** - Works without internet
- **Install prompt** - Can be installed on mobile/desktop
- **Service worker** - Caches resources for offline use
- **App manifest** - Proper PWA metadata

## 🔧 Project Structure

```
tutoo/
├── components/          # React components
├── hooks/              # Custom React hooks
├── types/              # TypeScript definitions
├── utils/              # Utility functions
├── styles/             # Global CSS and Tailwind config
├── supabase/           # Backend functions
└── public/             # Static assets
```

## 🎨 Design System

The app uses a custom design system with:

- **Primary Color**: Sky Blue (#1D9BF0)
- **Secondary Color**: Warm Yellow (#FFD34E)
- **Success Color**: Green (#27AE60)
- **Typography**: Inter font family
- **Responsive**: Mobile-first design
- **RTL Support**: Arabic language support

## 🌍 Internationalization

Supports bilingual functionality:
- **French** (default)
- **Arabic** with RTL layout

## 📊 State Management

Uses custom `useAppState` hook for:
- User authentication
- Offline data management
- Progress tracking
- Gamification state

## 🔌 Backend Integration

- **Supabase**: Database and authentication
- **Offline-first**: Works without backend connection
- **Local Storage**: Persistent data when offline
- **Progressive Enhancement**: Features gracefully degrade

## 🚀 Deployment Options

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm run build
# Upload dist/ folder to Netlify
```

### GitHub Pages
```bash
npm run build
# Deploy dist/ folder to gh-pages branch
```

## 🧪 Testing Offline Mode

1. Start the dev server: `npm run dev`
2. Open browser DevTools
3. Go to Network tab
4. Set to "Offline" mode
5. Refresh the page - app should still work

## 📝 Notes

- The app is designed to work in **limited bandwidth** conditions
- All educational content is **stored locally** for offline access
- **Supabase integration** is optional - app works in demo mode
- **Responsive design** optimized for mobile devices
- **Child-friendly interface** with animations and gamification

## 🐛 Troubleshooting

### Common Issues

1. **Build Errors**: Run `npm run type-check` to identify TypeScript issues
2. **Dependency Issues**: Delete `node_modules` and run `npm install` again
3. **Port Conflicts**: Change port in `vite.config.ts` if 5173 is busy
4. **PWA Issues**: Check `manifest.json` and service worker registration

### Development Tips

- Use React DevTools for debugging
- Check browser console for errors
- Use Network tab to test offline functionality
- Test on mobile devices for responsive design

---

## 🎯 Next Steps for Local Development

1. Clone or extract the project
2. Run `npm install`
3. Start development with `npm run dev`
4. Open http://localhost:5173
5. Explore the demo content and features

The app will work immediately in demo mode with sample data!