import { defineType, defineField } from "sanity";

const ingredient = defineType({
  name: "ingredient",
  title: "Ingredient",
  type: "object",
  fields: [
    defineField({
      name: "quantity",
      title: "Quantity",
      type: "string",
      description: "e.g., 1, 2 1/2, 200g",
    }),
    defineField({
      name: "unit",
      title: "Unit",
      type: "string",
      description: "e.g., tbsp, tsp, g, ml, cup",
    }),
    defineField({
      name: "item",
      title: "Item",
      type: "string",
      validation: (Rule) => Rule.required(),
      description: "e.g., flour, olive oil, basil",
    }),
    defineField({
      name: "note",
      title: "Note",
      type: "string",
      description: "e.g., finely chopped, at room temperature",
    }),
  ],
  preview: {
    select: { quantity: "quantity", unit: "unit", item: "item" },
    prepare({ quantity, unit, item }) {
      const qty = [quantity, unit].filter(Boolean).join(" ");
      return { title: item, subtitle: qty || undefined };
    },
  },
});

export default ingredient;
