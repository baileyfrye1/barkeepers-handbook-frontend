import { useState } from 'react';

const MobileMenu = ({ className }: { className?: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={`w-8 h-8 flex flex-col items-end justify-center gap-1.5 ${className}`}
      onClick={handleClick}
    >
      <div className='w-6 h-0.5 bg-black rounded-full' />
      <div className='w-4 h-0.5 bg-black rounded-full' />
      <div className='w-5 h-0.5 bg-black rounded-full' />
    </div>
  );
};

export default MobileMenu;
