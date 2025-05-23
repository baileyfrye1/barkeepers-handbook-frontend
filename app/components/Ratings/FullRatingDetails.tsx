import { CocktailRatingType } from "@/schemas/CocktailSchemas";
import ResponsiveRatingModal from "./Stars/ResponsiveRatingModal";

const FullRatingDetails = ({
  ratingsData,
  cocktailId,
}: {
  ratingsData: CocktailRatingType;
  cocktailId: number;
}) => {
  return (
    <div className="flex items-center gap-2">
      <ResponsiveRatingModal
        ratingsData={ratingsData}
        cocktailId={cocktailId}
      />
      <p>{`${ratingsData.averageRating} (${ratingsData.totalRatings} reviews)`}</p>
    </div>
  );
};

export default FullRatingDetails;
