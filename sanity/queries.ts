export const featuredRecipesQuery = `
*[_type == "recipe" && featured == true]
| order(coalesce(publishedAt, _createdAt) desc)[0...$limit]{
  title,
  "slug": slug.current,
  summary,
  difficulty,
  prepTime,
  cookTime,
  yield,
  seasons[]->{
    title,
    "slug": slug.current
  },
  heroImage{
    asset->{
      url,
      metadata{ lqip, dimensions }
    },
    alt
  }
}`;

export const recipesGridQuery = `
*[_type == "recipe"]
| order(coalesce(publishedAt, _createdAt) desc){
  title,
  "slug": slug.current,
  summary,
  difficulty,
  prepTime,
  cookTime,
  yield,
  seasons[]->{
    title,
    "slug": slug.current
  },
  heroImage{
    asset->{
      url,
      metadata{ lqip, dimensions }
    },
    alt
  }
}`;

export const seasonsListQuery = `
*[_type == "season"] | order(coalesce(order, 999)){
  title,
  "slug": slug.current
}`;

export const recipeBySlugQuery = `
*[_type == "recipe" && slug.current == $slug][0]{
  title,
  summary,
  prepTime,
  cookTime,
  "totalTime": coalesce(prepTime,0)+coalesce(cookTime,0),
  difficulty,
  yield,
  steps[],
  ingredients[]{quantity, unit, item, note},
  seasons[]->{title, "slug": slug.current},
  heroImage{asset->{url, metadata{dimensions,lqip}}, alt}
}`;
