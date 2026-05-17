export type Platform = "YouTube" | "Shorts" | "TikTok" | "Reels";
export type Niche = "Gaming" | "GTA" | "Minecraft" | "Dota 2" | "Valorant" | "General";
export type Tone = "Viral" | "Funny" | "Clickbait" | "Emotional" | "Professional";

export type GenerationInput = {
  topic: string;
  platform: Platform;
  niche: Niche;
  tone: Tone;
};

export type GenerationOutput = {
  titles: string[];
  thumbnailTexts: string[];
  descriptions: string[];
  hashtags: string[];
  pinnedComments: string[];
};

export type GenerationResponse = GenerationOutput & {
  providerUsed: string;
  modelUsed: string;
  fallbackUsed: boolean;
};

export type AIProviderResult = {
  output: GenerationOutput;
  providerUsed: string;
  modelUsed: string;
};

export const platforms: Platform[] = ["YouTube", "Shorts", "TikTok", "Reels"];
export const niches: Niche[] = ["Gaming", "GTA", "Minecraft", "Dota 2", "Valorant", "General"];
export const tones: Tone[] = ["Viral", "Funny", "Clickbait", "Emotional", "Professional"];
