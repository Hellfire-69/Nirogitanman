const SMALL_TALK_PATTERNS: RegExp[] = [
  /^(hi|hello|hey|hiya|yo|namaste)\b/i,
  /\bhow are you\b/i,
  /\b(thanks|thank you|thx)\b/i,
  /^(ok|okay|cool|great|nice|got it|sounds good|alright)\b/i,
  /\b(bye|goodbye|see you|see ya|take care)\b/i,
  /\bgood (morning|afternoon|evening|night)\b/i,
];

const SMALL_TALK_WORD_LIMIT = 15;

export function isSmallTalk(message: string): boolean {
  const trimmed = message.trim();
  const wordCount = trimmed.split(/\s+/).filter(Boolean).length;

  if (wordCount > SMALL_TALK_WORD_LIMIT) return false;

  return SMALL_TALK_PATTERNS.some((pattern) => pattern.test(trimmed));
}
