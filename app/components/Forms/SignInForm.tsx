import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate, useRouter } from '@tanstack/react-router';
import { signInUser } from '@/lib/actions';
import { toast } from 'sonner';
import { Button } from '../ui/button';
import { Loader2 } from 'lucide-react';

const SignInForm = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const signInMutation = useMutation({
    mutationFn: signInUser,
    onSuccess: () => {
      toast.success('Successfully logged in.');
      queryClient.resetQueries();
      navigate({ to: '/' });
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    signInMutation.mutate({
      data: {
        email,
        password,
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
        <Label htmlFor='password'>Password</Label>
        <Input name='password' id='password' />
      </div>
      <Button
        disabled={signInMutation.isPending}
        className='flex items-center gap-1'
      >
        {signInMutation.isPending ? (
          <>
            Loading <Loader2 className='animate-spin inline-block' />
          </>
        ) : (
          'Sign In'
        )}
      </Button>
    </form>
  );
};

export default SignInForm;
