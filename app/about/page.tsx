import type { Metadata } from "next";
import HeroTitle from "../components/HeroTitle";
export const metadata: Metadata = {
  title: "About | AXLAS RECIPES",
  description: "About Axlas Recipes.",
};

export default function AboutPage() {
  return (
    <main className="w-full min-h-screen bg-[var(--color-primary)]">
      <HeroTitle title="ABOUT" subtitle="THE STORY BEHIND THE RECIPES" />
      <section className="max-w-4xl mx-auto px-4 md:px-6 py-12 text-black">
        <div className="space-y-8">
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-black">THE ARCHIVE</h2>
            <p className="text-lg text-black/70 font-inter leading-relaxed">
              Axlas Recipes is a small editorial archive of the dishes I cook,
              taste, and photograph. I build each recipe around seasonality and
              simple technique—clear steps, honest ingredients, and flavors that
              stand up on their own.
            </p>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-black">THE PROCESS</h2>
            <p className="text-lg text-black/70 font-inter leading-relaxed">
              I post first on Instagram; here I collect the keepers. Expect bold
              bowls, quiet plates, and notes you can actually use:
              substitutions, prep tips, and both metric/imperial amounts. Browse
              by season—Spring, Summer, Autumn, Winter—or jump straight to what
              you're craving.
            </p>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-black">THE PHILOSOPHY</h2>
            <p className="text-lg text-black/70 font-inter leading-relaxed">
              I cook with a few rules: respect the ingredient, salt with
              intention, finish with acidity, and let time do its work. Tools I
              reach for daily: a cast-iron pan, a heavy pot for broth, a sharp
              knife, and a ladle that never leaves the stove.
            </p>
          </div>

          <div className="space-y-6 pt-8 border-t border-black/10">
            <p className="text-lg text-black/70 font-inter leading-relaxed italic">
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
