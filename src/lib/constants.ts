/**
 * No auth is built yet (PRD §4.2 is a separate, later task). Dashboard reads
 * this fixed seeded user until real session auth lands — swap for
 * `supabase.auth.getUser()` then, no query shape changes needed.
 */
export const DEMO_USER_ID = "11111111-1111-1111-1111-111111111111";
