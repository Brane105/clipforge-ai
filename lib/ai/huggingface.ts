import { parseProviderJson } from "@/lib/ai/templates";
import { getUsableApiKey } from "@/lib/ai/env";
import { AIProviderResult } from "@/types/generation";

export async function generateWithHuggingFace(prompt: string, signal: AbortSignal): Promise<AIProviderResult> {
  const apiKey = getUsableApiKey(process.env.HUGGINGFACE_API_KEY, "HUGGINGFACE_API_KEY");
  const model = process.env.HUGGINGFACE_MODEL || "mistralai/Mistral-7B-Instruct-v0.3";

  const response = await fetch("https://router.huggingface.co/v1/chat/completions", {
    method: "POST",
    signal,
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      messages: [
        { role: "system", content: "Return valid JSON only. No markdown. No explanation." },
        { role: "user", content: prompt },
      ],
      temperature: 0.8,
      max_tokens: 1800,
    }),
  });

  if (!response.ok) {
    throw new Error(`Hugging Face failed with ${response.status}: ${await response.text()}`);
  }

  const data = (await response.json()) as { choices?: { message?: { content?: string } }[] };
  const text = data.choices?.[0]?.message?.content;

  if (!text) {
    throw new Error("Hugging Face returned empty text");
  }

  return { output: parseProviderJson(text), providerUsed: "Hugging Face", modelUsed: model };
}
