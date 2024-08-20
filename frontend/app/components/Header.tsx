'use client';
import Link from 'next/link';
import React, { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faBars, faArrowRightFromBracket, faWindowClose } from '@fortawesome/free-solid-svg-icons';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="flex justify-between bg-primary text-white p-4">
      <Link href="/">
        <h1 className="text-xl">RoomCare.Pro</h1>
      </Link>

      <div className="flex flex-row items-center gap-4">
        <Link href="/login">
          <FontAwesomeIcon icon={faUser} /> <span>Se connecter</span>
        </Link>
        <FontAwesomeIcon icon={faArrowRightFromBracket} /><span>Déconnexion</span>

        {isOpen ? (
          <FontAwesomeIcon icon={faWindowClose} onClick={handleClick} className="cursor-pointer" />
        ) : (
          <FontAwesomeIcon icon={faBars} onClick={handleClick} className="cursor-pointer" />
        )}
      </div>

      {isOpen ? <div className="w-1/3 h-[100vh] bg-red-800"></div> : null}
    </header>
  );
};

export default Header;
