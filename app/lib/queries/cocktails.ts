import { queryOptions } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/react-start";
import axiosClient from "../axiosClient";
import {
  TotalCocktailsType,
  type AllCocktailsType,
  type FeaturedCocktailsType,
  type SingleCocktailType,
} from "@/schemas/CocktailSchemas";
import { z } from "zod";

const querySchema = z.object({
  search: z.string().optional(),
  page: z.coerce.number().int().default(1),
});
const idSchema = z.number();

const fetchAllCocktails = createServerFn({ method: "GET" })
  .validator(querySchema)
  .handler(async ({ data: queryParams }) => {
    const params = new URLSearchParams({
      page: queryParams.page.toString(),
      ...(queryParams.search ? { search: queryParams.search } : {}),
    });

    return (
      await axiosClient.get<AllCocktailsType>(`cocktails?${params.toString()}`)
    ).data.cocktails;
  });

export const allCocktailsQueryOptions = (page: number = 1, search?: string) => {
  return queryOptions({
    queryKey: ["cocktails", page, search],
    queryFn: () => fetchAllCocktails({ data: { page, search } }),
  });
};

const fetchTotalCocktails = createServerFn({ method: "GET" }).handler(
  async () => {
    return (
      await axiosClient.get<TotalCocktailsType>(`cocktails?countOnly=true`)
    ).data.totalCount;
  },
);

export const totalCocktailsQueryOptions = () => {
  return queryOptions({
    queryKey: ["cocktails"],
    queryFn: () => fetchTotalCocktails(),
  });
};

const fetchFeaturedCocktails = createServerFn({ method: "GET" }).handler(
  async () => {
    return (await axiosClient.get<FeaturedCocktailsType>(`cocktails/featured`))
      .data;
  },
);

export const featuredCocktailsQueryOptions = () => {
  return queryOptions({
    queryKey: ["cocktails", "featured"],
    queryFn: () => fetchFeaturedCocktails(),
  });
};

const fetchSingleCocktail = createServerFn({ method: "GET" })
  .validator(idSchema)
  .handler(async ({ data: id }) => {
    return (await axiosClient.get<SingleCocktailType>(`cocktails/${id}`)).data;
  });

export const singleCocktailQueryOptions = (cocktailId: number) => {
  return queryOptions({
    queryKey: ["cocktail", cocktailId],
    queryFn: () => fetchSingleCocktail({ data: cocktailId }),
  });
};
