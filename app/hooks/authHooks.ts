import { authQueries } from '@/lib/queries';
import {
  useSuspenseQuery,
  UseSuspenseQueryResult,
} from '@tanstack/react-query';

export const useAuthentication = () => {
  return useSuspenseQuery(authQueries.user());
};

export const useAuthenticatedUser = () => {
  const authQuery = useAuthentication();

  if (authQuery.data.isAuthenticated === false) {
    throw new Error('User is not authenticated');
  }

  return authQuery as UseSuspenseQueryResult<typeof authQuery.data>;
};
