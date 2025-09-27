"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Logo from "@/app/components/Logo";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 2);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(href + "/");
  };

  const NavLabel = ({ text, href }: { text: string; href: string }) => {
    const active = isActive(href);
    return (
      <span className="inline-flex items-center gap-2">
        <span
          aria-hidden
          className={`transition-opacity ${active ? "opacity-100" : "opacity-0"}`}
        >
          ·
        </span>
        <span>{text}</span>
        <span
          aria-hidden
          className={`transition-opacity ${active ? "opacity-100" : "opacity-0"}`}
        >
          ·
        </span>
      </span>
    );
  };

  return (
    <nav
      className={`w-full px-3 md:px-4 sticky top-0 z-50 bg-[var(--color-primary)] border-black/10 transition-shadow ${scrolled ? "shadow-sm" : "shadow-none"}`}
    >
      <div className="max-w-6xl mx-auto h-23 flex justify-between items-center text-black">
        <Link
          href="/"
          className="flex justify-start"
          onClick={() => setOpen(false)}
        >
          <Logo />
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center justify-end gap-8">
          <Link
            href="/recipes"
            className="text-2xl"
            aria-current={isActive("/recipes") ? "page" : undefined}
          >
            <NavLabel text="RECIPES" href="/recipes" />
          </Link>
          <Link
            href="/about"
            className="text-2xl"
            aria-current={isActive("/about") ? "page" : undefined}
          >
            <NavLabel text="ABOUT" href="/about" />
          </Link>
          <Link
            href="/contact"
            className="text-2xl"
            aria-current={isActive("/contact") ? "page" : undefined}
          >
            <NavLabel text="CONTACT" href="/contact" />
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="md:hidden inline-flex items-center justify-center rounded border  px-3 py-2 text-black  cursor-pointer"
        >
          <span className="sr-only">Menu</span>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3 6h18M3 12h18M3 18h18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div className="md:hidden absolute left-0 right-0 top-full bg-[var(--color-primary)] border-t border-black/10 shadow-sm">
          <div className="max-w-6xl mx-auto flex flex-col py-3 text-black">
            <Link
              href="/recipes"
              className="px-4 py-3 text-xl border-b border-black/10"
              onClick={() => setOpen(false)}
            >
              <NavLabel text="RECIPES" href="/recipes" />
            </Link>
            <Link
              href="/about"
              className="px-4 py-3 text-xl border-b border-black/10"
              onClick={() => setOpen(false)}
            >
              <NavLabel text="ABOUT" href="/about" />
            </Link>
            <Link
              href="/contact"
              className="px-4 py-3 text-xl"
              onClick={() => setOpen(false)}
            >
              <NavLabel text="CONTACT" href="/contact" />
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
