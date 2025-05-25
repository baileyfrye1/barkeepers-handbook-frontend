import {
  submitRating,
  deleteUserRating,
  updateRating,
} from "@/lib/queries/ratings";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { SubmitButton, DeleteButton } from "../Form/Buttons";

export const SubmitRatingButton = ({
  setIsOpen,
  cocktailId,
  rating,
  className,
}: {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  cocktailId: number;
  rating: number;
  className?: string;
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.currentTarget);
    const response = await submitRating({ data: formData });

    if (response.success === true) {
      toast.success(response.message);
      await router.invalidate();
    } else {
      toast.error(response.message);
    }

    setIsLoading(false);
    setIsOpen(false);
  };
  return (
    <form onSubmit={handleSubmit}>
      <input type="hidden" value={cocktailId} name="cocktailId" />
      <input type="hidden" value={rating} name="rating" />
      <SubmitButton className={className} isLoading={isLoading} />
    </form>
  );
};

export const UpdateRatingButton = ({
  ratingId,
  rating,
  setIsOpen,
  className,
}: {
  ratingId: number;
  rating: number;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  className?: string;
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
      <input type="hidden" value={ratingId} name="ratingId" />
      <input type="hidden" value={rating} name="rating" />
      <SubmitButton className={className} isLoading={isLoading} />
    </form>
  );
};

export const DeleteRatingButton = ({ id }: { id: number }) => {
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
