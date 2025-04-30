import { z } from 'zod';

const IngredientSchema = z.object({
  ingredient: z.object({ name: z.string() }),
  amount: z.number(),
  unit: z.string(),
});

const SingleCocktailSchema = z.object({
  id: z.string(),
  name: z.string(),
  featured: z.boolean(),
  cocktailIngredients: z.array(IngredientSchema),
  tags: z.array(z.string()),
  createdAt: z.string().date(),
  updatedAt: z.string().date(),
});

export const CocktailListSchema = z.array(SingleCocktailSchema);
export const AllCocktailsSchema = z.object({
  cocktails: z.array(SingleCocktailSchema),
  totalCount: z.number(),
});

export type IngredientType = z.infer<typeof IngredientSchema>;
export type SingleCocktailType = z.infer<typeof SingleCocktailSchema>;
export type FeaturedCocktailsType = z.infer<typeof CocktailListSchema>;
export type AllCocktailsType = z.infer<typeof AllCocktailsSchema>;
