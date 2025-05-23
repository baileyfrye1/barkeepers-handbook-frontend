import { CocktailRatingType } from "@/schemas/CocktailSchemas";
import { useState } from "react";
import useMediaQuery from "@/hooks/useMediaQuery";
import RatingModal from "../RatingModal";

// NOTE: DELETE FILE. Wait until ratings works and is smooth on desktop and mobile
const ResponsiveRatingModal = ({
  ratingsData,
  cocktailId,
  userRating,
}: {
  ratingsData: CocktailRatingType;
  cocktailId: number;
  userRating: number;
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [ratingValue, setRatingValue] = useState<number>(0);
  const isDesktop = useMediaQuery("(min-width: 768px)", {
    initializeWithValue: false,
    defaultValue: true,
  });

  if (isDesktop) {
    return (
      <RatingModal
        variant="dialog"
        title="Add Rating"
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        cocktailId={cocktailId}
        ratingsData={ratingsData}
        userRating={userRating}
      />
    );
  }

  return (
    <RatingModal
      variant="drawer"
      title="Add Rating"
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      ratingValue={ratingValue}
      setRatingValue={setRatingValue}
      rounded={rounded}
      cocktailId={cocktailId}
    />
  );
};

export default ResponsiveRatingModal;
