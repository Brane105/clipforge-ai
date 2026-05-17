import { parseProviderJson } from "@/lib/ai/templates";
import { getUsableApiKey } from "@/lib/ai/env";
import { AIProviderResult } from "@/types/generation";

export async function generateWithGemini(prompt: string, signal: AbortSignal): Promise<AIProviderResult> {
  const apiKey = getUsableApiKey(process.env.GEMINI_API_KEY, "GEMINI_API_KEY");
  const models = uniqueModels([process.env.GEMINI_MODEL, "gemini-2.5-flash", "gemini-2.0-flash"]);

  for (const model of models) {
    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`, {
        method: "POST",
        signal,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            responseMimeType: "application/json",
            temperature: 0.8,
            maxOutputTokens: 1800,
          },
        }),
      });

      if (!response.ok) {
        throw new Error(`Gemini ${model} failed with ${response.status}: ${await response.text()}`);
      }

      const data = (await response.json()) as {
        candidates?: { content?: { parts?: { text?: string }[] } }[];
      };
      const text = data.candidates?.[0]?.content?.parts?.map((part) => part.text || "").join("");

      if (!text) {
        throw new Error(`Gemini ${model} returned empty text`);
      }

      return { output: parseProviderJson(text), providerUsed: "Gemini", modelUsed: model };
    } catch (error) {
      if (model === models[models.length - 1]) {
        throw error;
      }
    }
  }

  throw new Error("Gemini failed");
}

function uniqueModels(models: (string | undefined)[]) {
  return Array.from(new Set(models.map((model) => model?.trim()).filter((model): model is string => Boolean(model))));
}
