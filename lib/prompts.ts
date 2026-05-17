import { GenerationInput } from "@/types/generation";

export function buildGenerationPrompt(input: GenerationInput) {
  return `You are a YouTube growth strategist.
Generate high-CTR creator packaging.
Return only valid JSON.
No markdown.
No explanation.

JSON shape:
{
  "titles": [],
  "thumbnailTexts": [],
  "descriptions": [],
  "hashtags": [],
  "pinnedComments": []
}

Input:
Topic: ${input.topic}
Platform: ${input.platform}
Niche: ${input.niche}
Tone: ${input.tone}

Generate exactly:
- 10 viral YouTube titles
- 10 thumbnail text ideas
- 3 SEO descriptions
- 20 hashtags
- 3 pinned comments

Quality rules:
- Titles should be clickable but not fake
- Thumbnail text must be short, max 5 words
- Hashtags should be relevant
- Descriptions should be SEO-friendly
- Gaming outputs should feel energetic
- Avoid boring generic titles
- Keep all copy concise and creator-ready`;
}
