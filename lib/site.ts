import { Sparkles, Swords, Timer, Trophy } from "lucide-react";

export const siteConfig = {
  name: "ClipForge AI",
  url: "https://clipforge-ai.vercel.app",
};

export const features = [
  {
    icon: Sparkles,
    title: "Instant Creator Kits",
    description: "Turn one rough topic into titles, thumbnail text, SEO descriptions, hashtags, and pinned comments.",
  },
  {
    icon: Swords,
    title: "Gaming-First Angles",
    description: "Built around creator niches like GTA, Minecraft, Valorant, Dota 2, Shorts, and streams.",
  },
  {
    icon: Timer,
    title: "Zero-Cost MVP",
    description: "No database, no paid auth, no billing, and no external AI spend. Fast mock generation for validation.",
  },
  {
    icon: Trophy,
    title: "Creator Workflow",
    description: "Copy polished options, regenerate quickly, and use trends as inspiration for fresh angles.",
  },
];

export const homeFaqs = [
  {
    question: "Does ClipForge AI use real AI yet?",
    answer:
      "This MVP keeps generation mock-based so the product workflow can be tested at zero cost before connecting a real AI provider.",
  },
  {
    question: "Is it free to run?",
    answer:
      "Yes. The first build has no database, no auth, no Stripe, and no paid third-party services.",
  },
  {
    question: "Who is this for?",
    answer:
      "It is designed for gaming creators, streamers, Shorts creators, TikTok creators, and anyone testing video hook ideas quickly.",
  },
  {
    question: "Can I copy the generated results?",
    answer:
      "Yes. Every generated block includes copy actions and a toast confirmation.",
  },
];

export type SeoPage = {
  slug: string;
  title: string;
  description: string;
  headline: string;
  badge?: string;
  cta?: string;
  kicker: string;
  body: string[];
  faqs: { question: string; answer: string }[];
};

