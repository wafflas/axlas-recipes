"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { FaPlay, FaTiktok } from "react-icons/fa";

type ReelData = {
  id: string;
  url: string;
  title?: string;
  thumbnail?: string;
  author?: string;
  embedUrl?: string;
};

type ReelsSectionProps = {
  reels?: ReelData[];
  autoRefresh?: boolean;
  refreshInterval?: number; // in milliseconds
};

const API_ENDPOINT = "/api/tiktok-videos";

// Function to fetch videos from our API
async function fetchTikTokVideos(): Promise<ReelData[]> {
  try {
    const response = await fetch(API_ENDPOINT);
    if (!response.ok) throw new Error("Failed to fetch videos");

    const data = await response.json();
    return data.success ? data.videos : [];
  } catch (error) {
    console.error("Failed to fetch TikTok videos:", error);
    return [];
  }
}

// Skeleton loader component
function ReelSkeleton() {
  return (
    <div className="group cursor-pointer">
      <article className="flex flex-col gap-3 group-hover:transform group-hover:-translate-y-1 transition-all duration-300">
        <div className="relative w-full aspect-[9/16] overflow-hidden bg-black/10 rounded-lg">
          <div className="absolute inset-0 bg-gradient-to-br from-black/20 to-transparent" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              <FaPlay className="text-white/60 ml-1" />
            </div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse" />
        </div>
        <div className="space-y-2">
          <div className="h-4 bg-black/10 rounded animate-pulse" />
          <div className="h-3 bg-black/5 rounded animate-pulse w-3/4" />
        </div>
      </article>
    </div>
  );
}

// Individual reel item component with hover preview
function ReelItem({
  reel,
  onThumbnailLoad,
}: {
  reel: ReelData;
  onThumbnailLoad: (id: string) => void;
}) {
  const [thumbnail, setThumbnail] = useState<string | null>(
    reel.thumbnail || null
  );
  const [isLoading, setIsLoading] = useState(!reel.thumbnail);
  const [hasError, setHasError] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (thumbnail || hasError) return;

    const fetchThumbnail = async () => {
      setIsLoading(true);
      try {
        // Since we're now using the API, thumbnails should already be available
        if (reel.thumbnail) {
          setThumbnail(reel.thumbnail);
          onThumbnailLoad(reel.id);
        } else {
          setHasError(true);
        }
      } catch {
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchThumbnail();
  }, [reel.url, reel.id, reel.thumbnail, thumbnail, hasError, onThumbnailLoad]);

  const handleMouseEnter = () => {
    setShowPreview(true);
  };

  const handleMouseLeave = () => {
    setShowPreview(false);
  };

  const handleClick = () => {
    window.open(reel.url, "_blank", "noopener,noreferrer");
  };

  if (isLoading) {
    return <ReelSkeleton />;
  }

  return (
    <>
      <div
        ref={containerRef}
        className="group cursor-pointer relative"
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <article className="flex flex-col gap-3 group-hover:transform group-hover:-translate-y-1 transition-all duration-300">
          <div className="relative w-full aspect-[9/16] overflow-hidden bg-black/10 rounded-lg border border-black/10 shadow-sm">
            {thumbnail ? (
              <>
                <Image
                  src={thumbnail}
                  alt={reel.title || "TikTok video"}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    // if thumbnail fails to load hide the image and show fallback
                    e.currentTarget.style.display = "none";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-br from-black/20 to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <FaPlay className="text-white ml-1" />
                  </div>
                </div>
                {/* Inline hover video preview (muted) */}
                {showPreview && (reel.embedUrl || reel.url) ? (
                  <iframe
                    title={reel.title || "TikTok preview"}
                    src={
                      (reel.embedUrl ||
                        (reel.url
                          ? `https://www.tiktok.com/embed/${reel.url.match(/\/video\/(\d+)/)?.[1] || ""}`
                          : "")) + "?autoplay=1&mute=1&controls=0"
                    }
                    className="absolute inset-0 w-full h-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    allow="autoplay; encrypted-media"
                    referrerPolicy="no-referrer"
                  />
                ) : null}
              </>
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-pink-500/20 to-purple-500/20 flex items-center justify-center">
                <div className="text-center space-y-2">
                  <FaTiktok className="text-black/60 text-3xl mx-auto" />
                  <p className="text-sm text-black/70 font-inter font-medium">
                    Latest Video
                  </p>
                  <p className="text-xs text-black/50 font-inter">
                    Click to watch on TikTok
                  </p>
                </div>
              </div>
            )}
          </div>
          <div className="space-y-2">
            <h3
              className="text-sm font-bold text-black group-hover:text-black/80 transition-colors line-clamp-2"
              style={{
                fontFamily:
                  "var(--font-inter), 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
              }}
            >
              {reel.title || "TikTok Video"}
            </h3>
            <div className="flex items-center gap-2 text-xs text-black/60 font-inter">
              <FaTiktok className="text-xs" />
              <span>Watch on TikTok</span>
            </div>
          </div>
        </article>
      </div>
    </>
  );
}

