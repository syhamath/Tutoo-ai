# 🚀 Deployment Guide for Tutoo

This guide covers various deployment options for the Tutoo PWA application.

## 📋 Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Git for version control
- Basic knowledge of the deployment platform

## 🏗️ Build Preparation

1. **Install Dependencies**
```bash
npm install
```

2. **Environment Setup**
```bash
# Create .env.local file for local development
echo "VITE_SUPABASE_URL=your_supabase_url" > .env.local
echo "VITE_SUPABASE_ANON_KEY=your_supabase_anon_key" >> .env.local
```

3. **Build the Application**
```bash
npm run build
```

The built files will be in the `dist/` directory.

## 🌐 Deployment Options

### 1. Vercel (Recommended)

**Quick Deploy:**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

**Manual Setup:**
1. Connect your GitHub repository to Vercel
2. Set build command: `npm run build`
3. Set output directory: `dist`
4. Add environment variables in Vercel dashboard

### 2. Netlify

**Quick Deploy:**
1. Drag and drop the `dist` folder to [Netlify Drop](https://app.netlify.com/drop)

**Continuous Deployment:**
1. Connect your Git repository
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Add environment variables in site settings

### 3. Firebase Hosting

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login and initialize
firebase login
firebase init hosting

# Configure firebase.json
{
  "hosting": {
    "public": "dist",
    "ignore": ["firebase.json", "**/.*", "**/node_modules/**"],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  }
}

# Deploy
firebase deploy
```

### 4. GitHub Pages

1. **Install gh-pages**
```bash
npm install --save-dev gh-pages
```

2. **Add to package.json**
```json
{
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  },
  "homepage": "https://yourusername.github.io/tutoo"
}
```

3. **Deploy**
```bash
npm run deploy
```

### 5. Traditional Web Hosting

1. Build the application: `npm run build`
2. Upload the contents of `dist/` folder to your web server
3. Configure your server to serve `index.html` for all routes

## 🔧 Production Optimizations

### Performance

```bash
# Analyze bundle size
npm install --save-dev vite-bundle-analyzer
npx vite-bundle-analyzer
```

### PWA Configuration

Ensure your `public/manifest.json` is properly configured:

```json
{
  "name": "Tutoo - AI Learning Assistant",
  "short_name": "Tutoo",
  "theme_color": "#1D9BF0",
  "background_color": "#E8F4FD",
  "display": "standalone",
  "orientation": "portrait",
  "scope": "/",
  "start_url": "/"
}
```

## 🔐 Environment Variables

Required environment variables for production:

```bash
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
VITE_APP_VERSION=1.0.0
```

## 🌍 CDN and Caching

### Cloudflare Setup

1. Add your domain to Cloudflare
2. Enable:
   - Auto Minify (HTML, CSS, JS)
   - Brotli compression
   - Browser Cache TTL: 4 hours
   - Edge Cache TTL: 1 month

### Cache Headers

Configure your hosting platform to set proper cache headers:

```
Cache-Control: public, max-age=31536000, immutable  # For assets
Cache-Control: public, max-age=0, must-revalidate   # For index.html
```

## 📱 App Store Deployment (PWA)

### iOS App Store (PWABuilder)

1. Visit [PWABuilder](https://www.pwabuilder.com/)
2. Enter your deployed PWA URL
3. Generate iOS app package
4. Submit to App Store Connect

### Google Play Store

1. Use [Bubblewrap](https://github.com/GoogleChromeLabs/bubblewrap)
2. Generate Android APK
3. Submit to Google Play Console

## 🔍 Post-Deployment Checklist

- [ ] PWA install prompt works
- [ ] Offline functionality works
- [ ] All routes accessible
- [ ] Service worker registering correctly
- [ ] Manifest.json served with correct MIME type
- [ ] HTTPS enabled
- [ ] Performance metrics (Lighthouse score > 90)
- [ ] Cross-browser compatibility
- [ ] Mobile responsiveness
- [ ] Arabic RTL support works

## 🔧 Troubleshooting

### Common Issues

**Service Worker Not Updating:**
```bash
# Clear browser cache or increment version
# Update in public/manifest.json
```

**Routes Not Working:**
- Ensure server redirects all routes to index.html
- Check base URL in vite.config.ts

**Build Errors:**
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

## 📊 Monitoring and Analytics

### Performance Monitoring

1. **Google Analytics 4**
```javascript
// Add to index.html
gtag('config', 'GA_MEASUREMENT_ID');
```

2. **Web Vitals Monitoring**
```bash
npm install web-vitals
```

### Error Tracking

Consider integrating:
- Sentry for error tracking
- LogRocket for user session replay
- Hotjar for user behavior analytics

## 🚀 Continuous Integration

### GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy
on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm install
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

## 🌐 Domain Configuration

1. **Custom Domain Setup**
   - Point DNS to hosting provider
   - Configure SSL certificate
   - Set up redirects (www → non-www)

2. **PWA Requirements**
   - Must be served over HTTPS
   - Must have valid SSL certificate
   - Must serve manifest.json

---

**Need help?** Check our [troubleshooting guide](TROUBLESHOOTING.md) or open an issue on GitHub.