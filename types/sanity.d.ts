// Minimal ambient declarations to prevent TS errors before installing Sanity
// Remove if you add real types from `sanity` and `@sanity/types`.
declare module "sanity" {
  export function defineType<T = any>(spec: T): T;
  export function defineField<T = any>(spec: T): T;
}
