# Tagline-Thread — Creative Digital Agency Website

> **"Where ideas are woven into identity"**

A complete, production-quality React website for Tagline-Thread, a futuristic creative digital agency specializing in websites, branding, social media management and marketing.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 18 + TypeScript |
| Build Tool | Vite |
| Styling | Tailwind CSS v3 |
| Animations | GSAP + ScrollTrigger |
| 3D / WebGL | Three.js + React Three Fiber |
| Icons | Lucide React |

---

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## Project Structure

```
src/
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx          # Floating pill navbar with mobile menu
│   │   └── Footer.tsx          # Complete footer with all links
│   ├── sections/
│   │   ├── Hero.tsx            # Hero with WebGL thread scene
│   │   ├── About.tsx           # 4-node about section
│   │   ├── ThreadEngine.tsx    # Interactive thread engine showcase
│   │   ├── Services.tsx        # 4-service 2×2 grid
│   │   ├── Portfolio.tsx       # Asymmetric editorial portfolio grid
│   │   ├── HowWeWork.tsx       # 5-step process timeline
│   │   └── Contact.tsx         # Contact form + direct channels
│   ├── three/
│   │   ├── HeroScene.tsx       # Hero 3D composition (R3F)
│   │   ├── ThreadScene.tsx     # Thread Engine 3D stages (R3F)
│   │   └── ThreadObject.tsx    # Reusable 3D objects
│   └── ui/
│       ├── Button.tsx          # Reusable button component
│       ├── SectionHeading.tsx  # Section header pattern
│       ├── ServiceCard.tsx     # Service card with hover effects
│       ├── ProjectCard.tsx     # Portfolio card variants
│       └── WhatsAppButton.tsx  # Floating WhatsApp CTA
├── data/
│   ├── contact.ts             # ⚠️  CONFIGURE BEFORE LAUNCH
│   ├── services.ts            # Service definitions
│   └── projects.ts            # Portfolio project data
├── hooks/
│   └── useReducedMotion.ts    # Respects prefers-reduced-motion
└── styles/
    └── globals.css            # Tailwind directives + base styles
```

---

## ⚠️ Configuration Required Before Launch

### 1. Contact Details — `src/data/contact.ts`

Replace every `REPLACE_WITH_*` placeholder:

```ts
export const CONTACT_CONFIG = {
  whatsapp: {
    number:  '919876543210',    // Country code + number, NO plus sign
    message: 'Hi Tagline-Thread! ...',
  },
  email: {
    address: 'studio@taglinethread.com',
    subject: 'Project Inquiry — Tagline-Thread',
  },
  phone: {
    display: '+91 98765 43210',
    value:   '+919876543210',
  },
  social: {
    instagram: 'https://instagram.com/taglinethread',
    linkedin:  'https://linkedin.com/company/taglinethread',
    twitter:   'https://twitter.com/taglinethread',
  },
}
```

### 2. Contact Form Backend

The contact form currently shows an error (no backend configured). Integrate one of:

- **[Formspree](https://formspree.io/)** — Free tier, no backend needed
- **[EmailJS](https://www.emailjs.com/)** — Send emails from client-side JS
- **[Netlify Forms](https://docs.netlify.com/forms/setup/)** — If hosted on Netlify
- **Custom API** — Point `handleSubmit` to your endpoint

### 3. Portfolio Assets

Replace placeholder visuals in `src/data/projects.ts` and `ProjectCard.tsx`:

| Project | Placeholder | Action |
|---------|------------|--------|
| AURA CYBERNETICS | SVG gradient | Add real screenshot |
| SOLARIS COGNITION | SVG gradient | Add real screenshot |
| VORTEX AUDIO LABS | SVG gradient | Add real screenshot |
| CHRONO STUDIO | SVG gradient | Add real screenshot |

Place images in `public/assets/` and reference them as `/assets/project-name.jpg`.

---

## Brand Palette

| Token | Hex | Usage |
|-------|-----|-------|
| `brand-bg` | `#212529` | Main background |
| `brand-ash` | `#E9ECEF` | Primary text |
| `brand-orange` | `#FB5607` | CTAs, highlights, thread nodes |
| `brand-purple` | `#8338EC` | Secondary accents, 3D lighting |
| `surface-base` | `#16181B` | Sunken panels, sections |
| `surface-card` | `#2A2E33` | Cards, glassmorphic surfaces |
| `muted` | `#9BA3AF` | Secondary text, metadata |

---

## Sections

| # | Section | ID |
|---|---------|-----|
| 1 | Navigation | — |
| 2 | Hero | `#hero` |
| 3 | About | `#about` |
| 4 | Thread Engine | `#the-engine` |
| 5 | Services | `#services` |
| 6 | Portfolio | `#our-work` |
| 7 | How We Work | `#process` |
| 8 | Contact | `#contact` |
| 9 | Footer | — |

---

## Animations

| Feature | Implementation |
|---------|---------------|
| Hero entrance | GSAP timeline, staggered fade-up |
| Section reveals | GSAP ScrollTrigger (once, threshold 80%) |
| Hero 3D scene | React Three Fiber + camera drift on mouse |
| Thread Engine | R3F interactive stages, auto-cycling |
| Service card hover | CSS mouse-tracking radial gradient |
| Portfolio reveals | GSAP stagger on scroll |
| Navbar active state | IntersectionObserver |
| Reduced motion | `useReducedMotion` hook, disables GSAP |
| WebGL fallback | Static SVG art when WebGL unavailable |

---

## Accessibility

- Semantic HTML (`header`, `main`, `section`, `footer`, `nav`)
- Skip-to-content link
- `aria-label` on all icon-only buttons
- `aria-current="page"` on active nav links
- Form labels with `for`/`id` pairs
- `prefers-reduced-motion` respected
- Focus-visible ring styles
- Color not used as sole information carrier

---

## Performance Notes

- 3D scenes use `dpr={[1, 1.5]}` (capped at 1.5x for performance)
- WebGL detected before rendering Canvas
- ScrollTrigger instances cleaned up on unmount (`ctx.revert()`)
- GSAP contexts scoped to component refs
- Images use `object-cover` with explicit dimensions
- Tailwind purges unused classes in production build

---

## Known Limitations / Incomplete Features

1. **Contact form**: Needs backend integration (see Configuration section)
2. **Portfolio images**: All placeholder SVG art — replace with real project photos
3. **Social media URLs**: Currently `#` — update in `contact.ts`
4. **Phone number**: Placeholder — update in `contact.ts`
5. **WhatsApp number**: Placeholder — update in `contact.ts`
6. **Email address**: Placeholder — update in `contact.ts`
7. **Navbar & Footer logo**: Uses `logo.png` from `/public/logo.png`

---

## Development

```bash
npm run dev      # http://localhost:5173
npm run build    # Production build → dist/
npm run preview  # Preview production build
```

---

*Built with React, Vite, Tailwind CSS, GSAP, and Three.js*
*Tagline-Thread Creative Studio © 2025*

