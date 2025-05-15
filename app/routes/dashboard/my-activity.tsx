import { authStateFn } from "@/lib/actions";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/my-activity")({
  beforeLoad: async () => await authStateFn(),
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/dashboard/my-activity"!</div>;
}
