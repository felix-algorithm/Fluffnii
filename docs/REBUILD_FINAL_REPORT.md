# FluffNii Studio — Rebuild & Redesign Final Report

> **Workspace:** `c:\Users\ADMIN\Desktop\minny-web`  
> **Stack:** Next.js `15.5.29` (App Router) · React `19.0.0` · TypeScript `5.7.2` · Tailwind CSS `3.4.17` · Three.js `0.187.0` · GSAP `3.15.1` (`ScrollTrigger`) · Lenis `1.3.28` · Framer Motion `11.15.0` · OpenNext Cloudflare (`@opennextjs/cloudflare` `1.20.17`)

---

## 1. Non-Destructive Backup & Safety Checkpoint

Before modifying dependencies or source files, a full checkpoint was created without disturbing in-flight working files or copying secrets:

- **Git branch checkpoint:** `backup/pre-ultimate-rebuild` pointing to `HEAD` (`9c90ccb02339cfb6dc18d74f3f3fffc8c6bc8f9f`)
- **Working-tree diff patch:** `docs/backup/working-tree-before-rebuild.patch`
- **File backups in `docs/backup/`:** `globals.css`, `tailwind.config.ts`, `package.json`, `sectionScroll.ts` (`.env*` and `.dev.vars*` excluded)

---

## 2. New Project Architecture & File Map

The former ~3,580-line monolithic `src/app/page.tsx` has been decomposed into a clean ~220-line orchestrator backed by modular section components, a shared motion layer, vanilla Three.js canvases, centralized bilingual copy modules, and a device-tier performance engine.

