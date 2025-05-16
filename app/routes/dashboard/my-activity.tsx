import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { authStateFn } from "@/lib/actions";
import {
  deleteUserRating,
  userRatingsQueryOptions,
} from "@/lib/queries/ratings";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, redirect, useMatches } from "@tanstack/react-router";
import { FaStar } from "react-icons/fa6";

export const Route = createFileRoute("/dashboard/my-activity")({
  beforeLoad: async () => await authStateFn(),
  component: RouteComponent,
});

function RouteComponent() {
  const matches = useMatches();
  const userId = matches.map((match) => match.context.userId);

  if (!userId) {
    redirect({ to: "/" });
  }

  const { data } = useSuspenseQuery(userRatingsQueryOptions());

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
      <div className="grid auto-fit-[2]">
        {data.map((userRating) => {
          const { rating, cocktail } = userRating;
          return (
            <Card key={cocktail.id} className="p-4 gap-2">
              <img className="rounded-lg" src={cocktail.image} />
              <CardTitle>{cocktail.name}</CardTitle>
              <p className="flex gap-2">
                <FaStar />
                <span>{rating}</span>
              </p>
              <div className="flex flex-col gap-2">
                <Button>Edit</Button>
                <Button
                  onClick={() => deleteUserRating({ data: cocktail.id })}
                  variant="destructive"
                >
                  Delete
                </Button>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
