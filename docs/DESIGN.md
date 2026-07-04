# DESIGN.md — NirogiTanman

## Why this file exists
Prior projects (Teens Helpline, Disha for India) worked but scored 1/5 on design. The fix is not "add polish at the end" — it's locking real design decisions before Antigravity writes a single component, so every generated screen inherits them automatically instead of needing a redo pass.

## 1. Design direction
Health/wellness platform blending Ayurveda (organic, grounded, warm) with clinical trust (clean, credible, calm). Explicitly **not**: purple/violet/pink AI-generic gradients, generic SaaS-dashboard-template look, stock-photo hero sections.

**Reference feel (for tone, not copying):** warm earth-tone wellness apps and clean clinical health dashboards — think grounded greens/terracottas/warm neutrals paired with clean clinical whites and a confident accent, not pastel gradients.

## 1a. Visual reference (mandatory — Antigravity must not invent its own direction)
**Status: locked.** Two GPT-generated landing page mockups have been produced and approved as the primary visual reference — `gpt-mockup-landing-v1.png` and `gpt-mockup-landing-v2.png` (the fuller version with programs grid, stats bar, and "How It Works" section). These take priority over the original 7 loose reference screenshots. Save both into `design-reference/` and point every Frontend/UI Engineer prompt at them directly.

The mentor's feedback on the original site was that it looks visually mediocre ("ok ok" / dated) — these mockups are the fix, not a starting point to riff loosely from. Match them closely for palette, typography (see §3, now finalized), spacing, and section structure.

## 2. Color palette
- **Primary (trust/clinical):** deep teal or forest green — conveys health/nature without being generic "medical blue"
- **Secondary (Ayurveda warmth):** warm terracotta / turmeric-gold accent for CTAs and highlights
- **Neutral base:** warm off-white / sand background (not pure white, not gray-slop) + charcoal text (not pure black)
- **Semantic:** success (muted green), warning (amber), error (muted red-brick) — kept desaturated to match the palette, not saturated default red/green
- **Hard rule:** no purple, no violet, no magenta/pink anywhere in the primary or secondary palette.

Define these as CSS variables / Tailwind theme tokens in one place (`globals.css` or `tailwind.config`) — every component pulls from tokens, nothing hardcoded.

## 3. Typography
- **Headings: Fraunces** (Google Fonts) — a variable display serif with a "soft/wonky" optical-size personality. Distinctive and warm without looking like a generic AI-site serif (avoid Playfair Display / Georgia defaults).
- **Body/UI: Bricolage Grotesque** (Google Fonts) — a variable grotesque sans with real character. Avoid Inter/Poppins/Montserrat as the sole body font — that pairing is the fastest visual tell of a templated AI-built site.
- **Size contrast is a deliberate design tool, not an accident**: hero headlines should be genuinely large (not just "bigger than body" — aim dramatic), small caption/eyebrow labels (e.g. "OUR HEALTH PROGRAMS") should be tiny, tight-tracked, and uppercase, and body copy stays modest in between. Avoid a type scale where headings and body sit close in size — that flatness is what makes AI-generated layouts feel uniform and generic. Reference: the GPT landing mockup's small-caps section labels are the right pattern — apply that contrast consistently across the whole site, not just section labels.
- Load both fonts with `next/font/google` and set them as CSS variables so every component pulls from the same two-font system — no ad hoc font-family declarations anywhere.

## 4. Component library
- **shadcn/ui** as the base — accessible, composable, and themeable to the palette above (not its default look)
- Browse **21st.dev** for specific component patterns (hero sections, dashboard cards, pricing/booking cards) to adapt into the shadcn base rather than building from scratch
- **motion/react** (not the old `framer-motion` package name) for animation — this fixes the recurring Antigravity package-reference bug from the last project. Pin this exact import in AGENTS.md so agents don't default to the wrong package name.

## 5. Illustration & icon strategy (the specific gap from last time)
Prior projects lacked section-defining illustrations, meaningful icons, and micro-transitions. Fix:
- Every major landing-page section gets **one deliberate visual anchor** — an icon set (e.g. Lucide, already available in the stack) styled consistently, or a simple custom SVG illustration for the hero and "why us" sections. Not stock photography.
- Icons must be semantically matched to content (a leaf/mortar-pestle motif for Ayurveda, a stethoscope/clinical icon for Allopathy, a lotus/figure motif for Yoga) — not generic arrow/checkmark icons everywhere.
- Micro-interactions: subtle fade/slide-in on scroll for section reveals, hover states on cards, a smooth transition on dashboard tab switches. Small, consistent, not flashy — motion/react's `whileInView` and simple variants cover this without heavy custom animation work.

## 5a. Image & illustration sourcing (fallback order)
1. **Icon library first** — Lucide (already in the stack via shadcn) for all functional icons; never let Antigravity invent inline SVGs for standard icons (arrows, checks, nav icons) since this is a common source of inconsistent, "AI slop" icon style
2. **Free stock/illustration sites** for anything photographic or illustrative — Pixabay for photos, and Dribbble/Behance shots used strictly as visual reference (not license-cleared for direct use — treat these as mood/reference only, not assets to embed)
3. **AI-generated as the last resort**, per-section, only when nothing suitable is found in step 2 — generate manually (e.g. via ChatGPT) and drop the file into `/public/images/`, don't have Antigravity attempt image generation itself
4. Every image still gets logged in `PLACEHOLDERS.md` until a final asset is confirmed in place, regardless of source

## 6. Placeholder convention
Since real doctor photos, illustrations, and some content won't exist yet:
- Use a single reusable `<Placeholder />` component (labeled, bordered, dashed outline, with a visible `TODO: [asset name]` caption) for any image/illustration slot not yet filled — never a broken image icon or empty div.
- Text placeholders should be realistic seed content, not "Lorem ipsum" — use plausible Ayurveda/wellness copy so reviewers see the real information density.
- Every placeholder gets logged in a `PLACEHOLDERS.md` checklist (auto-generated or manually tracked) so nothing silently ships unfinished without being visible as a known gap.

## 7. Layout principles
- Landing page: mostly single-page, section-based, with button/anchor navigation (per the brief) — not a traditional multi-page marketing site
- Dashboard: sidebar or top-nav app shell, card-based content areas, consistent spacing scale (use Tailwind's default scale, don't invent one)
- Mobile-first responsive — a health app with a rough mobile layout undercuts the "industrial level" goal immediately

## 8. What "done" looks like for design
A reviewer should be able to tell, within the first screen, that this is a designed product — not a "days of coding, zero hours of design" build. If in doubt during the sprint, protect time for this file's decisions over adding another feature.
