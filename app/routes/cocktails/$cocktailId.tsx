import Breadcrumbs from "@/components/Breadcrumbs";
import Ingredient from "@/components/Ingredient";
import FullRatingDetails from "@/components/Ratings/FullRatingDetails";
import axiosClient from "@/lib/axiosClient";
import { SingleCocktailType } from "@/schemas/CocktailSchemas";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/cocktails/$cocktailId")({
  component: RouteComponent,
  loader: async ({ params }) => {
    const response = await axiosClient<SingleCocktailType>(
      `cocktails/${parseInt(params.cocktailId)}`,
    );
    return response.data;
  },
  head: ({ loaderData }) => ({
    meta: [{ title: `${loaderData.name} • Barkeepers Handbook` }],
  }),
});

function RouteComponent() {
  const cocktail = Route.useLoaderData();
  const { cocktailId } = Route.useParams();

  return (
    <section>
      <Breadcrumbs cocktailName={cocktail.name} />
      <div className="mt-10">
        <h1 className="text-3xl font-bold">{cocktail.name}</h1>
        <FullRatingDetails
          ratingsData={cocktail.ratingsData}
          cocktailId={parseInt(cocktailId)}
        />
      </div>
      <div className="flex md:flex-row flex-col gap-8 mt-10">
        {cocktail.imageUrl ? (
          <img
            className="rounded-lg w-full md:w-[500px]"
            src={cocktail.imageUrl}
          />
        ) : (
          // TODO: Remove this line once all cocktails have images
          <div className="h-[600px] w-full md:w-[500px] bg-gray-400 rounded-lg" />
        )}
        <section className="md:my-4">
          <h2 className="font-bold text-2xl">Ingredients</h2>
          <ul>
            {cocktail.cocktailIngredients.map((ingredient) => {
              return (
                <Ingredient
                  key={ingredient.ingredient.name}
                  ingredient={ingredient}
                />
              );
            })}
          </ul>

          <h2 className="font-bold text-2xl mt-4">Steps</h2>
          <ol></ol>
        </section>
      </div>
    </section>
  );
}
