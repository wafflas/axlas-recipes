import Link from "next/link";
import Logo from "@/app/components/Logo";

export default function Footer() {
  return (
    <footer className="mt-1 border-t border-black/10 pt-8 pb-8 text-black">
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
            <Link href="/recipes">RECIPES</Link>
            <Link href="/about">ABOUT</Link>
            <Link href="/contact">CONTACT</Link>
          </nav>

          {/* Right: Socials */}
          <div className="flex justify-center md:justify-end gap-4 md:gap-6 text-lg">
            <a
              href="#"
              aria-label="Instagram"
              className="min-h-[44px] inline-flex items-center"
            >
              Instagram
            </a>
            <a
              href="#"
              aria-label="TikTok"
              className="min-h-[44px] inline-flex items-center"
            >
              TikTok
            </a>
            <a
              href="mailto:hello@example.com"
              aria-label="Email"
              className="min-h-[44px] inline-flex items-center"
            >
              Email
            </a>
          </div>
        </div>
        <div className="mt-6 text-center opacity-40 text-sm">
          © 2025 | POWERED BY{" "}
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
