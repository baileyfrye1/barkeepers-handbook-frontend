import { FaRegStar, FaStar, FaRegStarHalfStroke } from "react-icons/fa6";
import TriggerWrapper from "../../TriggerWrapper";
import { useState } from "react";
import { cva, VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { CocktailRatingType } from "@/schemas/CocktailSchemas";

type StarRatingProps = {
  userRating: number;
  setUserRating: React.Dispatch<React.SetStateAction<number>>;
  ratingsData?: CocktailRatingType;
  size: string;
  withWrapper?: boolean;
  className?: string;
};

const StarRatingVariants = cva("cursor-pointer", {
  variants: {
    size: {
      default: "h-5 w-5",
      dialog: "h-6 w-6",
      drawer: "h-7 w-7",
      sm: "h-4 w-4",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

// TODO: Update component to only allow hover on stars when in modal
const StarDisplay = ({
  userRating,
  setUserRating,
  ratingsData,
  size = "default",
  withWrapper = false,
  className,
}: StarRatingProps & VariantProps<typeof StarRatingVariants>) => {
  const starArray: number[] = Array.from({ length: 5 }, (_, i) => i);
  const [hovered, setHovered] = useState<number | null>();
  const [ratingValue, setRatingValue] = useState<number>();

  const cocktailRating = Math.round(ratingsData.averageRating * 2) / 2;

  const getStar = (i: number) => {
    const sharedProps = {
      className: StarRatingVariants({ size }),
      // onMouseOver: () => setHovered(i + 1),
      // onMouseOut: () => setHovered(null),
    };

    const baseStar = (filled: boolean) => {
      return filled && withWrapper ? (
        <TriggerWrapper key={i}>
          <FaStar {...sharedProps} />
        </TriggerWrapper>
      ) : filled ? (
        <FaStar {...sharedProps} key={i} />
      ) : (
        <FaRegStar {...sharedProps} key={i} />
      );
    };

    // if (hovered !== null && hovered !== undefined) {
    //   return baseStar(i < hovered);
    // }

    const displayRating =
      size === "dialog" || size === "drawer" ? userRating : cocktailRating;

    if (i + 1 <= displayRating) {
      return <FaStar key={i} {...sharedProps} />;
    } else if (i + 0.5 === cocktailRating) {
      return <FaRegStarHalfStroke key={i} {...sharedProps} />;
    }

    return baseStar(false);
  };

  return (
    <span
      className={cn(
        "flex",
        {
          "px-4": size === "drawer",
          "gap-2": size === "dialog" || size === "drawer",
        },
        className,
      )}
    >
      {starArray.map((_, i) => getStar(i))}
    </span>
  );
};

export default StarDisplay;
