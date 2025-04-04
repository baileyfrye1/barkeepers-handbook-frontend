import SignUpForm from "@/components/Forms/SignUpForm";
import { createFileRoute, Link, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/sign-up")({
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
      <SignUpForm />
      <small>
        Already have an account?{" "}
        <Link to="/sign-in">
          <span className="hover:underline">Sign In</span>
        </Link>
      </small>
    </div>
  );
}
