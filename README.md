# Mohamed Shipet Portfolio

Personal portfolio for Mohamed Shipet, built with React, Vite, Tailwind CSS, Motion, and a space-inspired visual system. The site highlights projects, skills, experience, statistics, development thoughts, contact links, and downloadable CV assets.

## Features

- Animated hero with typing text, orbiting tech icons, and polished scroll motion.
- Responsive sections for skills, projects, experience, statistics, thoughts, contact, and footer.
- Dark and light theme support with saved user preference.
- Motion-powered scroll reveals, counters, hover depth, and reduced-motion fallbacks.
- CV download and direct social/contact links.

## Tech Stack

- React 18
- Vite 6
- TypeScript
- Tailwind CSS 4
- Motion
- Lucide React
- Radix UI primitives

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Create a production build:

```bash
npm run build
```

## Project Structure

```text
src/
  app/
    App.tsx
    components/
      Hero.tsx
      Skills.tsx
      Projects.tsx
      Experience.tsx
      Statistics.tsx
      DevThoughts.tsx
      Contact.tsx
      Footer.tsx
      ui/
  imports/
    image.png
    Mohamed-Shipet-CV.pdf
  styles/
    index.css
    theme.css
    tailwind.css
    fonts.css
```

## Customization

- Update profile copy and CTA links in `src/app/components/Hero.tsx`.
- Update project cards in `src/app/components/Projects.tsx`.
- Update skills in `src/app/components/Skills.tsx`.
- Update experience entries in `src/app/components/Experience.tsx`.
- Adjust colors, glass styles, star fields, and motion styles in `src/styles/theme.css`.
- Replace CV or image assets inside `src/imports/`.

## Deployment

This is a static Vite app. Build output is generated in `dist/` and can be deployed to Vercel, Netlify, GitHub Pages, Railway static hosting, or any static file server.
