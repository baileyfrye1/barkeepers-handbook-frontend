import { useState } from 'react';
import { AnimatePresence, motion, MotionConfig } from 'framer-motion';
import MobileMenu from './MobileNavMenu';
import { expandingMenuVars } from './MotionVars/MenuVars';
import {
  bottomLineVars,
  middleLineVars,
  topLineVars,
} from './MotionVars/HamburgerVars';

const HamburgerMenu = ({ className }: { className?: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleBodyOverflow = () => {
    if (isOpen) {
      document.body.classList.remove('overflow-hidden');
    } else {
      document.body.classList.add('overflow-hidden');
    }
  };

  //TODO: Write custom open hook that handles overflow logic and sets open to false on larger screen sizes so it doesn't get stuck open

  const handleClick = () => {
    setIsOpen(!isOpen);
    toggleBodyOverflow();
  };

  return (
    <>
      <motion.div
        variants={expandingMenuVars}
        initial={false}
        animate={isOpen ? 'open' : 'closed'}
        exit='closed'
        className={`w-10 h-10 bg-[#367E18] absolute top-0 right-0 translate-y-[75%] translate-x-[-63%] rounded-lg ${className}`}
      />
      <motion.div
        className={`w-8 h-8 flex flex-col items-end justify-center transition-all cursor-pointer relative z-10  ${className}`}
        onClick={handleClick}
        animate={isOpen ? 'open' : 'closed'}
      >
        <motion.div
          variants={topLineVars}
          initial={false}
          animate={isOpen ? 'open' : 'closed'}
          className='absolute w-6 h-0.5 bg-black rounded-full'
        />
        <motion.div
          initial={false}
          animate={isOpen ? 'open' : 'closed'}
          variants={middleLineVars}
          className='absolute w-4 h-0.5 bg-black rounded-full'
        />
        <motion.div
          initial={false}
          animate={isOpen ? 'open' : 'closed'}
          variants={bottomLineVars}
          className='absolute bottom-[30%] translate-y-[50%]  w-5 h-0.5 bg-black rounded-full'
        />
      </motion.div>
      <AnimatePresence mode='wait'>
        {isOpen && (
          <MobileMenu
            setIsOpen={setIsOpen}
            toggleBodyOverflow={toggleBodyOverflow}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default HamburgerMenu;