```text
src/
├── app/
│   ├── layout.tsx                      # Root server layout wrapping LanguageProvider -> SmoothScrollProvider -> PageTransitionShell + CustomCursor
│   ├── page.tsx                        # Clean orchestrator (~220 lines) wiring 9 home sections, preloader, rail, commission API & Lightbox
│   ├── globals.css                     # Self-hosted @font-face rules, 3-layer design tokens, VI diacritic bleed guards, Lenis & curtain CSS
│   ├── robots.ts                       # Crawl directives disallowing /api/
│   ├── sitemap.ts                      # Dynamic sitemap for /, /accessories, /terms, /mentions-legales
│   ├── accessories/
│   │   ├── page.tsx                    # Metadata & route entry for /accessories
│   │   └── AccessoriesShop.tsx         # Interactive 3D fan showcase + cart/estimator + @CrossTalk_f DM & bundle flows
│   ├── terms/
│   │   ├── page.tsx                    # Metadata & route entry for /terms
│   │   └── TermsContent.tsx            # Editorial legal reader with sticky TOC, mobile pill index & smooth scroll jumps
│   ├── mentions-legales/
│   │   ├── page.tsx                    # Metadata & route entry for /mentions-legales
│   │   └── LegalContent.tsx            # Editorial legal & privacy reader powered by LEGAL_COPY
│   └── api/
│       ├── commission-status/route.ts  # GET /api/commission-status (force-dynamic, no-store)
│       └── contact/route.ts            # POST /api/contact (validation, honeypot, reCAPTCHA v3, Resend/SMTP)
├── components/
│   ├── Navbar.tsx                      # Zero-prop-compatible floating glass header, active section tracking, lang & theme toggles
│   ├── Footer.tsx                      # Brand footer with social links, Terms/Legal links & square 900x900 emblem
│   ├── ShowcaseLightbox.tsx            # Accessible keyboard/touch modal with Lenis lock & "Request similar build" quote handoff
│   ├── Bouton.tsx                      # Studio pill CTA button with dual-arrow hover glide & section routing
│   ├── CircularRevealToggle.tsx        # ThemeProvider + View Transitions circular light/dark reveal switch
│   ├── LucianLanguageSwitch.tsx        # Accessible EN/VI listbox switch with animated word swap state
│   ├── LucianContactFields.tsx         # Country phone selector & validated dark contact form inputs
│   ├── PhraseScroll.tsx                # Scroll-driven word highlight manifesto component
│   ├── Compteur.tsx                    # Animated workshop metrics counter
│   ├── MiseAuPoint.tsx                 # Interactive camera AF focus challenge (#bonus)
│   ├── PolaroidsDefile.tsx             # Hero Polaroid pile/band carousel synced to `gioia:clic`
│   ├── Deroule.tsx                     # Interactive 6-step process timeline driven by studioExtraCopy.ts
│   ├── FAQAccordion.tsx                # Accessible accordion driven by studioExtraCopy.ts
│   ├── Obturateur.tsx                  # Retains shared Web Audio `playShutterSound()` helper used by MiseAuPoint.tsx
│   ├── home/
│   │   ├── ChapterRail.tsx             # Desktop right-edge tick rail + mobile popover chapter index
│   │   ├── HeroSection.tsx             # Hero with lazy AtelierHeroCanvas, ScrollWordReveal, 3D Gear chip & PolaroidsDefile
│   │   ├── ManifestoSection.tsx        # #studio ledger backdrop, PhraseScroll, 3:4 formula frame, Compteur & spotlight pillars
│   │   ├── SpeciesShowcaseSection.tsx  # #pour-qui 5-card interactive species fan + #pourquoi stage & 8-cell Result Bento
│   │   ├── MethodSection.tsx           # #methode wrapped in arched CurtainChapter with desktop GSAP matchMedia parallax
│   │   ├── ProjectsSection.tsx         # #projets horizontal drag/keyboard showcase + client review cards
│   │   ├── GallerySection.tsx          # #galerie velocity-reactive counter-scrolling marquee & orientation-matched filter grid
│   │   ├── OffersPackagesSection.tsx   # #offres arched CurtainChapter + #constitue-ton-offre 6 build tier Polaroid cards
│   │   ├── TimelineFaqSection.tsx      # #deroule + #faq + single #bonus MiseAuPoint challenge
│   │   └── ContactQuoteSection.tsx     # #contact quote form preserving sessionStorage draft, ?addons= sync, DTD & reCAPTCHA
│   ├── motion/
│   │   ├── AtelierPreloader.tsx        # Shutter + real load-progress bar preloader preserving fluffnii-intro-seen & gioia:clic
│   │   ├── PageTransitionShell.tsx     # Top scroll-progress hairline + non-transform fixed route curtain overlay
│   │   ├── CurtainChapter.tsx          # Arched velvet curtain transition with GSAP ScrollTrigger + static fallback
│   │   ├── MagneticButton.tsx          # Pointer-fine gsap.quickTo magnetic pull wrapper
│   │   ├── CustomCursor.tsx            # Desktop pointer-fine contextual cursor pill (`Inspect`, `Drag`, `Open`)
│   │   └── ScrollWordReveal.tsx        # Masked word reveal with vertical diacritic bleed (`py-[0.12em]` / VI `0.16em`)
│   └── three/
│       ├── disposeThree.ts             # Shared Three.js geometry/material/texture/renderer disposal & theme reader
│       ├── AtelierHeroCanvas.tsx       # Sculptural Fresnel iridescent totem + sewing-thread rings + particles + scroll/mouse rig
│       └── FanRotorCanvas3D.tsx        # 3D cooling-fan showcase (`internal-fan`, `std-fan`, `plus-fan`) with reactive RPM & LED ring
└── lib/
    ├── cn.ts                           # clsx + tailwind-merge utility
    ├── commissionStatus.ts             # Server commission open/closed & localized note helper
    ├── deviceTier.ts                   # `high` / `mid` / `low` / `reduced-motion` classifier + runtime FPS step-down monitor
    ├── sectionScroll.ts                # Cross-route section scroll target persistence (`fluffnii-scroll-target`)
    ├── smoothScroll.tsx                # Desktop-only Lenis provider synced to `gsap.ticker` & `ScrollTrigger.update`
    ├── homeCopy.ts                     # Humanized EN/VI homepage copy & data models
    ├── accessoriesCopy.ts              # Humanized EN/VI /accessories copy & VND pricing data
    └── studioExtraCopy.ts              # Centralized humanized EN/VI copy for Timeline, FAQ, Terms & Legal
```

