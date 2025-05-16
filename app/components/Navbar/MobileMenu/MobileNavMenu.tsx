import { Dispatch, SetStateAction } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { Button } from "../../ui/button";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
  SignUpButton,
} from "@clerk/tanstack-react-start";
import Container from "../../Container";
import { navLinks } from "utils/links";
import { motion } from "framer-motion";
import {
  linkContainerVars,
  linkVars,
  navMenuVars,
} from "./MotionVars/MenuVars";

type MenuPropTypes = {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  toggleBodyOverflow: () => void;
};

const MobileNavMenu = ({ setIsOpen, toggleBodyOverflow }: MenuPropTypes) => {
  const { pathname } = useLocation();

  const handleClick = () => {
    setIsOpen(false);
    toggleBodyOverflow();
  };

  return (
    <motion.section
      variants={navMenuVars}
      initial="initial"
      animate="animate"
      exit="exit"
      className="absolute w-full h-full top-0 left-0 origin-top-right flex flex-col justify-center overflow-hidden"
    >
      <Container className="flex flex-col justify-between items-start w-full h-full">
        <motion.div
          variants={linkContainerVars}
          initial="initial"
          animate="animate"
          exit="initial"
          className="flex flex-col gap-4 pt-28"
        >
          {navLinks.map((link) => {
            return (
              <motion.div key={link.title} variants={linkVars}>
                <Link
                  className={`text-2xl font-bold ${
                    link.href === pathname ? "underline" : ""
                  }`}
                  to={link.href}
                  onClick={handleClick}
                >
                  {link.title}
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

        <div className="w-full mb-16">
          <SignedOut>
            <SignInButton mode="modal">
              <Button className="w-full py-6 text-base font-bold">
                Log In
              </Button>
            </SignInButton>
            <SignUpButton mode="modal">
              <Button
                variant="outline"
                className="w-full py-6 mt-2 text-base font-bold"
              >
                Sign Up
              </Button>
            </SignUpButton>
          </SignedOut>

          <SignedIn>
            <Button className="w-full" asChild>
              <SignOutButton />
            </Button>
          </SignedIn>
        </div>
      </Container>
    </motion.section>
  );
};

export default MobileNavMenu;
