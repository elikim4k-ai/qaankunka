# Qaankunka Build State

Last updated: 2026-08-23

## Latest Change Log (2026-08-22/23, ZCode / GLM — session 9: domain release)

### Completed
1. **SMTP credentials live** — `SMTP_USER`/`SMTP_PASS` (Gmail App Password "Qaankunka AI"; note: Gmail requires the password WITH spaces) set on Vercel Production+Preview and in local `.env.local`. Test email delivered to eli.kim4k@gmail.com. Contact-form and job-application emails now deliver in production.
2. **base44 release** — User deleted qaankunka.com from the old base44 app, unpublished, and deleted the app, releasing base44's Vercel claim on the apex host.
3. Domain deleted from team peacolu and re-added fresh (Connect → Production); redeployed multiple times; dashboard shows **Valid Configuration**; www.qaankunka.com routes correctly (307 → apex).

### Outstanding — apex edge routing
- `https://qaankunka.com` still returns Vercel NOT_FOUND at the edge (both 76.76.21.21 and 216.198.79.1), despite Valid Configuration, issued certs, and confirmed alias assignment on deploys. Diagnosis: the base44 claim release hasn't propagated through Vercel's edge yet (async cleanup). base44 release happened ~2026-08-23 NZ time.
- **A recurring check runs every 30 minutes** (automation "每30分钟检查 qaankunka.com 是否上线") to detect when the apex goes live; it will notify. If still 404 after ~24h of checks, open a Vercel support ticket (vercel.com/help) asking to force-release qaankunka.com.
- www.qaankunka.com serves the new site in the meantime (redirects to apex until apex activates, at which point apex serves directly).

---

## Change Log (2026-08-22, ZCode / GLM — session 8: DNS switched to Vercel)

