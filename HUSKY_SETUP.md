# Husky Setup Guide

This project uses Husky to run scripts before committing code (pre-commit hooks).

## Automatic Setup

Husky will be automatically installed when you run:

```bash
npm install
```

The `prepare` script in `package.json` will automatically set up Husky hooks.

## What Happens Before Each Commit

The `.husky/pre-commit` hook will:

1. Run ESLint and automatically fix issues (`npm run lint:fix`)
2. Format code with Prettier (`npm run format`)

This ensures all code committed follows project standards.

## Manual Setup (if needed)

If Husky isn't initialized, manually set it up:

```bash
# Install Husky
npm install husky --save-dev

# Initialize Husky
npx husky install

# Create pre-commit hook
npx husky add .husky/pre-commit "npm run lint:fix && npm run format"
```

## Bypass Hooks

If you need to bypass hooks (not recommended):

```bash
git commit --no-verify
```

## Troubleshooting

### Hooks Not Running

1. Ensure Husky is installed: `npm ls husky`
2. Check hook file permissions: `ls -la .husky/pre-commit`
3. Reinstall: `rm -rf .husky && npx husky install`

### Permission Denied Error

Make hook executable:

```bash
chmod +x .husky/pre-commit
```

### Slow Commits

If commits are slow due to linting:

1. Run `npm run lint:fix` manually before committing
2. Consider staged-git changes (lint only changed files)

---

For more info: https://typicode.github.io/husky/
