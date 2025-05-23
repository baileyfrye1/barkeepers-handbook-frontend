import { submitRating } from "@/lib/queries/ratings";
import { CocktailRatingType } from "@/schemas/CocktailSchemas";
import { useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import useMediaQuery from "@/hooks/useMediaQuery";
import {
  Dialog,
  DialogTitle,
  DialogFooter,
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
} from "@/components/ui/drawer";
import {
  SignInButton,
  SignUpButton,
  useUser,
} from "@clerk/tanstack-react-start";
import { SubmitButton } from "../../Form/Buttons";
import { Button } from "@/components/ui/button";
import StarDisplay from "./StarDisplay";

const ResponsiveRatingModal = ({
  ratingsData,
  cocktailId,
}: {
  ratingsData: CocktailRatingType;
  cocktailId: number;
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [ratingValue, setRatingValue] = useState<number>(0);
  const isDesktop = useMediaQuery("(min-width: 768px)", {
    initializeWithValue: false,
    defaultValue: true,
  });

  const { isSignedIn } = useUser();

  const rounded = Math.round(ratingsData.averageRating * 2) / 2;

  if (isDesktop) {
    return (
      <>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <StarDisplay
            ratingValue={ratingValue}
            setRatingValue={setRatingValue}
            rounded={rounded}
            size="sm"
            withWrapper
          />
          <DialogContent>
            <DialogHeader className="text-left">
              <DialogTitle>Add Rating</DialogTitle>
            </DialogHeader>
            <StarDisplay
              ratingValue={ratingValue}
              setRatingValue={setRatingValue}
              rounded={rounded}
              size="dialog"
            />
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
      </>
    );
  }

  return (
    <section className="flex flex-col">
      <Drawer open={isOpen} onOpenChange={setIsOpen}>
        <StarDisplay
          ratingValue={ratingValue}
          setRatingValue={setRatingValue}
          rounded={rounded}
          withWrapper
        />
        <DrawerContent>
          <DrawerHeader className="text-left pb-2">
            <DrawerTitle className="text-lg">Add Rating</DrawerTitle>
          </DrawerHeader>
          <StarDisplay
            ratingValue={ratingValue}
            setRatingValue={setRatingValue}
            rounded={rounded}
            size="drawer"
          />
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
      <SubmitButton isDesktop={isDesktop} isLoading={isLoading} />
    </form>
  );
};

export default ResponsiveRatingModal;
