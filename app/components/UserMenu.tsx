import { signOut } from '@/lib/actions';
import { authQueries } from '@/lib/queries';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from '@tanstack/react-router';

const userMenu = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const {
    data: { user },
  } = useAuthenticatedUser();

  const handleLogout = async () => {
    await signOut();
    await queryClient.invalidateQueries(authQueries.user());
    router.invalidate();
  };

  return <div>userMenu</div>;
};
export default userMenu;
