import { config as loadEnv } from "dotenv";
loadEnv({ path: ".env.local" });
import { createClient } from "@sanity/client";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-09-22",
  token: process.env.SANITY_API_READ_TOKEN, // must have write perms
  useCdn: false,
});

type Seed = {
  title: string;
  summary: string;
  seasons: ("spring" | "summer" | "autumn" | "winter")[];
  imageUrl: string;
  alt: string;
  ingredients: {
    quantity?: string;
    unit?: string;
    item: string;
    note?: string;
  }[];
  steps: string[];
  prep?: number;
  cook?: number;
  yield?: string;
  difficulty?: "Easy" | "Medium" | "Hard";
  featured?: boolean;
};

const seeds: Seed[] = [
  {
    title: "Ramen with a Savory Broth and Tender Dumplings",
    summary: "Deep, savory broth with silky noodles and hand‑folded dumplings.",
    seasons: ["winter"],
    imageUrl:
      "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1200&auto=format&fit=crop",
    alt: "Bowl of ramen with eggs and pork",
    ingredients: [
      { quantity: "2", unit: "tbsp", item: "soy sauce" },
      { quantity: "1", unit: "l", item: "chicken stock" },
      { quantity: "200", unit: "g", item: "fresh ramen noodles" },
      { item: "dumplings", note: "8–10 pieces" },
    ],
    steps: [
      "Warm the stock until steaming; season with soy.",
      "Cook the noodles until al dente.",
      "Heat the dumplings gently in the broth; ladle into bowls.",
    ],
    prep: 10,
    cook: 20,
    yield: "Serves 2",
    difficulty: "Easy",
    featured: true,
  },
  {
    title: "Fresh Tomatoes and Mozzarella with Basil",
    summary: "Ripe tomatoes, creamy mozzarella, and basil—simple and bright.",
    seasons: ["summer"],
    imageUrl:
      "https://images.unsplash.com/photo-1478144592103-25e218a04891?q=80&w=1200&auto=format&fit=crop",
    alt: "Tomato and mozzarella salad",
    ingredients: [
      { quantity: "3", item: "ripe tomatoes", note: "thickly sliced" },
      { quantity: "200", unit: "g", item: "mozzarella", note: "torn" },
      { item: "fresh basil", note: "handful" },
      { quantity: "2", unit: "tbsp", item: "olive oil" },
    ],
    steps: [
      "Arrange tomatoes and mozzarella on a plate.",
      "Scatter basil; drizzle with olive oil; season lightly.",
    ],
    prep: 8,
    cook: 0,
    yield: "Serves 2",
    difficulty: "Easy",
  },
  {
    title: "Risotto with Parmesan and Herbs",
    summary: "Creamy risotto finished with parmesan and fresh herbs.",
    seasons: ["spring"],
    imageUrl:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1200&auto=format&fit=crop",
    alt: "Risotto in a bowl",
    ingredients: [
      { quantity: "1", unit: "cup", item: "arborio rice" },
      { quantity: "1", unit: "l", item: "vegetable stock", note: "warm" },
      { quantity: "40", unit: "g", item: "parmesan", note: "grated" },
      { item: "mixed herbs", note: "finely chopped" },
    ],
    steps: [
      "Toast rice, ladle in stock gradually and stir until creamy.",
      "Finish with parmesan and herbs; rest 2 minutes.",
    ],
    prep: 10,
    cook: 20,
    yield: "Serves 2",
    difficulty: "Medium",
  },
  {
    title: "Charred Broccolini with Chili and Lemon",
    summary: "Crisp-tender broccolini with chili heat and bright lemon.",
    seasons: ["spring", "summer"],
    imageUrl:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=1200&auto=format&fit=crop",
    alt: "Charred broccolini on plate",
    ingredients: [
      { quantity: "400", unit: "g", item: "broccolini" },
      { quantity: "1", unit: "tbsp", item: "olive oil" },
      { item: "chili flakes", note: "pinch" },
      { item: "lemon", note: "to finish" },
    ],
    steps: [
      "Sear broccolini in hot pan with oil until charred at edges.",
      "Toss with chili and lemon; season to taste.",
    ],
    prep: 5,
    cook: 8,
    yield: "Serves 2",
    difficulty: "Easy",
  },
  {
    title: "Slow-Roasted Tomatoes on Toast",
    summary: "Jammy roasted tomatoes spooned over crisp toast.",
    seasons: ["summer", "autumn"],
    imageUrl:
      "https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?q=80&w=1200&auto=format&fit=crop",
    alt: "Tomatoes on toast",
    ingredients: [
      { quantity: "500", unit: "g", item: "cherry tomatoes" },
      { quantity: "2", unit: "tbsp", item: "olive oil" },
      { item: "sourdough", note: "toasted" },
    ],
    steps: [
      "Roast tomatoes low and slow until jammy.",
      "Spoon over toast; drizzle oil; season.",
    ],
    prep: 10,
    cook: 45,
    yield: "Serves 2",
    difficulty: "Easy",
  },
  {
    title: "Citrus and Fennel Salad",
    summary: "Crunchy fennel with sweet citrus and olive oil.",
    seasons: ["winter"],
    imageUrl:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=1200&auto=format&fit=crop",
    alt: "Fennel citrus salad",
    ingredients: [
      { quantity: "1", item: "fennel bulb", note: "thinly sliced" },
      { quantity: "2", item: "oranges", note: "segmented" },
      { quantity: "1", unit: "tbsp", item: "olive oil" },
    ],
    steps: ["Combine fennel and citrus; dress with olive oil and salt."],
    prep: 10,
    cook: 0,
    yield: "Serves 2",
    difficulty: "Easy",
  },
  {
    title: "Herbed Lemon Pasta",
    summary: "Bright lemon, butter, and herbs over silky pasta.",
    seasons: ["spring", "summer"],
    imageUrl:
      "https://images.unsplash.com/photo-1521389508051-d7ffb5dc8bbf?q=80&w=1200&auto=format&fit=crop",
    alt: "Lemon pasta",
    ingredients: [
      { quantity: "200", unit: "g", item: "spaghetti" },
      { quantity: "30", unit: "g", item: "butter" },
      { item: "lemon zest", note: "from 1 lemon" },
      { item: "parsley", note: "chopped" },
    ],
    steps: [
      "Cook pasta; reserve a cup of starchy water.",
      "Emulsify butter, lemon, and water; toss with pasta and herbs.",
    ],
    prep: 5,
    cook: 10,
    yield: "Serves 2",
    difficulty: "Easy",
  },
  {
    title: "Autumn Roasted Squash Soup",
    summary: "Silky roasted squash, warm spices, crisp toppings.",
    seasons: ["autumn"],
    imageUrl:
      "https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a?q=80&w=1200&auto=format&fit=crop",
    alt: "Bowl of squash soup",
    ingredients: [
      { quantity: "1", item: "butternut squash", note: "roasted" },
      { quantity: "600", unit: "ml", item: "stock" },
      { quantity: "1", unit: "tsp", item: "ground cumin" },
    ],
    steps: [
      "Blend roasted squash with stock and cumin until smooth.",
      "Warm gently; adjust seasoning.",
    ],
    prep: 15,
    cook: 30,
    yield: "Serves 3–4",
    difficulty: "Easy",
    featured: true,
  },
  {
    title: "Winter Herb Roast Chicken",
    summary: "Roasted chicken with hearty herbs and pan juices.",
    seasons: ["winter"],
    imageUrl:
      "https://images.unsplash.com/photo-1467003909585-2f8a72700288?q=80&w=1200&auto=format&fit=crop",
    alt: "Roast chicken",
    ingredients: [
      { quantity: "1", item: "small chicken" },
      { quantity: "2", unit: "tbsp", item: "butter", note: "softened" },
      { item: "thyme & rosemary" },
    ],
    steps: [
      "Rub chicken with butter and herbs; roast until juices run clear.",
      "Rest 10 minutes; carve.",
    ],
    prep: 10,
    cook: 50,
    yield: "Serves 3–4",
    difficulty: "Medium",
  },
];

