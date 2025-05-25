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
import { CocktailRatingType } from "@/schemas/CocktailSchemas";
import { DialogTrigger } from "@radix-ui/react-dialog";
import useMediaQuery from "@/hooks/useMediaQuery";
import { SubmitRatingButton, UpdateRatingButton } from "./ActionButtons";

type RatingModalProps = {
  title: string;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  userRating: number;
  setUserRating: React.Dispatch<React.SetStateAction<number>>;
  cocktailId: number;
  ratingsData?: CocktailRatingType;
  children?: React.ReactNode;
  type: "create" | "update";
  ratingId?: number;
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
  type,
  ratingId,
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
              editable={false}
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
            editable={true}
          />
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
            ) : type === "create" ? (
              <SubmitRatingButton
                setIsOpen={setIsOpen}
                rating={userRating}
                cocktailId={cocktailId}
                className={`${!isDesktop && "w-full"}`}
              />
            ) : (
              <UpdateRatingButton
                setIsOpen={setIsOpen}
                rating={userRating}
                ratingId={ratingId!}
                className={`${!isDesktop && "w-full"}`}
              />
            )}
          </Footer>
        </Content>
      </Wrapper>
    </>
  );
};

export default RatingModal;
