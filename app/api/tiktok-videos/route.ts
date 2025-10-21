import { NextRequest, NextResponse } from "next/server";

// TikTok oEmbed API endpoint
const TIKTOK_OEMBED_URL = "https://www.tiktok.com/oembed";
const TIKTOK_PROFILE_URL = "https://www.tiktok.com/@axlas.cooks";

// Function to validate if a TikTok video actually exists
async function validateTikTokVideo(url: string): Promise<boolean> {
  try {
    const response = await fetch(
      `${TIKTOK_OEMBED_URL}?url=${encodeURIComponent(url)}`,
      {
        headers: {
          "User-Agent": "Mozilla/5.0 (compatible; TikTokBot/1.0)",
          Accept: "application/json",
        },
      }
    );

    return response.ok;
  } catch {
    return false;
  }
}

// Function to get TikTok video data via oEmbed with fallbacks
async function getTikTokVideoData(url: string) {
  try {
    console.log(`Attempting oEmbed for: ${url}`);

    // Try oEmbed first
    const response = await fetch(
      `${TIKTOK_OEMBED_URL}?url=${encodeURIComponent(url)}`,
      {
        headers: {
          "User-Agent": "Mozilla/5.0 (compatible; TikTokBot/1.0)",
          Accept: "application/json",
        },
      }
    );

    if (response.ok) {
      const data = await response.json();
      console.log(`oEmbed success for: ${url}`);

      // Log the thumbnail URL for debugging CDN domains
      if (data.thumbnail_url) {
        console.log(`Thumbnail URL: ${data.thumbnail_url}`);
      }

      return {
        title: data.title || "TikTok Video",
        thumbnail: data.thumbnail_url || null,
        author: data.author_name || "@axlas.cooks",
        html: data.html || null,
      };
    } else {
      console.log(
        `oEmbed failed with status ${response.status}, using fallback`
      );
      return getFallbackVideoData();
    }
  } catch (error) {
    console.error("oEmbed failed, using fallback:", error);
    return getFallbackVideoData();
  }
}

// Fallback video data when oEmbed fails
function getFallbackVideoData() {
  // Use a generic placeholder instead of guessing TikTok CDN URLs
  // This will trigger the UI fallback which looks better anyway
  return {
    title: "Latest TikTok Video",
    thumbnail: null, // Let the UI handle the fallback
    author: "@axlas.cooks",
    html: null,
  };
}

// Function to extract video ID from TikTok URL
function extractTikTokVideoId(url: string): string | null {
  const match = url.match(/\/video\/(\d+)/);
  return match ? match[1] : null;
}

// Function to generate TikTok embed URL for preview
function generateTikTokEmbedUrl(url: string): string {
  const videoId = extractTikTokVideoId(url);
  if (!videoId) return url;

  return `https://www.tiktok.com/embed/${videoId}`;
}

// Function to scrape recent videos from TikTok profile page
async function getRecentVideosFromProfile(): Promise<string[]> {
  try {
    console.log("Fetching recent videos from TikTok profile...");

    // Method 1: Try TikTok's public API endpoints first
    const publicApiVideos = await tryPublicApiMethod();
    if (publicApiVideos.length > 0) {
      return publicApiVideos;
    }

    // Method 2: Try alternative scraping methods
    const alternativeVideos = await tryAlternativeScraping();
    if (alternativeVideos.length > 0) {
      return alternativeVideos;
    }

    // Method 3: Use validated fallback videos
    console.log("All scraping methods failed, using validated fallback videos");
    return await getValidatedFallbackVideos();
  } catch (error) {
    console.error("Failed to scrape TikTok profile:", error);
    return await getValidatedFallbackVideos();
  }
}

