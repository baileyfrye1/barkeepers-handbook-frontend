'use client';
import { useState } from 'react';
import { Input } from '../ui/input';

const NavSearch = () => {
  const [search, setSearch] = useState('');
  return (
    <Input
      placeholder='Search cocktails...'
      type='search'
      className='max-w-xs dark:bg-muted'
      value={search}
      onChange={(e) => {
        setSearch(e.target.value);
      }}
    />
  );
};

export default NavSearch;
