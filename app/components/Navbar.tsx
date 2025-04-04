import { Link, useRouter } from '@tanstack/react-router';
import { Button } from './ui/button';
import SignedIn from './Forms/SignedIn';
import SignedOut from './Forms/SignedOut';
import { signOut } from '@/lib/actions';
import { useQueryClient } from '@tanstack/react-query';

const Navbar = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const handleLogout = async () => {
    await signOut();
    queryClient.invalidateQueries();
    router.invalidate();
  };

  return (
    <nav className='flex justify-around py-4'>
      <div>
        <h1 className='text-2xl font-bold uppercase'>Barkeepers Handbook</h1>
      </div>

      <SignedIn>
        <Button onClick={handleLogout} className='cursor-pointer'>
          Sign Out
        </Button>
      </SignedIn>

      <SignedOut>
        <div className='flex gap-2'>
          <Button asChild>
            <Link to='/sign-in'>Sign In</Link>
          </Button>
          <Button asChild>
            <Link to='/sign-up'>Sign Up</Link>
          </Button>
        </div>
      </SignedOut>
    </nav>
  );
};

export default Navbar;
