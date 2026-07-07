const TAG_KEYWORDS: Record<string, string[]> = {
  "dosha:vata": ["vata"],
  "dosha:pitta": ["pitta"],
  "dosha:kapha": ["kapha"],
  "goal:immunity-booster": ["immunity", "immune"],
  "goal:digestive-wellness": ["digest", "digestion", "gut", "bloat"],
  "goal:stress-mental-balance": ["stress", "anxious", "anxiety", "sleep", "calm", "mental balance"],
  "goal:weight-management": ["weight", "lose weight", "fat loss"],
  "goal:skin-hair-care": ["skin", "hair", "acne", "glow"],
  "restriction:vegetarian": ["vegetarian"],
  "restriction:vegan": ["vegan"],
  "restriction:gluten-free": ["gluten"],
  "restriction:dairy-free": ["dairy", "lactose"],
  "restriction:nut-free": ["nut allergy", "nut-free", "peanut"],
};

export function buildChatFactTags(message: string): string[] {
  const lower = message.toLowerCase();
  const tags: string[] = [];

  for (const [tag, keywords] of Object.entries(TAG_KEYWORDS)) {
    if (keywords.some((keyword) => lower.includes(keyword))) {
      tags.push(tag);
    }
  }

  return tags;
}
