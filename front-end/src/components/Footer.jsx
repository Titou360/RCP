import { NavLink } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className='flex w-full items-end justify-end border-t-2 border-primary'>
      <ul className="flex flex-row gap-6 py-4 px-4">
        <li>
          <NavLink to="/">
            Tous droits réservés
          </NavLink>
        </li>
        <li>
          <NavLink to="/">Mentions légales</NavLink>
        </li>
        <li>
          <NavLink to="/">Contact</NavLink>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
