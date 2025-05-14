import { submitRating } from "@/lib/queries/ratings";
import { CocktailRatingType } from "@/schemas/CocktailSchemas";
import { useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { FaRegStar, FaRegStarHalfStroke, FaStar } from "react-icons/fa6";

const InteractiveStars = ({
  ratingsData,
  cocktailId,
}: {
  ratingsData: CocktailRatingType;
  cocktailId: string;
}) => {
  const starArray: number[] = Array.from({ length: 5 });
  const [hovered, setHovered] = useState<number | null>();
  const rounded = Math.round(ratingsData.averageRating * 2) / 2;
  const router = useRouter();

  return (
    <section className="flex flex-col">
      <span className="flex">
        {starArray.map((_, i) => {
          if (hovered) {
            return hovered <= i ? (
              <FaRegStar
                className="cursor-pointer"
                onMouseOver={() => setHovered(i + 1)}
                onMouseOut={() => setHovered(null)}
              />
            ) : (
              <FaStar
                className="cursor-pointer"
                onMouseOver={() => setHovered(i + 1)}
                onMouseOut={() => setHovered(null)}
                onClick={async () => {
                  submitRating({ data: { cocktailId, rating: i + 1 } });
                  router.invalidate();
                }}
              />
            );
          } else {
            if (i + 1 <= rounded) {
              return (
                <FaStar
                  key={i}
                  onMouseOver={() => setHovered(i + 1)}
                  onMouseOut={() => setHovered(null)}
                />
              );
            } else if (i + 0.5 === rounded) {
              return (
                <>
                  <FaRegStarHalfStroke key={i} />
                </>
              );
            } else {
              return (
                <FaRegStar
                  key={i}
                  className="cursor-pointer"
                  onMouseOver={() => setHovered(i)}
                  onMouseOut={() => setHovered(null)}
                />
              );
            }
          }
        })}
      </span>
      {/* <span>{`${ratingsData.averageRating} (${ratingsData.totalInteractiveStars} reviews)`}</span> */}
    </section>
  );
};

export default InteractiveStars;
