import { z } from "zod";

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

export type IngredientType = z.infer<typeof IngredientSchema>;
export type SingleCocktailType = z.infer<typeof SingleCocktailSchema>;
export type CocktailListType = z.infer<typeof CocktailListSchema>;
