import { AllCocktailsGrid } from '@/components/Cocktails/CocktailsGrid';
import Loader from '@/components/Loader';
import { queryParamsSchema } from '@/schemas/QueryParamsSchema';
import { createFileRoute } from '@tanstack/react-router';
import { Suspense } from 'react';

export const Route = createFileRoute('/cocktails/')({
  validateSearch: queryParamsSchema,
  component: RouteComponent,
  head: () => ({
    meta: [{ title: 'Cocktails • Barkeepers Handbook' }],
  }),
});

function RouteComponent() {
  const params = Route.useSearch();
  return (
    <div className='grid grid-cols-3 gap-4'>
      <Suspense fallback={<Loader />}>
        <AllCocktailsGrid queryParams={params} />
      </Suspense>
    </div>
  );
}
