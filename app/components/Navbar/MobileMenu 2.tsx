import { useState } from 'react';

const MobileMenu = ({ className }: { className?: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return <div className={`${className}`} onClick={handleClick}></div>;
};

export default MobileMenu;
