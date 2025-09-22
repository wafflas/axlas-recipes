import type { Metadata } from "next";
import HeroTitle from "../components/HeroTitle";
import { sanityClient } from "@/sanity/client";
import { recipesGridQuery, seasonsListQuery } from "@/sanity/queries";
import RecipesGridClient from "../components/RecipesGridClient";

export const metadata: Metadata = {
  title: "Recipes | AXLAS RECIPES",
  description: "Browse recipes by season and tags.",
};

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
  seasons?: Season[];
};

export default async function RecipesPage() {
  const [recipes, seasons]: [Recipe[], Season[]] = await Promise.all([
    sanityClient.fetch(recipesGridQuery, { season: undefined }),
    sanityClient.fetch(seasonsListQuery),
  ]);

  return (
    <main className="w-full min-h-screen mb-10">
      <HeroTitle title="RECIPES" />
      <RecipesGridClient initialRecipes={recipes} seasons={seasons} />
    </main>
  );
}
