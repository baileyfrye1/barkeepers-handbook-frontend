import SignInForm from "@/components/Forms/SignInForm";
import { createFileRoute, Link, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/sign-in")({
  component: RouteComponent,
  beforeLoad: async ({ context }) => {
    if (context.authState.isAuthenticated) {
      throw redirect({ to: "/" });
    }
  },
});

function RouteComponent() {
  return (
    <div>
      <SignInForm />
      <small>
        Need to create an account?{" "}
        <Link to="/sign-in">
          <span className="hover:underline">Sign Up</span>
        </Link>
      </small>
    </div>
  );
}
