import { FaRegStar, FaStar, FaRegStarHalfStroke } from "react-icons/fa6";
import { useState } from "react";
import { cva, VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { CocktailRatingType } from "@/schemas/CocktailSchemas";
import useMediaQuery from "@/hooks/useMediaQuery";

type StarRatingProps = {
  userRating: number;
  setUserRating: React.Dispatch<React.SetStateAction<number>>;
  ratingsData?: CocktailRatingType;
  size: string;
  className?: string;
  editable: boolean;
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

const StarDisplay = ({
  userRating,
  setUserRating,
  ratingsData,
  size = "default",
  className,
  editable,
}: StarRatingProps & VariantProps<typeof StarRatingVariants>) => {
  const [hovered, setHovered] = useState<number | null>(null);
  const cocktailRating = ratingsData
    ? Math.round(ratingsData.averageRating * 2) / 2
    : 0;
  const isDesktop = useMediaQuery("(min-width: 768px)");

  let displayRating: number;

  if (editable) {
    displayRating = hovered ?? userRating;
  } else {
    displayRating = cocktailRating;
  }

  const stars = Array.from({ length: 5 }, (_, i) => {
    const filled = i + 1 <= displayRating;
    const half = i + 0.5 === displayRating;
    const clickHandler = editable && { onClick: () => setUserRating(i + 1) };

    const iconProps = {
      className: StarRatingVariants({ size }),
      onMouseOver: isDesktop && editable ? () => setHovered(i + 1) : undefined,
      onMouseOut: isDesktop && editable ? () => setHovered(null) : undefined,
    };

    if (filled) return <FaStar key={i} {...iconProps} {...clickHandler} />;
    if (half) return <FaRegStarHalfStroke key={i} {...iconProps} />;
    return <FaRegStar key={i} {...iconProps} {...clickHandler} />;
  });

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
      {stars}
    </span>
  );
};

export default StarDisplay;
