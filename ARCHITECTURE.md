# Architecture & Design

## Overview

This portfolio is a modern, responsive single-page application (SPA) built with React 18, TypeScript, and Vite. It follows component-based architecture with clear separation of concerns.

```
User Browser
     ↓
React SPA (Client-side rendering)
     ↓
    ├─ Components (UI pieces)
    ├─ Pages (Full page views)
    ├─ Hooks (Logic & state)
    ├─ Content (Data)
    └─ Styles (CSS)
     ↓
EmailJS (Email service)
Bootstrap (CSS framework)
```

## Project Structure

```
src/
├── app/                          # Application wrapper
│   ├── App.tsx                   # Root component with router
│   ├── routes.tsx                # Route definitions (React Router v6)
│   └── App.css                   # Global app styles
│
├── components/                   # Reusable UI components
│   ├── HackathonsSection/
│   ├── PortfolioAssistant/
│   ├── ScrollTop/
│   ├── socialicons/
│   ├── themetoggle/
│   └── (header, footer, etc.)
│
├── pages/                        # Full page components
│   ├── home/                     # Landing page with hero
│   ├── about/                    # Biography & skills
│   ├── contact/                  # Contact form
│   └── portfolio/                # Project showcase
│
├── content/                      # Static data
│   ├── site.ts                   # Global site config
│   ├── about.ts                  # About page content
│   ├── portfolio.ts              # Projects data
│   └── contact.ts                # Contact information
│
├── hooks/                        # Custom React hooks
│   ├── useRevealOnScroll.ts      # Scroll animation hook (IntersectionObserver)
│   ├── AnimatedCursor.tsx        # Custom cursor effect component
│   └── withRouter.tsx            # Router integration helper
│
├── assets/                       # Static files
│   ├── images/                   # Project/profile images
│   └── gif/                      # Animated GIFs
│
├── styles/                       # Global styles
├── index.css                     # CSS variables, theme, global styles
├── index.tsx                     # React entry point
└── react-app-env.d.ts           # TypeScript type definitions
```

## Technology Stack

### Frontend Framework

- **React 18** - UI component library
- **TypeScript** - Type-safe JavaScript
- **Vite** - Build tool and dev server

### Routing & Navigation

- **React Router v6** - Client-side routing
- **React Transition Group** - Route animations

### Styling

- **Bootstrap 5** - CSS framework & grid system
- **React Bootstrap** - Bootstrap components as React components
- **CSS Modules/Custom CSS** - Component-scoped styles

### UI/UX

- **React Icons** - Icon library (4000+ icons)
- **Typewriter Effect** - Animated text typing
- **Custom Cursor** - Animated mouse cursor
- **Reveal on Scroll** - Scroll-triggered animations

### External Services

- **EmailJS** - Email service (no backend needed)

### Development Tools

- **ESLint** - Code quality
- **Prettier** - Code formatting
- **TypeScript** - Type checking

## Data Flow

### Page Navigation Flow

```
User clicks link
    ↓
React Router updates URL
    ↓
Route component loads (lazy or eager)
    ↓
useEffect triggers if needed
    ↓
Content renders
    ↓
Animations initialize (useRevealOnScroll)
```

### Contact Form Flow

```
User fills form
    ↓
Form validation (required fields)
    ↓
User submits
    ↓
EmailJS API call
    ↓
Server sends email
    ↓
Response returned
    ↓
Success/Error message displayed
```

## Key Components

### App.tsx

- **Purpose**: Root component wrapper
- **Responsibilities**:
  - Router setup
  - Global state/context
  - Animated background
  - Custom cursor initialization
  - Scroll-to-top on route change

### Pages

- **Home** - Hero section with typewriter effect
- **About** - Personal info, skills, experience
- **Contact** - Contact form with EmailJS
- **Portfolio** - Project showcase with filtering

### Custom Hooks

#### useRevealOnScroll()

- Uses IntersectionObserver API
- Triggers animations when elements enter viewport
- Improves performance (no scroll event listeners)
- Progressive enhancement - works without JavaScript too

#### AnimatedCursor

- Tracks mouse position
- Renders custom cursor element
- DOM element follows mouse with easing
- CSS for smooth transform animations

## Styling Architecture

### CSS Variables (Theme)

Defined in `index.css`:

```css
:root {
  --primary-color: #007bff;
  --bg-dark: #1a1a1a;
  --bg-light: #ffffff;
  /* ... more variables */
}
```

### BEM Naming Convention

```css
.component-name {
} /* Block */
.component-name__element {
} /* Element */
.component-name--modifier {
} /* Modifier */
```

### Responsive Design

- Mobile-first approach
- Bootstrap grid system (12 columns)
- Breakpoints: xs, sm, md, lg, xl
- Media queries for custom CSS

## Performance Considerations

### Code Splitting

Vite configuration implements:

- Vendor chunk separation (React, Router, Bootstrap)
- Lazy loading of pages
- Production build optimization

### Asset Optimization

- Images optimized with compression
- CSS is minified
- JavaScript is minified and tree-shaken
- Unused code removed during build

### Runtime Performance

- useRevealOnScroll uses IntersectionObserver (efficient)
- No unnecessary re-renders (React.memo for expensive components)
- CSS animations use `transform` and `opacity` (GPU-accelerated)
- Event delegation for click handlers

## Accessibility

### Semantic HTML

- Proper heading hierarchy (h1 > h2 > h3)
- Semantic tags (`<main>`, `<nav>`, `<section>`, `<article>`)
- Landmark regions for screen readers

### ARIA Labels

- aria-label for icon buttons
- aria-hidden for decorative elements
- role attributes where needed

### Keyboard Navigation

- All interactive elements keyboard accessible
- Tab order logical and intuitive
- Focus visible states

### Color & Contrast

- Text contrast meets WCAG AA standards
- Color not sole means of conveying info
- High contrast dark/light modes

## State Management

Currently using React's built-in state:

- **useState** for component state
- **useEffect** for side effects
- Context API if needed in future

Considerations for scaling:

- Zustand or Redux if state becomes complex
- Context API for theme switching
- Local storage for user preferences

## Future Architecture Improvements

- **Testing Framework** - Jest/Vitest setup
- **Component Library** - Storybook for component showcase
- **Form Validation** - React Hook Form + Zod
- **State Management** - Zustand or Redux if needed
- **API Integration** - React Query/SWR if backend is added
- **Authentication** - Auth0 or Clerk if needed
- **Analytics** - Google Analytics or Plausible

## Deployment Architecture

```
Source Code (GitHub)
    ↓
GitHub Actions (CI/CD)
    ↓
Vite Build Process
    ↓
Static Files (HTML/CSS/JS)
    ↓
CDN / Hosting Platform
    ↓
User's Browser
```

### Platforms

- **GitHub Pages** - Free, simple
- **Vercel** - Optimized for Next/Vite, edge functions
- **Netlify** - Good DX, serverless functions available
- **Self-hosted** - Full control, more complex

## Development Workflow

```
Developer local environment
    ↓
npm run dev (Vite dev server with HMR)
    ↓
Code changes instantly reflected
    ↓
Run tests/lint locally
    ↓
Push to GitHub
    ↓
GitHub Actions runs CI
    ↓
Automatic deployment on main
```

## Security Considerations

- No sensitive data in frontend
- EmailJS handles email securely (server-side)
- Environment variables for API keys
- HTTPS for production
- CSP headers recommended
- Input validation on form submission

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Modern evergreen browsers

Target: ES2020 JavaScript compatibility

---

For more information, see the [DEVELOPMENT.md](DEVELOPMENT.md) guide.
