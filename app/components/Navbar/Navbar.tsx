import { Link } from '@tanstack/react-router';
import UserDropdown from './UserDropdown';
import NavSearch from './NavSearch';
import Container from '../Container';
import { BookOpen } from 'lucide-react';
import MobileMenu from './MobileMenu';

const Navbar = () => {
  return (
    <nav className='py-8 border-b'>
      <Container className='flex justify-between items-center gap-6'>
        <div>
          <Link className='flex gap-2 items-center' to='/'>
            <BookOpen />
            <h1 className='text-base font-bold uppercase hidden md:block'>
              Barkeepers Handbook
            </h1>
          </Link>
        </div>
        <NavSearch />
        <div className='md:flex gap-2 items-center hidden'>
          <Link to='/cocktails'>Cocktails</Link>
          <Link to='/cocktails/cocktail-builder'>Cocktail Builder</Link>
          <UserDropdown />
        </div>
        <MobileMenu className='md:hidden' />
      </Container>
    </nav>
  );
};

export default Navbar;
