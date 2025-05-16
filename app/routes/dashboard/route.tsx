import { authStateFn } from "@/lib/actions";
import { createFileRoute, Link, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard")({
  component: RouteComponent,
  beforeLoad: async () => await authStateFn(),
  loader: ({ context }) => {},
});

function RouteComponent() {
  return (
    <div className="grid grid-cols-3">
      <aside className="col-span-1 flex flex-col">
        <Link to="/dashboard/cocktail-creator">Create Cocktail</Link>
        <Link to="/dashboard/manage">My Cocktails</Link>
        <Link to="/dashboard/my-activity">My Activity</Link>
      </aside>
      <section className="col-span-2">
        <Outlet />
      </section>
    </div>
  );
}
