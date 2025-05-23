import { FaRegStar, FaStar, FaRegStarHalfStroke } from "react-icons/fa6";
import TriggerWrapper from "../../TriggerWrapper";
import { useState } from "react";
import { cva, VariantProps } from "class-variance-authority";

type StarRatingProps = {
  ratingValue: number;
  setRatingValue: React.Dispatch<React.SetStateAction<number>>;
  rounded: number;
  size?: string;
  withWrapper?: boolean;
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

const StarRatingDisplay = ({
  ratingValue,
  setRatingValue,
  rounded,
  size = "default",
  withWrapper = false,
}: StarRatingProps & VariantProps<typeof StarRatingVariants>) => {
  const starArray: number[] = Array.from({ length: 5 });
  const [hovered, setHovered] = useState<number | null>();

  const getStar = (i: number) => {
    const sharedProps = {
      className: StarRatingVariants({ size }),
      onMouseOver: () => setHovered(i + 1),
      onMouseOut: () => setHovered(null),
    };

    const baseStar = (filled: boolean) => {
      return filled && withWrapper ? (
        <TriggerWrapper key={i}>
          <FaStar {...sharedProps} onClick={() => setRatingValue(i + 1)} />
        </TriggerWrapper>
      ) : filled ? (
        <FaStar
          {...sharedProps}
          key={i}
          onClick={() => setRatingValue(i + 1)}
        />
      ) : (
        <FaRegStar {...sharedProps} key={i} />
      );
    };

    if (hovered !== null && hovered !== undefined) {
      return baseStar(i < hovered);
    }

    const displayRating =
      size === "dialog" || size === "drawer" ? ratingValue : rounded;

    if (i + 1 <= displayRating) {
      return <FaStar key={i} {...sharedProps} />;
    } else if (i + 0.5 === rounded) {
      return <FaRegStarHalfStroke key={i} {...sharedProps} />;
    }

    return baseStar(false);
  };

  return (
    <span
      className={`flex ${size === "drawer" ? "px-4" : ""} ${size === "drawer" || size === "dialog" ? "gap-2" : ""}`}
    >
      {starArray.map((_, i) => getStar(i))}
    </span>
  );
};

export default StarRatingDisplay;