function slugify(input: string) {
  return input
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 96);
}

async function getSeasonRef(slug: string) {
  const doc = await client.fetch<{ _id: string } | null>(
    "*[_type=='season' && slug.current==$slug][0]{_id}",
    { slug }
  );
  return doc?._id || null;
}

async function uploadImage(url: string, filename: string) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);

  async function fetchBuffer(u: string) {
    const res = await fetch(u, {
      // Some CDNs are picky without a UA
      headers: { "User-Agent": "axlas-recipes-seed/1.0 (+seed-script)" },
      signal: controller.signal,
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const buf = Buffer.from(await res.arrayBuffer());
    return buf;
  }

  try {
    const buf = await fetchBuffer(url);
    clearTimeout(timeout);
    const asset = await client.assets.upload("image", buf, { filename });
    return asset._id;
  } catch (err) {
    // Fallback to a stable placeholder
    const fallback = `https://placehold.co/1200x800/jpg?text=${encodeURIComponent(
      filename.replace(/\\.jpg$/i, "")
    )}`;
    try {
      const buf = await fetchBuffer(fallback);
      clearTimeout(timeout);
      const asset = await client.assets.upload("image", buf, { filename });
      return asset._id;
    } catch (fallbackErr) {
      clearTimeout(timeout);
      throw new Error(
        `Failed to fetch image and fallback for ${filename}: ${String(fallbackErr)}`
      );
    }
  }
}

async function run() {
  // ensure seasons exist
  for (const s of ["spring", "summer", "autumn", "winter"]) {
    const id = await getSeasonRef(s);
    if (!id) console.warn(`Season missing: ${s} (run seed-seasons.ts)`);
  }

  for (const seed of seeds) {
    const sSlug = slugify(seed.title);
    const _id = `recipe.${sSlug}`;
    const exists = await client.fetch<{ _id: string } | null>(
      "*[_type=='recipe' && slug.current==$slug][0]{_id}",
      { slug: sSlug }
    );
    if (exists) {
      console.log(`Exists: ${seed.title}`);
      continue;
    }

    const assetId = await uploadImage(seed.imageUrl, `${sSlug}.jpg`);
    const seasonRefs = (await Promise.all(seed.seasons.map(getSeasonRef)))
      .filter(Boolean)
      .map((_id) => ({
        _type: "reference",
        _ref: _id as string,
      }));

    const doc = {
      _id,
      _type: "recipe",
      title: seed.title,
      slug: { current: sSlug },
      summary: seed.summary,
      heroImage: {
        _type: "image",
        asset: { _type: "reference", _ref: assetId },
        alt: seed.alt,
      },
      ingredients: seed.ingredients.map((i) => ({ _type: "ingredient", ...i })),
      steps: seed.steps.map((text) => ({
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text }],
      })),
      prepTime: seed.prep ?? 0,
      cookTime: seed.cook ?? 0,
      yield: seed.yield ?? "",
      difficulty: seed.difficulty ?? "Easy",
      seasons: seasonRefs,
      featured: !!seed.featured,
      publishedAt: new Date().toISOString(),
    };

    await client.create(doc);
    console.log(`Created: ${seed.title}`);
  }

  console.log("Done.");
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
