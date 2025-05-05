import { Link } from '@tanstack/react-router';
import UserDropdown from './UserDropdown';
import NavSearch from './NavSearch';
import Container from '../Container';
import { BookOpen } from 'lucide-react';
import { navLinks } from 'utils/links';
import HamburgerMenu from './MobileMenu/HamburgerMenu';

const Navbar = () => {
  return (
    <nav className='py-8 border-b'>
      <Container className='flex justify-between items-center gap-6'>
        <div>
          <Link className='flex gap-2 items-center' to='/'>
            <BookOpen className='relative z-10' />
            <h1 className='text-base font-bold uppercase hidden md:block'>
              Barkeepers Handbook
            </h1>
          </Link>
        </div>
        <NavSearch />
        <div className='md:flex gap-2 items-center hidden'>
          {navLinks.map((link) => {
            return (
              <Link key={link.title} to={link.href}>
                {link.title}
              </Link>
            );
          })}
          <UserDropdown />
        </div>
        <HamburgerMenu className='md:hidden' />
      </Container>
    </nav>
  );
};

export default Navbar;
