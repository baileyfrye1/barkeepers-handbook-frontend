import { z } from 'zod';

export const SingleCocktailSchema = z.object({
  id: z.string(),
  name: z.string(),
  featured: z.boolean(),
  cocktailIngredients: z.array(
    z.object({
      ingredient: z.object({ name: z.string() }),
      amount: z.number(),
      unit: z.string(),
    }),
  ),
  tags: z.array(z.string()),
  createdAt: z.string().date(),
  updatedAt: z.string().date(),
});

export const CocktailListSchema = z.array(SingleCocktailSchema);

export type SingleCocktailType = z.infer<typeof SingleCocktailSchema>;
export type CocktailListType = z.infer<typeof CocktailListSchema>;
