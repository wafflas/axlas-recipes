"use client";
import React, { useEffect, useMemo, useRef } from "react";

type GsapContextLike = { revert: () => void } | undefined;

type Props = {
  children: React.ReactNode;
  selector?: string; // child selector, default '> *'
  fromY?: number;
  fromOpacity?: number;
  stagger?: number;
  duration?: number;
  className?: string;
};

export default function StaggerIn({
  children,
  selector = ":scope > *",
  fromY = 14,
  fromOpacity = 0,
  stagger = 0.08,
  duration = 0.45,
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
    const root = ref.current;
    if (!root) return;
    if (prefersReduced) return;

    let ctx: GsapContextLike;
    (async () => {
      const gsap = (await import("gsap")).default;
      ctx = gsap.context(() => {
        let targets: HTMLElement[] = [];
        try {
          if (selector) {
            targets = Array.from(root.querySelectorAll<HTMLElement>(selector));
          } else {
            targets = Array.from(root.children) as unknown as HTMLElement[];
          }
        } catch {
          targets = Array.from(root.children) as unknown as HTMLElement[];
        }
        if (!targets.length) return;
        gsap.set(targets, { opacity: fromOpacity, y: fromY });
        gsap.to(targets, {
          opacity: 1,
          y: 0,
          duration,
          ease: "power2.out",
          stagger,
        });
      }, root);
    })();

    return () => {
      if (ctx) {
        try {
          ctx.revert();
        } catch {}
      }
    };
  }, [selector, fromOpacity, fromY, stagger, duration, prefersReduced]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
