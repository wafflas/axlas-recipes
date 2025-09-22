import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { sanityClient } from "@/sanity/client";
import { recipeBySlugQuery } from "@/sanity/queries";

type RecipeDoc = {
  title: string;
  summary?: string;
  prepTime?: number;
  cookTime?: number;
  totalTime?: number;
  difficulty?: string;
  yield?: string;
  steps?: Array<{ children?: Array<{ text?: string }> }>;
  ingredients?: {
    quantity?: string;
    unit?: string;
    item: string;
    note?: string;
  }[];
  heroImage?: {
    asset?: {
      url?: string;
      metadata?: { dimensions?: { width: number; height: number } };
    };
    alt?: string;
  };
};

export async function generateMetadata(context: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await context.params;
  const data: RecipeDoc | null = await sanityClient.fetch(recipeBySlugQuery, {
    slug,
  });
  return {
    title: data?.title
      ? `${data.title} | AXLAS RECIPES`
      : "Recipe | AXLAS RECIPES",
    description: data?.summary || "Recipe from AXLAS RECIPES",
  };
}

export default async function RecipePage(context: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await context.params;
  const data: RecipeDoc | null = await sanityClient.fetch(recipeBySlugQuery, {
    slug,
  });
  if (!data) {
    notFound();
  }

  const heroUrl = data.heroImage?.asset?.url;

  return (
    <main className="w-full min-h-screen bg-[#fbf7ea]">
      {/* Hero */}
      {heroUrl && (
        <div className="relative max-w-5xl mx-auto px-4 md:px-6 mt-4">
          <div className="relative w-full aspect-[16/9] md:aspect-[21/10] overflow-hidden rounded-xl">
            <Image
              src={heroUrl}
              alt={data.heroImage?.alt || data.title}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1344px) 100vw, 1200px"
            />
          </div>
        </div>
      )}

      <article
        className="max-w-5xl mx-auto px-4 md:px-6 py-10 text-[#1A1A1A]"
        style={{
          fontFamily:
            "var(--font-inter), system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif",
        }}
      >
        <header className="mb-8">
          <h1
            className="text-5xl md:text-6xl leading-tight"
            style={{ fontFamily: "var(--font-anton), Arial, sans-serif" }}
          >
            {data.title}
          </h1>
          {data.summary && (
            <p className="mt-4 text-lg md:text-xl opacity-90">{data.summary}</p>
          )}

          {/* Meta */}
          <div className="mt-6 grid grid-cols-2 md:grid-cols-5 gap-4 text-lg text-black">
            <div>
              <strong className="inline-flex items-center gap-2">
                Prep
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8 21v-2a4 4 0 0 1 4-4h0a4 4 0 0 1 4 4v2"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <circle
                    cx="12"
                    cy="7"
                    r="3"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>
              </strong>
              <div>{data.prepTime ?? 0} min</div>
            </div>
            <div>
              <strong className="inline-flex items-center gap-2">
                Cook
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6 20h12M7 16c0-3 2-5 5-5s5 2 5 5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M8 10c-.5-1.5.5-3 2-3 0-2 3-2 3 0 1.5 0 2.5 1.5 2 3"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </strong>
              <div>{data.cookTime ?? 0} min</div>
            </div>
            <div>
              <strong className="inline-flex items-center gap-2">
                Total
                <svg
                  width="18"
                  height="18"
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
              </strong>
              <div>
                {data.totalTime ?? (data.prepTime || 0) + (data.cookTime || 0)}{" "}
                min
              </div>
            </div>
            <div>
              <strong className="inline-flex items-center gap-2">
                Difficulty
                <svg
                  width="18"
                  height="18"
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
              </strong>
              <div>{data.difficulty || "–"}</div>
            </div>
            <div>
              <strong className="inline-flex items-center gap-2">
                Serves
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 7h16M6 7v10m12-10v10M8 17h8"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <circle
                    cx="9"
                    cy="12"
                    r="1.5"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <circle
                    cx="15"
                    cy="12"
                    r="1.5"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>
              </strong>
              <div>{data.yield || "–"}</div>
            </div>
          </div>
        </header>

        <section className="grid md:grid-cols-5 gap-10">
          {/* Ingredients */}
          <aside className="md:col-span-2">
            <h2
              className="text-2xl mb-4"
              style={{ fontFamily: "var(--font-anton), Arial, sans-serif" }}
            >
              INGREDIENTS
            </h2>
            <ul className="space-y-2 text-base leading-7">
              {(data.ingredients || []).filter(Boolean).map((ing, idx) => (
                <li key={idx} className="list-disc list-inside">
                  {[ing?.quantity, ing?.unit, ing?.item]
                    .filter(Boolean)
                    .join(" ")}
                  {ing?.note ? ` — ${ing.note}` : ""}
                </li>
              ))}
            </ul>
          </aside>

          {/* Steps */}
          <div className="md:col-span-3">
            <h2
              className="text-2xl mb-4"
              style={{ fontFamily: "var(--font-anton), Arial, sans-serif" }}
            >
              STEPS
            </h2>
            <ol className="space-y-6 text-[18px] leading-[1.5]">
              {(data.steps || []).map((block, i) => {
                // simple portable text text renderer
                const text = Array.isArray(block?.children)
                  ? block.children.map((c) => c?.text || "").join("")
                  : "";
                return (
                  <li key={i} className="flex items-start gap-4">
                    <span
                      className="text-xl"
                      style={{
                        fontFamily: "var(--font-anton), Arial, sans-serif",
                      }}
                    >
                      {i + 1}.
                    </span>
                    <p className="flex-1">{text}</p>
                  </li>
                );
              })}
            </ol>
          </div>
        </section>
      </article>
    </main>
  );
}
