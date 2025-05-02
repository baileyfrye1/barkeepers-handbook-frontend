import { Link } from '@tanstack/react-router';
import UserDropdown from './UserDropdown';
import NavSearch from './NavSearch';
import Container from '../Container';

const Navbar = () => {
  return (
    <nav className='py-8 border-b'>
      <Container className='flex justify-between'>
        <div className='flex gap-8 items-center'>
          <Link to='/'>
            <h1 className='text-base font-bold uppercase'>
              Barkeepers Handbook
            </h1>
          </Link>
          <Link to='/cocktails'>Cocktails</Link>
          <Link to='/cocktails/cocktail-builder'>Cocktail Builder</Link>
        </div>

        <div className='flex gap-2'>
          <NavSearch />
          <UserDropdown />
        </div>
      </Container>
    </nav>
  );
};

export default Navbar;
