import { AllCocktailsGrid } from '@/components/Cocktails/CocktailsGrid';
import Loader from '@/components/Loader';
import { createFileRoute } from '@tanstack/react-router';
import { Suspense } from 'react';

export const Route = createFileRoute('/cocktails/')({
  component: RouteComponent,
  head: () => ({
    meta: [{ title: 'Cocktails • Barkeepers Handbook' }],
  }),
});

function RouteComponent() {
  return (
    <div className='grid grid-cols-3 gap-4'>
      <Suspense fallback={<Loader />}>
        <AllCocktailsGrid />
      </Suspense>
    </div>
  );
}
