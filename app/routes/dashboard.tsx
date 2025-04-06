import { authStateFn } from '@/lib/actions';
import { useUser } from '@clerk/tanstack-react-start';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/dashboard')({
  component: RouteComponent,
  beforeLoad: () => authStateFn(),
});

function RouteComponent() {
  const { user } = useUser();
  return <div>Hello {user?.username}</div>;
}
