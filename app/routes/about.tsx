import { createFileRoute, Link } from "@tanstack/react-router";
import axiosClient from "@/lib/axiosClient";

export const Route = createFileRoute("/about")({
  component: RouteComponent,
  loader: async () => {
    const response = await axiosClient.get("cocktails");
    return response.data;
  },
});

function RouteComponent() {
  const data = Route.useLoaderData();
  return (
    <div>
      {data.map((cocktail) => {
        return <h1>{cocktail.name}</h1>;
      })}
    </div>
  );
}
