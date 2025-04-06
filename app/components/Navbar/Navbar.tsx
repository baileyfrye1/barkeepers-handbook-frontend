import { useQueryClient } from '@tanstack/react-query';
import {
  SignInButton,
  SignedIn,
  SignedOut,
  SignOutButton,
  SignUpButton,
  UserButton,
  UserProfile,
} from '@clerk/tanstack-react-start';
import { Button } from '../ui/button';
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

        <SignedIn>
          <div>
            <UserDropdown />
          </div>
        </SignedIn>
        <SignedOut>
          <div className='flex gap-2'>
            <Button asChild className='cursor-pointer'>
              <SignInButton />
            </Button>
            <Button asChild variant='outline' className='cursor-pointer'>
              <SignUpButton />
            </Button>
          </div>
        </SignedOut>
      </nav>
    </Container>
  );
};

export default Navbar;
