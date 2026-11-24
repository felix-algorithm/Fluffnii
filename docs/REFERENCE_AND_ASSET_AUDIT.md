# FluffNii Studio — Reference & Asset Audit

> **Scope & Purpose:** Comprehensive technical audit of the 3 reference sites (local mirrored bundles + web-verified architecture notes) and pixel-level audit of all **62 image assets** (`public/images/`) and **15 font files** (`public/fonts/`) in `c:\Users\ADMIN\Desktop\minny-web`.
> **Target Stack Constraints:** Next.js 15.5.29 + React 19 + Tailwind CSS 3.4 + vanilla `three` (no `@react-three/fiber` v8 / `@react-three/drei` due to React 19 `ReactCurrentOwner` incompatibility) + `gsap` / `ScrollTrigger` + `lenis` + `framer-motion` + self-hosted fonts for OpenNext Cloudflare deployment.
> **Brand Rule:** All FluffNii Studio copy, fursuit photography, VND pricing on `/accessories`, custom quote flow on `/`, and brand identity remain 100% original. Reference code/assets are never copied into FluffNii.

---

## Part I — 10-Point Reference Audits (`promtp.md` Section VII & VIII)

### Verification & Access Notes (No Guessing)

- **Reference 1 (`storytelling.noomoagency.com`):** Full client Nuxt 3 HTML, CSS, `_nuxt/*.js` bundles (`CbdjwYMp.js`, `FZFS71Nt.js`, `N9wcHCtb.js`), Draco `.glb` models, Blender camera timelines (`cam.glb`, `cam-mob.glb`), HDRI (`wooden_studio_19_1k.hdr`), and textures were directly inspected locally, supplemented by web architecture summaries. Audio playback and live interactive WebGL frame capture were not executed in a headless browser here; runtime shader appearance on live hardware is recorded from inspected GLSL and web summaries.
- **Reference 2 (`www.shopify.com/editions/winter2026`):** Full SSR HTML (`winter2026.html`), Tailwind CSS (`tailwind-G-N6aznT.css`), React/R3F/Theatre.js/Lenis/detect-gpu bundles (`Background-C8-YYu8Q.js`, `(_locale).editions.winter2026-D2ExMuGP.js`, `Butterflies-BEdvR0Z_.js`, `Effects-ByAKepvN.js`, `*Scene-*.js`), `mud_normal.webp`, and `rive.wasm` were directly inspected locally. Remote `.riv` state-machine binaries, Theatre.js state JSONs, `.glb` meshes, and streaming `.mp4`/`.webm` clips hosted on `cdn.shopify.com` / `editions-winter-2026.myshopify.com` were not mirrored offline and were not fetched interactively at runtime; behavior of those remote binaries is inferred strictly from the local bundle consumers (`Effects-ByAKepvN.js`, `Butterflies-BEdvR0Z_.js`, `winter2026.html`) and explicitly marked as such.
- **Reference 3 (`ximitech.vn`):** Full pre-rendered HTML (`index.html`), stylesheet (`index-BCDleBy5.css`), React/Motion/Lenis/Three.js bundles (`index-ocm7O9zv.js`, `CurtainChapter-DeBighzQ.js`, `WorkGallery-Dn8RTvT8.js`, `ProjectDetail-BQdkBSfl.js`, `Projects-B_6qIZ_R.js`), and local thumbnails were directly inspected locally. Remote R2 MP4 hero/film videos and `ximitech-logo-3d.glb` mesh geometry live on `pub-0a31f9a8b1e7482c97358b9371b0c390.r2.dev` / `/models/` and were inspected via their exact Three.js loader/animation consumer code in `index-ocm7O9zv.js`.

---

### Reference 1 — `storytelling.noomoagency.com` (Noomo Digital Storytelling)

**Local source:** `C:\Users\ADMIN\Downloads\storytelling.noomoagency.com` | **Live URL:** `https://storytelling.noomoagency.com/`

1. **UI Structure**
   - Full-viewport (`100vw x 100vh`) persistent fixed WebGL canvas (`Sweet3Vue` mounted behind DOM overlays) with an invisible virtual scroll spacer (`height: calc(var(--app-vh, 1vh) * (totalScrollLength + 100))`, summing **20 logical scroll sections** stored in Pinia `scrollSections`: `[100, 150, 300, 300, 200, 300, 500, 200, 80, 80, 170, 190, 280, 50, 50, 100, 140, 560, 200, 280]`).
   - Fixed chrome around the 3D stage: top `Header` (dual-swap SVG logo on hover, 3 minimalist pill-morph links `Agency`, `Labs`, `Contact`, mobile circular gradient-border `Menu` button), bottom-right floating `ReleaseSpirit` pill (`"Reimagine Phoenix"` + pixel bird icon), bottom-center `"Scroll to explore"` hairline prompt, hero editorial title (`"The power of digital"` in `TTNeoris` paired with italic serif `TheSeasons` `"of"` and giant `19.5vw` gradient `"storytelling"`), scroll-gated floating `AnimatedTexts` (`SmallTextNew`, `BigTextNew`, `LinesText`), 7 `CaseHover` crystal overlays, and fixed `Footer` revealed at scroll bottom.

2. **Standout Effects**
   - **Radial feathered preloader mask:** Lavender gradient curtain (`linear-gradient(45deg, #cebdf8, #e2dbf8)`) clears via CSS `mask-image` radial cutout (`--reveal-radius: 0vmax -> 200vmax`, `--reveal-feather: 14vmax`, `2s` `power3.inOut`) synced with icon fade (`autoAlpha: 0, scale: 0.92`).
   - **Refractive glass/iridescent phoenix & 7 floating crystals:** Custom GLSL `ShaderMaterial` sampling `LDR_RG01_0.png` blue noise + `colorsMap` 1D LUT (`getIridescence` based on `1.0 - abs(dot(n, rd))`) + chromatic dispersion (`hyperSamplesCount: 16`, `frontSamplesCount: 12`, `backSamplesCount: 5`).
   - **Liquid-glass adaptive cursor (`TestCursor`):** Smooth-following floating pill (`followSpeed: 0.18`) morphing width/labels (`"Click to start"` -> case titles on crystal raycast hover) with Web Audio hover chimes (`hover1..5.mp3`).
   - **"Reimagine Phoenix" shockwave pill:** Clicking expands a blurred colored ring (`scale: 0.2 -> 26`, `3s`, `power3.out`), staggers letter color/blur outward from center index (`Math.abs(idx - center) * 0.04s`), and toggles the 3D bird's fire shader mode (`ws`) + audio (`ReleaseSpirit.mp3`).

3. **How Animations Work**
   - Pinia store acts as the single reactive bridge between DOM scroll/routing and the WebGL engine (`_a` / `Sweet3`): Vue `watch`ers push `scrollProgress`, `scrollSpeed`, `contactTransition`, `iceTransition`, `videoTransition`, and `cursorTransition` directly into Three.js uniforms and `BlenderTimeline` (`dr`).
   - Text elements use GSAP `SplitText` (`K`) split into `.char` or `.line`, toggled via `ScrollTrigger` `onToggle` (`display: unset/none`) to keep offscreen DOM uncomposited, and animated with `scale: 1.3 -> 1`, `opacity: 0 -> 1`, `filter: blur(8px) -> blur(0px)` (blur omitted on non-desktop via `isDesktop` check for mobile GPU safety).

4. **Scroll Effects**
   - `GSAP ScrollSmoother` (`Qc.create({ smooth: 1.5, effects: false, normalizeScroll: true, ignoreMobileResize: true, smoothTouch: true })`) converts vertical scroll into normalized progress across the 20 virtual sections.
   - `Hero` chars stagger out backward (`stagger: -0.05`, `scale: 1 -> 1.3`, `blur(8px)`) over `top -> top+=1000` (desktop) or `top+=500` (mobile).
   - `BigTextNew` (`"is narrative"`, `"Light"`, `"Spirit"`, `"Sound"`) and `LinesText` (with `.text-line` gradient rules scaling from `0` -> `1`) scrub tightly (`scrub: true`, `ease: "none"`) with scroll position.
   - At section index 9 (`Oe(9) + 80..120`), theme flips from `"light"` sky to `"dark"` night (`#060b1d` / `#051125`) as the phoenix enters the fire/ice crystal realm.

5. **Hover & Mouse Interactions**
   - `Ot` raycaster tracks normalized pointer coordinates; intersecting any crystal's `ConvexHull` mesh triggers spring-animated rotation (`rotationSpring`) and color/shader uniform springs (`20` stiffness / `10` damping), sets `cursorText` to the case title/category, and plays `hover1..5.mp3`.
   - Water plane (`dl`) receives pointer UV raycasts (`onRaycaster`) and injects velocity/density splats into a GPGPU ping-pong `FluidSimulation` (`ca`) + `SimpleFluidSim` (`Ws`), creating live surface ripples and blue specular refraction (`fresnelSchlick` `r0 = 0.04`) under the cursor.
   - Hero mouse move triggers soft wing audio (`playWingsSound` throttled to `200ms`).
   - Nav links (`simple-button`) morph border-radius per button (`medium-rounded` -> `20px`, `full-rounded` -> `0`, `none-rounded` -> `20px`) over `300ms` while sweeping a gradient underline (`0 -> 100%` width).

6. **Section Transitions**
   - Rather than hard DOM section dividers, **Blender-exported camera & parameter timelines** (`timelines/cam.glb`, `timelines/cam-mob.glb`) smoothly scrub scene lighting (`Env_darkness`), background colors (`Env_background`), sun scale/opacity (`Sun_opacity`), water ripples (`Water_opacity`), feather emitters (`Feather_opacity`), and fire state (`isBurning`) across continuous scroll progress.

7. **Page Transitions**
   - Nuxt router `onBeforeRouteLeave` guards prevent route unmount jank by locking `isTransitionActive` and tweening WebGL shader uniforms via GSAP:
     - `/` <-> `/contacts`: `contactsValue` tweens `0 <-> 1` over `1.0s`, morphing the WebGL backdrop into the `contact.jpg` plane while fading the fixed `ContactsHero` (`opacity-0 -> opacity-100`, `500ms ease-in-out`).
     - `/` <-> `/cases/:slug`: `iceValue` tweens `0 <-> 1` over `1.5s` (`ease: "power1.inOut"`), transitioning the camera into frosted ice-crystal refraction mode (`casePageTopFrost`, `casePageBottomFrost`) without reloading the canvas.

