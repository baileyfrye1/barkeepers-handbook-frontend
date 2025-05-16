import { getAuth } from "@clerk/tanstack-react-start/server";
import axiosClient from "../axiosClient";
import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { getWebRequest } from "@tanstack/react-start/server";
import { queryOptions } from "@tanstack/react-query";
import { AllUserRatingsType } from "@/schemas/RatingSchemas";

// SCHEMAS
const submitRatingSchema = z.object({
  cocktailId: z.string(),
  rating: z.number(),
});

const idSchema = z.number();

// CREATE AUTH HEADER HELPER FUNCTION
const createAuthHeader = async () => {
  const { getToken } = await getAuth(getWebRequest()!);

  const token = await getToken({ template: "backend_api" });

  if (!token) {
    throw new Error("Error creating authentication token");
  }

  const options = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return options;
};

// SERVER FUNCTIONS AND QUERY OPTIONS
export const submitRating = createServerFn({ method: "POST" })
  .validator(submitRatingSchema)
  .handler(async ({ data }) => {
    const { cocktailId, rating } = data;

    const authHeader = await createAuthHeader();

    await axiosClient.post(
      `ratings/${cocktailId}`,
      {
        rating,
      },
      authHeader,
    );
  });

const fetchUserRatings = createServerFn({ method: "GET" }).handler(async () => {
  const authHeader = await createAuthHeader();

  return (await axiosClient.get<AllUserRatingsType>("ratings", authHeader))
    .data;
});

export const userRatingsQueryOptions = () => {
  return queryOptions({
    queryKey: ["ratings"],
    queryFn: () => fetchUserRatings(),
  });
};

export const deleteUserRating = createServerFn()
  .validator(idSchema)
  .handler(async ({ data: id }) => {
    const authHeader = await createAuthHeader();

    await axiosClient.delete(`ratings/${id}`, authHeader);
  });
