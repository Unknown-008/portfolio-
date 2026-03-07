# Krishna Garg — Developer Portfolio

A modern, dark futuristic developer portfolio built with React.js, Vite, Tailwind CSS, React Three Fiber, and Framer Motion.

## Tech Stack

- **React 18** + **Vite 5** — Fast development and build
- **Tailwind CSS 3** — Utility-first styling
- **React Three Fiber** + **Three.js** — 3D hero scene with floating orbs, particles, and orbit rings
- **Framer Motion** — Smooth animations and page transitions
- **React Intersection Observer** — Scroll-triggered animations

## Features

- Animated loading screen with terminal-style progress
- Custom cursor with smooth lag effect
- 3D hero section with orbiting tech spheres, particle field, and distort material
- Typing animation with multiple roles
- Glassmorphism cards with hover glow effects
- Skill bars with animated fill on scroll
- Interactive project cards with modal detail view
- Career timeline in Experience section
- Contact form with success state
- Developer terminal footer
- Fully responsive (mobile, tablet, desktop)
- Dark futuristic theme (navy + cyan + purple neon)

## Project Structure

```
portfolio/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── public/
│   └── favicon.svg
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── index.css
    ├── components/
    │   ├── Navbar.jsx        # Sticky nav with active section detection
    │   ├── LoadingScreen.jsx # Terminal-style loading with progress bar
    │   ├── CustomCursor.jsx  # Custom cursor with lag effect
    │   └── Footer.jsx        # Developer terminal footer
    ├── sections/
    │   ├── Hero.jsx          # 3D R3F scene + hero content
    │   ├── About.jsx         # About + stats + code block
    │   ├── Skills.jsx        # Skill bars + tech badge cloud
    │   ├── Projects.jsx      # Project cards + modal details
    │   ├── Experience.jsx    # Experience card + career timeline
    │   └── Contact.jsx       # Contact info + form
    ├── hooks/
    │   ├── useScrollAnimation.js  # Scroll visibility + progress hooks
    │   └── useMousePosition.js    # Mouse position tracking hooks
    └── utils/
        └── animations.js     # Reusable Framer Motion variants
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Navigate to the portfolio directory:
   ```bash
   cd portfolio
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## Customization

### Personal Info
Update these files with your real details:

- **`src/sections/Hero.jsx`** — Name, role, description, social links
- **`src/sections/About.jsx`** — Bio text, stats, highlights
- **`src/sections/Skills.jsx`** — Skills and proficiency levels
- **`src/sections/Projects.jsx`** — Project data array
- **`src/sections/Experience.jsx`** — Work history and timeline
- **`src/sections/Contact.jsx`** — Email, GitHub, LinkedIn links
- **`src/components/Footer.jsx`** — Social links and email
- **`src/components/Navbar.jsx`** — Email in Hire Me button

### Contact Form (EmailJS)

To make the contact form actually send emails:

1. Create an account at [emailjs.com](https://emailjs.com)
2. Install: `npm install @emailjs/browser`
3. In `src/sections/Contact.jsx`, replace the `handleSubmit` function:
   ```js
   import emailjs from '@emailjs/browser'

   const handleSubmit = async (e) => {
     e.preventDefault()
     setStatus('sending')
     try {
       await emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', formRef.current, 'YOUR_PUBLIC_KEY')
       setStatus('sent')
     } catch {
       setStatus('error')
     }
   }
   ```

### Colors
Theme colors are in `tailwind.config.js` and `src/index.css`. Primary accent: `#06b6d4` (cyan), secondary: `#8b5cf6` (purple).

## Dependencies

```
react                      ^18.3.1
react-dom                  ^18.3.1
@react-three/fiber         ^8.17.5
@react-three/drei          ^9.109.2
three                      ^0.167.1
framer-motion              ^11.3.28
react-intersection-observer ^9.13.1
```

## License

MIT — feel free to use and adapt.
