import { SingleCocktailType } from "@/schemas/CocktailSchemas";
import { Link } from "@tanstack/react-router";
import { Card, CardTitle } from "../ui/card";
import InteractiveStars from "../Ratings/InteractiveStars";
import SimpleRatingDetails from "../Ratings/SimpleRatingDetails";

const CocktailCard = ({ cocktail }: { cocktail: SingleCocktailType }) => {
  return (
    <article key={cocktail.id}>
      <Link to={`/cocktails/$cocktailId`} params={{ cocktailId: cocktail.id }}>
        <Card className="gap-2 px-4">
          <CardTitle>{cocktail.name}</CardTitle>
          <SimpleRatingDetails ratingsData={cocktail.ratingsData} />
        </Card>
      </Link>
    </article>
  );
};

export default CocktailCard;