// Alternative scraping method using different approaches
async function tryAlternativeScraping(): Promise<string[]> {
  try {
    console.log("Trying alternative scraping methods...");

    // Try different user agents and approaches
    const userAgents = [
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1",
    ];

    for (const userAgent of userAgents) {
      try {
        const response = await fetch(TIKTOK_PROFILE_URL, {
          headers: {
            "User-Agent": userAgent,
            Accept:
              "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
            "Accept-Language": "en-US,en;q=0.9",
            "Accept-Encoding": "gzip, deflate, br",
            "Cache-Control": "no-cache",
            Pragma: "no-cache",
          },
        });

        if (response.ok) {
          const html = await response.text();
          const videoIds = extractVideoIdsFromHtml(html);

          if (videoIds.length > 0) {
            const allVideoUrls = videoIds
              .slice(0, 10) // Check more videos to find valid ones
              .map((id) => `https://www.tiktok.com/@axlas.cooks/video/${id}`);

            console.log(
              `Found ${allVideoUrls.length} potential videos, validating...`
            );

            // Validate each video URL
            const validVideoUrls = [];
            for (const url of allVideoUrls) {
              const isValid = await validateTikTokVideo(url);
              if (isValid) {
                validVideoUrls.push(url);
                console.log(`Valid video found: ${url}`);
                if (validVideoUrls.length >= 3) break; // Stop when we have enough
              } else {
                console.log(`Invalid video: ${url}`);
              }
            }

            console.log(
              `Found ${validVideoUrls.length} valid videos using alternative method`
            );
            return validVideoUrls;
          }
        }
      } catch {
        console.log(
          `Alternative method failed with user agent: ${userAgent.substring(0, 50)}...`
        );
        continue;
      }
    }

    return [];
  } catch (error) {
    console.error("Alternative scraping failed:", error);
    return [];
  }
}

// Extract video IDs from HTML using multiple patterns
function extractVideoIdsFromHtml(html: string): string[] {
  const videoIds = new Set<string>();

  // More flexible patterns for video IDs
  const patterns = [
    // Pattern 1: Standard video URLs
    /\/video\/(\d{10,})/g,
    // Pattern 2: JSON data with video IDs
    /"videoId":"(\d{10,})"/g,
    // Pattern 3: Data attributes
    /data-video-id="(\d{10,})"/g,
    // Pattern 4: Href attributes
    /href="[^"]*\/video\/(\d{10,})"/g,
    // Pattern 5: General video ID patterns
    /"id":"(\d{10,})"/g,
    // Pattern 6: TikTok embed patterns
    /embed\/(\d{10,})/g,
  ];

  for (const pattern of patterns) {
    let match;
    while ((match = pattern.exec(html)) !== null) {
      const videoId = match[1];
      // Filter out IDs that are too short or too long
      if (videoId && videoId.length >= 10 && videoId.length <= 25) {
        videoIds.add(videoId);
      }
    }
  }

  return Array.from(videoIds);
}

// Try TikTok's public API methods
async function tryPublicApiMethod(): Promise<string[]> {
  try {
    // Method 1: Try TikTok's web API endpoint
    const webApiUrl = `https://www.tiktok.com/api/user/detail/?uniqueId=axlas.cooks`;

    const response = await fetch(webApiUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        Accept: "application/json, text/plain, */*",
        Referer: "https://www.tiktok.com/@axlas.cooks",
      },
    });

    if (response.ok) {
      const data = await response.json();
      if (data.userInfo && data.userInfo.videoCount > 0) {
        // Try to get video list
        const videoListUrl = `https://www.tiktok.com/api/post/item_list/?secUid=${data.userInfo.user?.secUid}&count=3`;
        const videoResponse = await fetch(videoListUrl, {
          headers: {
            "User-Agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
            Accept: "application/json, text/plain, */*",
            Referer: "https://www.tiktok.com/@axlas.cooks",
          },
        });

        if (videoResponse.ok) {
          const videoData = await videoResponse.json();
          if (videoData.itemList) {
            const allVideoUrls = videoData.itemList
              .slice(0, 10) // Check more videos to find valid ones
              .map(
                (item: { id: string }) =>
                  `https://www.tiktok.com/@axlas.cooks/video/${item.id}`
              );

            console.log(
              `Found ${allVideoUrls.length} potential videos from TikTok web API, validating...`
            );

            // Validate each video URL
            const validVideoUrls = [];
            for (const url of allVideoUrls) {
              const isValid = await validateTikTokVideo(url);
              if (isValid) {
                validVideoUrls.push(url);
                console.log(`Valid video found: ${url}`);
                if (validVideoUrls.length >= 3) break; // Stop when we have enough
              } else {
                console.log(`Invalid video: ${url}`);
              }
            }

            console.log(
              `Found ${validVideoUrls.length} valid videos from TikTok web API`
            );
            return validVideoUrls;
          }
        }
      }
    }
  } catch {
    console.log("TikTok web API method failed, trying profile scraping...");
  }

  return [];
}

// Simple in-memory cache to avoid excessive API calls
const videoCache = {
  data: [] as string[],
  timestamp: 0,
  ttl: 5 * 60 * 1000, // 5 minutes
};

// Check if cache is valid
function isCacheValid(): boolean {
  return (
    videoCache.data.length > 0 &&
    Date.now() - videoCache.timestamp < videoCache.ttl
  );
}

