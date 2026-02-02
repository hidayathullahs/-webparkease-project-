# ParkEase - Frontend Website

Professional Smart Parking Management Platform. Built with React Native Web, Expo Router, and Tailwind CSS.

## 🚀 Overview

ParkEase is a comprehensive SaaS platform connecting drivers, parking providers, and administrators. This repository contains the **Frontend Website** source code, designed to be scalable, responsive, and production-ready.

## 🛠 Tech Stack

- **Framework**: Expo (SDK 50+) / React Native Web
- **Routing**: Expo Router (File-based routing)
- **Styling**: NativeWind (Tailwind CSS for React Native)
- **Animations**: React Native Reanimated 3
- **Icons**: Ionicons (@expo/vector-icons)
- **Language**: TypeScript

## 📂 Project Structure

```
/app                # File-based routes (Pages)
  ├── (admin)       # Admin Dashboard routes
  ├── (driver)      # Driver App routes
  ├── (provider)    # Provider Portal routes
  └── index.tsx     # Main Landing Page
/components         # Reusable UI Components
  ├── admin         # Charts, Tables, Admin widgets
  ├── auth          # Unified Login/Register forms
  ├── driver        # Booking flow, Wallet
  └── shared        # Layouts, Sidebars, Navbars
/services           # Mock API & Data Services (Integration Layer)
/assets             # Images and Static Resources
```

## ⚡ Getting Started

1. **Install Dependencies**

   ```bash
   npm install
   ```

2. **Run Development Server**

   ```bash
   npx expo start --web
   ```

3. **Build for Production**

   ```bash
   npx expo export -p web
   ```

## 🧪 Testing

Run the comprehensive test suite:

```bash
npm run test
```

(See [TESTING.md](./TESTING.md) for manual QA checklists)

## 🌐 Deployment

This project is optimized for static hosting (Vercel, Netlify, AWS S3).
(See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions)
