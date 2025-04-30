import CocktailsGrid from '@/components/CocktailsGrid';
import Loader from '@/components/Loader';
import axiosClient from '@/lib/axiosClient';
import { type CocktailListType } from '@/schemas/CocktailSchemas';
import { createFileRoute, useRouterState } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: Home,
    pendingComponent: Loader,
  loader: async () => {
    const response = await axiosClient<CocktailListType>('cocktails/featured');
    return response.data;
  },
});

function Home() {
  const cocktails = Route.useLoaderData();
  return (
    <>
      <h2 className='text-2xl font-medium'>Featured Cocktails</h2>
      <div className='grid grid-cols-3 gap-4'>
          <CocktailsGrid cocktails={cocktails} />
      </div>
    </>
  );
}
