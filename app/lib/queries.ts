import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';
import { getUser } from './actions';

export const authQueries = {
  all: ['auth'],
  user: () =>
    queryOptions({
      queryKey: [...authQueries.all, 'user'],
      queryFn: () => getUser(),
    }),
};
