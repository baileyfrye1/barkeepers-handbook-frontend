import { AllCocktailsGrid } from '@/components/Cocktails/CocktailsGrid';
import Loader from '@/components/Loader';
import PaginationMenu from '@/components/PaginationMenu';
import { totalCocktailsQueryOptions } from '@/lib/queries/cocktails';
import { queryParamsSchema } from '@/schemas/QueryParamsSchema';
import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { Suspense } from 'react';

export const Route = createFileRoute('/cocktails/')({
  validateSearch: queryParamsSchema,
  component: RouteComponent,
  head: () => ({
    meta: [{ title: 'Cocktails • Barkeepers Handbook' }],
  }),
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData(totalCocktailsQueryOptions());
  },
});

function RouteComponent() {
  const { data: totalCocktailsCount } = useSuspenseQuery(
    totalCocktailsQueryOptions(),
  );
  const params = Route.useSearch();

  return (
    <>
      <div className='grid auto-fit-[3] gap-4'>
        <Suspense fallback={<Loader />}>
          <AllCocktailsGrid queryParams={params} />
        </Suspense>
      </div>
      <PaginationMenu totalCount={totalCocktailsCount} />
    </>
  );
}
