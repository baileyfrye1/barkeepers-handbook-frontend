import Breadcrumbs from "@/components/Breadcrumbs";
import Ingredient from "@/components/Ingredient";
import Reviews from "@/components/Reviews";
import axiosClient from "@/lib/axiosClient";
import { SingleCocktailType } from "@/schemas/CocktailSchemas";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/cocktails/$cocktailId")({
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
  return (
    <section className="mt-10">
      <Breadcrumbs cocktailName={cocktail.name} />
      <div className="mt-10">
        <h1 className="text-3xl font-bold">{cocktail.name}</h1>
        <Reviews />
      </div>
      <div className="flex gap-8 mt-10">
        <div className="h-[600px] w-[500px] bg-gray-400 rounded-lg"></div>
        <section className="my-4">
          <h2 className="font-bold text-2xl">Ingredients</h2>
          <ul>
            {cocktail.cocktailIngredients.map((ingredient) => {
              return <Ingredient ingredient={ingredient} />;
            })}
          </ul>
        </section>
      </div>
    </section>
  );
}
