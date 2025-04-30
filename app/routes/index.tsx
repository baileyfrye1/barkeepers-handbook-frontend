import { FeaturedCocktailsGrid } from '@/components/Cocktails/CocktailsGrid';
import Loader from '@/components/Loader';
import { featuredCocktailsQueryOptions } from '@/lib/queries/cocktails';
import { createFileRoute, useRouterState } from '@tanstack/react-router';
import { Suspense } from 'react';

export const Route = createFileRoute('/')({
  component: Home,
});

function Home() {
  return (
    <>
      <h2 className='text-2xl font-medium'>Featured Cocktails</h2>
      <div className='grid grid-cols-3 gap-4'>
        <Suspense fallback={<Loader />}>
          <FeaturedCocktailsGrid />
        </Suspense>
      </div>
    </>
  );
}
