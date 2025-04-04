import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { signUpUser } from '@/lib/actions';
import { toast } from 'sonner';
import { useRouter } from '@tanstack/react-router';
import { Button } from '../ui/button';
import { Loader2 } from 'lucide-react';

const SignUpForm = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const signUpMutation = useMutation({
    mutationFn: signUpUser,
    onSuccess: () => {
      toast.success('Successfully signed up.');
      queryClient.resetQueries();
      router.invalidate();
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const username = formData.get('username') as string;

    signUpMutation.mutate({
      data: {
        email,
        password,
        username,
      },
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <Label htmlFor='email'>Email</Label>
        <Input name='email' id='email' />
      </div>
      <div>
        <Label htmlFor='username'>Username</Label>
        <Input name='username' id='username' />
      </div>
      <div>
        <Label htmlFor='password'>Password</Label>
        <Input name='password' id='password' />
      </div>
      <Button
        disabled={signUpMutation.isPending}
        className='flex items-center gap-1'
      >
        {signUpMutation.isPending ? (
          <>
            Loading <Loader2 className='animate-spin inline-block' />
          </>
        ) : (
          'Sign Up'
        )}
      </Button>
    </form>
  );
};

export default SignUpForm;
