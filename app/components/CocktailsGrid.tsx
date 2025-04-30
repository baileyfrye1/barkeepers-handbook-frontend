import { Link } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { type CocktailListType } from "@/schemas/CocktailSchemas";

const CocktailsGrid = ({ cocktails }: { cocktails: CocktailListType }) => {
  return (
    <>
      {cocktails.map((cocktail) => {
        return (
          <article>
            <Link
              to={`/cocktails/$cocktailId`}
              params={{ cocktailId: cocktail.id }}
            >
              <Card>
                <CardTitle>{cocktail.name}</CardTitle>
              </Card>
            </Link>
          </article>
        );
      })}
    </>
  );
};

export default CocktailsGrid;
