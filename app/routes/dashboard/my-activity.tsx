import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { authStateFn } from "@/lib/actions";
import { userRatingsQueryOptions } from "@/lib/queries/ratings";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { FaStar } from "react-icons/fa6";
import RatingModal from "@/components/Ratings/RatingModal";
import { DeleteRatingButton } from "@/components/Ratings/ActionButtons";

export const Route = createFileRoute("/dashboard/my-activity")({
  beforeLoad: async () => await authStateFn(),
  component: RouteComponent,
});

function RouteComponent() {
  const { data } = useSuspenseQuery(userRatingsQueryOptions());
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [userRating, setUserRating] = useState<number>(0);

  if (data.length === 0) {
    return (
      <div>
        <h2 className="font-bold text-2xl">Ratings</h2>
        <Separator className="mt-2 mb-4" />
        <h2 className="text-lg">No ratings found</h2>
      </div>
    );
  }

  return (
    <div>
      <h2 className="font-bold text-2xl">Ratings</h2>
      <Separator className="my-4" />
      <div className="grid auto-fit-[2] gap-4">
        {data.map((userCocktailRating) => {
          const { rating: cocktailRating, cocktail, id } = userCocktailRating;
          return (
            <Card key={cocktail.id} className="p-4 gap-2">
              <img className="rounded-lg" src={cocktail.image} />
              <CardTitle>{cocktail.name}</CardTitle>
              <p className="flex gap-2 items-center">
                <FaStar />
                <span>{cocktailRating}</span>
              </p>
              <div className="flex flex-col gap-2">
                <RatingModal
                  isOpen={isOpen}
                  setIsOpen={setIsOpen}
                  title="Update Rating"
                  cocktailId={cocktail.id}
                  userRating={userRating}
                  setUserRating={setUserRating}
                  type="update"
                >
                  <Button
                    className="cursor-pointer w-full"
                    onClick={() => setIsOpen(true)}
                  >
                    Edit
                  </Button>
                </RatingModal>
                <DeleteRatingButton id={id} />
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
