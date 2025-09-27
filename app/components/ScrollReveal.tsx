"use client";
import React, { useEffect, useMemo, useRef } from "react";

type GsapContextLike = { revert: () => void } | undefined;

let scrollTriggerRegistered = false;

type Props = {
  children: React.ReactNode;
  fromY?: number;
  fromOpacity?: number;
  fromScale?: number;
  duration?: number;
  delay?: number;
  once?: boolean;
  className?: string;
};

export default function ScrollReveal({
  children,
  fromY = 20,
  fromOpacity = 0,
  fromScale = 1,
  duration = 0.6,
  delay = 0,
  once = true,
  className = "",
}: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const prefersReduced = useMemo(() => {
    if (typeof window === "undefined") return false;
    return (
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReduced) return; // no motion

    let ctx: GsapContextLike;
    (async () => {
      const gsap = (await import("gsap")).default;
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      if (!scrollTriggerRegistered) {
        gsap.registerPlugin(ScrollTrigger);
        scrollTriggerRegistered = true;
      }

      ctx = gsap.context(() => {
        gsap.set(el, { opacity: fromOpacity, y: fromY, scale: fromScale });

        const inView = () => {
          const r = el.getBoundingClientRect();
          return r.top < window.innerHeight * 0.85;
        };

        const site = document.getElementById("site");
        const siteOpacity = site
          ? parseFloat(getComputedStyle(site).opacity || "1")
          : 1;
        const needsSiteDelay = siteOpacity < 0.9;

        const play = () =>
          gsap.to(el, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration,
            delay,
            ease: "power2.out",
          });

        if (inView()) {
          if (needsSiteDelay) {
            // wait for IntroOverlay to reveal #site
            setTimeout(play, 450);
          } else {
            play();
          }
        } else {
          gsap.to(el, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration,
            delay,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              once,
            },
          });
          // ensure triggers compute correctly post mount/overlays
          ScrollTrigger.refresh();
          setTimeout(() => ScrollTrigger.refresh(), 150);
        }
      }, el);
    })();

    return () => {
      if (ctx) {
        try {
          ctx.revert();
        } catch {}
      }
    };
  }, [fromOpacity, fromScale, fromY, duration, delay, once, prefersReduced]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
