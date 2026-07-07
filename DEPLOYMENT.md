# Deployment Guide

This guide covers deploying the portfolio website to various platforms.

## Prerequisites

- Node.js 16+
- npm or yarn
- Git account
- A hosting platform account

## Environment Setup

Before deploying, ensure all environment variables are configured:

```bash
cp .env.example .env.production
# Edit .env.production with production values
```

### Required Environment Variables

- `VITE_EMAILJS_SERVICE_ID` - EmailJS service identifier
- `VITE_EMAILJS_TEMPLATE_ID` - EmailJS template identifier
- `VITE_EMAILJS_PUBLIC_KEY` - EmailJS public key

### Optional Variables

- `VITE_GA_TRACKING_ID` - Google Analytics tracking ID
- `VITE_APP_TITLE` - Site title in browser tab
- Feature flags for enabling/disabling features

## GitHub Pages

### Automatic Deployment with GitHub Actions

The repository includes a GitHub Actions workflow that automatically builds and deploys on push to `main` branch.

1. **Push to main branch**
   ```bash
   git checkout main
   git merge develop
   git push origin main
   ```

2. **GitHub Actions automatically:**
   - Installs dependencies
   - Runs linting and type checks
   - Builds the project
   - Deploys to GitHub Pages

3. **Update GitHub Pages settings:**
   - Go to Repository Settings → Pages
   - Source: Deploy from a branch
   - Branch: `gh-pages` / `/(root)`

4. **Access your site:**
   - `https://yourusername.github.io/portfolio-react/`

### Manual Deployment

```bash
# Build the project
npm run build

# Deploy to GitHub Pages
npm run deploy
```

## Vercel

### Automatic Deployment

1. **Connect Repository**
   - Go to [vercel.com](https://vercel.com)
   - Sign in with GitHub
   - Select your repository
   - Click "Import"

2. **Configure Project**
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `build`
   - Environment Variables: Add all from `.env.example`

3. **Deploy**
   - Click "Deploy"
   - Site will be available at `*.vercel.app`

### Custom Domain

1. Go to Project Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed

## Netlify

### Via Git (Recommended)

1. **Connect Repository**
   - Go to [netlify.com](https://netlify.com)
   - Click "New site from Git"
   - Choose GitHub
   - Select your repository

2. **Build Settings**
   - Build command: `npm run build`
   - Publish directory: `build`
   - Node version: 18 (in build settings or netlify.toml)

3. **Environment Variables**
   - Go to Site settings → Environment
   - Add all variables from `.env.example`

4. **Deploy**
   - Every push to `main` triggers automatic deployment

### Custom Domain

1. Go to Site settings → Domain settings
2. Add custom domain
3. Update DNS records as instructed

### Netlify.toml Configuration

Create `netlify.toml` for advanced configuration:

```toml
[build]
  command = "npm run build"
  publish = "build"

[build.environment]
  NODE_VERSION = "18"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[[headers]]
  for = "/*"
  [headers.values]
    X-Content-Type-Options = "nosniff"
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
```

## Self-Hosted (VPS/Dedicated Server)

### Using Nginx

1. **Build the project**
   ```bash
   npm install
   npm run build
   ```

2. **Upload build files**
   ```bash
   scp -r build/* user@your-server:/var/www/portfolio/
   ```

3. **Configure Nginx**
   ```nginx
   server {
     listen 80;
     server_name your-domain.com www.your-domain.com;

     root /var/www/portfolio;
     index index.html;

     # Gzip compression
     gzip on;
     gzip_types text/plain text/css text/javascript application/json;

     # Security headers
     add_header X-Content-Type-Options "nosniff" always;
     add_header X-Frame-Options "DENY" always;
     add_header X-XSS-Protection "1; mode=block" always;

     # SPA routing
     location / {
       try_files $uri $uri/ /index.html;
     }

     # Cache static assets
     location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
       expires 1y;
       add_header Cache-Control "public, immutable";
     }
   }
   ```

4. **Enable HTTPS with Let's Encrypt**
   ```bash
   sudo apt-get install certbot python3-certbot-nginx
   sudo certbot --nginx -d your-domain.com
   ```

## Docker Deployment

### Dockerfile

```dockerfile
# Build stage
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production stage
FROM node:18-alpine
RUN npm install -g serve
WORKDIR /app
COPY --from=builder /app/build ./build

EXPOSE 3000
CMD ["serve", "-s", "build", "-l", "3000"]
```

### Build and Run

```bash
docker build -t portfolio:latest .
docker run -p 3000:3000 portfolio:latest
```

## Performance Optimization

### Pre-deployment Checklist

- [ ] Run `npm run build` and check output size
- [ ] Test on production URLs
- [ ] Verify all environment variables are set
- [ ] Check mobile responsiveness
- [ ] Test contact form functionality
- [ ] Run Lighthouse audit
- [ ] Check Web Vitals metrics
- [ ] Verify analytics tracking (if enabled)

### Performance Tips

1. **Enable Gzip compression** on your server
2. **Cache static assets** with appropriate headers
3. **Use CDN** for serving static files
4. **Minify and bundle** (handled by Vite)
5. **Lazy load images** where possible
6. **Enable service workers** for offline support (optional)

### Monitoring

- Monitor site uptime
- Track Web Vitals metrics
- Review error logs
- Monitor API response times
- Track user analytics

## Troubleshooting

### 404 on Refresh

**Problem**: Refreshing the page shows 404 error.

**Solution**: Configure your server to serve `index.html` for all routes:
- **Netlify**: Automatic for SPA
- **Vercel**: Automatic for SPA
- **GitHub Pages**: Add redirect rules
- **Nginx**: Use `try_files` directive

### Environment Variables Not Loading

**Problem**: Environment variables are undefined.

**Solution**:
- Ensure variables start with `VITE_` prefix
- Variables must be set in deployment environment
- Rebuild after updating environment variables
- Check build logs for errors

### Build Failures

**Problem**: Deployment build fails.

**Solution**:
- Check Node.js version compatibility
- Verify all dependencies are in `package.json`
- Run `npm ci` instead of `npm install`
- Check build logs for specific errors

### Email Form Not Working

**Problem**: Contact form doesn't send emails.

**Solution**:
- Verify EmailJS credentials in environment
- Check EmailJS service and template IDs
- Verify email template variable names
- Check browser console for errors
- Test with EmailJS dashboard first

## Rollback

If deployment goes wrong, rollback to previous version:

### GitHub Pages
```bash
git revert HEAD~1
git push origin main
```

### Vercel/Netlify
- Go to Deployments
- Select previous successful deployment
- Click "Rollback"

---

## Support

For deployment issues, check:
- Platform-specific documentation
- GitHub Issues for known problems
- Build logs for error messages
- Browser console for client-side errors

## Next Steps

After deployment:
1. Monitor performance metrics
2. Gather user feedback
3. Plan improvements
4. Schedule content updates
5. Keep dependencies updated
