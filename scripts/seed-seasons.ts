import { config as loadEnv } from "dotenv";
loadEnv({ path: ".env.local" });
import { createClient } from "@sanity/client";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-09-22",
  token: process.env.SANITY_API_READ_TOKEN,
  useCdn: false,
});

const seasons = [
  {
    _id: "season.spring",
    _type: "season",
    title: "Spring",
    slug: { current: "spring" },
    order: 1,
  },
  {
    _id: "season.summer",
    _type: "season",
    title: "Summer",
    slug: { current: "summer" },
    order: 2,
  },
  {
    _id: "season.autumn",
    _type: "season",
    title: "Autumn",
    slug: { current: "autumn" },
    order: 3,
  },
  {
    _id: "season.winter",
    _type: "season",
    title: "Winter",
    slug: { current: "winter" },
    order: 4,
  },
];

async function run() {
  for (const doc of seasons) {
    const existing = await client.fetch(
      "*[_type=='season' && slug.current==$slug][0]",
      { slug: doc.slug.current }
    );
    if (existing) {
      console.log(`Exists: ${doc.title}`);
      continue;
    }
    await client.createIfNotExists(doc);
    console.log(`Created: ${doc.title}`);
  }
  console.log("Done.");
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