export const seoPages: SeoPage[] = [
  {
    slug: "youtube-title-generator",
    title: "YouTube Title Generator",
    description:
      "Generate clickable YouTube title ideas, thumbnail hooks, descriptions, hashtags, and pinned comments for your next upload.",
    headline: "Free YouTube Title Generator",
    kicker: "YouTube titles, thumbnail text, descriptions, and hashtags in one workflow.",
    body: [
      "A strong YouTube title needs to make the promise clear before viewers scroll away. ClipForge AI helps creators explore sharper title angles for gaming videos, challenge videos, reactions, streams, and short-form clips.",
      "Use the generator to test viral, funny, emotional, professional, or clickbait-style hooks without starting from a blank page.",
    ],
    faqs: [
      {
        question: "What makes a good YouTube title?",
        answer: "A good title is specific, easy to understand, and gives viewers a reason to click immediately.",
      },
      {
        question: "Can I generate descriptions too?",
        answer: "Yes. The MVP creates title ideas, thumbnail text, descriptions, hashtags, and pinned comments.",
      },
    ],
  },
  {
    slug: "gaming-title-generator",
    title: "Gaming Title Generator",
    description:
      "Create gaming video title ideas for streams, highlights, challenges, walkthroughs, and viral gaming clips.",
    headline: "Free Gaming Title Generator",
    kicker: "Built for gameplay clips, challenge runs, wins, fails, reactions, and streamer moments.",
    body: [
      "Gaming audiences move fast, so your title needs to signal the moment, the stakes, and the payoff. ClipForge AI gives you multiple hook directions from a single topic.",
      "Try it for Minecraft builds, GTA chaos, Valorant clutches, Dota 2 matches, challenge videos, Shorts, TikToks, and Reels.",
    ],
    faqs: [
      {
        question: "Does this work for gaming Shorts?",
        answer: "Yes. Select Shorts, TikTok, or Reels in the generator to frame ideas for short-form feeds.",
      },
      {
        question: "Can streamers use it?",
        answer: "Yes. It works well for stream highlights, clutch moments, funny fails, and recap uploads.",
      },
    ],
  },
  {
    slug: "gta-title-generator",
    title: "GTA Title Generator",
    description:
      "Generate GTA video titles, thumbnail text, hashtags, descriptions, and pinned comment ideas for chaotic gameplay clips.",
    headline: "Free GTA Title Generator",
    kicker: "Make GTA stunts, roleplay, races, heists, fails, and chases easier to package.",
    body: [
      "GTA content works best when the title captures the chaos quickly. ClipForge AI helps package chases, police escapes, RP scenes, heists, money glitches, stunts, and funny moments.",
      "Use it to brainstorm title angles, thumbnail words, descriptions, hashtags, and pinned comments before uploading.",
    ],
    faqs: [
      {
        question: "Can I use this for GTA RP videos?",
        answer: "Yes. GTA RP scenes, police chases, robberies, and character moments fit the generator well.",
      },
      {
        question: "Does it write thumbnail text?",
        answer: "Yes. It includes short, punchy thumbnail text ideas alongside the title options.",
      },
    ],
  },
  {
    slug: "thumbnail-text-generator",
    title: "Thumbnail Text Generator",
    description:
      "Generate punchy thumbnail text ideas for YouTube, Shorts, TikTok, Reels, and gaming videos.",
    headline: "Free Thumbnail Text Generator",
    kicker: "Short visual phrases for thumbnails, shorts covers, and gaming highlight posts.",
    body: [
      "Thumbnail text should be brief, bold, and easy to read at small sizes. ClipForge AI produces compact text hooks that can support a title without repeating it exactly.",
      "Pair the thumbnail text with titles, descriptions, hashtags, and pinned comments to shape a complete upload package.",
    ],
    faqs: [
      {
        question: "How long should thumbnail text be?",
        answer: "Most thumbnail text should stay short, usually two to five words, so viewers can read it quickly.",
      },
      {
        question: "Can I use these ideas for TikTok covers?",
        answer: "Yes. The thumbnail text ideas also work for Shorts, TikTok, Reels, and clip covers.",
      },
    ],
  },
  {
    slug: "shorts-title-generator",
    title: "Shorts Title Generator",
    description:
      "Generate short-form title ideas for YouTube Shorts, TikTok, Reels, and vertical gaming clips.",
    headline: "Free Shorts Title Generator",
    kicker: "Quick title ideas for fast feeds where the first impression decides everything.",
    body: [
      "Short-form titles need to create curiosity without wasting words. ClipForge AI helps you test direct, funny, emotional, viral, and clickbait-style versions for the same clip.",
      "Use it for clutch moments, fails, speedruns, reveals, reactions, and short gaming highlights across YouTube Shorts, TikTok, and Reels.",
    ],
    faqs: [
      {
        question: "Does this support TikTok and Reels?",
        answer: "Yes. The generator includes platform options for Shorts, TikTok, and Reels.",
      },
      {
        question: "Should Shorts titles be different from YouTube titles?",
        answer: "Often, yes. Shorts usually benefit from tighter phrasing and faster curiosity hooks.",
      },
    ],
  },
  {
    slug: "youtube-title-generator-gaming",
    title: "YouTube Title Generator For Gaming",
    description:
      "Generate high-CTR gaming YouTube titles, thumbnail ideas, descriptions, hashtags, and pinned comments.",
    headline: "Free YouTube Title Generator For Gaming",
    kicker: "Built for gaming creators who need faster CTR angles, hooks, and Shorts ideas.",
    body: [
      "Gaming titles need stakes, speed, and a strong curiosity gap. ClipForge AI helps you turn a gameplay idea into clickable title angles without bloating the workflow.",
      "Use niche controls and mock creator patterns to package clips for YouTube, Shorts, and creator discovery.",
    ],
    faqs: [
      {
        question: "Can this generate gaming-specific hooks?",
        answer: "Yes. Pick Gaming, GTA, Minecraft, Dota 2, or Valorant and generate niche-aware titles and hooks.",
      },
      {
        question: "Does it use current trends?",
        answer: "The trends panel can pull popular YouTube videos through the YouTube Data API and pass them into generation.",
      },
    ],
  },
  {
    slug: "youtube-hooks-anime",
    title: "YouTube Hooks For Anime",
    description:
      "Generate curiosity-driven YouTube hooks, thumbnail ideas, descriptions, hashtags, and pinned comments for anime content.",
    headline: "AI YouTube Hooks For Anime Creators",
    kicker: "Create punchy anime hooks that build curiosity fast and keep viewers watching.",
    body: [
      "Anime content lives on emotional stakes, reveals, debates, and character-driven curiosity. ClipForge AI helps package those angles into short hooks and clickable titles.",
      "Use it for episode reactions, character rankings, theory videos, Shorts, and fast commentary ideas.",
    ],
    faqs: [
      {
        question: "Can I use this outside gaming?",
        answer: "Yes. Choose General and describe your anime topic clearly for focused results.",
      },
      {
        question: "What kind of hooks does it create?",
        answer: "It creates concise curiosity hooks optimized for retention, emotional triggers, and short-form pacing.",
      },
    ],
  },
  {
    slug: "viral-shorts-ideas",
    title: "Viral Shorts Ideas",
    description:
      "Generate viral YouTube Shorts ideas, hooks, titles, thumbnail text, hashtags, and creator packaging.",
    headline: "Viral Shorts Ideas Generator",
    kicker: "Turn rough topics and trend context into short-form ideas built for fast feeds.",
    body: [
      "Shorts need immediate stakes and a clean payoff. ClipForge AI generates ideas that are easy to film, easy to caption, and built around a strong opening moment.",
      "Use trend references as inspiration, then regenerate until you find the right format for your channel.",
    ],
    faqs: [
      {
        question: "Does this work for TikTok and Reels too?",
        answer: "Yes. The Shorts ideas are written for vertical short-form pacing and can be adapted across platforms.",
      },
      {
        question: "How many ideas can I generate?",
        answer: "Anonymous free users are limited to 3 generations per day in this MVP architecture.",
      },
    ],
  },
  {
    slug: "tiktok-title-generator",
    title: "TikTok Title Generator",
    description:
      "Generate TikTok titles, hooks, captions, hashtags, and pinned comment ideas for short-form creators.",
    headline: "Free TikTok Title Generator",
    badge: "TikTok Tool",
    cta: "Generate TikTok Ideas",
    kicker: "Create short-form hooks for TikTok videos, gaming clips, reactions, edits, and creator posts.",
    body: [
      "TikTok titles and captions need to create curiosity instantly. ClipForge AI helps creators turn one rough idea into short, direct, high-energy packaging.",
      "Use it for gaming clips, storytime videos, anime edits, creator commentary, challenge videos, and quick reactions.",
    ],
    faqs: [
      {
        question: "Can this generate TikTok hashtags?",
        answer: "Yes. The generator creates hashtags alongside titles, thumbnail text, descriptions, and pinned comments.",
      },
      {
        question: "Should TikTok titles be shorter than YouTube titles?",
        answer: "Usually, yes. TikTok performs best when the hook is immediate and easy to understand while scrolling.",
      },
    ],
  },
  {
    slug: "reels-title-generator",
    title: "Instagram Reels Title Generator",
    description:
      "Generate Instagram Reels titles, cover text, hashtags, descriptions, and pinned comment ideas.",
    headline: "Free Reels Title Generator",
    badge: "Reels Tool",
    cta: "Generate Reels Ideas",
    kicker: "Package Reels with fast hooks, bold cover text, and scroll-friendly creator language.",
    body: [
      "Reels need a strong first impression. ClipForge AI helps creators turn video ideas into titles, cover text, hashtags, and comments that encourage engagement.",
      "Use it for gaming highlights, creator edits, quick tutorials, funny clips, and short-form storytelling.",
    ],
    faqs: [
      {
        question: "Can I use these ideas for Instagram covers?",
        answer: "Yes. Thumbnail text ideas work well as Reels cover text and short visual hooks.",
      },
      {
        question: "Does this work for gaming Reels?",
        answer: "Yes. Choose a gaming niche and describe the clip for better angle ideas.",
      },
    ],
  },
  {
    slug: "youtube-description-generator",
    title: "YouTube Description Generator",
    description:
      "Generate SEO-friendly YouTube descriptions, titles, hashtags, thumbnail text, and pinned comments.",
    headline: "Free YouTube Description Generator",
    badge: "SEO Tool",
    cta: "Generate SEO Descriptions",
    kicker: "Write cleaner upload descriptions with keywords, viewer payoff, and creator calls to action.",
    body: [
      "A good YouTube description helps explain the video, reinforce keywords, and guide viewers toward comments or subscriptions.",
      "ClipForge AI creates SEO-friendly descriptions as part of a full creator packaging workflow.",
    ],
    faqs: [
      {
        question: "Are descriptions generated with SEO in mind?",
        answer: "Yes. Descriptions include topic language, niche terms, and creator-friendly calls to action.",
      },
      {
        question: "Can I use this for Shorts descriptions?",
        answer: "Yes. Keep the strongest first sentence and pair it with relevant hashtags.",
      },
    ],
  },
  {
    slug: "youtube-hashtag-generator",
    title: "YouTube Hashtag Generator",
    description:
      "Generate relevant YouTube hashtags for gaming videos, Shorts, TikToks, Reels, and creator clips.",
    headline: "Free YouTube Hashtag Generator",
    badge: "Hashtag Tool",
    cta: "Generate Hashtags",
    kicker: "Find niche hashtags for discovery without stuffing generic tags into every upload.",
    body: [
      "Hashtags should support the topic, niche, and platform instead of feeling random. ClipForge AI creates hashtags as part of the complete upload kit.",
      "Use it for gaming clips, creator videos, Shorts, TikToks, Reels, and stream highlights.",
    ],
    faqs: [
      {
        question: "How many hashtags does it generate?",
        answer: "The generator creates 20 hashtag ideas for each topic.",
      },
      {
        question: "Are hashtags enough for SEO?",
        answer: "No. Strong titles, descriptions, thumbnails, retention, and topic relevance matter more.",
      },
    ],
  },
  {
    slug: "pinned-comment-generator",
    title: "Pinned Comment Generator",
    description:
      "Generate pinned comment ideas that encourage replies, ratings, and viewer engagement.",
    headline: "Free Pinned Comment Generator",
    badge: "Engagement Tool",
    cta: "Generate Pinned Comments",
    kicker: "Turn viewers into commenters with short prompts, ratings, and next-video questions.",
    body: [
      "Pinned comments can increase engagement when they ask a simple, specific question. ClipForge AI creates pinned comment ideas alongside your titles and descriptions.",
      "Use them to ask viewers to rate a clip, choose the next challenge, or share their own reaction.",
    ],
    faqs: [
      {
        question: "What makes a good pinned comment?",
        answer: "A good pinned comment is short, easy to answer, and connected to the video moment.",
      },
      {
        question: "Does this work for gaming videos?",
        answer: "Yes. It is especially useful for clutch clips, fails, challenges, and funny moments.",
      },
    ],
  },
  {
    slug: "minecraft-title-generator",
    title: "Minecraft Title Generator",
    description:
      "Generate Minecraft video titles, thumbnail text, descriptions, hashtags, and pinned comments.",
    headline: "Free Minecraft Title Generator",
    badge: "Minecraft Tool",
    cta: "Generate Minecraft Titles",
    kicker: "Package Minecraft builds, survival runs, challenges, farms, and funny clips faster.",
    body: [
      "Minecraft content can be about creativity, survival stakes, secrets, builds, or funny mistakes. ClipForge AI helps shape those ideas into clickable creator packaging.",
      "Use it for Minecraft Shorts, survival episodes, build reveals, speedruns, and challenge videos.",
    ],
    faqs: [
      {
        question: "Can it generate Minecraft thumbnail text?",
        answer: "Yes. It creates short visual phrases for thumbnails and Shorts covers.",
      },
      {
        question: "Does this work for survival series?",
        answer: "Yes. Add the episode idea or challenge to get more specific title angles.",
      },
    ],
  },
  {
    slug: "valorant-title-generator",
    title: "Valorant Title Generator",
    description:
      "Generate Valorant video titles, clutch hooks, thumbnail text, hashtags, and pinned comments.",
    headline: "Free Valorant Title Generator",
    badge: "Valorant Tool",
    cta: "Generate Valorant Titles",
    kicker: "Package clutch rounds, ranked clips, ace moments, fails, and funny Valorant highlights.",
    body: [
      "Valorant titles work best when they quickly explain the rank, clutch, mistake, or impossible moment. ClipForge AI gives creators multiple title directions from one clip idea.",
      "Use it for 1v5 clutches, agent plays, ranked grind videos, funny comms, and Shorts.",
    ],
    faqs: [
      {
        question: "Can it generate clutch titles?",
        answer: "Yes. Mention the clutch situation, rank, agent, or final moment for stronger options.",
      },
      {
        question: "Does it generate hashtags too?",
        answer: "Yes. Each generation includes 20 hashtags.",
      },
    ],
  },
];