// Get cached videos or fetch new ones
async function getCachedOrFetchVideos(): Promise<string[]> {
  if (isCacheValid()) {
    console.log("Using cached videos");
    return videoCache.data;
  }

  console.log("Cache expired or empty, fetching new videos");
  const videos = await getRecentVideosFromProfile();

  // Update cache
  videoCache.data = videos;
  videoCache.timestamp = Date.now();

  return videos;
}

// Fallback videos in case scraping fails
function getFallbackVideos(): string[] {
  console.log("Using fallback videos");
  return [
    // These are real TikTok videos that should exist
    "https://www.tiktok.com/@axlas.cooks/video/7563006717324217622", // Placeholder - will be validated
    "https://www.tiktok.com/@axlas.cooks/video/7562963997083831574", // Placeholder - will be validated
    "https://www.tiktok.com/@axlas.cooks/video/7562229699628272918", // Placeholder - will be validated
  ];
}

// Get validated fallback videos
async function getValidatedFallbackVideos(): Promise<string[]> {
  const fallbackUrls = getFallbackVideos();
  const validUrls = [];

  console.log("Validating fallback videos...");
  for (const url of fallbackUrls) {
    const isValid = await validateTikTokVideo(url);
    if (isValid) {
      validUrls.push(url);
      console.log(`Valid fallback video: ${url}`);
    } else {
      console.log(`Invalid fallback video: ${url}`);
    }
  }

  return validUrls;
}

export async function GET() {
  try {
    console.log("=== TikTok Videos API Called ===");

    // Automatically fetch the 3 most recent videos from @axlas.cooks profile
    const videoUrls = await getCachedOrFetchVideos();

    console.log(`Retrieved ${videoUrls.length} video URLs:`, videoUrls);

    if (videoUrls.length === 0) {
      console.log("No videos found, returning error response");
      return NextResponse.json({
        success: false,
        error: "No recent videos found",
        videos: [],
        debug: {
          timestamp: new Date().toISOString(),
          cacheValid: isCacheValid(),
        },
      });
    }

    // Fetch video data for each URL using oEmbed
    const videos = [];
    for (const url of videoUrls) {
      console.log(`Fetching oEmbed data for: ${url}`);
      const videoData = await getTikTokVideoData(url);
      // Always create a video object, even if oEmbed fails
      const video = {
        id: extractTikTokVideoId(url) || url,
        url,
        title: videoData.title,
        thumbnail: videoData.thumbnail,
        author: videoData.author,
        embedUrl: generateTikTokEmbedUrl(url),
      };
      videos.push(video);
      console.log(`Successfully processed video: ${video.title}`);
    }

    console.log(`Returning ${videos.length} processed videos`);

    return NextResponse.json({
      success: true,
      videos,
      lastUpdated: new Date().toISOString(),
      source: "auto-scraped",
      count: videos.length,
      debug: {
        totalUrlsFound: videoUrls.length,
        videosProcessed: videos.length,
        cacheValid: isCacheValid(),
      },
    });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch TikTok videos",
        videos: [],
        debug: {
          error: error instanceof Error ? error.message : "Unknown error",
          timestamp: new Date().toISOString(),
        },
      },
      { status: 500 }
    );
  }
}

// Optional: POST endpoint to manually refresh videos
export async function POST(request: NextRequest) {
  try {
    // This could be used to trigger a manual refresh
    // or to add new video URLs

    const body = await request.json();
    const { action } = body;

    if (action === "refresh") {
      // Clear cache and fetch fresh videos
      videoCache.data = [];
      videoCache.timestamp = 0;

      const videoUrls = await getCachedOrFetchVideos();

      return NextResponse.json({
        success: true,
        message: "Videos refreshed successfully",
        timestamp: new Date().toISOString(),
        count: videoUrls.length,
      });
    }

    if (action === "test") {
      // Test endpoint to debug the scraping
      console.log("=== Testing TikTok Scraping ===");

      const testUrls = await getRecentVideosFromProfile();
      const testOEmbed =
        testUrls.length > 0 ? await getTikTokVideoData(testUrls[0]) : null;

      return NextResponse.json({
        success: true,
        testResults: {
          urlsFound: testUrls.length,
          firstUrl: testUrls[0] || null,
          oEmbedTest: testOEmbed ? "Success" : "Failed",
          oEmbedData: testOEmbed,
        },
        timestamp: new Date().toISOString(),
      });
    }

    return NextResponse.json(
      { success: false, error: "Invalid action" },
      { status: 400 }
    );
  } catch {
    return NextResponse.json(
      { success: false, error: "Invalid request" },
      { status: 400 }
    );
  }
}
