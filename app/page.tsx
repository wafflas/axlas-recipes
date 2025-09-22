import Image from "next/image";
import Link from "next/link";
import { sanityClient } from "@/sanity/client";
import { featuredRecipesQuery } from "@/sanity/queries";
import { Metadata } from "next";

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
    <main className="w-full" style={{ background: "#FCF8EE" }}>
      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-4 md:px-6 py-10 text-black">
        <header className="mb-6 text-center">
          <h1
            className="text-5xl md:text-8xl leading-[0.95]"
            style={{ fontFamily: "var(--font-anton), Arial, sans-serif" }}
          >
            {"AXLAS RECIPES".toUpperCase()}
          </h1>
          <p
            className="mt-2 text-sm md:text-base font-semibold"
            style={{
              fontFamily: "var(--font-inter), Helvetica, Arial, sans-serif",
            }}
          >
            AN ARCHIVE OF TASTE
          </p>
          <p
            className="mt-3 text-[10px] md:text-xs tracking-wide opacity-90 max-w-3xl mx-auto"
            style={{
              fontFamily: "var(--font-inter), Helvetica, Arial, sans-serif",
            }}
          >
            AXLAS RECIPES IS A MODERN EDITORIAL COLLECTION OF SEASONAL DISHES
            AND BOLD FLAVORS — FEATURING THE CHEF’S NEWEST AND FAVORITE RECIPES.
          </p>
        </header>

        <article className="mt-6">
          <div className="relative w-full aspect-[4/3] md:aspect-[16/9] overflow-hidden rounded-xl">
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

      {/* Featured Recipes Section */}
      <section className="max-w-6xl mx-auto px-4 md:px-6 pb-14 text-black">
        <header className="mb-6 flex items-center gap-3">
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
        </header>

        {rest.length === 0 ? (
          <div
            className="rounded-xl bg-black/5 p-6 text-center text-sm md:text-base"
            style={{
              fontFamily: "var(--font-inter), Helvetica, Arial, sans-serif",
            }}
          >
            No featured recipes yet. Open Studio and toggle Featured on a few
            recipes to showcase them here.
          </div>
        ) : (
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
                  <article className="flex flex-col gap-2 md:gap-3">
                    <div className="relative w-full aspect-square md:aspect-[4/3] overflow-hidden rounded-xl">
                      {url ? (
                        <Image
                          src={url}
                          alt={r.heroImage?.alt || r.title || "Recipe"}
                          fill
                          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 33vw"
                          className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                        />
                      ) : (
                        <div className="w-full h-full bg-black/10" />
                      )}
                    </div>
                    <h3
                      className="text-base leading-snug"
                      style={{
                        fontFamily: "var(--font-anton), Arial, sans-serif",
                      }}
                    >
                      {r.title || "Recipe"}
                    </h3>
                    <p
                      className="text-xs md:text-sm opacity-80 flex items-center gap-3"
                      style={{
                        fontFamily:
                          "var(--font-inter), Helvetica, Arial, sans-serif",
                      }}
                    >
                      {diffRaw && (
                        <span className="inline-flex items-center gap-1">
                          <span>{diffRaw}</span>
                          {starCount > 0 && (
                            <span aria-hidden className="inline-flex">
                              {Array.from({ length: starCount }).map((_, i) => (
                                <svg
                                  key={i}
                                  width="12"
                                  height="12"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M12 3l2.7 5.5 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.8 1-6.1-4.4-4.3 6.1-.9L12 3z"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              ))}
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
                          <svg
                            width="12"
                            height="12"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <circle
                              cx="12"
                              cy="12"
                              r="9"
                              stroke="currentColor"
                              strokeWidth="2"
                            />
                            <path
                              d="M12 7v5l3 2"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                            />
                          </svg>
                        </span>
                      ) : null}
                    </p>
                  </article>
                </Link>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}