### Completed
1. **Squarespace DNS updated** (with user's Google verification as ceo@qaankunka.com): A record `@` changed `76.76.21.21` → `216.198.79.1`. CNAME `www → cname.vercel-dns.com` and all Google Workspace MX/SPF/DKIM records untouched. Authoritative DNS (Google Cloud DNS) confirms the new value.
2. **Vercel domain status: Valid Configuration** — `qaankunka.com` is attached to the project as the production domain (apex canonical). Redeployed twice; alias assignment confirmed (`▲ Aliased https://qaankunka.com`).
3. **www.qaankunka.com already routes to the new deployment** (307-redirects to apex per the apex-canonical setting).

### In progress — edge propagation
- The Vercel edge still returns 404 for the **apex** host (both 76.76.21.21 and 216.198.79.1), even though the dashboard shows Valid Configuration. Apex activation can take from minutes up to a few hours after a DNS change.
- Public resolvers still cache the old IP (`216.24.57.1`, Cloudflare → the old base44-built site) with a 4-hour TTL — visitors may see the old site until caches expire.

### Still pending (user action)
- `SMTP_USER` / `SMTP_PASS` (Gmail App Password) in Vercel Environment Variables, then redeploy — required for contact-form/application emails in production.

---

## Change Log (2026-08-22, ZCode / GLM — session 7: Vercel deployment + domain)

### Completed
1. **Deployed to Vercel** — Project `qaankunka` (team `peacolu`, Hobby plan), production deployment Ready: `qaankunka-d9n9n62ka-peacolu.vercel.app`. Fixed an ESLint build failure (`react/no-unescaped-entities` apostrophe in `CareersBoard.tsx`).
2. **Env vars on Vercel (Production)** — `CONTACT_TO=eli.kim4k@gmail.com`, `SMTP_HOST=smtp.gmail.com`, `SMTP_PORT=587`. **`SMTP_USER`/`SMTP_PASS` still need to be added** (Gmail App Password) or emails won't send in production.
3. **Domain connected** — `qaankunka.com` added to team and attached to the project as Production (apex canonical, apex→www redirect disabled).
4. **Deployment Protection fixed** — "Vercel Authentication / Require Log In" was enabled, which blocked all public access; set to Standard Protection (production public).

### Blocked — DNS update required (user action)
- `qaankunka.com` currently resolves to an older deployment of the site (pre-existing Vercel IP `216.24.57.1`, behind Cloudflare).
- Vercel requires at the DNS provider (**Google Cloud DNS** per Vercel's detection):
  - `A` record, name `@`, value `216.198.79.1`
  - (optional) `CNAME` record, name `www`, value `cname.vercel-dns.com`
- Google Cloud Console access is **blocked by Google's MFA enforcement** — the user must enable 2-step verification on eli.kim4k@gmail.com, then update the A record in Cloud DNS.
- Do not modify MX records (Google Workspace email).

### Known quirk
- `qaankunka.vercel.app` returns 404 (bare subdomain likely claimed by the earlier/other deployment of this project name); the team alias `qaankunka-peacolu.vercel.app` is login-gated under Standard Protection. Custom domain will be the canonical URL once DNS is updated.

---

## Change Log (2026-08-22, ZCode / GLM — session 6: job application flow)

### Changes made
1. **Careers application flow** — Each job card's button is now just "Apply". Clicking it scrolls to an application form (below the job cards) with the role pre-selected. Form fields: Full Name, Email, Role, "Why are you applying to this role?", "What are some related projects you've done?", "Where do you currently reside?", optional Portfolio/LinkedIn link, plus a hidden honeypot.
2. **Apply API** — New `POST /api/apply` (`src/app/api/apply/route.ts`): validates all fields, rate-limits, and emails the application to `eli.kim4k@gmail.com` (subject `[Qaankunka Careers] <Role> (<Location>) — <Name>`, submitter as reply-to). Falls back to server logging when SMTP is unconfigured; returns 502 on delivery failure.
3. **Shared mailer** — Extracted `src/lib/mailer.ts` (SMTP config + `sendEnquiryEmail`); contact route refactored to use it, removing duplication.

### Files added
- `src/components/careers/CareersBoard.tsx`, `src/app/api/apply/route.ts`, `src/lib/mailer.ts`

### Verification
- Browser: Apply buttons (2) reveal the form with correct pre-selected role; full submit succeeds ("Application received"). API smoke test returns `{"ok":true}`. TypeScript passes. Emails will send once SMTP credentials are filled in `.env.local` (same settings as the contact form).

---

## Change Log (2026-08-22, ZCode / GLM — session 5: team page + footer order)

### Changes made
1. **Team photos** — Added round profile photos on `/team`: `public/team/elijah.png` (Elijah) and `public/team/dingding.png` (Dingding), rendered via `next/image` (24×24 display, rounded-full, object-cover) replacing the monogram avatars.
2. **Team page** — New `/team` route (`src/app/team/page.tsx`) with two members from `src/data/team.ts`: Elijah (Founder & CEO, linkedin.com/in/eli-kim-4k) and Dingding (Senior Machine Learning Engineer, linkedin.com/in/dingding-park-20a7b7278). LinkedIn links open in a new tab (`rel="noopener noreferrer"`). Page ends with a CTA pointing to Careers.
2. **Footer Navigation order** — Now: About, Technology, Applications, Research, **Team** (after Research), Ecosystem, Careers, Contact. `/team` added to the sitemap.

### Verification
- `/team` renders both members with correct LinkedIn URLs; footer order confirmed in browser; TypeScript passes.

---

## Change Log (2026-08-22, ZCode / GLM — session 4: careers page + contact email)

### Changes made
1. **Careers page** — New `/careers` route (`src/app/careers/page.tsx`) with two job postings driven by `src/data/careers.ts`:
   - Quantum Researcher — Paris, France (Quantum Research)
   - Optical Engineer — Dubai, UAE (Imaging Systems)
   Each posting shows department/type badges, summary, responsibilities, requirements, and an Apply link to `/contact`. Added "Careers" to footer navigation (`site.ts`) and the sitemap.
2. **Contact form email delivery** — `/api/contact` now sends enquiries to `eli.kim4k@gmail.com` via nodemailer (new dependency + `@types/nodemailer`). SMTP credentials are read from `.env.local` (`CONTACT_TO`, `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`; Gmail defaults pre-filled). If SMTP is not configured, the enquiry is logged server-side and the form still succeeds; if delivery fails, the API returns 502 and the form shows an error banner.

### Action required
- Fill `SMTP_USER` (eli.kim4k@gmail.com) and `SMTP_PASS` (Gmail App Password) in `.env.local`, then restart the dev server to enable real email delivery. Enquiry emails use the submitter's address as `replyTo`.

### Files added
- `src/app/careers/page.tsx`, `src/data/careers.ts`, `.env.local` (gitignored)

### Components changed
- `src/app/api/contact/route.ts` (email integration), `src/data/site.ts` (footer link), `src/app/sitemap.ts`

### Verification
- `/careers` renders both postings; footer "Careers" link navigates correctly; contact form still submits successfully; TypeScript passes.

---

## Change Log (2026-08-22, ZCode / GLM — session 3: pixelation slider fix)

### Changes made
1. **PixelationDemo split-slider bug fixed** (`src/components/home/PixelationDemo.tsx`) — The comparison slider did not change the pixelation effect because `putImageData()` ignores canvas clipping (`ctx.clip()` had no effect), so the "intelligent" rendering always overwrote the whole canvas. Replaced the clip-based composite with `putImageData(intelImgData, 0, 0, splitX, 0, w - splitX, h)` using its dirty-rect parameters, which correctly paints only the right-hand region. Verified in the browser at split=5 vs split=95: the standard/intelligent boundary now follows the slider.

---

## Change Log (2026-08-22, ZCode / GLM — session 2: logo image + dev-server recovery)

### Changes made
1. **Brand logo image** — Replaced the inline SVG mark in `src/components/ui/Logo.tsx` with the client-supplied PNG (`public/qaankunka-logo.png`, 1700×1645) rendered via `next/image`. `Logo` is shared by `Navbar` and `Footer`, so both now use the new asset. Same `size`/`className` API, hover scale, and `alt="Qaankunka Logo"` retained.
2. **Dev-server incident resolved** — Running `next build` while a dev server was live corrupted the shared `.next` cache and crashed the dev server. Fixed by deleting `.next` and restarting a single dev server on port 3000. All pages and the contact form verified working end-to-end afterwards.

### Known issues (updated)
- Do not run `npm run build` while `npm run dev` is active — they share `.next` and the dev server will break.
- `public/qaankunka-logo.png` is a 1700×1645 source; `next/image` requests it at w=64/w=128 so delivered size is fine, but a smaller source asset could be added later.

---

## Change Log (2026-08-22, Antigravity — Monochromatic Black & White Theme Conversion)

### Changes made
1. **Monochromatic Theme Conversion (`globals.css`)** — Converted theme tokens to a pure black and white deep-tech aesthetic matching the provided reference banner (`#000000` pitch black background, `#FFFFFF` crisp primary text, `#E2E8F0` silver accents, `#666677` muted secondary details). Removed cyan/purple color fills.
2. **Hero Banner Statement (`Hero.tsx`)** — Incorporated the exact reference banner statement:
   - Headline: `ORCHESTRATE. OPTIMIZE. DELIVER IMPACT.`
   - Subtitle: `AI ORCHESTRATION | INTELLIGENT OPTIMIZATION | REAL-WORLD IMPACT`
3. **Monochrome Particle Field (`HeroVisual.tsx`)** — Updated particle canvas rendering to white/silver particle vectors and radial monochromatic accretion lighting.
4. **Monochrome Storytelling & Demonstrators (`FounderStory.tsx`, `PixelationDemo.tsx`)** — Updated progress bar gradients and canvas rendering to pure white and silver tones.

### Components changed
- `src/app/globals.css`
- `src/components/home/Hero.tsx`
- `src/components/home/HeroVisual.tsx`
- `src/components/home/FounderStory.tsx`
- `src/components/home/PixelationDemo.tsx`
- `docs/QAANKUNKA_BUILD_STATE.md`

### Verification
- `npm run build` succeeds cleanly with zero errors and all 13 pages compiled.

## Latest Change Log (2026-08-22, Antigravity — High-Res Vector Logo Asset Update)

### Changes made
1. **High-Res White Logo Integration (`Logo.tsx`)** — Re-digitized the high-definition user-supplied logo image into clean, losslessly scalable vector SVG paths (`viewBox="0 0 500 500"`). Preserved the solid white hexagonal badge frame with the two curved diagonal dark S-ribbon cutouts and subtle backlight filter glow.
2. **Updated Placement** — Replaced all instances of the brand logo across `Navbar.tsx`, `Footer.tsx`, and dynamic `opengraph-image.tsx`.

### Components changed
- `src/components/ui/Logo.tsx`
- `src/app/opengraph-image.tsx`
- `docs/QAANKUNKA_BUILD_STATE.md`

### Verification
- `npm run build` succeeds cleanly with zero errors and all 13 pages compiled.

## Latest Change Log (2026-08-22, Antigravity — Vivid Grid & White Vector Logo Integration)

### Changes made
1. **Vivid Computational Background Grid** — Increased grid line opacity (`rgba(34, 211, 238, 0.09)`), dot-matrix intersection brightness (`rgba(34, 211, 238, 0.4)`), and cursor spotlight radius (380px) in `globals.css` so the grid is prominently visible across dark background sections.
2. **Refined White Brand Logo (`Logo.tsx`)**
   - Vectorized the attached hexagonal Mobius ribbon emblem.
   - Reversed colors for dark theme background (`#050508`), rendering the logo badge in crisp white (`#FFFFFF` with a subtle cyan gradient accent).
   - Integrated `<Logo />` into `Navbar.tsx`, `Footer.tsx`, and dynamic `opengraph-image.tsx`.

### Components changed
- `src/components/ui/Logo.tsx` (new)
- `src/components/layout/Navbar.tsx`
- `src/components/layout/Footer.tsx`
- `src/app/opengraph-image.tsx`
- `src/app/globals.css`
- `docs/QAANKUNKA_BUILD_STATE.md`

### Verification
- `npm run build` succeeds with zero errors and 13 static pages compiled.

## Latest Change Log (2026-08-22, Antigravity — Primora-inspired Founder Storytelling, Multi-Layer Grid & Interactive Demonstrators)

### Changes made
1. **Global Computational Coordinate Grid & Mouse Proximity Response** — Enhanced `GridField.tsx` and `globals.css` with smooth lerp pointer tracking (`--grid-x`, `--grid-y`), coordinate dot-matrix micro-intersections (`·`, `+`, `│`, `─`), and multi-layer depth (`.grid-field` global ambient, `.section-grid` focus, `.interactive-grid` node topology).
2. **Primora-Inspired Scroll-Driven Founder/Pioneer Storytelling** — Created `FounderStory.tsx` sticky homepage section featuring pinned viewport progress, progressive editorial phrase highlighting (faint grey $\rightarrow$ bright white with cyan accents), and an accompanying reactive ASCII signal & node topology graphic.
3. **Interactive Agentic Orchestration Visualizer** — Upgraded `AgentWorkflow.tsx` into a multi-agent topology map featuring Vision, Video, Creative, QML, Quantum Optimization, Generation, and Quality Agents coordinated by the Orchestrator, complete with live activity level telemetry.
4. **Advanced Intelligent Pixelation Research Demonstrator** — Upgraded `PixelationDemo.tsx` with multi-preset scene selection ("Portrait Contour", "Architectural Grid", "Complex Motion Vector"), an interactive split-view comparison slider (Standard vs Intelligent), and real-time research telemetry (Preservation %, Entropy Rate, QUBO Terms).
5. **Dynamic OpenGraph Social Image Asset** — Added `src/app/opengraph-image.tsx` leveraging Next.js 15 App Router `ImageResponse` for dynamic 1200x630 social preview generation.

### Components changed
- `src/components/layout/GridField.tsx`
- `src/components/home/FounderStory.tsx` (new)
- `src/components/home/AgentWorkflow.tsx`
- `src/components/home/PixelationDemo.tsx`
- `src/app/opengraph-image.tsx` (new)
- `src/app/globals.css`
- `src/app/page.tsx`
- `src/data/homepage.ts`
- `docs/QAANKUNKA_BUILD_STATE.md`

### Verification
- `npm run build` succeeds cleanly with TypeScript type-checking and static page generation for all 12 routes.
- `prefers-reduced-motion` compliance verified across all animated elements.

## Latest Change Log (2026-08-22, Codex — grid field and progressive research story)

### Changes made
1. **Global computational grid** — Added a single CSS-based grid/dot-matrix environment with faint coordinate lines, intersection points, and a requestAnimationFrame-throttled pointer spotlight on fine-pointer devices. The mobile density is reduced and reduced-motion mode disables the reactive layer.
2. **Scroll-driven research narrative** — Added the `/03 — Research intent` homepage section between the convergence and capability sections. Its progressive text highlighting uses the existing research mission language: emerging technologies → mathematical formulation → prototypes/demonstrators → real-world deployment.
3. **Grid + system continuity** — Added a stronger local grid to the narrative section and a signal-progress rule, creating the intended transition from computational environment to research intent and onward into capabilities.
4. **Content integrity** — No founder/team information exists in the source material, so the requested founder-style storytelling pattern was adapted as a clearly factual research-intent statement rather than inventing people or relationships.

### Components changed
- `src/components/layout/GridField.tsx` (new)
- `src/components/home/ResearchIntent.tsx` (new)
- `src/app/layout.tsx`
- `src/app/page.tsx`
- `src/app/globals.css`

### Verification
- `npm run lint` passes.
- `npx tsc --noEmit` passes.
- Browser preview was unavailable for the final local-page check (`ERR_BLOCKED_BY_CLIENT`); rerun `npm run dev` and refresh the existing local preview to view the update.

## Latest Change Log (2026-08-22, Codex — computational visual system)

### Changes made
1. **Interactive character-based hero visual** — Extended the existing lightweight canvas network with a restrained symbolic glyph language (`·`, `+`, `×`, `○`, `□`, `∿`) and subtle pointer influence. The visual represents a computational field rather than using arbitrary binary text or a generic AI graphic.
2. **Conceptual orchestration telemetry** — Improved the idle state of the agent workflow panel with an animated, clearly labelled research-concept system view. It explains proposed specialist-agent coordination and allows the existing agent controls to continue revealing detailed roles, inputs, and outputs.
3. **Reference-informed, brand-specific design** — Studied the supplied visual reference for its grid discipline, technical typography, and generative-image treatment only. No content, branding, layout, or assets were copied.

### Components changed
- `src/components/home/HeroVisual.tsx`
- `src/components/home/AgentWorkflow.tsx`

### Verification
- `npm run lint` passes.
- `npm run build` compiles successfully and completes type checking.
- Local visual inspection completed for the desktop homepage and the new computational system presentation.

## Latest Change Log (2026-08-22, Codex — premium creative-tech visual upgrade)

### Changes made
1. **Editorial hero redesign** — Elevated the homepage opening with a bolder two-line typographic composition, refined CTA treatments, a systems-oriented visual frame, and a desktop-only scroll cue. The hero keeps the existing positioning and routes while giving Quantum, AI, and Agents equal visual presence.
2. **Shared visual-system refinement** — Increased vertical rhythm, sharpened display typography and labels, and added a restrained technical background treatment. New shared `surface-panel` and `interactive-link` utilities provide consistent premium depth and hover behavior without adding dependencies.
3. **Less card-heavy content presentation** — Reworked the homepage convergence and capability sections into editorial grid/list treatments with sequence markers, controlled borders, and subtle hover movement. Existing content and interactions are unchanged.
4. **Navigation and responsive refinement** — Added current-page indication to navigation, more considered mobile-menu states, and a mobile hero layout whose core message and CTA are readable before the canvas visual appears.
5. **Performance preserved** — Capped the hero canvas device-pixel ratio at 2 to avoid disproportionate GPU work on high-density displays.

### Components changed
- `src/app/globals.css`
- `src/components/layout/Navbar.tsx`
- `src/components/ui/SectionHeader.tsx`
- `src/components/ui/CTA.tsx`
- `src/components/home/Hero.tsx`
- `src/components/home/HeroVisual.tsx`
- `src/components/home/Convergence.tsx`
- `src/components/home/WhatWeBuild.tsx`

### Verification
- Live visual inspection completed on desktop and at a 390px mobile viewport using the local development server.
- `npm run lint` passes.
- `npm run build` succeeds with TypeScript validation and all 14 static pages generated.

## Latest Change Log (2026-08-22, ZCode / GLM)

### Changes made
1. **Contact form wired to a server endpoint** — Added `src/app/api/contact/route.ts` (validates name, email, category, and message; accepts submissions but has no persistence or delivery provider). `ContactForm` now POSTs to `/api/contact` with loading, error (`role="alert"` banner), and success states. Previously the form faked success client-side with no server-side handling.
2. **HeroVisual canvas bug fixes** — `ctx.scale(dpr, dpr)` compounded on every resize (corrupting the canvas transform); now uses `setTransform`. Removed four per-frame `getBoundingClientRect()` calls (layout thrashing) in favour of cached dimensions updated on resize.
3. **OG image added** — New `src/app/opengraph-image.tsx` using `next/og` `ImageResponse` (no new dependency). Removed dead `ogImage: "/og-image.png"` field from `site.ts` (asset never existed).

### Components changed
- `src/components/ui/ContactForm.tsx`
- `src/components/home/HeroVisual.tsx`
- `src/data/site.ts`

### Changes made (2026-08-22, Codex)
1. **Contact endpoint hardened** — Added a hidden honeypot, privacy-preserving operational logging, and a best-effort in-memory rate limit (5 requests per 15 minutes per forwarded client address). This is process-local; a shared store or edge/WAF limit is still required for dependable multi-instance production protection.
2. **Lint command repaired** — Replaced the removed `next lint` command with `eslint src`, compatible with the installed Next.js 15 version and scoped to maintained application code.
3. **Handoff reconciled** — Removed stale descriptions of the contact form and OG image as unimplemented.

### Components changed (2026-08-22, Codex)
- `src/components/ui/ContactForm.tsx`
- `src/app/api/contact/route.ts`
- `package.json`

### Verification (2026-08-22, Codex)
- `npm run lint` passes (`eslint src`).
- `npm run build` succeeds with TypeScript validation and all 14 static pages generated.
- Production smoke test: valid contact submission returns 200, invalid input returns 400, and the sixth request in the same rate-limit window returns 429.

### Files added
- `src/app/api/contact/route.ts`
- `src/app/opengraph-image.tsx`

### Verification
- `npm run build` succeeds; no TypeScript or lint errors.
- Production server smoke test: `POST /api/contact` → `{"ok":true}` for valid data, 400 for invalid; `GET /opengraph-image` → 200; homepage → 200.

### Known issues (updated)
1. Contact form has no email, CRM, or durable storage configured — connect a delivery provider before launch.
2. Contact abuse protection is process-local and must be complemented by a host-level limit before production.
3. **Static-export compatibility removed**: `/api/contact` is a dynamic server route, so the app now requires Node/serverless hosting (e.g. Vercel), not `output: "export"`.
4. Pixelation demo uses synthetic generated imagery, not real photos.

---

## Previous State (earlier agent)

## Current Architecture

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4 with custom design tokens in `globals.css`
- **Animation:** Framer Motion (with `prefers-reduced-motion` support)
- **Fonts:** Geist Sans + Geist Mono (via `next/font/google`)
- **Package manager:** npm
- **Structure:** `src/app/` for routes, `src/components/` for UI, `src/data/` for content configuration

## Pages Completed

| Route | Status | Notes |
|-------|--------|-------|
| `/` | Complete | Full homepage with all 10 sections |
| `/technology` | Complete | Quantum, AI, Agents, Hybrid Architecture |
| `/applications` | Complete | 5 application domains |
| `/research` | Complete | 5 research areas with status badges |
| `/about` | Complete | Mission, vision, technology, research, ecosystem |
| `/ecosystem` | Complete | 8 ecosystem categories with placeholder partner areas |
| `/contact` | Complete | Contact form + enquiry categories |
| `/sitemap.xml` | Complete | Auto-generated via `sitemap.ts` |
| `/robots.txt` | Complete | Auto-generated via `robots.ts` |

## Components Created

### Layout
- `Navbar` — Desktop + mobile navigation with Connect CTA
- `Footer` — Links, tagline, focus areas

### UI
- `SectionHeader` — Reusable section headings with animation
- `Section` — Section wrapper with padding variants
- `CTA` — Call-to-action block
- `FlowDiagram` — Vertical process flow visualization
- `ArchitectureDiagram` — Hybrid system architecture
- `ContactForm` — Premium contact form with server-side validation and UI states; no delivery provider configured
- `TechnologyCard`, `ApplicationCard`, `ResearchCard` — Content cards

### Homepage
- `Hero` + `HeroVisual` — Animated particle convergence canvas
- `Convergence` — Three pillar interactive cards
- `WhatWeBuild` — Five capability cards
- `AgentWorkflow` — Interactive agent node workflow (Research Concept)
- `QMLSection` — Quantum ML flow diagram
- `QuantumOptimizationSection` — Optimization methods + flow
- `PixelationDemo` — Browser-based pixelation demonstrator (Research Demonstrator)
- `ImageToVideo` — Video timeline + challenges
- `ResearchPipeline` — Research-to-application progression

## Design System

### Colors
- Background: `#050508` (primary), `#0a0a12` (secondary), `#111118` (elevated)
- Text: `#f0f0f5` (primary), `#a0a0b8` (secondary), `#606078` (muted)
- Accents: Cyan `#22d3ee`, Blue `#3b82f6`, Violet `#8b5cf6`, Teal `#14b8a6`
- Borders: `#1a1a28`, `#2a2a40`

### Typography
- Sans: Geist Sans
- Mono: Geist Mono (used for labels, navigation, technical terms)
- Headings: Semibold, tight tracking
- Labels: Uppercase, wide letter-spacing

### Spacing
- Section padding: `py-20 lg:py-28`
- Container: `max-w-7xl` (wide), `max-w-6xl` (narrow)

## Features Implemented

- [x] Responsive design (mobile, tablet, desktop)
- [x] Semantic HTML structure
- [x] Keyboard navigation and focus states
- [x] ARIA labels on interactive elements
- [x] `prefers-reduced-motion` support
- [x] Page-specific SEO metadata
- [x] OpenGraph and Twitter card metadata
- [x] Sitemap and robots.txt
- [x] Data-driven content configuration
- [x] Interactive agent workflow
- [x] Pixelation research demonstrator
- [x] Hero particle animation
- [x] Scroll-triggered animations

## Features That Are Conceptual Only

| Feature | Label | Notes |
|---------|-------|-------|
| Agent Workflow | Research Concept | Architecture diagram only; no backend agents |
| Intelligent Pixelation | Research Demonstrator | Browser canvas simulation; no quantum backend |
| QML Pipeline | Research | No actual quantum circuits connected |
| Quantum Optimization | Experimental | Conceptual flow; no quantum hardware |
| Contact Form | Server endpoint | Validates and accepts enquiries; no email, CRM, or durable storage is configured |
| Ecosystem Partners | Placeholder | No invented partnerships |

## Known Issues

1. Contact form has no email, CRM, or durable storage configured.
2. Contact rate limiting is process-local; configure host-level rate limiting or WAF protection before production.
3. Pixelation demo uses synthetic generated imagery, not real photos.
4. Hero canvas animation may be GPU-intensive on low-end mobile devices.

## Remaining Work

- [ ] Connect contact form to an email service or CRM, with durable delivery/error monitoring
- [x] Add dynamic OG image (`src/app/opengraph-image.tsx`)
- [ ] Add real partner logos when partnerships are established
- [ ] Add social media links when accounts are created
- [ ] Performance audit with Lighthouse
- [ ] Add real demo imagery for pixelation section
- [ ] Consider adding blog/news section for research updates
- [ ] Deploy to production hosting

## Dependencies

```json
{
  "next": "^15.5.0",
  "react": "^19.1.1",
  "react-dom": "^19.1.1",
  "framer-motion": "^12.23.12",
  "tailwindcss": "^4.1.12",
  "typescript": "^5.9.2"
}
```

## Scientific Claims Requiring Caution

- Never claim quantum advantage or quantum supremacy
- All quantum capabilities use language: researching, exploring, investigating, evaluating
- Agent workflow is labelled "Research Concept"
- Pixelation demo is labelled "Research Demonstrator"
- Research areas have explicit status badges (Research, Experimental, Prototype, etc.)
- No fake partnerships or social accounts

## Important Design Decisions

1. **Greenfield project** — Empty repository; built from scratch with Next.js 15
2. **Data-driven content** — All repeated content in `src/data/` files
3. **No framework migration** — N/A (new project)
4. **Canvas over WebGL** — Hero animation uses 2D canvas for simplicity and performance
5. **No external image dependencies** — Demo visuals generated programmatically
6. **Tailwind v4** — Uses `@theme` directive for design tokens
7. **Node/serverless deployment required** — The contact route is dynamic, so static export is not supported.

## Recommended Next Steps

1. Run `npm run dev` and visually review all pages
2. Deploy to Vercel or similar hosting platform
3. Connect contact form to a transactional email provider or CRM.
4. Configure host-level rate limiting / WAF protection for the contact endpoint.
5. Add analytics when ready for production traffic.
6. Conduct Lighthouse performance audit.
7. Review content with domain experts for scientific accuracy.

## Development Commands

```bash
npm run dev    # Start development server
npm run build  # Production build
npm run start  # Start production server
npm run lint   # Run ESLint
```
