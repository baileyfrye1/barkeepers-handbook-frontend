import { DeleteButton } from "@/components/Form/Buttons";
import FormContainer from "@/components/FormContainer";
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { authStateFn } from "@/lib/actions";
import {
  deleteUserRating,
  userRatingsQueryOptions,
} from "@/lib/queries/ratings";
import { useSuspenseQuery } from "@tanstack/react-query";
import {
  createFileRoute,
  redirect,
  useMatches,
  useRouter,
} from "@tanstack/react-router";
import { useState } from "react";
import { FaStar } from "react-icons/fa6";
import { toast } from "sonner";

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
      <div className="grid auto-fit-[2] gap-4">
        {data.map((userRating) => {
          const { rating, cocktail, id } = userRating;
          return (
            <Card key={cocktail.id} className="p-4 gap-2">
              <img className="rounded-lg" src={cocktail.image} />
              <CardTitle>{cocktail.name}</CardTitle>
              <p className="flex gap-2 items-center">
                <FaStar />
                <span>{rating}</span>
              </p>
              <div className="flex flex-col gap-2">
                <Button className="cursor-pointer">Edit</Button>
                <DeleteRatingButton id={id} />
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

const DeleteRatingButton = ({ id }: { id: number }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.currentTarget);
    try {
      const response = await deleteUserRating({ data: formData });
      toast.success(response.message);
      await router.invalidate({ sync: true });
      setIsLoading(false);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Something went wrong",
      );
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="hidden" value={id} name="id" />
      <DeleteButton isLoading={isLoading} />
    </form>
  );
};
