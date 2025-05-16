import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import { authStateFn } from "@/lib/actions";
import { userRatingsQueryOptions } from "@/lib/queries/ratings";
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

  return (
    <section>
      <h2 className="font-bold text-2xl">Ratings</h2>
      {data.map((userRating) => {
        const { rating, cocktail } = userRating;
        return (
          <Card key={cocktail.id}>
            <img className="rounded-lg" src={cocktail.image} />
            <CardTitle>{cocktail.name}</CardTitle>
            <FaStar />
            <span>{rating}</span>
            <Button>Edit</Button>
            <Button variant="destructive">Delete</Button>
          </Card>
        );
      })}
    </section>
  );
}
