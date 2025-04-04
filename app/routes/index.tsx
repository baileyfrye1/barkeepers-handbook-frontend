import SignedIn from '@/components/Forms/SignedIn';
import SignedOut from '@/components/Forms/SignedOut';
import { useAuthenticatedUser, useAuthentication } from '@/hooks/authHooks';
import axiosClient from '@/lib/axiosClient';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: Home,
  loader: async () => {
    await axiosClient.get('cocktails');
  },
});

function Home() {
  const { data } = useAuthenticatedUser();
  return (
    <>
      <SignedIn>Hello {data.user.meta.username}</SignedIn>
      <SignedOut>Hello Guest</SignedOut>
    </>
  );
}
