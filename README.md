# Roots & Routes AR PWA

Augmented reality field guide and journal that blends STEM inquiry with cultural storytelling for plant explorations.

## What & Why

- Provide learners with an accessible, mobile-first companion for outdoor expeditions and classroom gardens.
- Strengthen informal learning by connecting local plant knowledge with national standards.
- Support place-based education where cultural stories and scientific literacy reinforce one another.

## Learning Goals & Standards

- NGSS: MS-LS2-2, HS-LS4-3, HS-LS4-5, MS-PS1-2, HS-ESS3-1
- C3 Framework: D2.Geo, D2.His strands for geographic and historical inquiry
- Encourage observation, systems thinking, and reflective journaling tied to disciplinary core ideas.

## Pedagogical Grounding

- **Inquiry-based learning**: learners generate hypotheses, test via simulations, and document findings.
- **Constructivism**: knowledge emerges from interactions with local ecosystems and prior experiences.
- **Culturally responsive pedagogy**: routes center community narratives alongside scientific data.

## Feature Highlights

- Screen-based navigation (no external router) tuned for iOS/Android handhelds.
- Augmented scanning workflow with cultural/STEM detail tabs and climate simulation.
- Offline-ready journal with CSV export and standards tagging.
- Accessibility controls: text scaling, high-contrast, narration toggles, dark theme.
- Educator dashboard for quick insights and export stubs.

## Architecture

- React + TypeScript powered by Vite.
- Single-responsibility screens managed via discriminated union state in `App.tsx`.
- Design tokens and media queries implemented with CSS custom properties.
- No external router; `Screen` union drives transitions and persistence.

## Device & Hardware Requirements

- Modern mobile device with camera for AR scanning (optional for offline journal use).
- Progressive Web App install recommended for field deployment.
- Optional printed markers / posters for classroom onboarding.

## Setup

```bash
npm install
npm run dev       # start development server
npm run build     # production build
npm run preview   # preview build output
npm run test      # vitest unit tests
```

Requires Node.js 20 or newer.

## Content & Theming

- `src/styles/tokens.css` defines color, typography, spacing tokens.
- `src/styles/globals.css` applies base resets, focus styles, and touch-target sizing.
- `src/styles/dark.css` overrides tokens when `.dark` class is present.

## Privacy & Ethics

- Journals persist in `localStorage` by default; no personal data is transmitted.
- Optional analytics hooks are placeholders and disabled.
- Camera usage limited to in-app scanning sessions.

## Roadmap

1. WebXR / WebAR integration for true markerless overlays.
2. Enhanced educator reports with trend visualizations and CSV/PDF exports.
3. Content schemas for community-submitted plant stories and STEM datasets.

## License & Contributions

- Licensed under the MIT License.
- Contributions welcome via pull requests; please discuss large changes in issues first.
