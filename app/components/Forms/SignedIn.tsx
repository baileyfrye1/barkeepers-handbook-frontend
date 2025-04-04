import { useAuthentication } from '@/hooks/authHooks';

const SignedIn = ({ children }: { children: React.ReactNode }) => {
  const { data } = useAuthentication();

  if (!data.isAuthenticated) return null;

  return <>{children}</>;
};
export default SignedIn;