8. **3D & Camera Usage**
   - `PerspectiveCamera(fov: 25, near: 0.1, far: 500)` driven by `BlenderTimeline` (`dr`) empty-object transforms (`cam.glb` desktop / `cam-mob.glb` mobile), paired with `DRACOLoader` (`/libs/draco/`) for compressed `v20.glb` (phoenix), `feather.glb`, and `crystal0..6.glb`.
   - Planar mirror reflection (`wA` `Reflector` at `reflectorY: -2.35`) renders reflected geometry into a dedicated texture projected onto the water shader (`dl`).

9. **Lighting & Depth**
   - Equirectangular HDRI studio lighting (`/textures/wooden_studio_19_1k.hdr` via `RGBELoader`), atmospheric instanced background bokeh spheres (`Ste`: 32 Fibonacci-sphere `PlaneGeometry(50, 50)` billboards with radial glow palette shifting by `Env_darkness`), additive billboard `Sun` shader (`hl`) rotating at `1/(6*PI)` rad/s and pulsing `±5%`, GPGPU `Fire` spawner (`ws`) with separable blur (`Dne`), and custom post-processing `nn` pipeline (`WebGLRenderTarget` + MSAA + optional SMAA + linear-to-sRGB + blue-noise dithering).

10. **Libraries & Techniques Used**
    - **Stack:** Nuxt 3 + Vue 3 + Pinia + Tailwind CSS v4.
    - **Motion/3D:** GSAP `3.13.0` (`ScrollTrigger`, `ScrollSmoother`, `SplitText`), Three.js (`GLTFLoader`, `DRACOLoader`, `RGBELoader`, custom `ShaderMaterial`, `InstancedMesh`), Tweakpane (`4.0.5` dev mode).
    - **Adaptive Performance (`Pt`):** Measures initial max FPS (`Ip.test()`) and steps through **7 optimization levels** (`hyperSampling`, `blurFire`, `backDispersion`, `highFrontSamples`, `screenPadding`, `msaa`, `normalDPR`, `frontDispersion`, `reflector`), automatically downgrading mobile/tablet (`cam-mob.glb`, water `opacityMultiplier: 0.25`, no DOM `filter: blur(8px)`).

---

### Reference 2 — `www.shopify.com/editions/winter2026` (Shopify Editions Winter '26 — RenAIssance)

**Local source:** `C:\Users\ADMIN\Downloads\www.shopify.com` | **Live URL:** `https://www.shopify.com/editions/winter2026`

1. **UI Structure**
   - Fixed global top navigation (`global-nav`, staggered slide-down entrance `animate-nav-item-in` with `animation-delay: 620ms`), persistent left chapter index rail (`side-and-lines` / `side-nav`), and 12 numbered editorial product chapters (`sidekick`, `agentic`, `online`, `retail`, `marketing`, `checkout`, `operations`, `shop-app`, `b2b`, `finance`, `shipping`, `developer`) overlaying a fullscreen fixed WebGL canvas (`Background-C8-YYu8Q.js`).
   - Each chapter pairs classical Renaissance editorial typography (`headline-1` with drop-caps) alongside rich interactive feature cards, Bento media grids, and slide-over/modal video detail views.

2. **Standout Effects**
   - **Dual-RenderTarget Painterly GLSL Transition Pass (`Background-C8-YYu8Q.js`):** Renders outgoing scene (`tCurrent`) and incoming scene (`tNext`) into offscreen `RenderTarget`s, then composites them using hardware derivatives (`fwidth(luma)`) for glowing sketch-line edge detection, normal-map displacement (`mud_normal.webp`), animated noise (`tNoise`), radial/directional threshold wipes centered on 3D `uFadeCenterPoint`, and high-intensity edge bloom (`glowStrength: 40 -> 8` in Hero, `2..10` in sections).
   - **Inverted Sobel Sketch Outline (`InvertedSobel` pass):** Computes 4-tap alpha Sobel (`sobelAlpha`) for hover halo illumination around key interactive 3D props (`uHatHover`) and luminance Sobel (`sobelScene`) for modal opening transitions (`uModalAnimation`).
   - **Instanced 3D Butterflies (`Butterflies-BEdvR0Z_.js`):** `InstancedMesh` with procedural GLSL wing-flap shader + CPU flocking steering within `boundaryRadius`, modulated by Theatre.js timeline controls (`count`, `flapSpeed`, `hue`, `scale`).
   - **Interactive Rive WebGL2 State Machines (`@rive-app/webgl2@2.37.2`):** Vector UI modules driven by WASM (`rive.wasm`) that respond to hover/click/toggle states and pause automatically via `IntersectionObserver`.

3. **How Animations Work**
   - **Theatre.js (`@theatre/core`)** drives 3D scenes (`HeroScene`, `AgenticScene`, `OnlineScene`, `RetailScene`, `SidekickScene`): each chapter loads a Theatre state JSON (`stateUrl`) into a scene `sheet`. `sectionMap.get(sectionIndex).progress` updates `sheet.sequence.position` on scroll (with optional smooth rAF lerping `o += (n - o) * 0.5`).
   - Hero intro (`I === 0`) plays a **5000ms cubic ease-out** (`1 - (1 - G)^3`, delayed `100ms`) offset sequence unless user loaded mid-page (`window.scrollY > 100` or URL `#hash`).
   - DOM card entrances use the **Web Animations API** (`element.animate(..., { easing: "cubic-bezier(0.34, 1.56, 0.64, 1)", fill: "forwards" })`) triggered once by `IntersectionObserver({ threshold: 0.1 })`, calling `commitStyles(); cancel()` after completion so styles remain clean.

4. **Scroll Effects**
   - **Lenis smooth scrolling** with exponential ease-out (`Math.min(1, 1.001 - Math.pow(2, -10 * t))`, `duration: 1s`), driving section progress (`sectionMap`) and `scrollToSection` jumps from the sidebar TOC.
   - Offscreen media gating: `IntersectionObserver` (`rootMargin: "5%"` for video/Rive playback, `"100% 100% 100% 100%"` with `300ms`/`600ms` debounce for scene preloading) prevents offscreen scenes and `<video>` elements from decoding unnecessarily.

5. **Hover & Mouse Interactions**
   - `.cloud-card-interactive` & `.cloud-card-parallax`: Single `requestAnimationFrame`-throttled `pointermove` listener tracks cursor vector relative to each card's cached `DOMRect` (`centerX`, `centerY`, `maxDistance`), applying distance-weighted parallax/scale without layout thrashing.
   - 3D canvas `pointermove` normalizes `uMouse` (`[-1, 1]`) to subtly shift the Hero transition mask center (`mix(sceneCenter, uMouse, 0.1)`).
   - 3D Sobel hover mask (`uHatHover`) highlights focal 3D meshes (`tHatMask`) with a luminous outline when hovered.

6. **Section Transitions**
   - `tCurrent` -> `tNext` shader cross-dissolve driven by scroll boundary progress + Theatre `effects` tracks (`fadeCenter`, `darken.intensity`, `overlay.position: -1..1`, `overlay.color`, `bloom.intensity`).
   - Secondary `Overlay` full-screen wipe (`hI` shader) sweeps a curved diagonal curtain across the viewport (`uPosition: -1 -> 0 -> 1`) with `mud_normal.webp` organic edge noise and glowing `pow(uColor, 2.2)` rim flare.

7. **Page Transitions**
   - Remix / React Router multi-locale shell checks `document.startViewTransition` (`go()` hook) for browser-native View Transitions where supported (`shouldUseViewTransition`).
   - Feature detail / video modals trigger an interactive WebGL `InvertedSobel` paper/etching reveal (`uIsModalAnimating`, `uModalAnimation`) anchored to the launcher element's screen coordinates (`uInvertedSobelFadeCenter`). *(Note: remote `.riv` & `.glb` runtime states could not be exercised offline.)*

8. **3D & Camera Usage**
   - **React Three Fiber + Three.js** wrapped inside Theatre.js `<SheetProvider>` (`Dg`), with named `PerspectiveCamera` (`theatreKey: "camera"`, default `[0, 0, 4]`), offscreen `WebGLRenderTarget`s per active/next chapter, and **progressive streaming KTX2 texture arrays** (`cg`: reads stream chunks via `ReadableStream`, extracts header at 80 bytes, parses Layer 1 immediately for instant first-frame preview before remaining frames finish).

9. **Lighting & Depth**
   - Dual colored Theatre-keyframed accent lights per scene (`light-1` `#ff0000` at `[-0.5, 0, 0.5]`, `light-2` `#0000ff` at `[0.5, 0, 0.5]`), `Effects-ByAKepvN.js` dynamic `bloomIntensity` (`8` default, `0..100` range), `darkenIntensity`, and layered Z-depth (`particles` + `butterflies` + `backgroundAssets` + foreground CSS drop shadows).

10. **Libraries & Techniques Used**
    - **Stack:** React + Remix / React Router + Tailwind CSS + Zustand (`constants-BNXsGZAh.js`).
    - **Motion/3D:** `three`, `@react-three/fiber`, `@theatre/core`, `lenis`, `@rive-app/webgl2@2.37.2`, native Web Animations API (`cubic-bezier(0.34, 1.56, 0.64, 1)` `ease-out-back` & `cubic-bezier(0.33, 1, 0.68, 1)` `ease-out-cubic`).
    - **Adaptive Performance:** `detect-gpu` (`getGPUTier`): automatically enables `useFallbackImages = true` on mobile or `gpuTier === 0` or unbenchmarked GPUs, replacing heavy WebGL scenes with crisp responsive poster imagery (`srcSet` intervals + `u16poster_desktop.webp` / `compressed-u*poster_12_9.webp`), plus `prefers-reduced-motion` checks (`motion-safe:` + `preferReducedMotion` store flag).

---

### Reference 3 — `ximitech.vn` (XimiTech Digital Solutions — Vietnam)

**Local source:** `C:\Users\ADMIN\Downloads\ximitech.vn` | **Live URL:** `https://ximitech.vn/`

