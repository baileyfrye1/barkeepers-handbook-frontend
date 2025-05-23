import {
  SignInButton,
  SignUpButton,
  useUser,
} from "@clerk/tanstack-react-start";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import StarDisplay from "./Stars/StarDisplay";
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";
import { submitRating } from "@/lib/queries/ratings";
import { useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { SubmitButton } from "../Form/Buttons";
import { CocktailRatingType } from "@/schemas/CocktailSchemas";
import { DialogTrigger } from "@radix-ui/react-dialog";
import useMediaQuery from "@/hooks/useMediaQuery";

type RatingModalProps = {
  title: string;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  userRating: number;
  setUserRating: React.Dispatch<React.SetStateAction<number>>;
  cocktailId: number;
  ratingsData?: CocktailRatingType;
  children?: React.ReactNode;
};

const RatingModal = ({
  title,
  isOpen,
  setIsOpen,
  userRating,
  setUserRating,
  cocktailId,
  ratingsData,
  children,
}: RatingModalProps) => {
  const { isSignedIn } = useUser();
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const Wrapper = isDesktop ? Dialog : Drawer;
  const Trigger = isDesktop ? DialogTrigger : DrawerTrigger;
  const Content = isDesktop ? DialogContent : DrawerContent;
  const Header = isDesktop ? DialogHeader : DrawerHeader;
  const Title = isDesktop ? DialogTitle : DrawerTitle;
  const Footer = isDesktop ? DialogFooter : DrawerFooter;

  return (
    <>
      <Wrapper open={isOpen} onOpenChange={setIsOpen}>
        <Trigger>
          {children ? (
            children
          ) : (
            <StarDisplay
              userRating={userRating}
              size="sm"
              ratingsData={ratingsData}
              setUserRating={setUserRating}
            />
          )}
        </Trigger>
        <Content>
          <Header className="text-left">
            <Title>{title}</Title>
          </Header>
          <StarDisplay
            userRating={userRating}
            size={`${isDesktop ? "dialog" : "drawer"}`}
            ratingsData={ratingsData}
            setUserRating={setUserRating}
            className="mb-4"
          />
          {/* TODO: Update footer to allow for submit or update. Potentially refactor rating button to allow for a variant to choose correct button */}
          <Footer>
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
                rating={userRating}
                cocktailId={cocktailId}
                className={`${!isDesktop && "w-full"}`}
              />
            )}
          </Footer>
        </Content>
      </Wrapper>
    </>
  );
};

const SubmitRatingButton = ({
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

export default RatingModal;
