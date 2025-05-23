import { DeleteButton, SubmitButton } from "@/components/Form/Buttons";
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { authStateFn } from "@/lib/actions";
import {
  deleteUserRating,
  updateRating,
  userRatingsQueryOptions,
} from "@/lib/queries/ratings";
import { useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { FaStar } from "react-icons/fa6";
import { toast } from "sonner";
import RatingModal from "@/components/Ratings/RatingModal";

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

const DeleteRatingButton = ({ id }: { id: number }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const queryClient = useQueryClient();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.currentTarget);
    const response = await deleteUserRating({ data: formData });

    if (response.success === true) {
      queryClient.invalidateQueries({ queryKey: ["ratings"] });
      toast.success(response.message);
    } else {
      toast.error(response.message);
    }

    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="hidden" value={id} name="id" />
      <DeleteButton isLoading={isLoading} />
    </form>
  );
};

const UpdateRatingButton = ({
  id,
  rating,
  setIsOpen,
}: {
  id: number;
  rating: number;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const queryClient = useQueryClient();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.currentTarget);
    const response = await updateRating({ data: formData });

    if (response.success === true) {
      toast.success(response.message);
      queryClient.invalidateQueries({ queryKey: ["ratings"] });
    } else {
      toast.error(response.message);
    }

    setIsLoading(false);
    setIsOpen(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="hidden" value={id} name="id" />
      <input type="hidden" value={rating} name="rating" />
      <SubmitButton isLoading={isLoading} />
    </form>
  );
};
