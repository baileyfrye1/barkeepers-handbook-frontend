import { z } from "zod";

const SingleUserRatingSchema = z.object({
  id: z.string(),
  rating: z.number(),
  cocktail: z.object({
    id: z.string(),
    name: z.string(),
    image: z.string(),
  }),
});

const AllUserRatingsSchema = z.array(SingleUserRatingSchema);

export type SingleUserRatingType = z.infer<typeof SingleUserRatingSchema>;
export type AllUserRatingsType = z.infer<typeof AllUserRatingsSchema>;
