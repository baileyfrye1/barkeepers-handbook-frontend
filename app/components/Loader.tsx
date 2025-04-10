import { Skeleton } from './ui/skeleton';

const Loader = () => {
  return (
    <>
      <Skeleton className='w-full h-48 rounded-xl' />
      <Skeleton className='w-full h-48 rounded-xl' />
      <Skeleton className='w-full h-48 rounded-xl' />
    </>
  );
};

export default Loader;