**Removed unreferenced legacy component:**
- `src/components/MotDefilant.tsx` was verified to have zero remaining imports across `src/` after `SpeciesShowcaseSection.tsx` replaced `#pourquoi`, and was deleted cleanly. (`Obturateur.tsx` was retained because `MiseAuPoint.tsx` imports `playShutterSound` from `./Obturateur`.)

---

## 3. Content Rewriting & Humanize-Writing Summary

All user-facing English and Vietnamese text was audited and edited using the 3-pass `humanize-writing` workflow (`SKILL.md`, `references/ai-patterns-dictionary.md`, and `references/voices.md`) in the **warm-professional** craftsperson voice (`mình` / `bạn` in Vietnamese, direct maker voice in English).

- **Files updated:** `src/lib/homeCopy.ts`, `src/lib/accessoriesCopy.ts`, and new `src/lib/studioExtraCopy.ts`.
- **Full Before/After ledger:** Recorded in `docs/CONTENT_COMPARISON.md` (`0` Tier 1/2 banned words, `0` em dashes, `0` rhetorical tricolons or parallel negations).
- **Factual & functional preservation verified:**
  - Fursuit homepage packages remain **quote-by-reference-sheet only** (zero invented fursuit prices).
  - `/accessories` VND pricing preserved (`250,000 VND` / `Từ 250.000 VNĐ` for Internal Fan, `500,000 VND` / `Từ 500.000 VNĐ` for STD Edition).
  - Exact quote form commission type options preserved (`"Only body"`, `"Half-body"`, `"Fullsuit"` matching `BODY_DTD_OPTIONS` in `/api/contact` and `ContactQuoteSection.tsx`).
  - All real studio handles and rules preserved (`FluffNii.furries@gmail.com`, `@CrossTalk_f`, `@fluffnii.fur`, `@Fluffnii_FUR`, `@fluffnii_fur`, 24h reply target, 40% non-refundable deposit, 60% / 3-month balance window, zero rush orders).

---

## 4. 3D, Motion & Design System Highlights

- **React-19-Safe 3D Stack (`three@0.187.0`):** Vanilla Three.js runs inside `"use client"` components (`AtelierHeroCanvas.tsx` and `FanRotorCanvas3D.tsx`) loaded via `next/dynamic(..., { ssr: false })`. We intentionally avoided `@react-three/fiber` v8 and `@react-three/drei`, which rely on React 18 internals (`ReactCurrentOwner`) incompatible with React 19.
- **Dynamic Bundle Splitting Confirmed:** Production build chunks isolate Three.js into async dynamic chunks (`b536a0f1.6b8cd45be2d3d889.js` at `348.7 kB` raw and `bd904a5c.a406fd885bf4b838.js` at `226.6 kB` raw), keeping shared first-load JS across all routes at **`103 kB`**.
- **WebGL Lifecycle Safety:** Both Three.js canvases pause `requestAnimationFrame` via `IntersectionObserver` when offscreen and `document.visibilitychange` when hidden, handle `webglcontextlost`/`webglcontextrestored`, dynamically adapt to `data-theme` via `MutationObserver`, and run full recursive `disposeThreeResources()` cleanup on unmount.
- **Reference Effect Mapping Implemented (with zero copied brand copy or assets):**
  - *Noomo Storytelling:* Fresnel iridescent pearl/velvet GLSL hero totem (`AtelierHeroCanvas`), contextual pointer pill (`CustomCursor`), and masked word reveals (`ScrollWordReveal`).
  - *Shopify Winter '26:* Hardware capability classifier + runtime fallback (`deviceTier.ts`), pointer-reactive spotlight cards (`ManifestoSection`, `AccessoriesShop`), offscreen media/RAF pausing, and dual-lit 3D product views (`FanRotorCanvas3D`).
  - *Ximitech:* Real readiness preloader (`AtelierPreloader`), non-transform sticky-safe `PageTransitionShell` with top scroll-progress hairline, desktop-only Lenis + GSAP ticker sync (`smoothScroll.tsx`), arched velvet `CurtainChapter`, scroll-velocity-reactive marquee (`GallerySection`), and Vietnamese diacritic bleed padding (`py-[0.12em]` / `0.16em` under `html[data-lang="vi"]`).
