import Link from "next/link";
import Logo from "@/app/components/Logo";

export default function Footer() {
  return (
    <footer className="border-t border-black/10 pt-8 pb-8 text-black bg-[var(--color-primary)]">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 text-sm items-center">
          {/* Left: Logo */}
          <div className="flex justify-center md:justify-start">
            <Link href="/" className="flex items-center" aria-label="Go home">
              <Logo />
            </Link>
          </div>

          {/* Center: Nav */}
          <nav className="flex flex-wrap justify-center gap-4 md:gap-6 text-lg">
            <Link className="hover:underline" href="/recipes">
              RECIPES
            </Link>
            <Link className="hover:underline" href="/about">
              ABOUT
            </Link>
            <Link className="hover:underline" href="/contact">
              CONTACT
            </Link>
          </nav>

          {/* Right: Socials */}
          <div className="flex justify-center md:justify-end gap-4 md:gap-6 text-lg">
            <Link
              href="https://www.instagram.com/george_axlas/"
              aria-label="Instagram"
              className="min-h-[44px] inline-flex items-center hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram
            </Link>

            <Link
              href="https://www.tiktok.com/@axlas.cooks"
              aria-label="TikTok"
              className="min-h-[44px] inline-flex items-center hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              TikTok
            </Link>

            <Link
              href="mailto:hello@example.com"
              aria-label="Email"
              className="min-h-[44px] inline-flex items-center hover:underline"
            >
              Email
            </Link>
          </div>
        </div>
        <div className="pt-6 text-center opacity-40 text-sm">
          © 2025 | powered by{" "}
          <a
            href="https://github.com/wafflas"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            wafflas
          </a>
        </div>
      </div>
    </footer>
  );
}