export default function ReelsSection({
  reels: initialReels,
  autoRefresh = false,
  refreshInterval = 300000, // 5 minutes default
}: ReelsSectionProps) {
  const [reels, setReels] = useState<ReelData[]>(initialReels || []);
  const [error, setError] = useState<string | null>(null);

  const handleThumbnailLoad = (id: string) => {
    // Future: Could store loaded thumbnails for caching
    console.log(`Thumbnail loaded for reel ${id}`);
  };

  const fetchVideos = async () => {
    setError(null);

    try {
      const videos = await fetchTikTokVideos();
      setReels(videos);
      // no-op timestamp removed from UI
    } catch (err) {
      setError("Failed to fetch latest videos");
      console.error("Error fetching videos:", err);
    }
  };

  // Initial fetch
  useEffect(() => {
    if (!initialReels || initialReels.length === 0) {
      fetchVideos();
    }
  }, [initialReels]);

  // Auto-refresh
  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(() => {
      fetchVideos();
    }, refreshInterval);

    return () => clearInterval(interval);
  }, [autoRefresh, refreshInterval]);

  // If no reels available, show fallback
  if (!reels || reels.length === 0) {
    return (
      <section className="max-w-6xl mx-auto px-4 md:px-6 pb-14 text-black">
        <header className="mb-6 flex items-center gap-3">
          <div className="flex items-center gap-3 w-full border-b border-black pb-2">
            <h2
              className="text-2xl md:text-4xl"
              style={{ fontFamily: "var(--font-anton), Arial, sans-serif" }}
            >
              LATEST REELS
            </h2>
            <FaTiktok className="text-black" />
          </div>
        </header>

        <div className="bg-black/5 p-8 text-center">
          <div className="max-w-md mx-auto space-y-4">
            <FaTiktok className="text-black/40 text-3xl mx-auto" />
            <h3 className="text-xl font-bold text-black">
              Follow @axlas.cooks on TikTok
            </h3>
            <p className="text-sm text-black/60 font-inter">
              Check out our latest cooking videos and behind-the-scenes content.
            </p>
            <a
              href="https://www.tiktok.com/@axlas.cooks"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-black text-white px-6 py-3 rounded hover:bg-gray-800 transition uppercase text-sm font-inter tracking-wider"
            >
              Visit Profile
            </a>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="max-w-6xl mx-auto px-4 md:px-6 pb-14 text-black">
      <header className="mb-6 flex items-center">
        <div className="flex items-center gap-3 w-full border-b border-black pb-2">
          <h2
            className="text-2xl md:text-4xl"
            style={{ fontFamily: "var(--font-anton), Arial, sans-serif" }}
          >
            LATEST REELS
          </h2>
          <FaTiktok className="text-black" />
        </div>
      </header>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-700 text-sm font-inter">{error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 cursor-pointer">
        {reels.map((reel) => (
          <ReelItem
            key={reel.id}
            reel={reel}
            onThumbnailLoad={handleThumbnailLoad}
          />
        ))}
      </div>
    </section>
  );
}
