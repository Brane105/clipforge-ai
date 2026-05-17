type RateLimitRecord = {
  count: number;
  resetAt: number;
};

type RateLimitResult = {
  allowed: boolean;
  limit: number;
  remaining: number;
  resetAt: Date;
};

const DAY_MS = 24 * 60 * 60 * 1000;
const buckets = new Map<string, RateLimitRecord>();

export async function checkGenerationLimit(request: Request): Promise<RateLimitResult> {
  const { key, limit } = getRateLimitKey(request);

  return checkInMemoryLimit(key, limit);
}

export async function resetGenerationLimit(request: Request) {
  const { key } = getRateLimitKey(request);
  buckets.delete(key);
}

function getRateLimitKey(request: Request) {
  const userId = request.headers.get("x-user-id");
  const identity = userId || getAnonymousIdentity(request);
  const limit = userId ? 10 : 3;
  const key = `${userId ? "user" : "anon"}:${identity}`;

  return { key, limit };
}

function checkInMemoryLimit(key: string, limit: number): RateLimitResult {
  const now = Date.now();
  const current = buckets.get(key);

  if (!current || current.resetAt <= now) {
    const resetAt = now + DAY_MS;
    buckets.set(key, { count: 1, resetAt });
    return { allowed: true, limit, remaining: limit - 1, resetAt: new Date(resetAt) };
  }

  if (current.count >= limit) {
    return {
      allowed: false,
      limit,
      remaining: 0,
      resetAt: new Date(current.resetAt),
    };
  }

  current.count += 1;
  buckets.set(key, current);

  return {
    allowed: true,
    limit,
    remaining: Math.max(limit - current.count, 0),
    resetAt: new Date(current.resetAt),
  };
}

function getAnonymousIdentity(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const realIp = request.headers.get("x-real-ip");
  const userAgent = request.headers.get("user-agent") || "unknown";

  return `${forwardedFor || realIp || "local"}:${userAgent.slice(0, 80)}`;
}
