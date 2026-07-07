# CLAUDE.md — NirogiTanman

You are working inside a 3-5 day internship prototype sprint. These rules are non-negotiable and apply to every task in every session, not just the first one.

## Before any code
1. Read PRD.md and DESIGN.md. Do not summarize from memory — actually read the files.
2. State which skills and MCP servers you're using for this task, before writing code. If none, say "none" explicitly. This applies every single task, not just the first.
3. Do not add UI, pages, or components not listed in PRD.md without asking first.

## Hard rules (violating these = redo the work)
- Animation: `motion/react` only. Never `framer-motion`.
- Palette: #005346 (deep teal), #C7503B (terracotta), sand/off-white bg, charcoal text. Never purple/violet/pink.
- Typography: Fraunces (headings) + Bricolage Grotesque (body). Never Inter/Poppins pairing.
- Never fabricate stats/numbers/social proof. Use honest non-numeric framing or `TODO: STAT` logged in PLACEHOLDERS.md.
- Missing assets → shared `<Placeholder />` component, logged in PLACEHOLDERS.md. Never silently fake data.
- Supabase schema changes go through SCHEMA.md / PRD.md §6 first. No ad hoc tables.
- AI features (diet plan, chat assistant) must carry disclaimers, never give diagnostic/dosage/drug-interaction claims, and ground responses against `wellness_facts` where possible.

## MCP usage policy
- Use Context7 MCP before writing any component that touches shadcn/ui, motion/react, or Next.js APIs — don't rely on training-data defaults for these.
- Use Supabase MCP to inspect actual schema/tables before writing any query — don't invent field names.
- Use Playwright MCP to actually screenshot rendered output before claiming a UI task is done — don't assume it looks right.

## Subagent policy
- Main feature generation: single-threaded, do not parallelize.
- Use a subagent only for a post-build compliance review (DESIGN.md + PRD scope) after the main build is done — not during generation.

## Reference
- Design reference screenshots: `/design-reference/` — match their visual tone, don't default to your own styling.
- Approved mockup: `gpt-mockup-landing-v2.png` `1.png`, `2.png`, `3.png`, `4.png`, `5.png`, `6.png`.