1. **UI Structure**
   - Clean, high-contrast Vietnamese/English editorial & productized-agency layout (`html.light` / `html.dark` theme persisted in `localStorage` before paint to avoid FOUC).
   - Fixed auto-hiding top header (`Vg`: shows top scroll-progress spring hairline `{ stiffness: 100, damping: 30 }`, hides on downward scroll past `160px`, reveals on upward scroll or outside `[data-immersive]`), 16 structured homepage sections (`gd` hero with split display typography + 3D emblem, `Xg` scroll-expanding film frame, `Bg` dual-row velocity marquee, `CurtainChapter` 3-stage scrollytelling, `WorkGallery` interactive WebGL carousel, `Ad`/`Mr` asset-vs-cost comparison chapter, testimonials, FAQ, pricing, CTA, Footer), plus dedicated subpages (`/du-an`, `/du-an/:slug`, `/thiet-ke-website`, `/ho-so-nang-luc`, `/gioi-thieu`, `/bang-gia-thiet-ke-website`, `/blog`, `/privacy-policy`, `/terms`).

2. **Standout Effects**
   - **Byte-Weighted Preloader (`#boot-loader`):** Inline pre-React progress screen with embedded base64 logo breathing (`pl-breathe 1.8s`), `PerformanceObserver` counting real compressed JS/CSS chunk bytes (`window.__XL.s` / `window.__XL.p`) from `0% -> 60%`, then hero assets/fonts/3D readiness (`window.__xlSet`) from `60% -> 99%`, smoothing display via exponential lerp (`shown += (target - shown) * 0.2`, `0.35` on finish) before fading out in `350ms` (with `.pl-indeterminate` fallback if no manifest).
   - **Explode-Assemble 3D Brand Emblem (`ximitech-logo-3d.glb`):** On viewport entry (`threshold: 0.2`), individual `Letter_*` meshes fly from staggered offsets (`roi`, `xoayRoi`, delay `idx % 8 * 0.04`) into assembly via quartic ease-out (`1 - (1 - t)^4`), then tilt smoothly toward pointer (`lerp 0.05`) and oscillate subtly.
   - **Domed Curved Curtain Chapter (`CurtainChapter.tsx` + `.story-curtain`):** Sticky `320svh` scroll chapter where a light ruled ledger (`story-ledger`) transitions beneath a huge arched dark-cyan curtain (`border-top-left-radius: 50% 22vh; border-top-right-radius: 50% 22vh`, cyan rim highlight `inset 0 2px #a5f3fca6`, `.story-grid` mask) sliding upward (`[h*1.02, -h*0.3]`), revealing staggered rows, animated counters, and a rotated lime highlighter marker (`#d4ff3f`) wiping in via `clip-path: inset(-30% ${114-t*128}% -30% -14%)`.
   - **Curved-Plane WebGL Work Gallery (`WorkGallery`):** Three.js `PlaneGeometry(1, 1, 40, 24)` cards arranged in a horizontal drag/scroll/keyboard carousel (`ze = 30°` FOV). Vertex shader bends planes along Z proportionally to scroll velocity (`sin(uv.x * PI) * abs(uVelocity) * 85`) and skews horizontally (`(uv.y - 0.5) * uVelocity * 32`). Fragment shader applies RGB chromatic aberration (`±uVelocity * 0.006`), dims/desaturates unselected cards (`uGray`, `uDim`), and draws a cursor-following glossy sheen + cyan SDF rounded-edge glow (`smoothstep(0.0, 2.2, abs(d + 1.6))`).

3. **How Animations Work**
   - **Framer Motion** (`useScroll`, `useSpring({ stiffness: 320, damping: 44, mass: 0.5 })`, `useTransform`, `AnimatePresence`) powers `CurtainChapter`, `Ad` storytelling, and `WorkGallery` active-title transitions (`y: 24 -> 0 -> -16`, `320ms`, `[0.22, 1, 0.36, 1]`).
   - **CSS + IntersectionObserver (`[data-motion]`)** drives lightweight reveals: `[data-motion=split]` wraps words in `.split-mask` (`padding: .22em .04em .12em; margin: -.22em -.04em -.12em` — explicitly engineered so **Vietnamese diacritics never clip**!) and translates `.split-word` from `translate3d(0, 115%, 0) rotate(5deg)` over `1s cubic-bezier(0.22, 1, 0.36, 1)` with `45ms` CSS variable stagger (`--i`).
   - **Web Audio Synthesis:** Procedural spatial audio (`HRTF` panner + bandpass noise wind + triangle pad + pentatonic chime notes) fires gently on scroll milestones and card transitions when sound is toggled on.

4. **Scroll Effects**
   - **Lenis** (`duration: 1.05`, `easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t))`, `wheelMultiplier: 0.9`, `touchMultiplier: 1.6`) instantiated **only when `!prefersReducedMotion && !pointerCoarse`**, leaving mobile touch scrolling 100% native.
   - `Xg` showreel section scales video width cleanly from `42%` (`56%` mobile) to `100%` over the first `45%` of sticky scroll using cubic ease-out (`1 - (1 - ct)^3`) while vertically centering the frame.
   - `Bg` dual marquee accelerates smoothly with Lenis scroll velocity (`Ec = 55` base, clamped `±260` boost, lerped `N * 5`) and pauses completely via `IntersectionObserver` when scrolled offscreen.
   - `.read-word` scrubs text word opacity (`0.16 -> 1`) via CSS calc driven by `--p` scroll progress.
   - `WorkGallery` vertical scroll maps cleanly to horizontal WebGL carousel progress with snap-settling (`170ms` debounce -> `750ms` smooth settle).

5. **Hover & Mouse Interactions**
   - `WorkGallery`: Raycaster detects hovered 3D plane, hides native cursor (`cursor: none`), moves a circular cyan `"Xem dự án"` badge via GPU `translate3d`, scales hovered card `+4.5%`, tilts it toward pointer UV (`±0.24 rad Y`, `∓0.2 rad X`), illuminates a pointer specular sheen (`pow(max(0, 1 - dist*1.6), 3)`), and illuminates its cyan SDF border.
   - 3D Hero Logo tracks normalized section pointer coordinates (`Q`, `J`) with smooth damping (`0.05`) to rotate the whole mesh group (`±0.6 rad Y`, `±0.35 rad X`).
   - Standard UI cards/buttons use `hover:-translate-y-0.5` and `group-hover:scale-[1.025]` (`500ms-700ms`).

6. **Section Transitions**
   - High-contrast alternating light/dark bands separated by `border-t border-slate-200 dark:border-white/[0.06]`, punctuated by `CurtainChapter`'s arched radial-glow dome sweeping smoothly over sticky light content, and `.story-receipt` serrated ticket edges (`conic-gradient` mask) for the contrast chapter.

7. **Page Transitions**
   - **Shared-Element WebGL-to-DOM Expansion (`WorkGallery` -> `ProjectDetail`):**
     1. Clicking a card triggers `WorkGallery.open(index)` (`1250ms` quartic ease-in-out `8*t^4`): a radial vertex wave (`sin(d*15 - uProgress*13) * sin(uProgress*PI) * 110`) ripples outward as the card flattens radius (`18px -> 0px`) and expands to full viewport (`vw+2 x vh+2`), pre-decoding the high-res image simultaneously.
     2. Navigates to `/du-an/:slug` with `state: { fromWork: true }`.
     3. `ProjectDetail` mounts a `fixed` full-screen cover overlay and runs Web Animations API (`element.animate`) from `(0, 0, innerWidth, innerHeight, radius: 0)` down into the exact hero image `DOMRect` (`radius: 18px`) over **`1050ms` (`delay: 80ms`, `cubic-bezier(0.76, 0, 0.24, 1)`)**, then hands off seamlessly to the static image!
   - Navigating back restores scroll index via `collapse(index)` (`1050ms`).

8. **3D & Camera Usage**
   - Hero Emblem: `PerspectiveCamera(36, aspect, 0.1, 100)` with dynamic box-fitting distance (`size / (2 * tan(fov/2)) * 1.45`), pausing `requestAnimationFrame` when offscreen (`IntersectionObserver`), disposing geometries/materials/textures/renderer on unmount.
   - `WorkGallery`: `PerspectiveCamera(30, aspect, 10, 10000)` positioned mathematically so world units equal screen CSS pixels (`z = vh / (2 * tan(15°))`), allowing exact 1:1 WebGL-to-DOM shared-element morphing.

9. **Lighting & Depth**
   - Hero Emblem uses `PMREMGenerator.fromScene(new RoomEnvironment(), 0.04)` for crisp metallic/matte IBL reflections, paired with key `DirectionalLight(#ffffff, 1.8)` gently orbiting (`sin(t*0.45)*5`), cool/magenta rim `DirectionalLight(#d500ff, 0.5)` at `[-2, -3, 2]`, and `AmbientLight(#ffffff, 0.5)`.
   - CSS layers achieve depth via `story-grain` inline SVG `feTurbulence` noise, multi-stop radial cyan/blue halos (`blur-[120px]`), inner top edge specular borders (`inset 0 1px #ffffff3d`), and subtle blueprint dot/line grids (`bg-[size:56px_56px]` / `.story-grid` `64px`).

10. **Libraries & Techniques Used**
    - **Stack:** React + React Router + Vite + Tailwind CSS + Radix UI + Lucide Icons.
    - **Motion/3D:** `three`, `lenis`, `framer-motion`, native Web Animations API (`element.animate`), CSS custom-property scroll/stagger transforms.
    - **Adaptive `.low-power` Engine (`Al`):** Evaluates `navigator.deviceMemory <= 4`, `navigator.hardwareConcurrency <= 4`, or `(pointer: coarse) && (max-width: 767px)`. When `.low-power` is active: disables `backdrop-blur`, caps Three.js DPR at `1.25` (vs `2`), serves `640px` images instead of `1280px`, reduces menu drawer animation (`320ms` vs `700ms`), and swaps heavy sticky `CurtainChapter`/`Ad` sequences for clean static `fallback` sections!

---

## Part II — Effect Mapping Table (References 1, 2, 3 -> FluffNii Studio)

