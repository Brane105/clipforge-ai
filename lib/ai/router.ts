import { generateWithGemini } from "@/lib/ai/gemini";
import { generateWithHuggingFace } from "@/lib/ai/huggingface";
import { generateWithOpenAI } from "@/lib/ai/openai";
import { generateWithTemplates } from "@/lib/ai/templates";
import { buildGenerationPrompt } from "@/lib/prompts";
import { GenerationInput, GenerationResponse, Platform, Niche, Tone, platforms, niches, tones } from "@/types/generation";

const PROVIDER_TIMEOUT_MS = 15_000;

const providers = [
  { name: "Gemini", run: generateWithGemini },
  { name: "OpenAI", run: generateWithOpenAI },
  { name: "Hugging Face", run: generateWithHuggingFace },
];

export async function generateWithAIRouter(rawInput: unknown): Promise<GenerationResponse> {
  const input = validateGenerationInput(rawInput);
  const prompt = buildGenerationPrompt(input);

  for (const provider of providers) {
    try {
      const result = await withTimeout((signal) => provider.run(prompt, signal));
      return {
        ...result.output,
        providerUsed: result.providerUsed,
        modelUsed: result.modelUsed,
        fallbackUsed: provider.name !== "Gemini",
      };
    } catch (error) {
      if (process.env.NODE_ENV === "development") {
        console.warn(`${provider.name} generation failed`, error);
      }
    }
  }

  return {
    ...generateWithTemplates(input),
    providerUsed: "Backup",
    modelUsed: "local-template-generator",
    fallbackUsed: true,
  };
}

function validateGenerationInput(rawInput: unknown): GenerationInput {
  const data = rawInput && typeof rawInput === "object" ? (rawInput as Record<string, unknown>) : {};
  const topic = sanitizeText(data.topic, 140) || "GTA police chase with last-second escape";
  const platform = validateOption(data.platform, platforms, "YouTube");
  const niche = validateOption(data.niche, niches, "Gaming");
  const tone = validateOption(data.tone, tones, "Viral");

  return { topic, platform, niche, tone };
}

function validateOption<T extends string>(value: unknown, allowed: readonly T[], fallback: T): T {
  return typeof value === "string" && allowed.includes(value as T) ? (value as T) : fallback;
}

function sanitizeText(value: unknown, maxLength: number) {
  if (typeof value !== "string") {
    return "";
  }

  return value.replace(/[<>`{}]/g, "").replace(/\s+/g, " ").trim().slice(0, maxLength);
}

async function withTimeout<T>(run: (signal: AbortSignal) => Promise<T>) {
  const controller = new AbortController();
  const timeout = windowlessSetTimeout(() => controller.abort(), PROVIDER_TIMEOUT_MS);

  try {
    return await run(controller.signal);
  } finally {
    clearTimeout(timeout);
  }
}

function windowlessSetTimeout(callback: () => void, ms: number) {
  return setTimeout(callback, ms);
}
