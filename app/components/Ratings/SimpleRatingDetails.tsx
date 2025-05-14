import { CocktailRatingType } from "@/schemas/CocktailSchemas";
import { FaStar } from "react-icons/fa6";

const SimpleRatingDetails = ({
  ratingsData,
}: {
  ratingsData: CocktailRatingType;
}) => {
  return (
    <div className="flex items-center gap-1">
      <FaStar />
      <span>{ratingsData.averageRating}</span>
    </div>
  );
};

export default SimpleRatingDetails;
