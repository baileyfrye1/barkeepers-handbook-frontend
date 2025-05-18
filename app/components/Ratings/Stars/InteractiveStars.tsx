import { submitRating } from "@/lib/queries/ratings";
import { CocktailRatingType } from "@/schemas/CocktailSchemas";
import { useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { FaRegStar, FaRegStarHalfStroke, FaStar } from "react-icons/fa6";
import { toast } from "sonner";
import useMediaQuery from "@/hooks/useMediaQuery";
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
import {
  SignInButton,
  SignUpButton,
  useUser,
} from "@clerk/tanstack-react-start";
import FormContainer from "../../FormContainer";
import { SubmitButton } from "../../Form/Buttons";
import { Button } from "@/components/ui/button";
import StarRatingDisplay from "./StarRatingDisplay";

const InteractiveStars = ({
  ratingsData,
  cocktailId,
}: {
  ratingsData: CocktailRatingType;
  cocktailId: number;
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [hovered, setHovered] = useState<number | null>();
  const [ratingValue, setRatingValue] = useState<number>(0);
  const starArray: number[] = Array.from({ length: 5 });
  const isDesktop = useMediaQuery("(min-width: 768px)", {
    initializeWithValue: false,
    defaultValue: true,
  });

  const { isSignedIn } = useUser();

  const rounded = Math.round(ratingsData.averageRating * 2) / 2;

  if (isDesktop) {
    return (
      <section className="flex flex-col">
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <span className="flex">
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
                  <DialogTrigger onClick={() => setRatingValue(i + 1)}>
                    <FaStar
                      key={i}
                      className="cursor-pointer"
                      onMouseOver={() => setHovered(i + 1)}
                      onMouseOut={() => setHovered(null)}
                    />
                  </DialogTrigger>
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
            <StarRatingDisplay
              ratingValue={ratingValue}
              setRatingValue={setRatingValue}
              rounded={rounded}
              isOpen={isOpen}
            />
          </span>
          <DialogContent>
            <DialogHeader className="text-left">
              <DialogTitle>Add Rating</DialogTitle>
            </DialogHeader>
            {/* TODO: Abstract the star display to separate component to follow DRY better */}
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
            <DialogFooter>
              {!isSignedIn ? (
                <>
                  <SignInButton mode="modal">
                    <Button
                      className="font-bold cursor-pointer"
                      onClick={() => setIsOpen(false)}
                    >
                      Log In
                    </Button>
                  </SignInButton>
                  <SignUpButton mode="modal">
                    <Button
                      className="font-bold cursor-pointer"
                      variant="outline"
                      onClick={() => setIsOpen(false)}
                    >
                      Sign Up
                    </Button>
                  </SignUpButton>
                </>
              ) : (
                <SubmitRatingButton
                  setIsOpen={setIsOpen}
                  isDesktop={isDesktop}
                  rating={ratingValue}
                  cocktailId={cocktailId}
                />
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </section>
    );
  }

  return (
    <section className="flex flex-col">
      <Drawer open={isOpen} onOpenChange={setIsOpen}>
        <DrawerTrigger>
          <span className="flex">
            {starArray.map((_, i) => {
              if (i + 1 <= rounded) {
                return (
                  <FaStar
                    className="h-5 w-5"
                    key={i}
                    onMouseOver={() => setHovered(i + 1)}
                    onMouseOut={() => setHovered(null)}
                    onClick={() => setRatingValue(i + 1)}
                  />
                );
              } else if (i + 0.5 === rounded) {
                return (
                  <>
                    <FaRegStarHalfStroke
                      onClick={() => setRatingValue(i + 1)}
                      className="h-5 w-5"
                      key={i}
                    />
                  </>
                );
              } else {
                return (
                  <FaRegStar
                    key={i}
                    className="cursor-pointer w-5 h-5"
                    onMouseOver={() => setHovered(i)}
                    onMouseOut={() => setHovered(null)}
                    onClick={() => setRatingValue(i + 1)}
                  />
                );
              }
            })}
          </span>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader className="text-left">
            <DrawerTitle className="text-lg">Add Rating</DrawerTitle>
          </DrawerHeader>
          <span className="flex gap-2 px-4 mb-8"></span>
          <DrawerFooter>
            {!isSignedIn ? (
              <>
                <SignInButton mode="modal">
                  <Button
                    className="font-bold"
                    onClick={() => setIsOpen(false)}
                  >
                    Log In
                  </Button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <Button
                    className="font-bold"
                    variant="outline"
                    onClick={() => setIsOpen(false)}
                  >
                    Sign Up
                  </Button>
                </SignUpButton>
              </>
            ) : (
              <>
                <SubmitRatingButton
                  setIsOpen={setIsOpen}
                  isDesktop={isDesktop}
                  cocktailId={cocktailId}
                  rating={ratingValue}
                />
                <DrawerClose asChild>
                  <Button
                    className="font-bold"
                    variant="outline"
                    onClick={() => setIsOpen(false)}
                  >
                    Close
                  </Button>
                </DrawerClose>
              </>
            )}
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </section>
  );
};

const SubmitRatingButton = ({
  setIsOpen,
  isDesktop,
  cocktailId,
  rating,
}: {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isDesktop: boolean;
  cocktailId: number;
  rating: number;
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.currentTarget);
    try {
      const response = await submitRating({ data: formData });
      toast.success(response.message);
      await router.invalidate({ sync: true });
      setIsLoading(false);
      setIsOpen(false);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Something went wrong",
      );
      setIsLoading(false);
      setIsOpen(false);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <input type="hidden" value={cocktailId} name="cocktailId" />
      <input type="hidden" value={rating} name="rating" />
      <SubmitButton isDesktop={isDesktop} isLoading={isLoading} />
    </form>
  );
};

export default InteractiveStars;
