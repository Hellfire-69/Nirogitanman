const MEDICAL_PATTERNS: RegExp[] = [
  // Dosage / medication instructions
  /\bdos(e|age|ing)\b/i,
  /\bhow (much|many) (should i|to) take\b/i,
  /\b\d+\s?(mg|mcg|ml|milligram|microgram)\b/i,
  /\b(tablet|capsule|pill|injection|syrup)s?\b/i,
  // Medication / drug names and classes
  /\b(paracetamol|ibuprofen|aspirin|acetaminophen|antibiotic|amoxicillin|metformin|insulin|steroid|antidepressant|painkiller|prescription)\b/i,
  // Diagnosis requests
  /\bdiagnos(e|is|ed|ing)\b/i,
  /\bdo i have\b/i,
  /\bwhat('?s| is) wrong with me\b/i,
  /\bam i (sick|dying|having a)\b/i,
  /\bcould (this|it) be\b/i,
  /\bis (this|it) (a symptom|cancer|serious|contagious)\b/i,
  // Drug / herb interactions
  /\binteract(ion)?s?\s?(with|between)\b/i,
  // Disease-specific questions
  /\b(cancer|tumou?r|diabetes|hypertension|covid|coronavirus|asthma|thyroid|arthritis|tuberculosis|hepatitis|kidney (failure|stone)|heart attack|stroke|depression|anxiety disorder|infection|ulcer|pneumonia)\b/i,
];

export function isMedicalMessage(message: string): boolean {
  return MEDICAL_PATTERNS.some((pattern) => pattern.test(message));
}

export const MEDICAL_REDIRECT_MESSAGE =
  "I can't help with medical questions like this — dosages, medications, diagnoses, or specific conditions need a real doctor's judgment. Please book a session through Doctor Consult so a qualified doctor can help you properly.";
