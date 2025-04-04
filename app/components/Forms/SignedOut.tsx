import { useAuthentication } from '@/hooks/authHooks';

const SignedOut = ({ children }: { children: React.ReactNode }) => {
  const { data } = useAuthentication();

  if (data.isAuthenticated) return null;

  return <>{children}</>;

  return <div>SignedOut</div>;
};
export default SignedOut;
