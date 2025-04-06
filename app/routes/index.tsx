import axiosClient from '@/lib/axiosClient';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: Home,
  loader: async () => {
    await axiosClient.get('cocktails');
  },
});

function Home() {
  return (
    <>
      <h1>Home page</h1>
    </>
  );
}
