import { defineType, defineField } from "sanity";

const recipe = defineType({
  name: "recipe",
  title: "Recipe",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        slugify: (input) =>
          input
            .toLowerCase()
            .replace(/\s+/g, "-")
            .replace(/[^a-z0-9-]/g, "")
            .slice(0, 96),
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "heroImage",
      title: "Hero Image",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alt text",
          type: "string",
          validation: (Rule) =>
            Rule.required().error(
              "Provide descriptive alt text for accessibility"
            ),
        }),
      ],
    }),
    defineField({
      name: "summary",
      title: "Summary",
      type: "text",
      rows: 3,
      description: "Short editorial blurb shown on cards and hero",
    }),
    defineField({
      name: "ingredients",
      title: "Ingredients",
      type: "array",
      of: [{ type: "ingredient" }],
      validation: (Rule) => Rule.min(1),
    }),
    defineField({
      name: "steps",
      title: "Steps",
      type: "array",
      of: [{ type: "block" }],
      description: "Use paragraphs and lists to format instructions",
      validation: (Rule) => Rule.min(1),
    }),
    defineField({
      name: "prepTime",
      title: "Prep Time (minutes)",
      type: "number",
      validation: (Rule) => Rule.min(0).integer(),
    }),
    defineField({
      name: "cookTime",
      title: "Cook Time (minutes)",
      type: "number",
      validation: (Rule) => Rule.min(0).integer(),
    }),
    defineField({
      name: "yield",
      title: "Yield",
      type: "string",
      description: "e.g., Serves 4, 12 cookies",
    }),
    defineField({
      name: "difficulty",
      title: "Difficulty",
      type: "string",
      options: { list: ["Easy", "Medium", "Hard"], layout: "radio" },
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
    defineField({
      name: "seasons",
      title: "Seasons",
      type: "array",
      of: [{ type: "reference", to: [{ type: "season" }] }],
      description: "Select applicable seasons for filtering",
    }),
    defineField({
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: "featured",
      title: "Featured",
      type: "boolean",
      initialValue: false,
      description: "Show in homepage Featured Recipes",
    }),
  ],
  orderings: [
    {
      title: "Published at, newest first",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
    {
      title: "Published at, oldest first",
      name: "publishedAtAsc",
      by: [{ field: "publishedAt", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      media: "heroImage",
      subtitle: "difficulty",
    },
  },
});

export default recipe;
