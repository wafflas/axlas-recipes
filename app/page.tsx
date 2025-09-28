import Image from "next/image";
import Link from "next/link";
import { sanityClient } from "@/sanity/client";
import { featuredRecipesQuery } from "@/sanity/queries";
import { Metadata } from "next";
import IntroOverlay from "./components/IntroOverlay";
import ScrollReveal from "./components/ScrollReveal";
import StaggerIn from "./components/StaggerIn";
import HeroTitle from "./components/HeroTitle";
import { FaClock, FaStar } from "react-icons/fa";

export const metadata: Metadata = {
  title: "AXLAS RECIPES",
  description: "Home page of AXLAS RECIPES",
};

export default async function Home() {
  const featured = (await sanityClient.fetch(featuredRecipesQuery, {
    limit: 6,
  })) as Array<{
    title?: string;
    slug?: string;
    summary?: string;
    heroImage?: { asset?: { url?: string }; alt?: string };
    prepTime?: number;
    cookTime?: number;
    difficulty?: string;
  }>;
  const rest = featured;

  return (
    <main className="w-full bg-[var(--color-primary)]">
      {/* Intro overlay only for homepage */}
      <IntroOverlay />
      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-4 md:px-6 py-10 text-black">
        <header className="mb-12 text-center">
          <HeroTitle
            title="AXLAS RECIPES"
            subtitle="AN ARCHIVE OF TASTE"
            className="mb-8"
          />
          <ScrollReveal>
            <div className="max-w-4xl mx-auto space-y-6">
              <p className="text-lg md:text-xl text-black/70 font-inter leading-relaxed">
                A modern editorial collection of seasonal dishes and bold
                flavors — featuring the chef&#39;s newest and favorite recipes.
              </p>
              <StaggerIn>
                <div className="flex justify-center gap-8 text-sm text-black/50 font-inter tracking-wider uppercase">
                  <span>SEASONAL</span>
                  <span>BOLD</span>
                  <span>MODERN</span>
                  <span>EDITORIAL</span>
                </div>
              </StaggerIn>
            </div>
          </ScrollReveal>
        </header>

        <article className="mt-6">
          <div className="relative w-full aspect-[4/3] md:aspect-[16/9] overflow-hidden">
            <Image
              src="/axlas.png"
              alt="Axlas Recipes hero"
              fill
              priority
              className="object-cover pointer-events-none"
              sizes="100vw"
            />
          </div>
        </article>
      </section>

      {/* Seasonal Cooking Section */}
      <section className="max-w-6xl mx-auto px-4 md:px-6 py-16 text-black">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <ScrollReveal>
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-black">
                SEASONAL COOKING
              </h2>
              <p className="text-lg text-black/70 font-inter leading-relaxed">
                Discover recipes that celebrate the best of each season, crafted
                with bold flavors and modern techniques.
              </p>
              <div className="flex gap-6 text-sm text-black/60 font-inter tracking-wider uppercase">
                <span>SPRING</span>
                <span>SUMMER</span>
                <span>AUTUMN</span>
                <span>WINTER</span>
              </div>
            </div>
          </ScrollReveal>
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image
              src="/seasonal.png"
              alt="Seasonal ingredients"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Featured Recipes Section */}
      <section className="max-w-6xl mx-auto px-4 md:px-6 pb-14 text-black">
        <header className="mb-6 flex items-center gap-3">
          <div className="flex items-center gap-3 w-full border-b border-black pb-2">
            <h2
              className="text-2xl md:text-4xl"
              style={{ fontFamily: "var(--font-anton), Arial, sans-serif" }}
            >
              FEATURED RECIPES
            </h2>
            <svg
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-black"
          >
            <path
              d="M12 5v14M5 12h14"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          </div>
          
        </header>

        {rest.length === 0 ? (
          <div className="bg-black/5 p-8 text-center">
            <div className="max-w-md mx-auto space-y-4">
              <h3 className="text-xl font-bold text-black">
                No Featured Recipes Yet
              </h3>
              <p className="text-sm text-black/60 font-inter">
                Open Studio and toggle Featured on a few recipes to showcase
                them here.
              </p>
            </div>
          </div>
        ) : (
          <StaggerIn>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
              {rest.slice(0, 6).map((r, idx) => {
                const url = r.heroImage?.asset?.url;
                const total = (r.prepTime || 0) + (r.cookTime || 0);
                const diffRaw = r.difficulty || "";
                const diff = diffRaw.toLowerCase();
                const starCount =
                  diff === "hard"
                    ? 3
                    : diff === "medium"
                      ? 2
                      : diff === "easy"
                        ? 1
                        : 0;
                return (
                  <Link
                    key={r.slug || String(idx)}
                    href={`/recipes/${r.slug || ""}`}
                    className="group"
                  >
                    <article className="flex flex-col gap-3 group-hover:transform group-hover:-translate-y-1 transition-all duration-300">
                      <div className="relative w-full aspect-square md:aspect-[4/3] overflow-hidden">
                        {url ? (
                          <Image
                            src={url}
                            alt={r.heroImage?.alt || r.title || "Recipe"}
                            fill
                            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 33vw"
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        ) : (
                          <div className="w-full h-full bg-black/10" />
                        )}
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-lg font-bold text-black group-hover:text-black/80 transition-colors">
                          {r.title?.toUpperCase() || "Recipe"}
                        </h3>
                        {r.summary && (
                          <p className="text-sm text-black/60 font-inter line-clamp-2">
                            {r.summary}
                          </p>
                        )}
                        <div className="flex gap-4 text-xs text-black font-inter">
                          {diffRaw && (
                            <span className="inline-flex items-center gap-1">
                              <span>{diffRaw}</span>
                              {starCount > 0 && (
                                <span aria-hidden className="inline-flex">
                                  {Array.from({ length: starCount }).map(
                                    (_, i) => (
                                      <FaStar key={i} />
                                    )
                                  )}
                                </span>
                              )}
                            </span>
                          )}
                          {total ? (
                            <span
                              className="inline-flex items-center gap-1"
                              aria-label={`Total ${total} minutes`}
                            >
                              <span>{total} min</span>
                              <FaClock width="12" height="12" />
                            </span>
                          ) : null}
                        </div>
                      </div>
                    </article>
                  </Link>
                );
              })}
            </div>
          </StaggerIn>
        )}
      </section>
    </main>
  );
}
