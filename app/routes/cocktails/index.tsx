import CocktailsGrid from '@/components/CocktailsGrid';
import Loader from '@/components/Loader';
import axiosClient from '@/lib/axiosClient';
import { type CocktailListType } from '@/schemas/CocktailSchemas';
import { createFileRoute, useRouterState } from '@tanstack/react-router';

export const Route = createFileRoute('/cocktails/')({
  component: RouteComponent,
  loader: async ({ location }) => {
    const response = await axiosClient<CocktailListType>(
      `cocktails${location.search ? location.searchStr : ''}`,
    );
    return response.data;
  },
});

function RouteComponent() {
  const { isLoading } = useRouterState();
  const cocktails = Route.useLoaderData();
  return (
    <div className='grid grid-cols-3 gap-4'>
      {isLoading ? <Loader /> : <CocktailsGrid cocktails={cocktails} />}
    </div>
  );
}
