import axiosClient from "../axiosClient";
import { createServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { z } from "zod";

const submitRatingSchema = z.object({
  cocktailId: z.string(),
  rating: z.number(),
});

export const submitRating = createServerFn({ method: "POST" })
  .validator(submitRatingSchema)
  .handler(async ({ data }) => {
    const { cocktailId, rating } = data;

    await axiosClient.post(`ratings/${cocktailId}`, {
      rating,
    });

    toast.success("Successfully submitted rating");
  });
