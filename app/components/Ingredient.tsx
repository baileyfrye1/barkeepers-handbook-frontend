import { capitalizeWord } from "@/lib/format";
import { IngredientType } from "@/schemas/CocktailSchemas";
import Fraction from "fraction.js";

const Ingredient = ({ ingredient }: { ingredient: IngredientType }) => {
  const {
    amount,
    unit,
    ingredient: { name },
  } = ingredient;

  const parsedAmount =
    amount % 1 !== 0 ? new Fraction(amount).toFraction() : amount;

  if (name === "Absinthe" && unit === "rinse") {
    return (
      <li>
        {name} {capitalizeWord(unit)}
      </li>
    );
  }

  return (
    <li>
      {parsedAmount} {unit} {name}
    </li>
  );
};

export default Ingredient;
