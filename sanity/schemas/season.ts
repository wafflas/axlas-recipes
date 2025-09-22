import { defineType, defineField } from "sanity";

const season = defineType({
  name: "season",
  title: "Season",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
      description: "e.g., Spring, Summer, Autumn, Winter",
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
      name: "order",
      title: "Sort Order",
      type: "number",
      description: "Optional: 1=Spring, 2=Summer, 3=Autumn, 4=Winter",
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "slug.current" },
  },
});

export default season;
