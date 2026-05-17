import { Niche, Tone } from "@/lib/mock-generator";

export type ClipForgeInput = {
  topic: string;
  niche: Niche;
  tone: Tone;
};

export type ClipForgeResults = {
  titles: string[];
  thumbnailTexts: string[];
  descriptions: string[];
  hashtags: string[];
  pinnedComments: string[];
};

const nicheHashtags: Record<Niche, string[]> = {
  Gaming: ["#gaming", "#gamingclips", "#streamer", "#gameplay"],
  GTA: ["#gta", "#gta5", "#gtaonline", "#gtarp"],
  Minecraft: ["#minecraft", "#minecraftshorts", "#survival", "#minecraftbuilds"],
  "Dota 2": ["#dota2", "#moba", "#ranked", "#dota"],
  Valorant: ["#valorant", "#valorantclips", "#clutch", "#fps"],
  General: ["#youtube", "#creator", "#viralvideo", "#contentcreator"],
};

const toneBadges: Record<Tone, string[]> = {
  Viral: ["High CTR", "Short", "Gaming"],
  Funny: ["Funny", "Short", "Gaming"],
  Clickbait: ["High CTR", "Secret", "Emotional"],
  Emotional: ["Emotional", "Story", "High CTR"],
  Professional: ["SEO", "Clean", "Creator"],
};

export function getToneBadges(tone: Tone) {
  return toneBadges[tone] || ["High CTR", "SEO"];
}

export function generateClipForgeResults(input: ClipForgeInput): ClipForgeResults {
  const topic = normalizeTopic(input.topic);
  const niche = input.niche;
  const isGta = niche === "GTA" || /\bgta\b/i.test(topic);
  const isClutch = /clutch|1v|1 hp|1hp|last-second|last second/i.test(topic);
  const subject = isGta ? "GTA" : niche === "General" ? "YouTube" : niche;

  return {
    titles: buildTitles(topic, subject, isGta, isClutch),
    thumbnailTexts: buildThumbnailTexts(isGta, isClutch),
    descriptions: [
      `Watch this ${subject} moment turn into a high-stakes creator clip with a wild setup, a tense middle, and a payoff made for replay value. Drop your rating in the comments and subscribe for more fast gaming highlights.`,
      `This video breaks down a ${topic} with the kind of timing, pressure, and chaos creators love. Perfect for fans of clutch plays, funny moments, and short-form gaming content.`,
      `A fast ${subject} highlight built around suspense, momentum, and a final moment worth watching twice. Like the video if this ending caught you off guard.`,
    ],
    hashtags: buildHashtags(input, topic),
    pinnedComments: [
      `Rate this ${subject} moment from 1-10. Be brutally honest.`,
      "What should I try next: harder challenge, funnier clips, or ranked chaos?",
      "If this ending surprised you, I am posting more clips like this.",
    ],
  };
}

function buildTitles(topic: string, subject: string, isGta: boolean, isClutch: boolean) {
  const cleanTopic = toTitleTopic(topic);

  if (isGta) {
    return [
      "I Escaped GTA Cops With 1HP Left",
      "This GTA Chase Was Almost Impossible",
      "The Craziest Police Escape in GTA",
      "No Way This Actually Worked",
      "I Found The Secret Escape Route in GTA",
      "GTA Cops Had Me Trapped Until This Happened",
      "The Fastest GTA Escape I Have Ever Hit",
      "This GTA Police Chase Turned Into Pure Rage",
      "From Noob Mistake To Pro Escape in GTA",
      "The Funniest GTA Chase Ending Ever",
    ];
  }

  if (isClutch) {
    return [
      `I Hit The Most Insane ${subject} Clutch`,
      `This ${subject} Comeback Was Almost Impossible`,
      `No One Expected This ${subject} Ending`,
      `The Hidden Play That Saved My Game`,
      `From Noob Panic To Pro Clutch`,
      `This 1HP Moment Made Everyone Rage`,
      `The Best ${subject} Clutch I Have Ever Had`,
      `This ${subject} Play Looks Fake But It Is Real`,
      `I Survived The Worst Start Possible`,
      `The Secret To Winning This ${subject} Fight`,
    ];
  }

  return [
    `I Tried ${cleanTopic} And This Happened`,
    `${cleanTopic} Went Completely Wrong`,
    `This ${subject} Moment Was Almost Impossible`,
    `The Hidden Trick That Changed Everything`,
    `No Way ${cleanTopic} Actually Worked`,
    `The Best ${subject} Clip From ${cleanTopic}`,
    `${cleanTopic} Turned Into Pure Chaos`,
    `This Secret Play Made Everyone Rage`,
    `From Noob Start To Pro Finish`,
    `The Fastest Way To Win This ${subject} Challenge`,
    `This ${cleanTopic} Ending Was Shocking`,
  ];
}

function buildThumbnailTexts(isGta: boolean, isClutch: boolean) {
  if (isGta) {
    return ["1HP ESCAPE", "NO WAY", "COPS LOST ME", "IMPOSSIBLE", "LAST SECOND", "SECRET ROUTE", "PURE CHAOS", "HE PANICKED", "TOO FAST", "GTA RAGE"];
  }

  if (isClutch) {
    return ["1HP CLUTCH", "IMPOSSIBLE", "NO WAY", "LAST SECOND", "CHAT LOST IT", "TOO CLEAN", "PRO PLAY", "WAIT FOR IT", "RAGE MODE", "BEST CLUTCH"];
  }

  return ["NO WAY", "INSANE", "SECRET PLAY", "WAIT FOR IT", "TOO FUNNY", "BEST MOMENT", "HIDDEN TRICK", "PURE CHAOS", "PRO MOVE", "SHOCKING"];
}

function buildHashtags(input: ClipForgeInput, topic: string) {
  const topicTags = topic
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 5)
    .map((tag) => `#${tag}`);

  return Array.from(
    new Set([
      ...nicheHashtags[input.niche],
      "#shorts",
      "#youtubeshorts",
      "#viral",
      "#trending",
      "#thumbnail",
      "#youtubetitles",
      "#creator",
      "#highlights",
      "#funnygaming",
      "#clutch",
      "#streamclips",
      "#contentideas",
      "#fyp",
      ...topicTags,
    ]),
  ).slice(0, 20);
}

function normalizeTopic(topic: string) {
  return topic.trim().replace(/\s+/g, " ") || "GTA police chase with last-second escape";
}

function toTitleTopic(topic: string) {
  return topic
    .replace(/[|]/g, "-")
    .replace(/\s*-\s*Part\s*\d+$/i, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 70);
}
