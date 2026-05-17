import { NextResponse } from "next/server";

type TrendVideo = {
  id: string;
  title: string;
  channelTitle: string;
  thumbnailUrl: string;
  viewCount?: string;
};

type TrendCacheEntry = {
  expiresAt: number;
  videos: TrendVideo[];
};

const ONE_HOUR_MS = 60 * 60 * 1000;
const trendCache = new Map<string, TrendCacheEntry>();

const mockTrends: TrendVideo[] = [
  {
    id: "mock-gta",
    title: "GTA Online chaos moments and impossible escapes",
    channelTitle: "Trend Sample",
    thumbnailUrl: "",
    viewCount: "1240000",
  },
  {
    id: "mock-minecraft",
    title: "Minecraft survival build that went completely wrong",
    channelTitle: "Trend Sample",
    thumbnailUrl: "",
    viewCount: "980000",
  },
  {
    id: "mock-valorant",
    title: "Valorant ranked clutch nobody expected",
    channelTitle: "Trend Sample",
    thumbnailUrl: "",
    viewCount: "870000",
  },
];

const categories: Record<string, string | undefined> = {
  Gaming: "20",
  Music: "10",
  Entertainment: "24",
  General: undefined,
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category") || "Gaming";
  const cacheKey = `${category}:${process.env.YOUTUBE_REGION || "US"}`;
  const cached = trendCache.get(cacheKey);

  if (cached && cached.expiresAt > Date.now()) {
    return NextResponse.json({ source: "cache", videos: cached.videos });
  }

  if (!process.env.YOUTUBE_API_KEY) {
    trendCache.set(cacheKey, { expiresAt: Date.now() + ONE_HOUR_MS, videos: mockTrends });
    return NextResponse.json({ source: "mock", videos: mockTrends });
  }

  try {
    const videos = await fetchYouTubeTrends(category);
    trendCache.set(cacheKey, { expiresAt: Date.now() + ONE_HOUR_MS, videos });
    return NextResponse.json({ source: "youtube", videos });
  } catch (error) {
    console.error("YouTube trends fetch failed", error);
    trendCache.set(cacheKey, { expiresAt: Date.now() + ONE_HOUR_MS, videos: mockTrends });
    return NextResponse.json({ source: "mock-fallback", videos: mockTrends });
  }
}

async function fetchYouTubeTrends(category: string) {
  const params = new URLSearchParams({
    part: "snippet,statistics",
    chart: "mostPopular",
    maxResults: "8",
    regionCode: process.env.YOUTUBE_REGION || "US",
    key: process.env.YOUTUBE_API_KEY || "",
  });
  const categoryId = categories[category];

  if (categoryId) {
    params.set("videoCategoryId", categoryId);
  }

  const response = await fetch(`https://www.googleapis.com/youtube/v3/videos?${params.toString()}`, {
    next: { revalidate: 900 },
  });

  if (!response.ok) {
    throw new Error(`YouTube returned ${response.status}`);
  }

  const data = (await response.json()) as {
    items?: {
      id: string;
      snippet?: {
        title?: string;
        channelTitle?: string;
        thumbnails?: { medium?: { url?: string }; default?: { url?: string } };
      };
      statistics?: { viewCount?: string };
    }[];
  };

  return (data.items || []).map((item) => ({
    id: item.id,
    title: item.snippet?.title || "Untitled trend",
    channelTitle: item.snippet?.channelTitle || "YouTube",
    thumbnailUrl: item.snippet?.thumbnails?.medium?.url || item.snippet?.thumbnails?.default?.url || "",
    viewCount: item.statistics?.viewCount,
  }));
}
