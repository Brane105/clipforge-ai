export function getUsableApiKey(value: string | undefined, name: string) {
  const key = value?.trim();

  if (!key || key.toLowerCase() === "xxxx" || key.includes("PASTE_")) {
    throw new Error(`Missing ${name}`);
  }

  return key;
}
