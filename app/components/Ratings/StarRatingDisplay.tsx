import { FaRegStar, FaStar, FaRegStarHalfStroke } from "react-icons/fa6";
import { useState } from "react";
import TriggerWrapper from "../TriggerWrapper";

const StarRatingDisplay = ({
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
    <span className={`flex ${isOpen && "gap-2"}`}>
      {starArray.map((_, i) => {
        if (hovered !== null && hovered !== undefined) {
          return hovered <= i ? (
            <FaRegStar
              key={i}
              className="cursor-pointer"
              onMouseOver={() => setHovered(i + 1)}
              onMouseOut={() => setHovered(null)}
              onClick={() => setRatingValue(i + 1)}
            />
          ) : (
            <TriggerWrapper>
              <FaStar
                key={i}
                className="cursor-pointer"
                onMouseOver={() => setHovered(i + 1)}
                onMouseOut={() => setHovered(null)}
              />
            </TriggerWrapper>
          );
        } else {
          if (i + 1 <= ratingValue || i + 1 <= rounded) {
            return (
              <FaStar
                key={i}
                onMouseOver={() => setHovered(i + 1)}
                onMouseOut={() => setHovered(null)}
              />
            );
          } else if (i + 0.5 === rounded) {
            return <FaRegStarHalfStroke key={i} />;
          } else {
            return (
              <FaRegStar
                key={i}
                className="cursor-pointer"
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

export default StarRatingDisplay;
