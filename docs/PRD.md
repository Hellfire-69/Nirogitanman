# PRD — NirogiTanman Rebuild (Prototype Sprint)

## 1. What this is
A rebuild of nirogitanman.com — a holistic health platform (Ayurveda + Allopathy + Yoga) — as a **5-day internship prototype**. Goal: prove the concept and architecture well enough that if selected, it gets a real budget (paid APIs, more infra) and grows from this foundation without a rewrite.

**Not a goal for this sprint:** production-scale traffic handling, real doctor onboarding, payment processing, real-time external data feeds. Those are explicitly deferred to a post-selection phase.

## 2. Timeline
3–5 days, solo developer, using Antigravity (multi-agent, Gemini 3.1 Pro + Claude Sonnet) as the build tool.

## 3. Core principle
**Design quality is the top evaluation risk.** Two prior internship projects (Teens Helpline, Disha for India) functioned correctly but scored 1/5 on design. This project must not repeat that — see DESIGN.md for how design is treated as a first-class, day-one deliverable rather than a polish pass.

## 4. In-scope features (build in this order)

### 4.1 Landing page (single page, section-based, button-navigated)
- Hero — value prop, primary CTA to dashboard/sign-up
- Trust bar (integrated care, safe & effective, preventive focus, trusted by thousands)
- Health Programs grid (5 cards: Immunity Booster, Digestive Wellness, Stress & Mental Balance, Weight Management, Skin & Hair Care) — static content, links to Expert/Doctor Consult
- Stats bar (seeded, non-fabricated claims — see DESIGN.md placeholder guidance)
- How It Works (3-step: Assess & Understand → Personalized Plan → Heal & Thrive)
- Closing CTA banner
- Footer

This structure matches the approved GPT mockup (`gpt-mockup-landing-v2.png`) — build against it directly rather than the original leaner outline.

### 4.2 Auth (Supabase Auth)
- Sign up / login (email, or Google OAuth if time allows)
- Session-aware routing to dashboard

### 4.3 Dashboard (main focus — most evaluation weight)
- Overview: upcoming bookings, active diet plan snapshot, quick actions
- Nav to: Expert Consult, Doctor Consult, Diet Plan, AI Ayurvedic Assistant, Profile
- Must be driven by real Supabase data (even if seeded), not static mockup content

### 4.4 Expert Consult (separate page/route)
- List of "experts" (wellness/lifestyle coaches — non-medical) with specialties, seeded profiles
- Request-a-session form → writes to Supabase

### 4.5 Doctor Consult (separate page/route) — real booking logic, fake data
- Doctor list with specialty, seeded profiles + seeded availability slots
- **Real slot-booking flow**: pick doctor → see available slots (from a `slots` table) → book → written to a `bookings` table → slot marked unavailable
- Built so swapping seed data for real doctor records later requires no schema change — see schema note in section 6

### 4.6 AI Diet Plan (scoped, structured — not open-ended)
- Short intake form (goals, dietary restrictions, dosha-style preference if applicable)
- Groq/AI Studio call generates a plan **from a template + a small vetted facts table**, not raw open-ended generation
- Mandatory disclaimer: general wellness guidance, not medical advice, consult a doctor for medical conditions
- Saved to Supabase, shown on dashboard

### 4.7 AI Ayurvedic Assistant (scoped chat)
- Chat UI, but system-prompted to stay within lifestyle/wellness guidance
- Hard rule: never gives dosage, drug-interaction, or diagnostic claims — redirects to Doctor Consult for anything medical
- Responses grounded against the vetted facts table where possible, not pure model output
- Persistent disclaimer visible in the chat UI itself, not just once

## 5. Explicitly cut from this sprint
- Subdomain structure — use routes (`/dashboard`, `/consult/expert`, `/consult/doctor`) inside one Next.js app instead. Revisit subdomain only post-selection if there's a real marketing-site-vs-app reason.
- Real-time external health data feeds — replaced with a small hand-curated facts table.
- Payment/checkout flows.
- Admin panel for doctors/experts to manage their own profiles (seed manually instead).

## 6. Data model note (for schema/AGENTS.md handoff)
Minimum tables: `users`, `doctors`, `experts`, `slots` (doctor_id, datetime, is_booked), `bookings` (user_id, slot_id, status), `diet_plans` (user_id, intake_data, generated_plan, created_at), `chat_logs` (user_id, message, response, created_at — for review/audit), `wellness_facts` (topic, vetted_content, source). Keep foreign keys real, not JSON blobs — this is what makes the "upgrade path" credible later.

## 7. Definition of done for the sprint
A single Vercel URL where a reviewer can, cold, without instructions: land on the page → sign up → see a populated dashboard → book a doctor slot → generate a diet plan → chat with the AI assistant and see a disclaimer → all without errors. Individual feature depth matters less than this happy path working end-to-end.

## 8. Research/fact-checking process
Time-boxed (1-2 hours max) research pass using available research tools (Perplexity free tier, context7 MCP if connected in Antigravity) to seed `wellness_facts` with real, sourced Ayurveda/wellness content — not an ongoing workflow during the build.
