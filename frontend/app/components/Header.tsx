import Link from 'next/link';
import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faBars, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';


const Header: React.FC = () => {
  return (
    <header className="flex justify-between bg-primary text-white p-4">
      <Link href="/"><h1 className="text-xl">RoomCare.Pro</h1></Link>
      <div className="flex flex-row items-center gap-4"><FontAwesomeIcon icon={faUser} /><FontAwesomeIcon icon={faArrowRightFromBracket} /><FontAwesomeIcon icon={faBars} /></div>
    </header>
  );
};

export default Header;