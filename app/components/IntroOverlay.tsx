"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { usePathname } from "next/navigation";

export default function IntroOverlay() {
  const pathname = usePathname();
  const showIntro = pathname === "/";

  const [mounted, setMounted] = useState(true);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const logoRef = useRef<HTMLDivElement | null>(null);
  const axlasRef = useRef<HTMLDivElement | null>(null);
  const recipesRef = useRef<HTMLDivElement | null>(null);
  const taglineRef = useRef<HTMLParagraphElement | null>(null);
  const ruleRef = useRef<HTMLDivElement | null>(null);
  const timelineRef = useRef<{ kill: () => void } | null>(null);

  const prefersReduced = useMemo(() => {
    if (typeof window === "undefined") return false;
    return (
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
  }, []);

  // Build AXLAS as individual letter spans for stagger
  const axlasLetters = useMemo(() => ["A", "X", "L", "A", "S"], []);

  // Helper: reveal the #site wrapper and restore scroll
  const revealSite = async () => {
    const site = document.getElementById("site");
    document.documentElement.style.overflow = "";
    document.body.style.overflow = "";
    if (!site) return;
    const gsap = (await import("gsap")).default;
    gsap.set(site, { opacity: 0 });
    gsap.to(site, { opacity: 1, duration: 0.35, ease: "power1.out" });
  };

  // If not homepage, immediately reveal site
  useEffect(() => {
    if (!showIntro) {
      revealSite();
    }
  }, [showIntro]);

  // Focus trap + scroll lock while visible
  useEffect(() => {
    if (!mounted || !showIntro) return;

    // Lock scroll while overlay is visible (both html and body)
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    const root = rootRef.current;

    // Make root focusable and move focus inside
    if (root) {
      if (!root.hasAttribute("tabindex")) root.setAttribute("tabindex", "-1");
      root.focus();
    }

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      const container = rootRef.current;
      if (!container) return;
      const focusable = container.querySelectorAll<HTMLElement>(
        'a[href],button,textarea,input,select,[tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement as HTMLElement | null;
      if (e.shiftKey) {
        if (active === first || active === container) {
          last.focus();
          e.preventDefault();
        }
      } else {
        if (active === last) {
          first.focus();
          e.preventDefault();
        }
      }
    };
    document.addEventListener("keydown", onKeyDown);

    return () => {
      // Restore scroll (both html and body)
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [mounted, showIntro]);

  // Run GSAP timeline (or reduced-motion fallback)
  useEffect(() => {
    if (!mounted || !showIntro) return;

    let cancelled = false;

    if (prefersReduced) {
      const t = setTimeout(() => {
        if (!cancelled) {
          revealSite();
          setMounted(false);
        }
      }, 400);
      return () => {
        cancelled = true;
        clearTimeout(t);
      };
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let tl: any = null;
    (async () => {
      const gsap = (await import("gsap")).default;

      const root = rootRef.current;
      const logo = logoRef.current;
      const axlas = axlasRef.current;
      const recipes = recipesRef.current;
      const tagline = taglineRef.current;
      const rule = ruleRef.current;

      if (!root || !logo || !axlas || !recipes || !tagline || !rule) return;

      // Prepare initial states
      const letterSpans = axlas.querySelectorAll("span");
      gsap.set(root, { opacity: 1 });
      gsap.set(letterSpans, { y: 12, opacity: 0 });
      gsap.set(recipes, { x: -12, opacity: 0 });
      gsap.set(tagline, { opacity: 0 });
      gsap.set(rule, { scaleX: 0, transformOrigin: "left center" });

      tl = gsap.timeline({ defaults: { ease: "power2.out" } });

      // 1) AXLAS letters stagger (slightly slower)
      tl.to(letterSpans, { y: 0, opacity: 1, duration: 0.6, stagger: 0.08 }, 0);

      // 2) RECIPES reveal via transform/opacity (no clipPath)
      tl.to(recipes, { x: 0, opacity: 1, duration: 0.65 }, "<0.05");

      // 3) Tagline fade in (slightly slower)
      tl.to(tagline, { opacity: 1, duration: 0.45 }, ">+0.2");

      // 4) Hairline draw (slightly slower)
      tl.to(rule, { scaleX: 1, duration: 0.8 }, "<");

      // 5) Exit: logo up & fade, then overlay fade and reveal site
      tl.to(
        logo,
        { y: -10, opacity: 0, duration: 0.45, ease: "power1.out" },
        ">+0.35"
      );
      tl.to(
        root,
        {
          opacity: 0,
          duration: 0.45,
          onComplete: () => {
            revealSite();
            setMounted(false);
          },
        },
        "<"
      );

      timelineRef.current = tl;
    })();

    return () => {
      if (timelineRef.current) {
        try {
          timelineRef.current.kill();
        } catch {}
        timelineRef.current = null;
      }
    };
  }, [mounted, showIntro, prefersReduced]);

  if (!showIntro || !mounted) return null;

  return (
    <div
      ref={rootRef}
      role="dialog"
      aria-modal="true"
      aria-label="Site intro"
      className="intro fixed inset-0 z-[999999] bg-[var(--color-primary)] flex items-center justify-center text-black"
    >
      {/* Lockup */}
      <div
        ref={logoRef}
        className="intro-logo flex flex-col items-center gap-2"
      >
        <div
          ref={axlasRef}
          className="intro-axlas text-6xl sm:text-7xl font-black tracking-tight uppercase"
        >
          {axlasLetters.map((ch, i) => (
            <span key={i} className="inline-block opacity-0 translate-y-3">
              {ch}
            </span>
          ))}
        </div>
        <div
          ref={recipesRef}
          className="intro-recipes text-4xl sm:text-5xl font-black uppercase opacity-0 -translate-x-3"
        >
          RECIPES
        </div>
        <p
          ref={taglineRef}
          className="intro-tagline text-sm sm:text-base tracking-wide text-zinc-700 opacity-0"
        >
          AN ARCHIVE OF TASTE
        </p>
        <div
          ref={ruleRef}
          className="intro-rule h-px w-40 bg-black/80 mt-3 origin-left scale-x-0"
        />
      </div>
    </div>
  );
}
