'use client';
import { useEffect, useState } from 'react';
import { Input } from '../ui/input';
import {
  useRouter,
  useSearch,
  useLocation,
  useMatch,
} from '@tanstack/react-router';
import { useDebouncedCallback } from 'use-debounce';

const NavSearch = () => {
  const location = useLocation();
  const { navigate } = useRouter();
  // const searchParams = useSearch({ from: '/cocktails' });
  const [search, setSearch] = useState('');

  const handleSearch = useDebouncedCallback((value: string) => {
    const params = new URLSearchParams();

    if (value) {
      params.set('search', value);
    } else {
      params.delete('search');
    }

    navigate({
      to: `/cocktails`,
      replace: true,
      search: { search },
    });
  }, 500);

  // useEffect(() => {
  //   if (!searchParams.search) {
  //     setSearch('');
  //   }
  // }, [searchParams.search]);

  return (
    <Input
      placeholder='Search cocktails...'
      type='search'
      className='max-w-xs dark:bg-muted'
      value={search}
      onChange={(e) => {
        setSearch(e.target.value);
        handleSearch(e.target.value);
      }}
    />
  );
};

export default NavSearch;
