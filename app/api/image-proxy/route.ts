import { NextRequest, NextResponse } from "next/server";

const DEFAULT_UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";

const ALLOWED_HOSTNAMES = new Set<string>([
  // TikTok CDNs (subset; proxy is an escape hatch if unknown host appears)
  "p16-sign-sg.tiktokcdn-us.com",
  "p16-sign.tiktokcdn-us.com",
  "p16-sign-sg.tiktokcdn.com",
  "p16-sign.tiktokcdn.com",
  "p77-sign.tiktokcdn-us.com",
  "p77-sign.tiktokcdn.com",
  "p16-sign-va.tiktokcdn-us.com",
  "p16-sign-va.tiktokcdn.com",
  "p16-pu-sign-no.tiktokcdn-eu.com",
  "p16-pu-sign.tiktokcdn-eu.com",
  "p16-pu-sign-no.tiktokcdn.com",
  "p16-pu-sign.tiktokcdn.com",
  "p77-pu-sign-no.tiktokcdn-eu.com",
  "p77-pu-sign.tiktokcdn-eu.com",
  "p16-pu-sign-va.tiktokcdn-eu.com",
  "p16-pu-sign-va.tiktokcdn.com",
  "p16-sign-no.tiktokcdn-eu.com",
  "p16-sign-no.tiktokcdn.com",
  "p77-sign-no.tiktokcdn-eu.com",
  "p77-sign-no.tiktokcdn.com",
  "p16-sign-sg.tiktokcdn-eu.com",
  "p77-sign-sg.tiktokcdn-eu.com",
  "p16-sign-va.tiktokcdn-eu.com",
  "p77-sign-va.tiktokcdn-eu.com",
]);

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const url = searchParams.get("url");
    if (!url) {
      return NextResponse.json(
        { error: "Missing url parameter" },
        { status: 400 }
      );
    }

    let target: URL;
    try {
      target = new URL(url);
    } catch {
      return NextResponse.json(
        { error: "Invalid url parameter" },
        { status: 400 }
      );
    }

    // Basic allowlist to avoid open proxy abuse
    if (!ALLOWED_HOSTNAMES.has(target.hostname)) {
      return NextResponse.json(
        { error: "Hostname not allowed" },
        { status: 403 }
      );
    }

    const upstream = await fetch(target.toString(), {
      headers: {
        "User-Agent": DEFAULT_UA,
        // Avoid passing along referrer/cookies
        Accept: "image/avif,image/webp,image/apng,image/*,*/*;q=0.8",
      },
      cache: "no-store",
      redirect: "follow",
    });

    if (!upstream.ok) {
      return NextResponse.json(
        { error: `Upstream failed: ${upstream.status}` },
        { status: 502 }
      );
    }

    const contentType = upstream.headers.get("content-type") || "image/jpeg";
    const etag = upstream.headers.get("etag") || undefined;
    const buffer = await upstream.arrayBuffer();

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Cache-Control":
          "public, max-age=300, s-maxage=600, stale-while-revalidate=86400",
        ...(etag ? { ETag: etag } : {}),
      },
    });
  } catch (err) {
    return NextResponse.json({ error: "Image proxy error" }, { status: 500 });
  }
}
