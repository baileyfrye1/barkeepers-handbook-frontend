import { SingleCocktailType } from '@/schemas/CocktailSchemas';
import { Link } from '@tanstack/react-router';
import { Card, CardTitle } from '../ui/card';

const CocktailCard = ({ cocktail }: { cocktail: SingleCocktailType }) => {
  return (
    <article key={cocktail.id}>
      <Link to={`/cocktails/$cocktailId`} params={{ cocktailId: cocktail.id }}>
        <Card>
          <CardTitle>{cocktail.name}</CardTitle>
        </Card>
      </Link>
    </article>
  );
};

export default CocktailCard;
