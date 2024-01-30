import Logo from '../assets/img/Logo/logo.webp';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className="flex flex-row justify-between w-full px-4">
      <div className='flex flex-row items-center'>
        <img src={Logo} alt="Logo de RoomCare Pro" width={180} height={120}></img>
        <p className="text-primary text-3xl">RoomCare.Pro</p>
      </div>
      <div className="flex">
        <ul className="flex flex-row items-center justify-items-center align-middle gap-6">
          <li>
            <NavLink to="/" className={({ isActive, isPending }) => (isPending ? 'pending' : isActive ? 'underline' : '')}>
              Accueil
            </NavLink>
          </li>
          <li>
            <NavLink to="#features">Services</NavLink>
          </li>
          <li>
            <NavLink to="/prices">Tarifs</NavLink>
          </li>
          <li>
            <NavLink
              type="button"
              className="focus:outline-none text-white bg-primary hover:bg-second focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              to="/Login"
            >
              Se connecter
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
