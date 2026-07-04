# AGENTS.md — NirogiTanman (Antigravity Workflow)

## Purpose
Defines the agent team, their roles, model assignment, and file boundaries for this project. AGENTS.md takes precedence over any global GEMINI.md rules — this file is the source of truth for this project. No GEMINI.md is used in this project; all rules are scoped here and in `.agents/rules/`.

## Global rules (apply to every agent)
1. Read `PRD.md` and `DESIGN.md` before generating any code. Do not deviate from the locked feature list or color/typography decisions without explicit user approval.
2. Use `motion/react` for animation imports — never `framer-motion`. This has caused build failures before; treat it as a hard rule, not a preference.
3. Do not add UI elements, pages, or components not listed in `PRD.md` without asking first. No unauthorized scope additions.
4. Any missing asset (image, illustration, real data) must use the shared `<Placeholder />` component from `DESIGN.md` §6 and be logged in `PLACEHOLDERS.md` — never silently fake it or skip it.
5. All Supabase schema changes go through `SCHEMA.md` (or the schema section of PRD.md) first — no ad hoc table creation mid-task.
6. Batch feedback into a single prompt file per revision round instead of iterative back-and-forth — consolidate all fixes for a given screen/feature into one instruction set before re-invoking the agent.
7. **No Fabricated Metrics/Stats**: Never invent numbers (e.g. "10k+ users", "95% satisfaction") for prototypes with no real users. Use honest non-numeric framing (e.g. "Built on Time-Tested Ayurvedic Principles") or use explicit "TODO: STAT" placeholders logged in PLACEHOLDERS.md.
8. **Reporting Rule**: At the end of every task, explicitly report which skills and MCP tools were used, even if the answer is "none".

## Agent roles & model assignment

### 1. Architect / Product Manager — **Gemini 3.1 Pro**
- Owns: turning PRD.md into a technical task breakdown, Supabase schema design, route structure, deciding what's in/out of scope per task
- Why this model: larger context handling and structural reasoning suit spec breakdown and architecture decisions better than fast UI iteration
- Output: a `Technical_Specification.md` per feature before implementation starts; waits for explicit approval before handing off

### 2. Frontend/UI Engineer — **Claude Sonnet**
- Owns: implementing landing page, dashboard, and all visual components against `DESIGN.md` tokens and component choices (shadcn/ui, 21st.dev-derived patterns, motion/react)
- Why this model: stronger design-sensitive component output, better at matching a specified visual system exactly
- Constraint: must not introduce its own color choices, fonts, or components outside what DESIGN.md specifies

### 3. Backend/Integration Engineer — **Gemini 3.1 Pro**
- Owns: Supabase schema implementation, auth, booking/slot logic, Groq/AI Studio API integration for diet plan + chat assistant
- Constraint: AI feature prompts must enforce the scope rules from PRD.md §4.6–4.7 (disclaimers, no diagnostic claims, grounding against `wellness_facts` table)

### 4. QA / Review Agent — **Gemini 3.1 Pro**
- Owns: checking the end-to-end happy path from PRD.md §7 works, flagging broken links/errors, verifying no unauthorized scope creep (rule 3) crept in
- Runs after each major feature, not just once at the end

## Workflow (slash-command style)
Suggested `.agents/global_workflows/startcycle.md`:
1. Architect reads PRD.md + DESIGN.md → produces `Technical_Specification.md` for the next feature in build order (§4 of PRD.md) → **wait for user approval**
2. Backend Engineer implements schema/API pieces for that feature
3. Frontend Engineer implements the UI for that feature against DESIGN.md
4. QA Agent verifies against the definition-of-done checklist
5. Loop to the next feature in PRD.md's build order

## File/folder boundaries
- `/app` or `/src` — application code only
- `.agents/` — this file, rules, skills, workflows
- `PRD.md`, `DESIGN.md` — project root, read-only reference (agents don't edit these without approval)
- `PLACEHOLDERS.md` — living checklist, agents may append to it, not delete from it without confirming the asset now exists

## Skills to load for this project
- Copy any relevant globally-installed Antigravity skills into `.agents/skills/` per the known fix (global skills weren't reliably loading in past projects) — confirm loading by asking the agent which skills are available before starting.
- Also check the globally-installed `antigravity-awesome-skills` collection for anything matching this project's stack (Next.js, Supabase, Tailwind, booking/dashboard patterns) and copy matches into `.agents/skills/` the same way.

## MCP servers for this project
Configure in `mcp_config.json` and verify each with one trivial test call before relying on it mid-build:
- **Supabase MCP** — schema/table operations, avoids hand-writing SQL migrations for every change
- **Playwright MCP** — lets the agent actually see rendered output (screenshots, DOM state) instead of guessing whether a page works
- **Context7 MCP** — fetches current library/package docs so agents don't default to outdated APIs or the wrong package name (directly addresses the `framer-motion` vs `motion/react` recurring bug)
- **Obsidian MCP** (light touch) — `npx obsidian-mcp <vault-path>` gives read/write access to an Obsidian vault for a running project log outside the codebase. Optional; skip if it adds setup friction, since this project hasn't used Obsidian before.

## Explicitly not used this sprint
- **claude-mem** — skipped. Requires a background worker service, SQLite + vector store, and a February 2026 community security audit flagged its local API as unauthenticated/high-risk. Not worth the setup cost or risk for a 3-5 day solo sprint.
- **Graphify** (`/graphify` slash command) — recommended instead of claude-mem for the "AI keeps re-scanning the codebase" problem: it's a one-shot local command that builds a `graph.json` + `GRAPH_REPORT.md` map of the project with no server to run. Run it once early, then re-run after major structural changes (e.g. after the Supabase schema and route structure are in place).

## Visual reference enforcement
Per DESIGN.md §1a, the chosen reference screenshots live in `/design-reference/`. Every Frontend/UI Engineer agent invocation must explicitly reference these files and instruct the agent to match their visual tone rather than defaulting to its own styling choices.
