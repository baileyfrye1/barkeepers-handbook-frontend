import axiosClient from '@/lib/axiosClient';
import { SingleCocktailType } from '@/schemas/CocktailSchemas';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/cocktails/$cocktailId')({
  component: RouteComponent,
  loader: async ({ params }) => {
    const response = await axiosClient<SingleCocktailType>(
      `cocktails/${params.cocktailId}`,
    );
    return response.data;
  },
});

function RouteComponent() {
  const cocktail = Route.useLoaderData();
  return <div>Hello "/cocktails/{cocktail.name}"!</div>;
}
