import { Star } from 'lucide-react';

const Reviews = () => {
  return (
    <section className='flex gap-2 items-center'>
      <span>
        <Star height={15} width={15} fill='black' />
      </span>
      <span>0 (0 reviews)</span>
    </section>
  );
};

export default Reviews;
