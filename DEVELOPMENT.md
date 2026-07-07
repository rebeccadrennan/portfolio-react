# Development Guide

This guide covers everything you need to know for developing on the portfolio website.

## Getting Started

### Prerequisites
- Node.js 16.0 or higher
- npm 7.0+ or yarn 1.22+
- Git

### Initial Setup

```bash
# Clone the repository
git clone https://github.com/yourusername/portfolio-react.git
cd portfolio-react

# Install dependencies
npm install

# Copy environment template
cp .env.example .env.local
```

### Environment Variables

Create a `.env.local` file in the root directory:

```env
# EmailJS Configuration
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key

# Optional
VITE_APP_TITLE=Rebecca Drennan's Portfolio
VITE_API_URL=https://api.example.com
```

To obtain EmailJS credentials:
1. Sign up at [EmailJS](https://www.emailjs.com/)
2. Create a service and email template
3. Copy the IDs to your `.env.local`

## Development Workflow

### Start Development Server

```bash
npm run dev
```

Opens at `http://localhost:5173/` with hot module replacement (HMR).

### Build for Production

```bash
npm run build
```

Creates optimized build in the `build/` directory.

### Preview Production Build

```bash
npm run preview
```

Test the production build locally before deployment.

### Running Tests

```bash
npm run test
```

Currently configured with Jest. Add your test files with the `.test.tsx` or `.test.ts` extension.

## Project Structure

```
src/
├── app/                          # Core app component and routing
│   ├── App.tsx                   # Main App wrapper
│   ├── App.css                   # App-level styles
│   └── routes.tsx                # Route definitions
│
├── components/                   # Reusable UI components
│   ├── HackathonsSection/
│   ├── PortfolioAssistant/
│   ├── ScrollTop/
│   ├── socialicons/
│   ├── themetoggle/
│   └── (custom components)
│
├── pages/                        # Full page components
│   ├── home/                     # Landing page
│   ├── about/                    # About section
│   ├── contact/                  # Contact form
│   └── portfolio/                # Project showcase
│
├── content/                      # Data files
│   ├── site.ts                   # Site metadata
│   ├── about.ts                  # About content
│   ├── portfolio.ts              # Projects data
│   └── contact.ts                # Contact info
│
├── hooks/                        # Custom React hooks
│   ├── useRevealOnScroll.ts      # Scroll animation hook
│   ├── AnimatedCursor.tsx        # Custom cursor
│   └── withRouter.tsx            # Router HOC
│
├── assets/                       # Static files
│   ├── images/                   # Project images
│   └── gif/                      # Animated GIFs
│
├── styles/                       # Global styles
├── index.css                     # Global CSS and theme variables
└── index.tsx                     # React entry point
```

## Code Style & Linting

### ESLint

```bash
# Run linter
npm run lint

# Fix linting issues automatically
npm run lint:fix
```

### Prettier

```bash
# Format all files
npm run format

# Check formatting
npm run format:check
```

## Component Development

### Creating a New Component

```tsx
import React from 'react';
import './ComponentName.css';

interface ComponentNameProps {
  title: string;
  onAction?: () => void;
}

export default function ComponentName({ 
  title, 
  onAction 
}: ComponentNameProps): JSX.Element {
  return (
    <div className="component-name">
      <h2>{title}</h2>
      {onAction && <button onClick={onAction}>Action</button>}
    </div>
  );
}
```

### Component Best Practices

1. **Use TypeScript interfaces** for props
2. **Keep components focused** - single responsibility
3. **Write descriptive file names** - avoid generic names
4. **Use semantic HTML** - for accessibility
5. **Include ARIA labels** where appropriate
6. **Test component behavior** - write unit tests
7. **Document complex props** - use JSDoc comments

## Styling

### CSS Organization

- Global styles: `src/index.css`
- Component styles: Co-located with components (e.g., `ComponentName.css`)
- Theme variables: Defined in CSS custom properties in `index.css`

### Theme Customization

Edit CSS variables in `src/index.css`:

```css
:root {
  --primary-color: #007bff;
  --secondary-color: #6c757d;
  --text-color: #333;
  --background-color: #fff;
}
```

## TypeScript

This project uses strict TypeScript mode. Always:

1. **Type your props** using interfaces or types
2. **Return types for functions** - be explicit
3. **Avoid `any`** - use `unknown` if necessary
4. **Use proper generics** for flexible components

```tsx
// ✅ Good
interface ButtonProps {
  label: string;
  onClick: () => void;
}

function Button({ label, onClick }: ButtonProps): JSX.Element {
  return <button onClick={onClick}>{label}</button>;
}

// ❌ Avoid
function Button(props: any): any {
  return <button onClick={props.onClick}>{props.label}</button>;
}
```

## Git Workflow

### Branch Naming

- Feature: `feature/description`
- Bug fix: `fix/description`
- Improvement: `improve/description`
- Documentation: `docs/description`

Example: `feature/add-contact-form-validation`

### Commit Messages

Follow conventional commits:

```
<type>: <subject>

<body>

<footer>
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Formatting changes
- `refactor`: Code restructuring
- `perf`: Performance improvement
- `test`: Test additions/changes
- `chore`: Dependency updates, tooling

Example:
```
feat: add portfolio project filtering

- Add category filtering to portfolio section
- Implement filter buttons with smooth transitions
- Update portfolio data structure

Closes #123
```

## Debugging

### Browser DevTools

1. Open Chrome DevTools (F12)
2. React DevTools extension recommended
3. Use `debugger;` statement to pause execution

### Console Logging

```tsx
if (process.env.NODE_ENV === 'development') {
  console.log('Debug info:', data);
}
```

## Performance Tips

1. **Code splitting** - Use React.lazy() for route-based splitting
2. **Image optimization** - Compress images before adding
3. **Bundle analysis** - Monitor chunk sizes during build
4. **Lighthouse audits** - Run regularly for metrics

## Troubleshooting

### Port 5173 Already in Use

```bash
# Use different port
npm run dev -- --port 5174
```

### Dependencies Issues

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### TypeScript Errors

```bash
# Check for TypeScript errors
npx tsc --noEmit
```

### Hot Module Replacement (HMR) Not Working

1. Check browser console for errors
2. Restart dev server: `npm run dev`
3. Clear browser cache
4. Check firewall settings

## Deployment

See [README.md](README.md#-deployment) for deployment instructions.

## Additional Resources

- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Vite Guide](https://vitejs.dev/guide/)
- [React Router Docs](https://reactrouter.com/)
- [Bootstrap Documentation](https://getbootstrap.com/docs/)

## Questions?

Feel free to open an issue or reach out to the maintainers!
