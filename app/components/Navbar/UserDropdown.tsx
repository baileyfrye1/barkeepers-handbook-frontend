import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from '../ui/dropdown-menu';
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
  SignUpButton,
  useUser,
} from '@clerk/tanstack-react-start';
import { Link } from '@tanstack/react-router';
import { User, AlignLeft } from 'lucide-react';
import { Button } from '../ui/button';

const UserDropdown = () => {
  const { user } = useUser();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='outline'
          className='cursor-pointer flex gap-4 max-w-[100px]'
        >
          <AlignLeft className='h-6! w-6! rounded-full object-cover' />
          {user?.hasImage ? (
            <img src={user?.imageUrl} className='h-6 rounded-full' />
          ) : (
            <User className='h-6! w-6! bg-primary rounded-full text-white' />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <Link to='/cocktails'>Cocktails</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link to='/cocktails/cocktail-builder'>Cocktail Builder</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <SignedIn>
          <DropdownMenuItem>
            <Link to='/dashboard'>Dashboard</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link to='/profile'>Profile</Link>
          </DropdownMenuItem>
          <DropdownMenuItem className='cursor-pointer'>
            <SignOutButton />
          </DropdownMenuItem>
        </SignedIn>
        <SignedOut>
          <DropdownMenuItem>
            <SignInButton>Sign In</SignInButton>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <SignUpButton>Register</SignUpButton>
          </DropdownMenuItem>
        </SignedOut>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropdown;
