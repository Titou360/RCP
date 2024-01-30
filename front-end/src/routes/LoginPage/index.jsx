import { useState } from 'react';
import ToggleSwitch from '../../components/ToggleSwitch';

const LoginPage = () => {
  const [isSelect, setIsSelect] = useState(true); // Utilise le hook useState pour gérer le mode d'affichage
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    firstName: ''
  });

  const toggleMode = () => {
    setIsSelect(!isSelect); // Inverse le mode d'affichage entre connexion et inscription
    setFormData({
      email: '',
      password: '',
      name: '',
      firstName: ''
    });
  };

  const handleChange = (e) => {
    // Met à jour les valeurs des champs d'entrée en fonction de l'utilisateur
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="w-3/4 mx-auto mb-10">
      <div className="mx-auto mt-4 md:w-4/6">
        <div className="grid grid-cols-2 shadow-2xl md:grid-cols-1">
          <div className="bg-gradient-to-r from-primary to-second h-[576px] relative md:hidden block">
            <button
              className={`absolute right-0 p-2 px-4 font-medium ${isSelect ? 'text-primary bg-white rounded-l-3xl' : 'text-white'} top-20`}
              onClick={toggleMode}
            >
              Se connecter
            </button>
            <button
              className={`absolute right-0 p-2 px-4 font-medium ${isSelect ? 'text-white' : 'text-primary bg-white rounded-l-3xl'} top-32`}
              onClick={toggleMode}
            >
              S&apos;inscrire
            </button>
          </div>
          <div className="flex flex-col justify-between h-[576px] ">
            <div className="flex justify-center p-3 md:hidden">
              <ToggleSwitch />

              {/* <div className="w-90 text-center bg-second rounded-3xl cursor-all-scroll">
                <button
                  type="button"
                  className={`${
                    isSelect
                      ? 'w-auto p-2 px-8 bg-white border sm:px-16 rounded-3xl transition duration-200'
                      : 'w-auto transition duration-200 text-light sm:px-16 p-2 px-8 '
                  }  "}`}
                  onClick={toggleMode}
                >
                  Se connecter
                </button>
                <button
                  type="button"
                  className={`${
                    isSelect
                      ? 'w-auto transition duration-200 text-light sm:px-16 p-2 px-8 '
                      : 'w-auto p-2 px-8 bg-white border sm:px-16 rounded-3xl transition duration-200'
                  }`}
                  onClick={toggleMode}
                >
                  S&apos;inscrire
                </button>
              </div> */}
            </div>
            <div className="p-10 md:mt-20">
              {isSelect ? (
                <div>
                  <div className="text-2xl font-medium text-center uppercase sm:p-5">Se connecter</div>
                  <div className="relative">
                    <img className="absolute w-5 h-5 ml-2 top-3" src="/src/assets/img/loginPage/user-solid.svg" alt="user" />
                    <input
                      type="text"
                      className="w-full p-3 border-b-2 pl-9 placeholder:text-black outline-0"
                      placeholder="Votre Email"
                      name="email"
                      id="mail"
                    />
                  </div>
                  <div className="relative">
                    <img className="absolute w-5 h-5 ml-2 top-3" src="src/assets/img/loginPage/key-solid.svg" alt="key" />
                    <input
                      type="password"
                      className="w-full p-3 mb-3 border-b-2 pl-9 placeholder:text-black outline-0"
                      placeholder="Votre mot de passe"
                      name="Password"
                      id="password"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-second">
                      <a href="#">Mot de passe oublié ?</a>
                    </div>
                    <div className="cursor-pointer focus:outline-none text-white bg-second hover:bg-second/70 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                      Se connecter
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="text-2xl font-medium text-center uppercase sm:p-5">S&apos;inscrire <br />- Étape 1 -</div>

                  <div className="relative">
                    <img className="absolute w-5 h-5 ml-2 top-3" src="src/assets/img/loginPage/user-solid.svg" alt="key" />
                    <input
                      type="text"
                      className="w-full p-3 border-b-2 pl-9 placeholder:text-black outline-0"
                      placeholder="Nom"
                      name="name"
                      id="name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="relative">
                    <img className="absolute w-5 h-5 ml-2 top-3" src="src/assets/img/loginPage/user-solid.svg" alt="key" />
                    <input
                      type="text"
                      className="w-full p-3 border-b-2 pl-9 placeholder:text-black outline-0"
                      placeholder="Prénom"
                      name="firstName"
                      id="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="relative">
                    <img className="absolute w-5 h-5 ml-2 top-3" src="src/assets/img/loginPage/user-solid.svg" alt="key" />
                    <input
                      type="text"
                      className="w-full p-3 mb-3 border-b-2 pl-9 placeholder:text-black outline-0"
                      placeholder="Votre adresse mail"
                      name="mail"
                      id="mail"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="flex items-center justify-end">
                    <div className="cursor-pointer focus:outline-none text-white bg-second hover:bg-second/70 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                      Suivant
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div>
              {/* <div className="w-full p-1 text-xl text-center text-pink-600 bg-pink-100">LOGIN WITH</div>
                        <div className="flex items-center justify-around p-1 bg-pink-50">
                            <img className="w-5 h-5" src="/static_files/svgs4/facebook-black.svg" alt="facebook"/>
                            <img className="w-5 h-5" src="/static_files/svgs4/google-black.svg" alt="google"/>
                            <img className="w-5 h-5" src="/static_files/svgs4/twitter.svg" alt="twitter"/>
                        </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
