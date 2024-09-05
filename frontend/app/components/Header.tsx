'use client';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faBars, faArrowRightFromBracket, faWindowClose } from '@fortawesome/free-solid-svg-icons';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  // Fonction pour récupérer le token du localStorage
  const loadToken = () => {
    const storedToken = localStorage.getItem('token');
    setToken(storedToken);
  };

  useEffect(() => {
    // Charger le token au premier montage du composant
    loadToken();

    // Écouter l'événement storage pour détecter les changements de token
    window.addEventListener('storage', loadToken);

    // Nettoyer l'événement quand le composant est démonté
    return () => {
      window.removeEventListener('storage', loadToken);
    };
  }, []);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    // Supprimer le token lors de la déconnexion
    localStorage.removeItem('token');
    setToken(null); // Mettre à jour l'état pour refléter la déconnexion
  };

  return (
    <header className="flex justify-between bg-primary text-white p-4">
      <Link href="/">
        <h1 className="text-xl">RoomCare.Pro</h1>
      </Link>

      <div className="flex flex-row items-center gap-4">
        {/* Si l'utilisateur n'est pas connecté, afficher le lien de connexion */}
        {!token ? (
          <Link href="/login">
            <FontAwesomeIcon icon={faUser} /> <span>Se connecter</span>
          </Link>
        ) : (
          // Sinon, afficher le bouton de déconnexion
          <button onClick={handleLogout} className="flex items-center gap-2">
            <FontAwesomeIcon icon={faArrowRightFromBracket} /> <span>Déconnexion</span>
          </button>
        )}

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
