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
import { Button } from "../ui/button";
import {
  SignInButton,
  SignUpButton,
  useUser,
} from "@clerk/tanstack-react-start";

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
  const router = useRouter();
  const isDesktop = useMediaQuery("(min-width: 768px)", {
    initializeWithValue: false,
    defaultValue: true,
  });
  const { isSignedIn } = useUser();

  const starArray: number[] = Array.from({ length: 5 });
  const rounded = Math.round(ratingsData.averageRating * 2) / 2;

  // TODO: Add correct error handling. Right now the success message always happens even if there is an error submitting
  const handleSubmit = async () => {
    try {
      submitRating({ data: { cocktailId, rating: ratingValue } });
      setIsOpen(false);
      toast.success("Successfully submitted rating");
      await router.invalidate({ sync: true });
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };

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
          </span>
          <DialogContent>
            <DialogHeader className="text-left">
              <DialogTitle>Add Rating</DialogTitle>
            </DialogHeader>
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
                <Button
                  className="cursor-pointer font-bold"
                  onClick={handleSubmit}
                >
                  Submit
                </Button>
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
          <span className="flex gap-2 px-4 mb-8">
            {starArray.map((_, i) => {
              if (i + 1 <= ratingValue) {
                return (
                  <FaStar
                    className="h-8 w-8"
                    key={i}
                    onMouseOver={() => setHovered(i + 1)}
                    onMouseOut={() => setHovered(null)}
                    onClick={() => setRatingValue(i + 1)}
                  />
                );
              } else {
                return (
                  <FaRegStar
                    key={i}
                    className="cursor-pointer w-8 h-8"
                    onMouseOver={() => setHovered(i)}
                    onMouseOut={() => setHovered(null)}
                    onClick={() => setRatingValue(i + 1)}
                  />
                );
              }
            })}
          </span>
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
                <Button className="font-bold" onClick={handleSubmit}>
                  Submit
                </Button>
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

export default InteractiveStars;
