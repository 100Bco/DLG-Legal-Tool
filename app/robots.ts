import type { MetadataRoute } from "next";
import { site, absoluteUrl } from "@/lib/site";

// Required for `output: export` — emit a static robots.txt at build time.
export const dynamic = "force-static";

/**
 * robots.txt — we WANT to be crawled, by both search engines and AI crawlers,
 * so the whole site is open. AI user-agents (GPTBot, ClaudeBot, PerplexityBot,
 * Google-Extended, etc.) are explicitly welcomed for full-content access.
 */
export default function robots(): MetadataRoute.Robots {
  const aiCrawlers = [
    "GPTBot",
    "OAI-SearchBot",
    "ChatGPT-User",
    "ClaudeBot",
    "Claude-User",
    "Claude-SearchBot",
    "anthropic-ai",
    "PerplexityBot",
    "Perplexity-User",
    "Google-Extended",
    "Applebot",
    "Applebot-Extended",
    "Bytespider",
    "CCBot",
    "cohere-ai",
    "Meta-ExternalAgent",
  ];

  return {
    rules: [
      // Everyone (including standard search engines) may crawl everything.
      { userAgent: "*", allow: "/" },
      // Be explicit for AI crawlers so there is no ambiguity that they may read.
      ...aiCrawlers.map((ua) => ({ userAgent: ua, allow: "/" })),
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
    host: site.url,
  };
}
