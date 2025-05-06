import { Link } from '@tanstack/react-router';
import Container from './Container';
import { BookOpen } from 'lucide-react';
import { navLinks } from 'utils/links';

const Footer = () => {
  return (
    <footer className='border-y py-8'>
      <Container className='flex flex-col gap-2 md:flex-row md:justify-between'>
        <div>
          <Link className='flex gap-2 items-center' to='/'>
            <BookOpen className='relative z-10' />
            <h1 className='text-base font-bold uppercase'>
              Barkeepers Handbook
            </h1>
          </Link>
        </div>
        <div>
          <h2 className='font-bold mb-4'>Explore</h2>
          <ul className='flex flex-col gap-2'>
            {navLinks.map((link) => {
              return (
                <li key={link.id}>
                  <Link to={link.href}>{link.title}</Link>
                </li>
              );
            })}
          </ul>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
