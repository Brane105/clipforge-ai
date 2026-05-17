export const triggerWords = [
  "insane",
  "shocking",
  "impossible",
  "hidden",
  "secret",
  "fastest",
  "best",
  "worst",
  "noob",
  "pro",
  "rage",
  "clutch",
  "funny",
];

export function splitTriggerWords(text: string) {
  const pattern = new RegExp(`\\b(${triggerWords.join("|")})\\b`, "gi");
  return text.split(pattern).filter(Boolean);
}
