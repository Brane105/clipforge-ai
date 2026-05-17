export type Platform = "YouTube" | "Shorts" | "TikTok" | "Reels";
export type Niche = "Gaming" | "GTA" | "Minecraft" | "Dota 2" | "Valorant" | "General";
export type Tone = "Viral" | "Funny" | "Clickbait" | "Emotional" | "Professional";

export type GeneratorInput = {
  topic: string;
  platform: Platform;
  niche: Niche;
  tone: Tone;
};

export type GeneratedResults = {
  titles: string[];
  thumbnailTexts: string[];
  descriptions: string[];
  hashtags: string[];
  pinnedComments: string[];
};

const toneWords: Record<Tone, string[]> = {
  Viral: ["Insane", "Unreal", "Everyone Missed", "This Changed Everything"],
  Funny: ["I Regret This", "The Funniest", "Pure Chaos", "This Went Wrong"],
  Clickbait: ["You Won't Believe", "I Tried", "The Secret", "Nobody Expected"],
  Emotional: ["My Hardest", "The Moment I", "I Never Forgot", "This Hit Different"],
  Professional: ["Best Strategy", "Complete Breakdown", "Pro Guide", "Smartest Way"],
};

const nicheTags: Record<Niche, string[]> = {
  Gaming: ["gaming", "gamer", "gameplay", "streamer"],
  GTA: ["gta", "gta5", "gtarp", "gtaonline"],
  Minecraft: ["minecraft", "minecraftbuild", "survival", "minecraftshorts"],
  "Dota 2": ["dota2", "moba", "ranked", "dota"],
  Valorant: ["valorant", "valorantclips", "fps", "rankedvalorant"],
  General: ["creator", "viralvideo", "contentcreator", "newvideo"],
};

const platformTags: Record<Platform, string[]> = {
  YouTube: ["youtube", "youtuber", "newupload", "subscribe"],
  Shorts: ["shorts", "youtubeshorts", "shortsfeed", "viralshorts"],
  TikTok: ["tiktok", "fyp", "foryou", "tiktokgaming"],
  Reels: ["reels", "instagramreels", "reelsvideo", "viralreels"],
};

export const defaultResults: GeneratedResults = generateMockResults({
  topic: "solo clutch comeback in ranked",
  platform: "YouTube",
  niche: "Valorant",
  tone: "Viral",
});

export function generateMockResults(input: GeneratorInput): GeneratedResults {
  const topic = normalizeTopic(input.topic, input.niche);
  const [lead, twist, payoff, bonus] = toneWords[input.tone];
  const shortPlatform = input.platform === "YouTube" ? "video" : input.platform;

  return {
    titles: [
      `${lead} ${input.niche} ${topic} That Felt Impossible`,
      `${twist} About This ${input.niche} ${topic}`,
      `${payoff}: ${input.niche} ${topic} Breakdown`,
      `I Turned A Bad Game Into A ${lead} Win`,
      `${input.niche} ${topic} But Every Second Gets Wilder`,
      `The ${input.tone.toLowerCase()} ${input.niche} Moment My Chat Couldn't Handle`,
      `From Zero Hope To Full Comeback In One ${shortPlatform}`,
      `${bonus} To Win More ${input.niche} Matches`,
      `This ${input.niche} Clip Looks Fake But It's Real`,
      `My Cleanest ${input.niche} ${topic} Yet`,
    ],
    thumbnailTexts: [
      "NO WAY",
      "1 HP DREAM",
      "CHAT LOST IT",
      "IMPOSSIBLE WIN",
      "LAST SECOND",
      "BROKEN PLAY",
      "TOO CLEAN",
      "WAIT FOR IT",
      "FULL COMEBACK",
      "HE PANICKED",
    ],
    descriptions: [
      `I took on ${topic} in ${input.niche} and the ending got way more intense than expected. Watch the full ${shortPlatform} and tell me which moment was the cleanest.`,
      `This ${input.niche} upload is packed with momentum swings, clutch decisions, and a finish made for ${input.platform}. Drop your rating in the comments.`,
      `Trying a ${input.tone.toLowerCase()} angle for ${topic}. Like, subscribe, and comment what challenge or clip I should create next.`,
    ],
    hashtags: buildHashtags(input),
    pinnedComments: [
      `Rate this ${input.niche} moment from 1-10. Be honest.`,
      `What should I try next: harder challenge, ranked grind, or funny clips?`,
      `If this ending surprised you, hit like so I know to post more ${input.niche} clips.`,
    ],
  };
}

function normalizeTopic(topic: string, niche: Niche) {
  const trimmed = topic.trim();
  if (!trimmed) {
    return "gaming moment";
  }

  return trimmed
    .replace(/\s+/g, " ")
    .replace(new RegExp(`^${escapeRegExp(niche)}\\s+`, "i"), "")
    .replace(/^./, (letter) => letter.toLowerCase());
}

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function buildHashtags(input: GeneratorInput) {
  const topicTags = input.topic
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 4);

  const rawTags = [
    ...platformTags[input.platform],
    ...nicheTags[input.niche],
    input.tone.toLowerCase(),
    "viral",
    "trending",
    "creator",
    "thumbnail",
    "titles",
    "contentideas",
    "gamingclips",
    "streamclips",
    "highlights",
    "clutch",
    "funnygaming",
    ...topicTags,
  ];

  return Array.from(new Set(rawTags))
    .slice(0, 20)
    .map((tag) => `#${tag}`);
}
