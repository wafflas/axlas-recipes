"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState, useEffect } from "react";

type Season = {
  title: string;
  slug: string;
};

type Recipe = {
  title: string;
  slug: string;
  summary?: string;
  heroImage?: {
    asset?: { url?: string };
    alt?: string;
  };
  prepTime?: number;
  cookTime?: number;
  difficulty?: string;
  seasons?: Season[];
};

export default function RecipesGridClient({
  initialRecipes,
  seasons,
}: {
  initialRecipes: Recipe[];
  seasons: Season[];
}) {
  const [activeSeason, setActiveSeason] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState<number>(9);

  useEffect(() => {
    setVisibleCount(9);
  }, [activeSeason]);

  const seasonOptions: Season[] =
    seasons && seasons.length
      ? seasons
      : [
          { title: "Spring", slug: "spring" },
          { title: "Summer", slug: "summer" },
          { title: "Autumn", slug: "autumn" },
          { title: "Winter", slug: "winter" },
        ];

  const filtered: Recipe[] = useMemo(() => {
    if (!activeSeason) return initialRecipes;
    return initialRecipes.filter((r) =>
      (r.seasons || []).some((s) => s.slug === activeSeason)
    );
  }, [activeSeason, initialRecipes]);

  return (
    <section className="max-w-6xl mx-auto w-full px-4 md:px-0 text-black pt-6">
      <div className="w-full flex flex-col items-center gap-6 md:gap-8 ">
        {activeSeason && (
          <button
            onClick={() => setActiveSeason(null)}
            className="text-lg cursor-pointer transition hover:opacity-80"
            aria-label="Show all recipes"
            style={{
              fontFamily: "var(--font-anton), Arial, Helvetica, sans-serif",
            }}
          >
            SHOW ALL
          </button>
        )}
        <div className="flex flex-wrap justify-center gap-6 md:gap-12 px-2">
          {seasonOptions.map((s) => {
            const isActive = activeSeason === s.slug;
            return (
              <button
                key={s.slug}
                onClick={() => setActiveSeason(s.slug)}
                className={`text-lg md:text-2xl cursor-pointer transition hover:opacity-80 ${
                  isActive ? "underline underline-offset-4" : ""
                }`}
                style={{
                  fontFamily: "var(--font-anton), Arial, Helvetica, sans-serif",
                }}
              >
                {s.title.toUpperCase()}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-10">
        {filtered.slice(0, visibleCount).map((recipe) => {
          const imgUrl = recipe.heroImage?.asset?.url;
          return (
            <Link
              key={recipe.slug}
              href={`/recipes/${recipe.slug}`}
              className="group"
            >
              <article className="flex flex-col gap-3">
                <div className="w-full aspect-[4/3] relative overflow-hidden">
                  {imgUrl ? (
                    <Image
                      src={imgUrl}
                      alt={recipe.heroImage?.alt || recipe.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                    />
                  ) : (
                    <div className="w-full h-full bg-black/10" />
                  )}
                </div>
                <h3
                  className="text-base leading-snug"
                  style={{
                    fontFamily:
                      "var(--font-anton), Arial, Helvetica, sans-serif",
                  }}
                >
                  {recipe.title.toUpperCase()}
                </h3>
                <p
                  className="text-xs md:text-sm opacity-80 flex items-center gap-3"
                  style={{
                    fontFamily:
                      "var(--font-inter), Helvetica, Arial, sans-serif",
                  }}
                >
                  {(() => {
                    const total =
                      (recipe.prepTime || 0) + (recipe.cookTime || 0);
                    const diffRaw = recipe.difficulty || "";
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
                      <>
                        {diffRaw && (
                          <span className="inline-flex items-center gap-1">
                            <span>{diffRaw}</span>
                            {starCount > 0 && (
                              <span aria-hidden className="inline-flex">
                                {Array.from({ length: starCount }).map(
                                  (_, i) => (
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
                      </>
                    );
                  })()}
                </p>
              </article>
            </Link>
          );
        })}
      </div>
      {filtered.length > visibleCount && (
        <div className="mt-8 md:mt-10 flex justify-center">
          <button
            type="button"
            className="uppercase bg-black text-white px-5 py-3 md:px-6 md:py-3 rounded cursor-pointer hover:bg-gray-800 transition"
            style={{ fontFamily: "var(--font-anton), Arial, sans-serif" }}
            onClick={() => setVisibleCount(filtered.length)}
          >
            Show More
          </button>
        </div>
      )}
    </section>
  );
}
