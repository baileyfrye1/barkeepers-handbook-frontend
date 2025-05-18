import { DeleteButton } from "@/components/Form/Buttons";
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { authStateFn } from "@/lib/actions";
import {
  deleteUserRating,
  userRatingsQueryOptions,
} from "@/lib/queries/ratings";
import { useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { FaStar } from "react-icons/fa6";
import { toast } from "sonner";
import {
  Dialog,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
  DialogHeader,
  DialogContent,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerTitle,
  DrawerFooter,
  DrawerHeader,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer";
import useMediaQuery from "@/hooks/useMediaQuery";
import StarRatingDisplayModal from "@/components/Ratings/Stars/StarRatingDisplayModal";

export const Route = createFileRoute("/dashboard/my-activity")({
  beforeLoad: async () => await authStateFn(),
  component: RouteComponent,
});

function RouteComponent() {
  const { data } = useSuspenseQuery(userRatingsQueryOptions());
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // if (data.length === 0) {
  //   return (
  //     <div>
  //       <h2 className="font-bold text-2xl">Ratings</h2>
  //       <Separator className="mt-2 mb-4" />
  //       <h2 className="text-lg">No ratings found</h2>
  //     </div>
  //   );
  // }

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
                {isDesktop ? (
                  <EditDialog isOpen={isOpen} setIsOpen={setIsOpen} />
                ) : (
                  <EditDrawer isOpen={isOpen} setIsOpen={setIsOpen} />
                )}
                <DeleteRatingButton id={id} />
              </div>
            </Card>
          );
        })}
        <Card className="p-4 gap-2">
          <CardTitle>Daiquiri</CardTitle>
          <p className="flex gap-2 items-center">
            <FaStar />
            <span>5</span>
          </p>
          <div className="flex flex-col gap-2">
            {isDesktop ? (
              <EditDialog isOpen={isOpen} setIsOpen={setIsOpen} />
            ) : (
              <EditDrawer isOpen={isOpen} setIsOpen={setIsOpen} />
            )}
            <DeleteRatingButton id={90} />
          </div>
        </Card>
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
    try {
      const response = await deleteUserRating({ data: formData });
      queryClient.invalidateQueries({ queryKey: ["ratings"] });
      toast.success(response.message);
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

const EditDialog = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [ratingValue, setRatingValue] = useState<number>(0);
  return (
    <Dialog>
      <DialogTrigger>
        <Button
          className="cursor-pointer w-full"
          onClick={() => setIsOpen(true)}
        >
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Rating</DialogTitle>
        </DialogHeader>
        <StarRatingDisplayModal
          ratingValue={ratingValue}
          setRatingValue={setRatingValue}
          isOpen={isOpen}
        />
        <DialogFooter>
          <Button className="cursor-pointer">Submit</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const EditDrawer = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [ratingValue, setRatingValue] = useState<number>(0);
  return (
    <Drawer>
      <DrawerTrigger>
        <Button
          className="cursor-pointer w-full"
          onClick={() => setIsOpen(true)}
        >
          Edit
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Update Rating</DrawerTitle>
        </DrawerHeader>
        <StarRatingDisplayModal
          ratingValue={ratingValue}
          setRatingValue={setRatingValue}
          isOpen={isOpen}
        />
      </DrawerContent>
    </Drawer>
  );
};
