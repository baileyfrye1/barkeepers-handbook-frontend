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
import { User } from 'lucide-react';
import { Button } from '../ui/button';

const UserDropdown = () => {
  const { user } = useUser();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='ghost'
          className='cursor-pointer flex gap-4 max-w-[100px]'
        >
          {user?.hasImage ? (
            <img src={user?.imageUrl} className='h-6 rounded-full' />
          ) : (
            <User className='h-6! w-6! bg-primary rounded-full text-white' />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <SignedIn>
          <DropdownMenuItem>
            <Link to='/dashboard'>Dashboard</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link to='/profile'>Profile</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <SignOutButton />
          </DropdownMenuItem>
        </SignedIn>
        <SignedOut>
          <DropdownMenuItem>
            <SignInButton>Log In</SignInButton>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <SignUpButton>Sign Up</SignUpButton>
          </DropdownMenuItem>
        </SignedOut>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropdown;
