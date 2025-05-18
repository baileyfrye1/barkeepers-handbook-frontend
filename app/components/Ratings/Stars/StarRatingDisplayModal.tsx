import { FaRegStar, FaStar, FaRegStarHalfStroke } from "react-icons/fa6";
import { useState } from "react";

const StarRatingDisplayModal = ({
  ratingValue,
  setRatingValue,
  rounded,
  isOpen,
}: {
  ratingValue: number;
  setRatingValue: React.Dispatch<React.SetStateAction<number>>;
  rounded?: number;
  isOpen: boolean;
}) => {
  const starArray: number[] = Array.from({ length: 5 });
  const [hovered, setHovered] = useState<number | null>();
  return (
    <span className="flex gap-2">
      {starArray.map((_, i) => {
        if (hovered !== null && hovered !== undefined) {
          return hovered <= i ? (
            <FaRegStar
              key={i}
              className="cursor-pointer h-6 w-6"
              onMouseOver={() => setHovered(i + 1)}
              onMouseOut={() => setHovered(null)}
            />
          ) : (
            <FaStar
              key={i}
              className="cursor-pointer h-6 w-6"
              onMouseOver={() => setHovered(i + 1)}
              onMouseOut={() => setHovered(null)}
              onClick={() => setRatingValue(i + 1)}
            />
          );
        } else {
          if (i + 1 <= ratingValue) {
            return (
              <FaStar
                className="w-6 h-6"
                key={i}
                onMouseOver={() => setHovered(i + 1)}
                onMouseOut={() => setHovered(null)}
              />
            );
          } else {
            return (
              <FaRegStar
                key={i}
                className="cursor-pointer h-6 w-6"
                onMouseOver={() => setHovered(i + 1)}
                onMouseOut={() => setHovered(null)}
              />
            );
          }
        }
      })}
    </span>
  );
};

export default StarRatingDisplayModal;
