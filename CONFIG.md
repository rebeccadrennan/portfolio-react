## Configuration Reference

This document provides a quick reference for configuration files in this project.

### TypeScript Configuration (`tsconfig.json`)

Key settings:

- **target**: ES2020 - Modern JavaScript target for better performance
- **strict**: true - Enables all strict type checking options
- **moduleResolution**: bundler - Optimized for Vite
- **paths**: Path aliases for cleaner imports

Path aliases available:

```tsx
import { Button } from "@components/Button";
import { useAuth } from "@hooks/useAuth";
import { home } from "@content/about";
```

### Vite Configuration (`vite.config.mts`)

Key features:

- **Alias**: Import path aliases for better code organization
- **Code Splitting**: Separate chunks for vendor dependencies
- **Build Optimization**: Production-ready build settings

### ESLint Configuration (`.eslintrc.json`)

Rules enforce:

- React/TypeScript best practices
- No unused variables
- Proper React hook usage
- Controlled console usage

### Prettier Configuration (`.prettierrc`)

Code formatting:

- 100 character line width
- 2-space indentation
- Trailing commas (ES5)
- Single trailing commas in objects

### Environment Variables (`.env.example`)

See the file for all available configuration options.

## Scripts Reference

| Script                 | Purpose                      |
| ---------------------- | ---------------------------- |
| `npm run dev`          | Start Vite dev server        |
| `npm run build`        | Production build             |
| `npm run preview`      | Preview production build     |
| `npm run lint`         | Run ESLint                   |
| `npm run lint:fix`     | Auto-fix linting issues      |
| `npm run format`       | Format code with Prettier    |
| `npm run format:check` | Check formatting             |
| `npm run type-check`   | Run TypeScript type checking |

## Continuous Integration

The project uses GitHub Actions for:

- **CI Workflow**: Runs on every push/PR to main/develop
- **Linting Workflow**: Separate lint checking pipeline
- **Deployment**: Automatic deployment to GitHub Pages on main branch

See `.github/workflows/` for workflow definitions.
