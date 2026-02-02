# Deployment Guide

## Production Build

ParkEase uses Expo's web export feature to generate a static site.

### 1. Build Command

```bash
npx expo export -p web
```

This will create a `dist` folder containing:

- optimized HTML
- minified JS bundles
- static assets

### 2. Vercel Deployment (Recommended)

1. Import repository to Vercel.
2. Framework Preset: **Other** (or Expo).
3. Build Command: `npx expo export -p web`
4. Output Directory: `dist`
5. **Important**: Add a `vercel.json` for SPA routing:

   ```json
   {
     "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
   }
   ```

### 3. Netlify Deployment

1. Build Command: `npx expo export -p web`
2. Publish Directory: `dist`
3. Add a `_redirects` file to the `public/` folder:

   ```
   /*    /index.html   200
   ```

## Environment Variables

Ensure the following variables are set in your CI/CD pipeline:

- `EXPO_PUBLIC_API_URL`: Backend API endpoint
- `EXPO_PUBLIC_MAPS_KEY`: Google Maps API Key
