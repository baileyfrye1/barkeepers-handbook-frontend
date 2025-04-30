import { useSuspenseQuery } from '@tanstack/react-query';
import {
  allCocktailsQueryOptions,
  featuredCocktailsQueryOptions,
} from '@/lib/queries/cocktails';
import CocktailCard from './CocktailCard';

export const AllCocktailsGrid = () => {
  const {
    data: { cocktails },
  } = useSuspenseQuery(allCocktailsQueryOptions());
  return (
    <>
      {cocktails.map((cocktail) => {
        return <CocktailCard cocktail={cocktail} />;
      })}
    </>
  );
};

export const FeaturedCocktailsGrid = () => {
  const { data } = useSuspenseQuery(featuredCocktailsQueryOptions());
  return (
    <>
      {data.map((cocktail) => {
        return <CocktailCard cocktail={cocktail} />;
      })}
    </>
  );
};
