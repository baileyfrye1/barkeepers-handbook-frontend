import CocktailsGrid from '@/components/CocktailsGrid';
import axiosClient from '@/lib/axiosClient';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/cocktails')({
  component: RouteComponent,
  loader: async () => {
    const response = await axiosClient<[]>('cocktails');
    return response.data;
  },
});

function RouteComponent() {
  const cocktails = Route.useLoaderData();
  return (
    <div className='grid grid-cols-3'>
      <CocktailsGrid cocktails={cocktails} />
    </div>
  );
}
