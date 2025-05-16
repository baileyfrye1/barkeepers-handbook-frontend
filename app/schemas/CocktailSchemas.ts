import { z } from "zod";

const IngredientSchema = z.object({
  ingredient: z.object({ name: z.string() }),
  amount: z.number(),
  unit: z.string(),
});

const CocktailRatingsSchema = z.object({
  ratings: z.array(z.number()),
  averageRating: z.number(),
  totalRatings: z.number(),
});

const SingleCocktailSchema = z.object({
  id: z.string(),
  name: z.string(),
  featured: z.boolean(),
  cocktailIngredients: z.array(IngredientSchema),
  imageUrl: z.string(),
  tags: z.array(z.string()),
  ratingsData: CocktailRatingsSchema,
  createdAt: z.string().date(),
  updatedAt: z.string().date(),
});

export const CocktailListSchema = z.array(SingleCocktailSchema);

export const AllCocktailsSchema = z.object({
  cocktails: z.array(SingleCocktailSchema),
  totalCount: z.number(),
});

const TotalCocktailsSchema = AllCocktailsSchema.extend({ cocktails: z.null() });

export type IngredientType = z.infer<typeof IngredientSchema>;
export type CocktailRatingType = z.infer<typeof CocktailRatingsSchema>;
export type SingleCocktailType = z.infer<typeof SingleCocktailSchema>;
export type FeaturedCocktailsType = z.infer<typeof CocktailListSchema>;
export type AllCocktailsType = z.infer<typeof AllCocktailsSchema>;
export type TotalCocktailsType = z.infer<typeof TotalCocktailsSchema>;
