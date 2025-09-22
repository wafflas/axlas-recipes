import type { Metadata } from "next";
import HeroTitle from "../components/HeroTitle";
export const metadata: Metadata = {
  title: "About | AXLAS RECIPES",
  description: "About Axlas Recipes.",
};

export default function AboutPage() {
  return (
    <main className="w-full min-h-screen bg-[#fbf7ea]">
      <HeroTitle title="ABOUT" />
      <section
        className="max-w-5xl mx-auto px-4 md:px-6 text-black pt-6"
        style={{
          fontFamily:
            "var(--font-inter), system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif",
        }}
      >
        <div className="grid md:grid-cols-12 gap-8 md:gap-10">
          <div className="md:col-start-2 md:col-span-10">
            <p className="text-base md:text-xl leading-7 md:leading-8">
              Axlas Recipes is a small editorial archive of the dishes I cook,
              taste, and photograph. I build each recipe around seasonality and
              simple technique—clear steps, honest ingredients, and flavors that
              stand up on their own.
            </p>
            <p className="mt-6 text-base md:text-xl leading-7 md:leading-8">
              I post first on Instagram; here I collect the keepers. Expect bold
              bowls, quiet plates, and notes you can actually use:
              substitutions, prep tips, and both metric/imperial amounts. Browse
              by season—Spring, Summer, Autumn, Winter—or jump straight to what
              you’re craving.
            </p>
            <p className="mt-6 text-base md:text-xl leading-7 md:leading-8">
              I cook with a few rules: respect the ingredient, salt with
              intention, finish with acidity, and let time do its work. Tools I
              reach for daily: a cast-iron pan, a heavy pot for broth, a sharp
              knife, and a ladle that never leaves the stove.
            </p>
            <p className="mt-6 text-base md:text-xl leading-7 md:leading-8">
              This site is a living notebook—recipes, memories, and the little
              choices that make food taste like home. Thanks for being at the
              table.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
