import { parseProviderJson } from "@/lib/ai/templates";
import { getUsableApiKey } from "@/lib/ai/env";
import { AIProviderResult } from "@/types/generation";

export async function generateWithOpenAI(prompt: string, signal: AbortSignal): Promise<AIProviderResult> {
  const apiKey = getUsableApiKey(process.env.OPENAI_API_KEY, "OPENAI_API_KEY");
  const model = process.env.OPENAI_MODEL || "gpt-4o-mini";

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    signal,
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      temperature: 0.8,
      max_tokens: 1800,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: "Return valid JSON only." },
        { role: "user", content: prompt },
      ],
    }),
  });

  if (!response.ok) {
    throw new Error(`OpenAI failed with ${response.status}: ${await response.text()}`);
  }

  const data = (await response.json()) as { choices?: { message?: { content?: string } }[] };
  const text = data.choices?.[0]?.message?.content;

  if (!text) {
    throw new Error("OpenAI returned empty text");
  }

  return { output: parseProviderJson(text), providerUsed: "OpenAI", modelUsed: model };
}
