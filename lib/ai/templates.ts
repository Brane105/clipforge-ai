import { generateClipForgeResults } from "@/lib/mock-results";
import { GenerationInput, GenerationOutput } from "@/types/generation";

export function generateWithTemplates(input: GenerationInput): GenerationOutput {
  return generateClipForgeResults({
    topic: input.topic,
    niche: input.niche,
    tone: input.tone,
  });
}

export function normalizeGenerationOutput(raw: unknown): GenerationOutput {
  const data = raw && typeof raw === "object" ? (raw as Partial<GenerationOutput>) : {};

  return {
    titles: takeStrings(data.titles, 10).map((item) => cleanText(item, 120)),
    thumbnailTexts: takeStrings(data.thumbnailTexts, 10).map((item) => cleanThumbnail(item)),
    descriptions: takeStrings(data.descriptions, 3).map((item) => cleanText(item, 700)),
    hashtags: takeStrings(data.hashtags, 20).map((item) => normalizeHashtag(item)),
    pinnedComments: takeStrings(data.pinnedComments, 3).map((item) => cleanText(item, 220)),
  };
}

export function parseProviderJson(text: string): GenerationOutput {
  const cleaned = text
    .replace(/```json/gi, "")
    .replace(/```/g, "")
    .trim();

  try {
    return normalizeGenerationOutput(JSON.parse(cleaned));
  } catch {
    const start = cleaned.indexOf("{");
    const end = cleaned.lastIndexOf("}");

    if (start === -1 || end === -1 || end <= start) {
      throw new Error("Provider did not return a JSON object");
    }

    return normalizeGenerationOutput(JSON.parse(cleaned.slice(start, end + 1)));
  }
}

function takeStrings(value: unknown, count: number) {
  if (!Array.isArray(value)) {
    throw new Error("Provider JSON shape is invalid");
  }

  const strings = value.filter((item): item is string => typeof item === "string" && item.trim().length > 0);

  if (strings.length < count) {
    throw new Error("Provider JSON did not include enough items");
  }

  return strings.slice(0, count);
}

function cleanText(value: string, maxLength: number) {
  return value.replace(/[<>`{}]/g, "").replace(/\s+/g, " ").trim().slice(0, maxLength);
}

function cleanThumbnail(value: string) {
  return cleanText(value, 40).split(/\s+/).slice(0, 5).join(" ").toUpperCase();
}

function normalizeHashtag(value: string) {
  const tag = value
    .replace(/^#*/, "")
    .replace(/[^a-zA-Z0-9_]/g, "")
    .toLowerCase();

  return `#${tag || "youtube"}`;
}
