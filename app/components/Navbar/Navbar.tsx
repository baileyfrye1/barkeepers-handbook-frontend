import { Link } from '@tanstack/react-router';
import UserDropdown from './UserDropdown';
import NavSearch from './NavSearch';
import Container from '../Container';

const Navbar = () => {
  return (
    <Container>
      <nav className='flex justify-between py-4'>
        <Link to='/'>
          <h1 className='text-xl font-bold uppercase'>Barkeepers Handbook</h1>
        </Link>

        <NavSearch />

        <UserDropdown />
      </nav>
    </Container>
  );
};

export default Navbar;