| Reference | Actual Effect | Implementation Technique for FluffNii (`React 19 + Next 15 + Three.js + GSAP + Lenis + Framer Motion`) | Target Page & Section on FluffNii Studio |
|---|---|---|---|
| **Reference 1 (Noomo)** | Radial feathered preloader mask reveal (`--reveal-radius: 0vmax -> 200vmax`) | Upgrade `Obturateur` into `AtelierPreloader.tsx` using GSAP/CSS `mask-image` radial wipe + studio viewfinder ticks + real asset readiness signal, preserving `fluffnii-intro-seen` & `gioia:clic`, skipping cleanly on repeat/hash/`reduced-motion`. | `/` — Global Initial Load Curtain (`AtelierPreloader`) |
| **Reference 1 (Noomo)** | Custom GLSL Fresnel iridescence & floating orbital light particles (`getIridescence`) | Build `AtelierHeroCanvas.tsx` (vanilla `three` in `"use client"`): sculptural faceted studio totem/crest with custom GLSL Fresnel iridescent pearl/velvet shader reflecting `cream`, `butter`, `coral`, `espresso` (reactive to `data-theme`), sewing-thread orbital rings, mouse tilt, and scroll-linked camera rig; pause on offscreen via `IntersectionObserver`, handle `webglcontextlost`, dispose on unmount, CSS radial-glow fallback on `low`/`reduced-motion`. | `/` — Hero Section Stage Backdrop (behind Hero headline & Polaroid stack) |
| **Reference 1 (Noomo)** | Contextual floating glass cursor pill (`Click to start` / case title) | Build `CustomCursor.tsx` active only on desktop `pointer: fine` `high`/`mid` tiers: `gsap.quickTo` / damped lerp pill showing contextual studio labels (`Inspect`, `Drag`, `Open`, `Focus`) when hovering cards, 3D crystals/canvas, or gallery tiles. | Global across `/`, `/accessories`, `/terms`, `/mentions-legales` |
| **Reference 1 (Noomo)** | Staggered split-char/word blur-and-scale scroll reveal (`SmallTextNew`, `BigTextNew`) | Build `ScrollWordReveal.tsx` using GSAP/Framer masked `.split-word` reveals (`py-[0.12em]` vertical bleed so Vietnamese diacritics never clip; disable `filter: blur()` on mobile/low tier, instant render on `reduced-motion`). | `/` — Section Headings (`#pour-qui`, `#pourquoi`, `#methode`, `#projets`, `#galerie`, `#offres`, `#deroule`, `#faq`, `#contact`) & `/accessories` Hero |
| **Reference 1 (Noomo)** | Interactive pulse shockwave toggle (`Reimagine Phoenix` ring + char ripple) | Apply subtle center-outward ripple / ring feedback on `CircularRevealToggle` theme switch and `MiseAuPoint` AF lock flash (`Sharp. Every stitch.`). | Navbar Theme Toggle & `/` `#bonus` (`MiseAuPoint`) |
| **Reference 2 (Shopify Winter '26)** | `detect-gpu` / capability-tiered WebGL + automatic poster/CSS fallback | Build `src/lib/deviceTier.ts` (`"high" | "mid" | "low" | "reduced-motion"`) evaluating `prefers-reduced-motion`, WebGL context, `hardwareConcurrency`, `deviceMemory`, coarse pointer, viewport width, plus runtime FPS drop step-down monitor (`dpr`, `particleCount`, `enableWebGL`, `enableCustomCursor`, `enableSmoothScroll`). | Global Adaptive Engine (`deviceTier.ts`) powering all pages |
| **Reference 2 (Shopify Winter '26)** | Pointer-driven multi-card parallax & hover glow (`cloud-card-interactive`) | Combine `useMotionValue` + `useMotionTemplate` radial butter spotlight (`AccessoryCard`) with lightweight rAF/spring pointer tilt (`±4°`) on desktop fine-pointer cards; `MagneticButton.tsx` pull effect on primary CTAs. | `/` (`#studio` 3 pillars, `#pour-qui` 5 species fan cards, `#constitue-ton-offre` 6 packages) & `/accessories` (4 product cards) |
| **Reference 2 (Shopify Winter '26)** | Sobel / luminous edge accent & colored dual-light 3D product stage | Build `FanRotorCanvas3D.tsx` (vanilla `three`) inside `/accessories` preview/cards for `internal-fan`, `std-fan`, and `plus-fan`: interactive rotating blade hub, USB-C LED ring glow, dual-tone rim lighting, and tier-scaled airflow particles; falls back cleanly to crisp `BlueprintVisual` SVG on `low`/`reduced-motion`. | `/accessories` — Fan Cards & Preview Modal (`internal-fan`, `fursuit-fan-std`, `fursuit-fan-plus`) |
| **Reference 2 (Shopify Winter '26)** | Scroll-scrubbed & `IntersectionObserver`-gated offscreen media pausing | Ensure `PolaroidsDefile`, `MotDefilant`, `SmoothTicker`, `AtelierHeroCanvas`, `FanRotorCanvas3D`, and `MiseAuPoint` pause all rAF/tickers when offscreen (`IntersectionObserver`) or tab hidden (`visibilitychange`). | `/` (Hero, `#pourquoi`, `#galerie`, `#bonus`) & `/accessories` |
| **Reference 3 (Ximitech)** | Byte/readiness smooth loader + top scroll-progress hairline + route curtain (`PageTransitionShell`) | Add `PageTransitionShell.tsx` in layout: top spring-damped `1.5px-2px` progress bar (`butter`/`espresso`) + crisp curtain fade/slide across `/`, `/accessories`, `/terms`, `/mentions-legales`. | Global Navigation & Route Transitions (`/`, `/accessories`, `/terms`, `/mentions-legales`) |
| **Reference 3 (Ximitech)** | Smooth scroll (`Lenis` desktop-only) synced to scroll triggers | Build `src/lib/smoothScroll.tsx` (`SmoothScrollProvider`) syncing `Lenis` (`duration: ~1.05`, exponential ease-out) with `gsap.ticker` + `ScrollTrigger.update`, auto-disabling on coarse touch devices & `prefers-reduced-motion` so mobile scroll stays native. | Global App Shell (`layout.tsx`) & `sectionScroll.ts` |
| **Reference 3 (Ximitech)** | Curved arched curtain transition (`CurtainChapter` + `.story-curtain` + `.story-grid`) | Build `CurtainChapter.tsx` with rounded arched upper edge (`rounded-t-[50%_12vh]`), subtle dot/grid mask, and GSAP ScrollTrigger Y-parallax transition bridging light sections into dark workshop chapters, with static stacked fallback on `low`/`reduced-motion`. | `/` — Transition into `#pourquoi` / `#offres` dark chapter & `#deroule` |
| **Reference 3 (Ximitech)** | Scroll-velocity-reactive dual-row marquee (`Bg`) | Enhance `#galerie` `SmoothTicker` rows & word divider so scroll velocity gently boosts marquee speed (`clamped`) with smooth lerp back to base speed and instant hover deceleration (`0.2x`). | `/` — `#galerie` (Gallery Row 1, Word Divider, Gallery Row 2) |
| **Reference 3 (Ximitech)** | Scroll-scrubbed word opacity/highlight reveal (`.read-word` & lime/butter marker clip) | Pair `PhraseScroll` highlight pills with smooth `ScrollTrigger` word-by-word opacity progression (`0.22 -> 1`) and `clip-path` marker underline on key craft phrases (`all day`, `clear sightlines`, `solid seams`). | `/` — `#studio` (`PhraseScroll`) & `/terms` policy highlights callout |
| **Reference 3 (Ximitech)** | Curved Z-bend drag/scroll showcase & smooth modal expand (`WorkGallery` -> `ProjectDetail`) | Upgrade `#projets` horizontal showcase with subtle scroll/drag velocity tilt (`rotateY`/`translateZ` perspective depth), keyboard & arrow sync, plus smooth spring modal expansion into `ShowcaseLightbox` (`data-lenis-prevent` inside scrollable modal). | `/` — `#projets` Selected Projects Carousel -> `ShowcaseLightbox` |
| **Reference 3 (Ximitech)** | Vietnamese diacritic-safe word mask padding (`padding: .22em .04em .12em`) | Enforce vertical bleed padding and `line-height >= 1.14` on `html[data-lang="vi"] .font-stagheiz` and `ScrollWordReveal` so uppercase Vietnamese stacked accents (`Ắ`, `Ặ`, `Ề`, `Ộ`, `Ử`) never clip during masked upward reveals. | Global Typography (`globals.css`, `ScrollWordReveal.tsx`) across all pages |

---

## Part III — Complete Asset Audit (`public/fonts/` & `public/images/`)

### 1. Self-Hosted Fonts Audit (`public/fonts/` — 15 Files)

All fonts are self-hosted in `public/fonts/` and declared via `@font-face` in `src/app/globals.css` (zero external Google Fonts requests, mandatory for Cloudflare OpenNext builds).

| File Path | Family & Weight | Subsets Covered | Size (KB) | `src/` Usage & Layout / Typography Notes |
|---|---|---|---|---|
| `/fonts/Stagheiz.woff` | `Stagheiz` (100–900, normal) | Latin display | 21.6 | Primary English display headline font (`--font-display`). Tight leading (`0.92`–`1.0`); uppercase display-only. |
| `/fonts/be-vietnam-pro-900-vietnamese.woff2` | `Be Vietnam Pro` (900) | Vietnamese | 11.8 | Active `--font-display` when `html[data-lang="vi"]`. Requires `line-height: 1.14`+ and `.22em` top / `.12em` bottom mask bleed so stacked diacritics never clip. |
| `/fonts/be-vietnam-pro-900-latin-ext.woff2` | `Be Vietnam Pro` (900) | Latin-Ext | 13.3 | Supports extended Latin glyphs for Vietnamese display headings. |
| `/fonts/be-vietnam-pro-900-latin.woff2` | `Be Vietnam Pro` (900) | Latin | 21.2 | Base Latin glyph fallback for `Be Vietnam Pro` 900. |
| `/fonts/dm-sans-latin.woff2` | `DM Sans` (400–900) | Latin | 36.1 | Primary English UI & body font (`--font-dm-sans`). Clean geometry for `15px–26px` body copy. |
| `/fonts/dm-sans-latin-ext.woff2` | `DM Sans` (400–900) | Latin-Ext | 17.8 | Extended Latin accents (e.g., `Umbréon Retsquôt`). |
| `/fonts/jakarta-vietnamese.woff2` | `Plus Jakarta Sans` (400–800) | Vietnamese | 8.2 | Active `--font-dm-sans` body/UI font when `html[data-lang="vi"]`. |
| `/fonts/jakarta-latin-ext.woff2` | `Plus Jakarta Sans` (400–800) | Latin-Ext | 21.2 | Extended Latin glyphs for Vietnamese UI mode. |
| `/fonts/jakarta-latin.woff2` | `Plus Jakarta Sans` (400–800) | Latin | 26.7 | Base Latin glyphs for `Plus Jakarta Sans`. |
| `/fonts/space-mono-400-vietnamese.woff2` | `Space Mono` (400) | Vietnamese | 4.0 | Monospace eyebrow/metadata font (`--font-space-mono`), Vietnamese subset. |
| `/fonts/space-mono-400-latin-ext.woff2` | `Space Mono` (400) | Latin-Ext | 9.5 | Monospace 400 extended Latin. |
| `/fonts/space-mono-400-latin.woff2` | `Space Mono` (400) | Latin | 9.2 | Monospace 400 base Latin (`10px–13px` uppercase eyebrow & counter tags). |
| `/fonts/space-mono-700-vietnamese.woff2` | `Space Mono` (700) | Vietnamese | 4.1 | Bold monospace specs/prices/badges, Vietnamese subset. |
| `/fonts/space-mono-700-latin-ext.woff2` | `Space Mono` (700) | Latin-Ext | 9.5 | Bold monospace extended Latin. |
| `/fonts/space-mono-700-latin.woff2` | `Space Mono` (700) | Latin | 9.3 | Bold monospace base Latin (VND prices, counters, spec values). |

---

### 2. Pixel-Level Image Audit (`public/images/` — All 62 Files)

**Methodology:** Real pixel dimensions (`W x H`), aspect ratios, and orientations were read directly from WebP (`VP8`/`VP8L`/`VP8X`), PNG, and JPEG file headers via Python. Real dominant RGB (`avg`), outer edge/background RGB (`edge`), center subject RGB (`center`), and perceptual luminance (`luma`, `0.00–1.00`) were measured via `ffmpeg` (`16x16 rgb24` downsampling + RGBA alpha inspection for logos). Zero files are exact MD5 or perceptual duplicates.

#### Key Audit Findings & Actionable Layout Bugs Found in Current `src/`

1. **Unused Asset (`polaroid-02.webp`):** `polaroid-02.webp` (`684x684`, golden/orange Kemono canine head with grey folded ear & cross earrings against dark charcoal curtain) is **not referenced anywhere in `src/`**. Candidate to restore into `HERO_POLAROIDS` or `galleryRow` / package cards so no real craft photography goes unused.
2. **Hardcoded Mismatched `width`/`height` Attributes:**
   - `page.tsx` (`fanCards` lines `1440–1441`, `1523–1524`): Sets `width={760} height={1013}` on all 5 cards even though `species-bear.webp`, `species-lion.webp`, and `species-dog.webp` are `760x1351` (`9:16` portrait).
   - `page.tsx` (`projects` lines `2074–2075`): Sets `width={960} height={1280}` on all 5 cards even though `project-01`, `project-02`, `project-04` are `960x1707` (`9:16`) and `project-05` is `960x1444` (`~2:3`).
   - `page.tsx` (`galerie` lines `2262–2263`, `2334–2335`, `2370–2371`): Sets `width={840} height={840}` on all 16 gallery images, whereas **10 are `840x1050` (`4:5` portrait)** and **6 are `840x672` (`5:4` landscape)** (plus `r1-06` is `840x836`, `r2-04` is `840x840`). Also in filtered grid view (`page.tsx:2363`), forcing every photo into `aspect-[4/5]` crops `~36%` of the width on `5:4` landscape shots (`r1-02`, `r1-04`, `r2-01`, `r2-02`, `r2-05`, `r2-07`)—switching filtered cards to dynamic aspect or `aspect-square`/`4:3` for landscape items avoids ear/paw clipping.
   - `page.tsx` (`packages` lines `2671–2672`): Sets `width={684} height={684}` inside a `190x210` (`~9:10`) polaroid cutout across all 6 packages even when sourcing `offer-01.webp` (`684x548`), `gallery-r2-05.webp` (`840x672`), `gallery-r2-07.webp` (`840x672`), `gallery-r2-08.webp` (`840x1050`), and `project-04.webp` (`960x1707`).
3. **Focal Framing & Aspect-Ratio Warnings:**
   - `formula-fursuit.webp` (`750x1000`, `3:4`): Currently inside `aspect-[9/10]` (`0.90`); switching to `aspect-[3/4]` or `aspect-[4/5]` with `object-[50%_18%]` eliminates bottom mannequin-neck crop while keeping ear tips comfortably framed.
   - `offer-01.webp` (`684x548`, `5:4`): Very tight close-up (Sy Tray's ears nearly touch the top border). Never crop taller than `4:5` or place with `object-bottom`; keep `aspect-[5/4]` and `object-[50%_40%]`.
   - `polaroid-03.webp` (`684x684`, `1:1`): Currently assigned to the `TAIL` package card with `imgPos: "50% 35%"` (which centers on the head, partially cropping the cyan tail on the right). Shift focal point to `object-[74%_58%]` or pair `TAIL` with `gallery-r2-03.webp` (which explicitly features the curled Shiba tail) and use `polaroid-03.webp` for `Half-body`/`Partial`!
   - `why-01.webp` (`1280x853`): Contains a small white `"Feral Speech / Pawse"` event watermark in the bottom-left corner; keep dark vignette/radial gradient + `object-[48%_30%]` on mobile portrait so Minny Minnie's white cat head stays centered and watermark remains obscured.
   - `bonus-lockers.webp` (`1024x576`, `16:9`) & `why-02.webp` (`1280x720`, `16:9`): Full-screen `100svh` sticky frames on mobile (`~9:19.5` portrait) crop ~75% horizontally; set responsive focal positioning (`object-[46%_40%]`) so both characters remain visible in portrait viewports.
   - `hero-14.webp` (`840x840`) / `gallery-r1-06.webp` (`840x836`): Shows Umbréon Retsquôt actually wearing the yellow/black portable 3D-printed cooling fan on a lanyard—ideal real-world reference photo to link or surface alongside `/accessories` (`Fursuit Fan: STD Edition`)!

#### A. Brand Identity, Meta & Standalone Feature Images (10 Files)

| Asset Path | Format & Size | W×H (px) | Ratio & Orient. | Measured Colors (`avg` / `edge` / `center` / `luma`) | Subject, Background & Depth | Current `src/` Usage | Layout & Framing Recommendation |
|---|---|---|---|---|---|---|---|
| `/images/logo-navbar.webp` | WEBP, 3.7 KB | 160×160 | 1.000 (`1:1` square) | RGBA (`81/256` opaque); visible `#000000` (luma `0.00`) | Crisp black monochrome FluffNii emblem on transparent background; zero depth. | `Navbar.tsx:170` (`h-[42px]..[54px] w-auto`, `dark:invert`) | Keep `w-[54px] h-[54px]` square or `w-auto h-[42px..54px]`; preserve `dark:brightness-0 dark:invert` for dark theme legibility. |
| `/images/logo-footer.webp` | WEBP, 50.7 KB | 900×900 | 1.000 (`1:1` square) | RGBA (`79/256` opaque); visible `#336c81` / avg `#182635` (luma `0.14`) | Teal/cream FluffNii Studio display badge on transparent alpha; flat graphic mark. | `Footer.tsx:85` (`w-[320..560px] h-auto`) | Render with `width={900} height={900}` (actual `1:1`) inside centered dark footer slot (`bg-ink`/`bg-night`). |
| `/images/favicon.png` | PNG, 7.6 KB | 180×180 | 1.000 (`1:1` square) | `#7ebeff` / `#68b3ff` / `#9accff` (luma `0.70`) | Sky-blue FluffNii square app icon; light flat graphic. | `layout.tsx:56` (`metadata.icons.icon`) | Browser/touch favicon only; keep `180×180`. |
| `/images/og-cover.jpg` | JPEG, 73.8 KB | 1200×630 | 1.905 (`1.91:1` landscape) | `#bf9b4d` / `#cba436` / `#ad9076` (luma `0.62`) | Close-up of Sy Tray Kemono head against bright sticker-covered yellow lockers; shallow background depth. | `layout.tsx:42,53`, `accessories/page.tsx`, `terms/page.tsx`, `mentions-legales/page.tsx` | Keep strictly for OpenGraph / Twitter `summary_large_image` social cards (`1200×630`). |
| `/images/formula-fursuit.webp` | WEBP, 43.8 KB | 750×1000 | 0.750 (`3:4` portrait) | `#ada09c` / `#bdaea8` / `#978e92` (luma `0.64`) | Full bust of Sy Tray head on studio mannequin stand in front of soft cream curtains; clean studio depth. | `page.tsx:1218` (`#studio` Formula split section) | **Editorial vertical split (`lg:col-span-5` or `6`).** Change container `aspect-[9/10]` -> `aspect-[3/4]` or `aspect-[4/5]` with `object-[50%_18%]` so bottom edge avoids awkward mid-mannequin cut. |
| `/images/offer-01.webp` | WEBP, 43.1 KB | 684×548 | 1.248 (`5:4` landscape) | `#ab9b9a` / `#c5b3b0` / `#887e82` (luma `0.63`) | Tight crop of Sy Tray head against cream curtains; ears graze upper frame edge; shallow depth. | `page.tsx:2498` (`#offres` Offer 01), `homeCopy.ts:570` (`HEAD` pkg) | Ideal in `aspect-[5/4]` card header (`Offer 01`). For `HEAD` package cutout (`190×210`), use `width={684} height={548}` and `object-[50%_40%]` to avoid ear tip clipping. |
| `/images/offer-02.webp` | WEBP, 135.4 KB | 960×768 | 1.250 (`5:4` landscape) | `#697953` / `#647440` / `#6e7d75` (luma `0.44`) | Felix Algorithm partial seated on sunlit lawn with stone/wood rounds; head, glasses, paws, and cyan tail all cleanly inside frame. | `page.tsx:2564` (`#offres` Offer 02) | Keep `aspect-[5/4]` in Offer 02 card with `object-[52%_42%]`; strong color contrast against `#fff0a6` butter card surface. |
| `/images/polaroid-02.webp` | WEBP, 38.9 KB | 684×684 | 1.000 (`1:1` square) | `#6c6463` / `#41414a` / `#a98c73` (luma `0.40`) | Golden-orange Kemono canine head with grey folded ear, cross earrings, purple cheek scar, and blue eyes on dark curtain backdrop. | **UNUSED in `src/`** | Square `1:1` headshot; ideal for `HERO_POLAROIDS`, `HEAD` / `CUSTOM` showcase card, or square gallery tile (`object-[50%_42%]`). |
| `/images/polaroid-03.webp` | WEBP, 110.0 KB | 684×684 | 1.000 (`1:1` square) | `#64784f` / `#5c6f37` / `#748580` (luma `0.43`) | Square framing of Felix Algorithm seated on grass showing full outfit and cyan/navy tail at bottom-right. | `homeCopy.ts:584` (`TAIL` package cutout) | If kept on `TAIL`, shift focal point to `object-[76%_58%]` or swap with `gallery-r2-03.webp` (curled Shiba tail) and use `polaroid-03.webp` for `Partial` / `Half-body`; fix `width={684} height={684}`. |
| `/images/bonus-lockers.webp` | WEBP, 62.1 KB | 1024×576 | 1.778 (`16:9` widescreen) | `#b3973e` / `#c5a222` / `#a8997a` (luma `0.59`) | Wide studio shot of Sy Tray & white cat partial before bright yellow sticker-covered lockers with blue skates bottom-right. | `MiseAuPoint.tsx:52` (`#bonus` focus game) | **Cinematic `16:9` full-bleed stage.** Keep `MiseAuPoint` `h-[100svh]` with dark vignette (`rgba(17,22,34,0.42)`), and set responsive `object-[46%_40%]` so mobile portrait keeps both faces in frame. |

#### B. Hero Polaroid Stack (`public/images/hero-01.webp` .. `hero-15.webp` — 15 Files)

All 15 files are `840×840` (`1.000`, `1:1` square) referenced in `PolaroidsDefile.tsx:31–45` inside `aspect-square` Polaroid frames (`width={840} height={840}`).

| Asset Path | Format & Size | W×H (px) | Ratio & Orient. | Measured Colors (`avg` / `edge` / `center` / `luma`) | Observed Subject, Background & Spatial Depth | `src/` Ref & Layout Fit |
|---|---|---|---|---|---|---|
| `/images/hero-01.webp` | WEBP, 48.4 KB | 840×840 | 1.000 (square) | `#74695c` / `#756754` / `#716759` (luma `0.42`) | Minny Minnie white cat in dark traditional robe holding blue calligraphy book, yellow fringe curtain & paper lanterns behind; rich foreground/midground depth. | `PolaroidsDefile.tsx:31` — Perfect `1:1` (`object-center`) |
| `/images/hero-02.webp` | WEBP, 62.8 KB | 840×840 | 1.000 (square) | `#717c7d` / `#727c76` / `#758493` (luma `0.47`) | Hunter Knight white/red-streak cat partial by cafe menu signpost & dark window greenery; mid-shot depth. | `PolaroidsDefile.tsx:32` — `1:1` (`object-[50%_38%]` protects ear tops) |
| `/images/hero-03.webp` | WEBP, 80.0 KB | 840×840 | 1.000 (square) | `#bda246` / `#caab34` / `#b7a26f` (luma `0.63`) | Sy Tray grey/orange Kemono partial crossing clawed paws against vivid yellow sticker lockers; high brightness contrast. | `PolaroidsDefile.tsx:33` — `1:1` (`object-[50%_35%]`) |
| `/images/hero-04.webp` | WEBP, 112.8 KB | 840×840 | 1.000 (square) | `#76867d` / `#5c6b60` / `#8d9da3` (luma `0.50`) | Felix Algorithm blue canine partial in tall grass foreground, terracotta gazebo & trees behind; layered foreground-to-background depth. | `PolaroidsDefile.tsx:34` — `1:1` (`object-[48%_42%]`) |
| `/images/hero-05.webp` | WEBP, 61.2 KB | 840×840 | 1.000 (square) | `#67716e` / `#687165` / `#58636b` (luma `0.43`) | Umbréon Retsquôt brown/white horned heterochromia partial beside white cafe menu signs & ivy wall; balanced upper headroom. | `PolaroidsDefile.tsx:35` — `1:1` (`object-[50%_35%]`) |
| `/images/hero-06.webp` | WEBP, 73.0 KB | 840×840 | 1.000 (square) | `#a7a6aa` / `#a5aeb8` / `#b6acae` (luma `0.65`) | Orange canine partial with folded grey ear & purple cheek mark seated on graffiti-painted brick wall showing clawed orange paws. | `PolaroidsDefile.tsx:36` — `1:1` (`object-[50%_40%]`) |
| `/images/hero-07.webp` | WEBP, 39.3 KB | 840×840 | 1.000 (square) | `#4f4c54` / `#4c5261` / `#6a5d59` (luma `0.31`) | Red-and-orange fox partial holding a white birthday cake at twilight on paved street with distant skyline bokeh; moody low-key backdrop. | `PolaroidsDefile.tsx:37` — `1:1` (`object-[50%_30%]`; tall ears reach top) |
| `/images/hero-08.webp` | WEBP, 56.2 KB | 840×840 | 1.000 (square) | `#5c5544` / `#5f5b40` / `#706159` (luma `0.33`) | Minny Minnie white cat in dark robe with folded arms under white cherry-blossom branches & warm yellow lantern; framed foreground foliage. | `PolaroidsDefile.tsx:38` — `1:1` (`object-[50%_42%]`) |
| `/images/hero-09.webp` | WEBP, 92.3 KB | 840×840 | 1.000 (square) | `#5a514a` / `#5f524a` / `#5b5247` (luma `0.33`) | Hunter Knight seated in embroidered dark hanfu leaning on paw amidst floral lily & wisteria arrangements; moody studio lighting. | `PolaroidsDefile.tsx:39` — `1:1` (`object-[50%_40%]`) |
| `/images/hero-10.webp` | WEBP, 63.3 KB | 840×840 | 1.000 (square) | `#968354` / `#b4994c` / `#6a6352` (luma `0.51`) | Dual shot of Sy Tray (red pads) and Hunter Knight (blue/pink pads) raising paws toward camera before yellow lockers; high energy foreground paws. | `PolaroidsDefile.tsx:40` — `1:1` (`object-[50%_42%]`) |
| `/images/hero-11.webp` | WEBP, 117.8 KB | 840×840 | 1.000 (square) | `#728076` / `#5b695d` / `#839394` (luma `0.48`) | Second outdoor frame of Felix Algorithm waist-deep in backlit tall grass blades before green trees & pavilion; dreamy shallow depth. | `PolaroidsDefile.tsx:41` — `1:1` (`object-[50%_42%]`) |
| `/images/hero-12.webp` | WEBP, 83.8 KB | 840×840 | 1.000 (square) | `#545656` / `#64615d` / `#515a64` (luma `0.33`) | Brown/white horned partial seated squarely on rear trunk of a vintage Datsun 1000 sedan at an outdoor courtyard; full body-to-shoe framing. | `PolaroidsDefile.tsx:42` — `1:1` (`object-[50%_38%]`) |
| `/images/hero-13.webp` | WEBP, 64.6 KB | 840×840 | 1.000 (square) | `#647162` / `#5e7262` / `#807f79` (luma `0.42`) | Orange canine partial in grey hoodie reaching brown-padded paw out toward lens on urban park lawn with overgrown warehouse & skyline behind. | `PolaroidsDefile.tsx:43` — `1:1` (`object-[50%_38%]`) |
| `/images/hero-14.webp` | WEBP, 42.1 KB | 840×840 | 1.000 (square) | `#8c8b81` / `#a0a399` / `#797267` (luma `0.54`) | Black & yellow Shiba Inu head (`3D TPU base`) with gold ear cuff, bell cord, pink blep tongue, holding yellow/black 3D-printed cooling fan on lanyard outdoors. | `PolaroidsDefile.tsx:44` — `1:1` (`object-[50%_35%]`); **bonus: real photo of Fursuit Fan!** |
| `/images/hero-15.webp` | WEBP, 63.1 KB | 840×840 | 1.000 (square) | `#8a7a7f` / `#87727d` / `#988883` (luma `0.50`) | Sy Tray seated on yellow plastic bleachers holding smiley basketball before purple/coral painted court wall; vivid color blocking. | `PolaroidsDefile.tsx:45` — `1:1` (`object-[50%_35%]`) |

#### C. Section Backdrops — Method Stages, Why FluffNii, Results & Species Fan (16 Files)

| Asset Path | Format & Size | W×H (px) | Ratio & Orient. | Measured Colors (`avg` / `edge` / `center` / `luma`) | Subject, Background & Depth | Current `src/` Usage | Layout & Framing Recommendation |
|---|---|---|---|---|---|---|---|
| `/images/method-01.webp` | WEBP, 33.3 KB | 960×720 | 1.333 (`4:3` landscape) | `#b09d69` / `#a99a5d` / `#b8a47c` (luma `0.61`) | Sy Tray seated in yellow studio room beside green chalkboard & smiley posters; mid-shot depth. | `homeCopy.ts:371` -> `page.tsx:1959` (`#methode` Step 01) | Keep inside `aspect-[4/3]` sticky sheet right column with `object-[50%_35%]` (`width={960} height={720}`). |
| `/images/method-02.webp` | WEBP, 39.9 KB | 960×720 | 1.333 (`4:3` landscape) | `#9fafbe` / `#b4c6d7` / `#8596ab` (luma `0.67`) | Low-angle outdoor shot of Felix Algorithm with white glasses, hands on hips against bright blue cloud sky & grass foreground. | `homeCopy.ts:378` -> `page.tsx:1959` (`#methode` Step 02) | Keep inside `aspect-[4/3]` sticky sheet right column with `object-[52%_36%]` (`width={960} height={720}`). |
| `/images/method-03.webp` | WEBP, 68.3 KB | 960×720 | 1.333 (`4:3` landscape) | `#5e5a4d` / `#484334` / `#8b8a80` (luma `0.35`) | Sky-blue horned Kemono partial in straw hat seated in sage-green interior beside oval mirror & faux persimmons; rich prop depth. | `homeCopy.ts:385` -> `page.tsx:1959` (`#methode` Step 03) | Keep inside `aspect-[4/3]` sticky sheet right column with `object-[46%_40%]` (`width={960} height={720}`). |
| `/images/why-01.webp` | WEBP, 44.4 KB | 1280×853 | 1.501 (`3:2` landscape) | `#79696e` / `#7f6969` / `#7a6f77` (luma `0.43`) | Minny Minnie standing in convention ballroom crowd (small `"Feral Speech / Pawse"` watermark bottom-left); crowd depth. | `MotDefilant.tsx:17` (`#pourquoi` slide 1) | Full-bleed `100svh` backdrop; set `object-[48%_32%]` and keep radial dark veil (`>= 0.42`) so center copy pops and bottom-left watermark stays dimmed. |
| `/images/why-02.webp` | WEBP, 68.7 KB | 1280×720 | 1.778 (`16:9` landscape) | `#b89d42` / `#caa726` / `#b4a482` (luma `0.61`) | Sy Tray & Hunter Knight posing in front of bright sticker-covered yellow lockers; flat colorful wall backdrop. | `MotDefilant.tsx:21` (`#pourquoi` slide 2) | Full-bleed `100svh` backdrop; apply `object-[46%_42%]` (crucial on mobile portrait so both suits stay inside crop). |
| `/images/why-03.webp` | WEBP, 93.0 KB | 1280×960 | 1.333 (`4:3` landscape) | `#a9aaad` / `#b1aaa5` / `#a2b2c2` (luma `0.67`) | High-key beach boardwalk close-up of Felix Algorithm wearing white round glasses on bright sand/pavers. | `MotDefilant.tsx:25` (`#pourquoi` slide 3) | Full-bleed `100svh` backdrop; bright luma (`0.67`) requires dark radial veil (`>= 0.45`) for `cream`/`butter` headline contrast; `object-[50%_38%]`. |
| `/images/why-04.webp` | WEBP, 182.0 KB | 1280×961 | 1.332 (`4:3` landscape) | `#8d978d` / `#8ea6a0` / `#939188` (luma `0.58`) | Two canine partials (black/white blep husky + orange/yellow canine) sitting on urban park lawn before high-rise towers. | `MotDefilant.tsx:29` (`#pourquoi` slide 4) | Full-bleed `100svh` backdrop; set `object-[50%_42%]` to frame both characters cleanly. |
| `/images/result-01.webp` | WEBP, 113.0 KB | 960×1280 | 0.750 (`3:4` portrait) | `#76828b` / `#869296` / `#586272` (luma `0.50`) | Brown-and-white horned canine sitting outdoors with matching paws (`object-[50%_45%]`). | `page.tsx:1617` (Bento cell 1) | Bento cell (`h-[340px]` ~ `~0.9` aspect on desktop): `object-[50%_38%]` avoids cropping horns; pass `width={960} height={1280}`. |
| `/images/result-02.webp` | WEBP, 68.7 KB | 960×1280 | 0.750 (`3:4` portrait) | `#8f9292` / `#969d9b` / `#787074` (luma `0.57`) | Felix Algorithm teal/navy Kemono canine waving from pale doorway (`object-[50%_25%]`). | `page.tsx:1674` (Bento cell 3) | Bento cell (`h-[340px]`): `object-[50%_25%]` keeps ears and eyes centered nicely; pass `width={960} height={1280}`. |
| `/images/result-03.webp` | WEBP, 81.2 KB | 960×1280 | 0.750 (`3:4` portrait) | `#aa9460` / `#b79e51` / `#a18d77` (luma `0.58`) | Sy Tray holding skateboard beside yellow lockers with removable blep tongue (`object-[50%_20%]`). | `page.tsx:1762` (Bento cell 6) | Bento cell (`h-[340px]`): `object-[50%_22%]` keeps head & tongue crisp; pass `width={960} height={1280}`. |
| `/images/result-04.webp` | WEBP, 122.8 KB | 960×1279 | 0.751 (`3:4` portrait) | `#465e4e` / `#374f3a` / `#74898a` (luma `0.33`) | White cat fursuit with red hair streak & blue-padded paws sitting on grass (`object-[50%_68%]`). | `page.tsx:1817` (Bento cell 8) | Note `960×1279` (`height={1279}`); `object-[50%_58%]` balances head + extended grass-level paws in `h-[340px]` bento frame. |
| `/images/species-bear.webp` | WEBP, 98.4 KB | 760×1351 | 0.563 (`9:16` tall portrait) | `#7f756a` / `#7c6f60` / `#7f7770` (luma `0.47`) | Bear-style Kemono sculpt (same character lighting signature as `project-02.webp`), studio/outdoor vertical shot. | `homeCopy.ts:325` (`#pour-qui` Fan Card 01) | Fix `width={760} height={1351}` (currently hardcoded `1013`!). Inside `300×320px` card photo box (`~1:1`), `object-[50%_32%]` isolates the bear head without vertical distortion. |
| `/images/species-lion.webp` | WEBP, 148.0 KB | 760×1351 | 0.563 (`9:16` tall portrait) | `#7a8584` / `#828f87` / `#7f8994` (luma `0.51`) | Lion-mane layered fluff sculpt (matches `project-04.webp` lighting/color signature), tall portrait. | `homeCopy.ts:333` (`#pour-qui` Fan Card 02) | Fix `width={760} height={1351}`! Keep `object-[50%_26%]` in card media frame (`aspect-[4/5]` or `h-80`). |
| `/images/species-foxcat.webp` | WEBP, 160.5 KB | 760×1013 | 0.750 (`3:4` portrait) | `#536950` / `#4d6341` / `#586a6a` (luma `0.37`) | Tall-eared fox-cat Kemono sculpt against lush green foliage (`object-[50%_20%]`). | `homeCopy.ts:341` (`#pour-qui` Fan Card 03) | `760×1013` (`3:4`): `object-[50%_20%]` protects tall fox ears cleanly inside card box. |
| `/images/species-dog.webp` | WEBP, 100.2 KB | 760×1351 | 0.563 (`9:16` tall portrait) | `#ae8e43` / `#bb9236` / `#b29d6c` (luma `0.56`) | Warm ochre/gold-lit canine partial (`9:16` tall vertical frame). | `homeCopy.ts:349` (`#pour-qui` Fan Card 04) | Fix `width={760} height={1351}`! Keep `object-[50%_36%]` so muzzle & ears sit cleanly in card square/4:5 window. |
| `/images/species-shiba.webp` | WEBP, 100.5 KB | 760×1013 | 0.750 (`3:4` portrait) | `#5c7f84` / `#57889b` / `#6b8485` (luma `0.46`) | Shiba Inu partial with sharp urajiro cheek markings & coastal teal sky/water tones (`object-[50%_15%]`). | `homeCopy.ts:357` (`#pour-qui` Fan Card 05, dark espresso) | `760×1013` (`3:4`): keep `object-[50%_18%]`; strong contrast inside dark espresso card. |

#### D. Featured Projects Carousel (`public/images/project-01.webp` .. `project-05.webp` — 5 Files)

Rendered inside `#projets` horizontal carousel cards (`aspect-[3/4]`, plus full-ratio `object-contain` inside `ShowcaseLightbox`). **Action:** Pass each image's real `width` and `height` per card instead of hardcoding `960×1280` on all 5!

| Asset Path | Format & Size | W×H (px) | Ratio & Orient. | Measured Colors (`avg` / `edge` / `center` / `luma`) | Subject & Content (`homeCopy.ts`) | Current `src/` Ref | Layout & Framing Recommendation |
|---|---|---|---|---|---|---|---|
| `/images/project-01.webp` | WEBP, 119.1 KB | 960×1707 | 0.562 (`9:16` portrait) | `#b5954a` / `#c59c29` / `#b19e88` (luma `0.59`) | **SY TRAY** — Ash-grey & cream Kemono head with bright orange tufts & clawed 4-finger paws by yellow lockers. | `homeCopy.ts:398` (`proj-0`) | Fix `width={960} height={1707}`; `aspect-[3/4]` card with `object-[50%_32%]` frames head + claws cleanly (`object-contain` full `9:16` in lightbox). |
| `/images/project-02.webp` | WEBP, 127.2 KB | 960×1706 | 0.563 (`9:16` portrait) | `#7f756a` / `#7c6f60` / `#7f7770` (luma `0.47`) | **MINNY MINNIE** — Snow-white Kemono cat partial with red-lined eyes, blue forehead diamond & sky-blue pads. | `homeCopy.ts:404` (`proj-1`) | Fix `width={960} height={1706}`; `aspect-[3/4]` with `object-[50%_40%]` avoids top crop on tall ears. |
| `/images/project-03.webp` | WEBP, 56.6 KB | 960×1280 | 0.750 (`3:4` portrait) | `#9aacb9` / `#bdd2df` / `#748898` (luma `0.66`) | **FELIX ALGORITHM** — Teal/navy/cream canine with winking eye, yellow ear lining & navy-tipped paws. | `homeCopy.ts:410` (`proj-2`) | Exact `3:4` match (`960×1280`) for `aspect-[3/4]` card (`object-[50%_48%]`). |
| `/images/project-04.webp` | WEBP, 197.5 KB | 960×1707 | 0.562 (`9:16` portrait) | `#7a8584` / `#828f87` / `#7f8994` (luma `0.51`) | **HUNTER KNIGHT** — Silver-white partial with thick cheek fluff, red/black hair streak & pale blue pads. | `homeCopy.ts:416` (`proj-3`) & `homeCopy.ts:605` (`Fullsuit` pkg) | Fix `width={960} height={1707}` in both `#projets` (`object-[50%_46%]`) and `FULL SUIT` package cutout (`object-[50%_28%]`). |
| `/images/project-05.webp` | WEBP, 69.0 KB | 960×1444 | 0.665 (`~2:3` portrait) | `#597e86` / `#548695` / `#637a7e` (luma `0.45`) | **UMBRÉON RETSQUÔT** — Black/white/gold Shiba suit with blue eyes, removable tongue & braided cord bell. | `homeCopy.ts:422` (`proj-4`) | Fix `width={960} height={1444}`; `aspect-[3/4]` with `object-[50%_20%]` frames the bell & ears cleanly. |

#### E. Gallery Wall & Accessories Cross-Use (`public/images/gallery-r1-01.webp` .. `r2-08.webp` — 16 Files)

**Important structural note:** `gallery-r1-*` and `gallery-r2-*` are **mixed-orientation** (`4:5` portrait `840×1050`, `5:4` landscape `840×672`, and `1:1` square `840×836` / `840×840`). In `page.tsx`, the marquee rows vary `widthClass` (`narrow` ~`4:5`, `medium` ~`1:1`, `wide` ~`5:4`), which matches their real aspect ratios cleanly—EXCEPT `img` `width`/`height` attributes are hardcoded to `840×840`, and the filtered grid forces `aspect-[4/5]` on `5:4` landscape photos! Give each item real `width`/`height` in data and match filtered grid tiles to landscape/portrait or `aspect-[4/3]` / `aspect-[4/5]` / Masonry to prevent edge clipping.

| Asset Path | Format & Size | W×H (px) | Ratio & Orient. | Measured Colors (`avg` / `edge` / `center` / `luma`) | Subject & Content (`homeCopy.ts` / `accessoriesCopy.ts`) | Current `src/` Ref & `widthClass` | Layout & Framing Recommendation |
|---|---|---|---|---|---|---|---|
| `/images/gallery-r1-01.webp` | WEBP, 41.4 KB | 840×1050 | 0.800 (`4:5` portrait) | `#51525c` / `#515b69` / `#725d5b` (luma `0.32`) | Red & orange fox partial holding small white cake at dusk (`[Partial · Kemono]`). | `homeCopy.ts:442` (`narrow`) | Matches `narrow` (`w-[246..300px] h-[312..380px]` = `0.79` = `4:5`!); fix `width={840} height={1050}`, `object-[50%_28%]`. |
| `/images/gallery-r1-02.webp` | WEBP, 49.3 KB | 840×672 | 1.250 (`5:4` landscape) | `#a28e77` / `#a9967c` / `#a1856d` (luma `0.57`) | Sy Tray & Minny Minnie partials seated side-by-side at classroom desks (`[Partials · Studio Shoot]`). | `homeCopy.ts:449` (`wide`), `accessoriesCopy.ts:227` (`STD Edition`) | Fix `width={840} height={672}`. Fits `wide` (`~1.11`) and `/accessories` `aspect-[4/3]` (`object-[50%_32%]`). Avoid `4:5` filtered crop! |
| `/images/gallery-r1-03.webp` | WEBP, 79.6 KB | 840×1050 | 0.800 (`4:5` portrait) | `#67776e` / `#657f7b` / `#7f7d72` (luma `0.44`) | Bright orange & cream canine partial outdoors with ear rings & brown paw pads. | `homeCopy.ts:456` (`narrow`) | Exact `4:5` match for `narrow` tile; fix `width={840} height={1050}`, `object-[50%_35%]`. |
| `/images/gallery-r1-04.webp` | WEBP, 46.4 KB | 840×672 | 1.250 (`5:4` landscape) | `#8ca0b1` / `#909fa5` / `#96b0cf` (luma `0.61`) | Felix Algorithm blue head wearing oversized round white fursuit glasses on the beach. | `homeCopy.ts:463` (`wide`), `accessoriesCopy.ts:277` (`Fursuit Accessories`) | Exact `5:4` match for `wide` & `/accessories` `aspect-[4/3]` (`object-[50%_22%]`); fix `width={840} height={672}` in gallery. |
| `/images/gallery-r1-05.webp` | WEBP, 69.7 KB | 840×1050 | 0.800 (`4:5` portrait) | `#ac9150` / `#b79330` / `#a7977e` (luma `0.57`) | Sy Tray waving beside bright yellow lockers showing layered grey bangs & orange inner ears. | `homeCopy.ts:470` (`narrow`) | Exact `4:5` match (`narrow`, `object-top`); fix `width={840} height={1050}`. |
| `/images/gallery-r1-06.webp` | WEBP, 42.1 KB | 840×836 | 1.005 (`~1:1` square) | `#8c8b81` / `#a0a399` / `#797367` (luma `0.54`) | Umbréon Retsquôt Shiba Inu head with gold ear cuff, braided cord & portable cooling fan prop. | `homeCopy.ts:478` (`medium`) | Matches `medium` (`~0.95` square); fix `width={840} height={836}`, `object-[50%_35%]`. Consider highlighting fan in `/accessories`! |
| `/images/gallery-r1-07.webp` | WEBP, 121.6 KB | 840×1050 | 0.800 (`4:5` portrait) | `#6d7d53` / `#697a48` / `#747d68` (luma `0.45`) | Felix Algorithm waving both paws on green garden lawn showing green pads & waist-balanced tail. | `homeCopy.ts:485` (`narrow`) | Exact `4:5` match (`narrow`); fix `width={840} height={1050}`, `object-[50%_35%]`. |
| `/images/gallery-r1-08.webp` | WEBP, 73.5 KB | 840×1050 | 0.800 (`4:5` portrait) | `#595a60` / `#5e6568` / `#564951` (luma `0.35`) | White cat partial with red hair streak leaning against blue street rail. | `homeCopy.ts:492` (`narrow`) | Exact `4:5` match (`narrow`); fix `width={840} height={1050}`, `object-[50%_30%]`. |
| `/images/gallery-r2-01.webp` | WEBP, 43.5 KB | 840×672 | 1.250 (`5:4` landscape) | `#6e7b82` / `#819199` / `#5b666d` (luma `0.47`) | White cat partial with blue claws & two-tone pink/blue paw pads perched on rooftop ledge. | `homeCopy.ts:505` (`wide`), `accessoriesCopy.ts:252` (`PLUS Edition`) | Matches `wide` & `/accessories` `aspect-[4/3]` (`object-[50%_26%]`); fix `width={840} height={672}`. |
| `/images/gallery-r2-02.webp` | WEBP, 68.9 KB | 840×672 | 1.250 (`5:4` landscape) | `#7e7f66` / `#858365` / `#909280` (luma `0.49`) | Sky-blue horned goat Kemono head wearing straw hat in greenhouse (`[Head · Custom Horns]`). | `homeCopy.ts:512` (`wide`), `accessoriesCopy.ts:201` (`Internal Fan`) | Matches `wide` & `/accessories` `aspect-[4/3]` (`object-[50%_28%]`); fix `width={840} height={672}`. |
| `/images/gallery-r2-03.webp` | WEBP, 94.0 KB | 840×1050 | 0.800 (`4:5` portrait) | `#5f7f7f` / `#5c8996` / `#6c827e` (luma `0.46`) | Shiba Inu partial leaning on coastal scooter showing tightly curled black/white hip-anchored tail. | `homeCopy.ts:519` (`narrow`) | Exact `4:5` match (`narrow`, `object-top`); fix `width={840} height={1050}`. Strong candidate for `TAIL` package card! |
| `/images/gallery-r2-04.webp` | WEBP, 68.8 KB | 840×840 | 1.000 (`1:1` square) | `#a58e5a` / `#c2a350` / `#887963` (luma `0.56`) | Locker Room Duo (Sy Tray & white cat holding basketball by yellow lockers). | `homeCopy.ts:527` (`medium`) | Matches `medium` square tile (`object-[50%_38%]`); fix `width={840} height={840}`. |
| `/images/gallery-r2-05.webp` | WEBP, 98.3 KB | 840×672 | 1.250 (`5:4` landscape) | `#7e8d7a` / `#768162` / `#809394` (luma `0.53`) | Close foreground perspective of Felix Algorithm's `35 cm` 4-finger blue paw with white stuffed claws outdoors. | `homeCopy.ts:534` (`wide`), `homeCopy.ts:577` (`PAWS` pkg) | Matches `wide` tile; fix `width={840} height={672}`. Inside `PAWS` package cutout (`190×210`), keep `object-[55%_50%]` centered on the paw. |
| `/images/gallery-r2-06.webp` | WEBP, 58.9 KB | 840×1050 | 0.800 (`4:5` portrait) | `#786e5e` / `#70634e` / `#776e61` (luma `0.44`) | Minny Minnie reading book under warm paper lanterns showing flexible padded paws & red-lined eyes. | `homeCopy.ts:541` (`narrow`) | Exact `4:5` match (`narrow`, `object-[50%_32%]`); fix `width={840} height={1050}`. |
| `/images/gallery-r2-07.webp` | WEBP, 67.1 KB | 840×672 | 1.250 (`5:4` landscape) | `#a7abb2` / `#bec9d6` / `#98867b` (luma `0.67`) | Orange canine partial crouching on painted concrete wall showing feet/pose & long-pile paws. | `homeCopy.ts:548` (`wide`), `homeCopy.ts:591` (`FEET` pkg) | Matches `wide` tile (`object-[50%_45%]`); fix `width={840} height={672}`. For `FEET` package cutout, keep `object-[50%_60%]` as set. |
| `/images/gallery-r2-08.webp` | WEBP, 88.0 KB | 840×1050 | 0.800 (`4:5` portrait) | `#545758` / `#686966` / `#535861` (luma `0.34`) | Brown-and-white horned canine partial seated on vintage Datsun trunk (`[Mini partial · Heterochromia]`). | `homeCopy.ts:555` (`narrow`), `homeCopy.ts:598` (`HALF BODY` pkg) | Exact `4:5` match for `narrow` (`object-top`) and natural vertical fit for `HALF BODY` `190×210` cutout (`object-[50%_25%]`); fix `width={840} height={1050}`. |

---

## Summary Checklist for Wave 2 Builders

- [ ] Replace hardcoded `width={840} height={840}` / `height={1013}` / `height={1280}` / `684×684` in `page.tsx` with true per-asset pixel dimensions from Part III.
- [ ] Give `formula-fursuit.webp` an `aspect-[3/4]` or `aspect-[4/5]` editorial container (`object-[50%_18%]`) and adjust filtered gallery cards (`#galerie`) so `5:4` landscape items use `aspect-[5/4]` or `aspect-square` rather than cropping sides in `4:5`.
- [ ] Decide placement for currently unreferenced `/images/polaroid-02.webp` (recommended: add as slide 16 in `PolaroidsDefile` or swap into `galleryRow` / `packages`).
- [ ] Add `object-[46%_40%]` / `object-[48%_32%]` focal positioning on full-bleed `100svh` landscape backdrops (`bonus-lockers.webp`, `why-01..04`) for mobile portrait safety.
- [ ] Enforce `html[data-lang="vi"] .font-stagheiz` vertical bleed (`py-[0.12em]` / `line-height: 1.14+`) on all masked word/char reveals (`ScrollWordReveal.tsx`) per Ximitech's `.split-mask` solution.
