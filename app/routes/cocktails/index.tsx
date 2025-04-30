import CocktailsGrid from '@/components/CocktailsGrid';
import Loader from '@/components/Loader';
import axiosClient from '@/lib/axiosClient';
import { type CocktailListType } from '@/schemas/CocktailSchemas';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/cocktails/')({
  component: RouteComponent,
  pendingComponent: Loader,
  loader: async ({ location }) => {
    const response = await axiosClient<CocktailListType>(
      `cocktails${location.search ? location.searchStr : ''}`,
    );
    return response.data;
  },
});

function RouteComponent() {
  const cocktails = Route.useLoaderData();
  return (
    <div className='grid grid-cols-3 gap-4'>
      <CocktailsGrid cocktails={cocktails.cocktails} />
    </div>
  );
}
