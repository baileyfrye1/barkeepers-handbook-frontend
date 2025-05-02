import { useSuspenseQuery } from '@tanstack/react-query';
import {
  allCocktailsQueryOptions,
  featuredCocktailsQueryOptions,
} from '@/lib/queries/cocktails';
import CocktailCard from './CocktailCard';
import { QueryParamsType } from '@/schemas/QueryParamsSchema';

export const AllCocktailsGrid = ({
  queryParams,
}: {
  queryParams: QueryParamsType;
}) => {
  const { data: cocktails } = useSuspenseQuery(
    allCocktailsQueryOptions(queryParams.page, queryParams.search),
  );
  return (
    <>
      {cocktails.map((cocktail) => {
        return <CocktailCard key={cocktail.id} cocktail={cocktail} />;
      })}
    </>
  );
};

export const FeaturedCocktailsGrid = () => {
  const { data } = useSuspenseQuery(featuredCocktailsQueryOptions());
  return (
    <>
      {data.map((cocktail) => {
        return <CocktailCard key={cocktail.id} cocktail={cocktail} />;
      })}
    </>
  );
};