- **Asset Integrity (`docs/REFERENCE_AND_ASSET_AUDIT.md`):**
  - All 62 image files in `public/images/` and 15 self-hosted font files in `public/fonts/` were pixel-audited.
  - Hardcoded dimension mismatches across species cards, featured projects, gallery tiles, package cutouts, and `logo-footer.webp` (`900x900`) were corrected; `formula-fursuit.webp` (`750x1000`) moved to `aspect-[3/4]`; previously unreferenced `polaroid-02.webp` (`684x684`) was restored into `HeroSection`; and `hero-14.webp` (`840x840`) was surfaced on `/accessories` to showcase real wear of the portable fan.
  - Zero external Google Fonts network calls remain in `globals.css` or `layout.tsx`, keeping OpenNext Cloudflare builds self-contained.

---

## 5. Adaptive Device Optimization (`src/lib/deviceTier.ts`)

`useDeviceTier()` classifies visitors into `"high" | "mid" | "low" | "reduced-motion"` using `prefers-reduced-motion`, offscreen WebGL1/2 probe (immediately releasing the test context via `WEBGL_lose_context`), `navigator.hardwareConcurrency`, `navigator.deviceMemory`, `navigator.connection?.saveData`, `(pointer: coarse)`, and viewport width, plus a bounded runtime FPS safety monitor that automatically steps down `high -> mid -> low` if sustained frame drops occur:

| Tier | `enableWebGL` | Max DPR | Particle Budget | `enableSmoothScroll` (Lenis) | `enableCustomCursor` | Fallbacks & Behavior |
|---|---|---|---|---|---|---|
| `high` | `true` | `2` | `96` (Hero) / `64` (Fan) | `true` (desktop fine pointer) | `true` (`>= 1024px` fine) | Full Fresnel shader, 3D fan rotors, GSAP `CurtainChapter` pin/scrub, magnetic CTAs |
| `mid` | `true` | `1.5` | `40` (Hero) / `28` (Fan) | Desktop fine only; `false` on touch | `true` (`>= 1024px` fine) | Reduced shader detail & particle counts; native touch scrolling preserved |
| `low` | `false` | `1` | `0` | `false` | `false` | CSS radial-glow Hero poster & `BlueprintVisual` SVG fan schematics; static stacked chapters |
| `reduced-motion` | `false` | `1` | `0` | `false` | `false` | Preloader skipped immediately; static final text & states rendered without scroll hijacking |

---

## 6. Skills & Tools Used

- **Skills Applied:**
  - `humanize-writing` (`SKILL.md`, `references/ai-patterns-dictionary.md`, `references/voices.md`) — 3-pass copy humanization and `docs/CONTENT_COMPARISON.md` verification.
  - `cinematic-gsap-lenis-motion-system` & `gsap` — `ScrollTrigger`, `gsap.matchMedia()`, `gsap.quickTo()`, `gsap.context()` cleanup, and ticker sync with Lenis.
  - `lenis-smooth-scroll` — Desktop-only Lenis setup, modal scroll locking (`stop()`/`start()`), `[data-lenis-prevent]`, and CSS smooth-scroll conflict guard.
  - `threejs` — Vanilla Three.js WebGL2 setup, custom GLSL Fresnel shader, procedural geometries, DPR clamping, and full GPU disposal.
  - `build-awwwards-quality-sites`, `no-ai-design-slop`, `masked-reveal`, `scroll-scrubbed-word-reveal` — Accessible split text, no-JS fallback safety, optical pacing, and anti-slop UI gates.
  - `graphify` — Code knowledge graph queried prior to multi-file changes and refreshed (`graphify update .`) after rebuild (`566 nodes, 1350 edges, 34 communities`).
