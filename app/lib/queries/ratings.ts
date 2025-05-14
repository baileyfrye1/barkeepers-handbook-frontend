import { getAuth } from "@clerk/tanstack-react-start/server";
import axiosClient from "../axiosClient";
import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { getWebRequest } from "@tanstack/react-start/server";

const submitRatingSchema = z.object({
  cocktailId: z.string(),
  rating: z.number(),
});

export const submitRating = createServerFn({ method: "POST" })
  .validator(submitRatingSchema)
  .handler(async ({ data }) => {
    const { cocktailId, rating } = data;
    const { getToken } = await getAuth(getWebRequest()!);

    const token = await getToken({ template: "backend_api" });

    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    await axiosClient.post(
      `ratings/${cocktailId}`,
      {
        rating,
      },
      options,
    );
  });
