import { CocktailRatingType } from "@/schemas/CocktailSchemas";
import InteractiveStars from "./Stars/ResponsiveRatingModal";

const FullRatingDetails = ({
  ratingsData,
  cocktailId,
}: {
  ratingsData: CocktailRatingType;
  cocktailId: number;
}) => {
  return (
    <div className="flex items-center gap-2">
      <InteractiveStars ratingsData={ratingsData} cocktailId={cocktailId} />
      <p>{`${ratingsData.averageRating} (${ratingsData.totalRatings} reviews)`}</p>
    </div>
  );
};

export default FullRatingDetails;
