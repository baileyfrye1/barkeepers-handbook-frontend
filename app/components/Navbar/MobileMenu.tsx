import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link, useLocation } from '@tanstack/react-router';
import { Button } from '../ui/button';
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
  SignUpButton,
  useUser,
} from '@clerk/tanstack-react-start';
import Container from '../Container';
import { navLinks } from 'utils/links';

const menuVars = {
  initial: {
    scaleX: 0,
    scaleY: 0,
    borderBottomLeftRadius: 1000,
  },
  animate: {
    scaleX: 1,
    scaleY: 1,
    borderBottomLeftRadius: 0,
    transition: {
      duration: 0.5,
    },
  },
  exit: {
    scaleX: 0,
    scaleY: 0,
    borderBottomLeftRadius: 1000,
    transition: {
      duration: 0.5,
    },
  },
};

type MenuPropTypes = {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  toggleBodyOverflow: () => void;
};

const MobileMenu = ({ className }: { className?: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleBodyOverflow = () => {
    if (isOpen) {
      document.body.classList.remove('overflow-hidden');
    } else {
      document.body.classList.add('overflow-hidden');
    }
  };

  const handleClick = () => {
    setIsOpen(!isOpen);
    toggleBodyOverflow();
  };

  return (
    <>
      <div
        className={`w-8 h-8 flex flex-col items-end justify-center gap-1.5 cursor-pointer relative z-10 ${className}`}
        onClick={handleClick}
      >
        <motion.div className='w-6 h-0.5 bg-black rounded-full' />
        <motion.div className='w-4 h-0.5 bg-black rounded-full' />
        <motion.div className='w-5 h-0.5 bg-black rounded-full' />
      </div>
      <AnimatePresence>
        {isOpen && (
          <MobileNavMenu
            setIsOpen={setIsOpen}
            toggleBodyOverflow={toggleBodyOverflow}
          />
        )}
      </AnimatePresence>
    </>
  );
};

const MobileNavMenu = ({ setIsOpen, toggleBodyOverflow }: MenuPropTypes) => {
  const { user } = useUser();
  const { pathname } = useLocation();

  const handleClick = () => {
    setIsOpen(false);
    toggleBodyOverflow();
  };

  return (
    <motion.section
      variants={menuVars}
      initial='initial'
      animate='animate'
      exit='exit'
      className='fixed w-full h-full top-0 left-0 bg-red-500 origin-top-right flex flex-col justify-center overflow-hidden'
    >
      <Container className='flex flex-col justify-between items-start w-full h-full'>
        <div className='flex flex-col gap-4 pt-28'>
          {navLinks.map((link) => {
            return (
              <Link
                key={link.title}
                className='text-2xl font-bold'
                to={link.href}
                onClick={handleClick}
              >
                {link.title}
              </Link>
            );
          })}
        </div>

        <div className='w-full mb-16'>
          <SignedOut>
            <SignInButton mode='modal'>
              <Button className='w-full py-6 text-base font-bold'>
                Log In
              </Button>
            </SignInButton>
            <SignUpButton mode='modal'>
              <Button className='w-full py-6 mt-2 text-base font-bold'>
                Sign Up
              </Button>
            </SignUpButton>
          </SignedOut>

          <SignedIn>
            <h1>{user?.fullName}</h1>
            <Button className='w-full' asChild>
              <SignOutButton />
            </Button>
          </SignedIn>
        </div>
      </Container>
    </motion.section>
  );
};

export default MobileMenu;
