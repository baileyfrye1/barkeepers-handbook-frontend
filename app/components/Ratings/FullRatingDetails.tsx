import { CocktailRatingType } from "@/schemas/CocktailSchemas";
import StarDisplay from "./Stars/StarDisplay";
import { useState } from "react";
import RatingModal from "./RatingModal";

const FullRatingDetails = ({
  ratingsData,
  cocktailId,
}: {
  ratingsData: CocktailRatingType;
  cocktailId: number;
}) => {
  const [userRating, setUserRating] = useState<number>(0);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className="flex items-center gap-2">
      <StarDisplay
        size="sm"
        ratingsData={ratingsData}
        userRating={userRating}
        setUserRating={setUserRating}
      />
      <p>{`${ratingsData.averageRating} (${ratingsData.totalRatings} reviews)`}</p>

      <RatingModal
        ratingsData={ratingsData}
        cocktailId={cocktailId}
        userRating={userRating}
        setUserRating={setUserRating}
        title="Add Rating"
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      >
        <p className="cursor-pointer underline">Add Rating</p>
      </RatingModal>
    </div>
  );
};

export default FullRatingDetails;
