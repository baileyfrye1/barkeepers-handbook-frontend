import { Link } from "@tanstack/react-router";
import Container from "./Container";
import { BookOpen } from "lucide-react";
import { navLinks } from "utils/links";

const Footer = () => {
  return (
    <section>
      <footer className="border-y py-8">
        <Container className="flex flex-col gap-6 md:flex-row md:justify-between">
          <div>
            <Link className="flex gap-2 items-center" to="/">
              <BookOpen />
              <h1 className="text-base font-bold uppercase">
                Barkeepers Handbook
              </h1>
            </Link>
          </div>
          <div>
            <h2 className="font-bold mb-3.5">Explore</h2>
            <ul className="flex flex-col gap-2">
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
      <article className="py-2">
        <Container>
          <p>{`© ${new Date().getFullYear()} Barkeepers Handbook`}</p>
        </Container>
      </article>
    </section>
  );
};

export default Footer;
