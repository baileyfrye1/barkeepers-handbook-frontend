import { useQueryClient } from '@tanstack/react-query';
import {
  SignInButton,
  SignedIn,
  SignedOut,
  SignOutButton,
  SignUpButton,
} from '@clerk/tanstack-react-start';

const Navbar = () => {
  return (
    <nav className='flex justify-around py-4'>
      <div>
        <h1 className='text-2xl font-bold uppercase'>Barkeepers Handbook</h1>
      </div>

      <SignedIn>
        <SignOutButton />
      </SignedIn>
      <SignedOut>
        <SignInButton />
        <SignUpButton />
      </SignedOut>
    </nav>
  );
};

export default Navbar;