- **Note on Rust / WebAssembly (`promtp.md` Section XI):**
  - The `Rust Anything` skill is **not available** in this environment's skill catalog.
  - Per Section XI's engineering criteria (evaluating bundle size, memory overhead, browser compatibility, maintenance complexity, and Cloudflare Workers constraints), **TypeScript + GPU-accelerated CSS transforms + WebGL2 GLSL shaders** is strictly the superior architecture here: GPU shaders execute massively parallel vertex/fragment math natively on the graphics card without JS/Wasm serialization or extra `.wasm` fetch payloads, and Next.js 15 / Cloudflare Workers routes require zero custom Wasm bundling overhead.

---

## 7. Local & Cloudflare Run, Build & Deploy Guide

### Local Development
```bash
npm install
npm run dev
```
Or on Windows double-click `run.bat` (clears `.next-dev` and starts `http://localhost:3000`).

### Production Verification & Build
```bash
npx tsc --noEmit
npm run build
npm run start
```

### Cloudflare Workers (OpenNext) Preview & Deploy
```bash
npm run preview   # Builds OpenNext bundle (.open-next/) and starts local Cloudflare preview
npm run deploy    # Builds and deploys to Cloudflare Workers via wrangler.jsonc (worker: "fluffnii")
npm run upload    # Uploads built OpenNext assets/worker without immediate promotion
```

---

## 8. Verification Results & Operational Notes

### Build & Static Checks (Post-Final-Edit)
- **`npx tsc --noEmit`:** **PASS** (exit code `0`, zero TypeScript errors across all pages, sections, API routes, 3D canvases, and copy modules).
- **`npm run build` (`next build`):** **PASS** (exit code `0`, compiled in `25.8s`, Next.js `Linting and checking validity of types` passed, `10/10` static pages generated):

| Route | Type | Size | First Load JS |
|---|---|---|---|
| `/` | Static (`○`) | `67.1 kB` | `296 kB` |
| `/_not-found` | Static (`○`) | `995 B` | `104 kB` |
| `/accessories` | Static (`○`) | `20 kB` | `240 kB` |
| `/terms` | Static (`○`) | `5.09 kB` | `234 kB` |
| `/mentions-legales` | Static (`○`) | `4.94 kB` | `234 kB` |
| `/api/commission-status` | Dynamic (`ƒ`) | `133 B` | `103 kB` |
| `/api/contact` | Dynamic (`ƒ`) | `133 B` | `103 kB` |
| `/robots.txt`, `/sitemap.xml` | Dynamic (`ƒ` / metadata) | `133 B` | `103 kB` |
| *Shared by all* | — | — | `103 kB` |

- **`npm run lint` (`next lint`):** Exited `1` interactively (`? How would you like to configure ESLint?`) because the repository (`HEAD`) did not include `eslint`, `eslint-config-next`, or an `.eslintrc*` / `eslint.config.*` configuration file; built-in Next.js compilation & type validation inside `next build` passed cleanly.
- **`graphify update .`:** **PASS** (`566 nodes, 1350 edges, 34 communities` rebuilt cleanly).

### Operational Environment Variables (`.env.example`)
Keep real secrets in `.env.local` (local Node) and `.dev.vars` / Cloudflare Worker Secrets (production):
- **Email delivery (Cloudflare Workers):** `RESEND_API_KEY`, `RESEND_FROM`, `STUDIO_TO_EMAIL` (note: `nodemailer` SMTP does not run in Cloudflare Workers runtime; Resend API is used in production Workers, while `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS` work in local Node.js).
- **Commission banner toggle:** `COMMISSION_OPEN` (`"true"`/`"false"`), `COMMISSION_NOTE`, `COMMISSION_NOTE_VI`.
- **Canonical SEO & anti-bot protection:** `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_RECAPTCHA_SITE_KEY`, `RECAPTCHA_SECRET_KEY`, `RECAPTCHA_MIN_SCORE` (`0.5`).
- **Asset & Copy Ledger:** All real studio assets in `public/images/` and self-hosted fonts in `public/fonts/` are intact (zero placeholder stock photos added); see `docs/REFERENCE_AND_ASSET_AUDIT.md` for per-image dimensions and `docs/CONTENT_COMPARISON.md` for copy verification.
