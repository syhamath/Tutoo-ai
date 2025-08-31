# Tutoo Assets

This directory contains all the assets for the Tutoo application.

## Structure

- `/icons/` - SVG icon components including the main OwlIcon mascot
- `/images/` - Static images and photos (when added)
- `/sounds/` - Audio files for gamification effects (when added)

## OwlIcon

The main mascot of Tutoo - a cute blue owl with a graduation cap that represents learning and education. Perfect for the Mauritanian children's educational platform.

### Usage

```tsx
import OwlIcon from '../src/assets/icons/OwlIcon';

<OwlIcon size={48} className="wiggle" />
```

### Props

- `size?: number` - Size of the icon (default: 48)
- `className?: string` - Additional CSS classes