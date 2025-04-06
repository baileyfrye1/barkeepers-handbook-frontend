import { authStateFn } from '@/lib/actions';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/settings')({
  component: RouteComponent,
  beforeLoad: () => authStateFn(),
});

function RouteComponent() {
  return <div>Hello "/_authed/settings"!</div>;
}
