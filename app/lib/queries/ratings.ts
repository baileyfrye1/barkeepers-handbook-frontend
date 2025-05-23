import { getAuth } from "@clerk/tanstack-react-start/server";
import axiosClient from "../axiosClient";
import { createServerFn } from "@tanstack/react-start";
import { getWebRequest } from "@tanstack/react-start/server";
import { queryOptions } from "@tanstack/react-query";
import { AllUserRatingsType } from "@/schemas/RatingSchemas";
import { AxiosError } from "axios";

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
  .validator((formData) => {
    if (!(formData instanceof FormData)) {
      throw new Error("Invalid form data");
    }

    const cocktailId = Number(formData.get("cocktailId"));
    const rating = Number(formData.get("rating"));

    if (!cocktailId || !rating) {
      throw new Error("Something went wrong. Please try again later");
    }

    return { cocktailId, rating };
  })
  .handler(async ({ data: { cocktailId, rating } }) => {
    try {
      const authHeader = await createAuthHeader();

      await axiosClient.post(
        `ratings/${cocktailId}`,
        {
          rating,
        },
        authHeader,
      );
      return { success: true, message: "Rating submitted successfully" };
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 409) {
          return {
            success: false,
            message: "User has already submitted a rating",
          };
        }
      }

      return {
        success: false,
        message: "Something went wrong. Please try again later",
      };
    }
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
  .validator((formData) => {
    if (!(formData instanceof FormData)) {
      throw new Error("Invalid form data");
    }

    const id = Number(formData.get("id"));

    if (!id) {
      throw new Error("Something went wrong. Please try again later");
    }

    return { id };
  })
  .handler(async ({ data: { id } }) => {
    const authHeader = await createAuthHeader();

    await axiosClient.delete(`ratings/${id}`, authHeader);

    return {
      success: true,
      message: "Successfully deleted rating",
    };
  });

export const updateRating = createServerFn()
  .validator((formData) => {
    if (!(formData instanceof FormData)) {
      throw new Error("Invalid form data");
    }

    const rating = Number(formData.get("rating"));
    const id = Number(formData.get("id"));

    if (!rating || !id) {
      throw new Error("Something went wrong. Please try again later");
    }

    return { rating, id };
  })
  .handler(async ({ data: { rating, id } }) => {
    const authHeader = await createAuthHeader();

    await axiosClient.patch(`ratings/${id}`, { rating }, authHeader);

    return { success: true, message: "Rating updated successfully" };
  });
