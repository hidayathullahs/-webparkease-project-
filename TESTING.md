# QA & Testing Checklist

## 1. Responsive Design

- [ ] **Desktop (1440px)**: Landing page grid alignment, Sidebar visibility.
- [ ] **Tablet (768px)**: Card layouts wrap correctly, Hamburger menu appears.
- [ ] **Mobile (375px)**: Hero text scales down, Stacked layouts, Touch targets > 44px.

## 2. Interactive Flows

- [ ] **Landing Page**:
  - [ ] "Get Started" scrolls or navigates.
  - [ ] Role Cards (Driver/Provider/Admin) link to correct routes.
  - [ ] Navbar "Download App" button feedback.
- [ ] **Authentication**:
  - [ ] Login (Admin/Driver/Provider) redirects correctly.
  - [ ] Register validation (Email format, Password length).
  - [ ] Forgot Password flow steps.

## 3. Admin Console

- [ ] Dashboard Charts render without error.
- [ ] User Table sort/filter works (simulated).
- [ ] Sidebar navigation updates URL.

## 4. Accessibility (WCAG 2.1)

- [ ] All images have `alt` text (or proper ARIA roles).
- [ ] Color contrast passes AA standard (checked Landing Page darker backgrounds).
- [ ] Keyboard navigation (Tab) through form inputs.

## 5. Performance

- [ ] `npx expo export -p web` completes without warnings.
- [ ] Lighthouse Performance score > 90 (Desktop).
- [ ] No layout shifts (CLS < 0.1) on Hero section load.
