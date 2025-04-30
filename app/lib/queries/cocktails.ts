import { queryOptions } from '@tanstack/react-query';
import { createServerFn } from '@tanstack/react-start';
import axiosClient from '../axiosClient';
import {
  type AllCocktailsType,
  type FeaturedCocktailsType,
  type SingleCocktailType,
} from '@/schemas/CocktailSchemas';
import { z } from 'zod';

const querySchema = z.object({
  search: z.string().optional(),
  page: z.coerce.number().int().default(1),
});
const idSchema = z.string().min(1);

export const fetchAllCocktails = createServerFn({ method: 'GET' })
  .validator(querySchema)
  .handler(async ({ data: queryParams }) => {
    const params = new URLSearchParams({
      page: queryParams.page.toString(),
      ...(queryParams.search ? { search: queryParams.search } : {}),
    });

    return (
      await axiosClient.get<AllCocktailsType>(`cocktails?${params.toString()}`)
    ).data;
  });

export const allCocktailsQueryOptions = (page: number, search: string) => {
  return queryOptions({
    queryKey: ['cocktails'],
    queryFn: () => fetchAllCocktails({ data: { page, search } }),
  });
};

export const fetchFeaturedCocktails = createServerFn({ method: 'GET' }).handler(
  async () => {
    return (await axiosClient.get<FeaturedCocktailsType>(`cocktails/featured`))
      .data;
  },
);

export const featuredCocktailsQueryOptions = () => {
  return queryOptions({
    queryKey: ['cocktails', 'featured'],
    queryFn: () => fetchFeaturedCocktails(),
  });
};

export const fetchSingleCocktail = createServerFn({ method: 'GET' })
  .validator(idSchema)
  .handler(async ({ data: id }) => {
    return (await axiosClient.get<SingleCocktailType>(`cocktails/${id}`)).data;
  });

export const singleCocktailQueryOptions = (cocktailId: string) => {
  return queryOptions({
    queryKey: ['cocktail', cocktailId],
    queryFn: () => fetchSingleCocktail({ data: cocktailId }),
  });
};
