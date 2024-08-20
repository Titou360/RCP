"use client";
import { useState } from "react";
import { login } from "../../services/authService";
import Link from "next/link";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login(formData);
      alert("Login successful");
    } catch (error) {
      console.error(error);
    }
  };

  return (
        <section className="bg-gray-50 dark:bg-gray-900" id="login-section">
          <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 grid lg:grid-cols-2 gap-8 lg:gap-16">
            <div className="flex flex-col justify-center">
              <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
              Nous investissons dans le potentiel de votre établissement
              </h1>
              <p className="mb-6 text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
                Chez RoomCare.Pro, nous nous concentrons sur vos besoins.
                Quand la technologie et l&apos;innovation libèrent de la valeur et stimulent votre croissance économique.
              </p>
              <Link
                href="#"
                className="text-primary dark:text-primary hover:underline font-medium text-lg inline-flex items-center"
              >
                En savoir plus sur notre solution
                <svg
                  className="w-3.5 h-3.5 ms-2 rtl:rotate-180"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 5h12m0 0L9 1m4 4L9 9"
                  />
                </svg>
              </Link>
            </div>
            <div>
              <div className="w-full lg:max-w-xl p-6 space-y-8 sm:p-8 bg-white rounded-lg shadow-xl dark:bg-gray-800">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Se connecter à RoomCare.Pro
                </h2>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Votre email
                    </label>
                    <input
                      type="email"
                      name="email"
                      autoComplete="current-email"
                      placeholder="Email"
                      onChange={handleChange}
                      required
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary dark:focus:border-primary"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="password"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Votre mot de passe
                    </label>
                    <input
                      type="password"
                      name="password"
                      autoComplete="current-password"
                      placeholder="••••••••"
                      onChange={handleChange}
                      id="password"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary dark:focus:border-primary"
                      required
                    />
                  </div>
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="remember"
                        aria-describedby="remember"
                        name="remember"
                        type="checkbox"
                        className="w-4 h-4 border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-green-300 dark:focus:ring-primary dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
                      />
                    </div>
                    <div className="ms-3 text-sm">
                      <label
                        htmlFor="remember"
                        className="font-medium text-gray-500 dark:text-gray-400"
                      >
                        Se souvenir de moi
                      </label>
                    </div>
                    <Link
                      href="/forgotPassword"
                      className="ms-auto text-sm font-medium text-green-600 hover:underline dark:text-primary"
                    >
                      Mot de passe oublié ?
                    </Link>
                  </div>
                  <button
                    type="submit"
                    className="w-full px-5 py-3 text-base font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:ring-green-300 sm:w-auto dark:bg-primary dark:hover:bg-green-700 dark:focus:ring-green-800"
                  >
                    Accès à votre compte
                  </button>
                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                    Pas encore enregistré ?&nbsp; {/* &nbsp; !important */}
                    <Link href="/register" className="text-primary hover:underline dark:text-green-500">
                      Créer un compte
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
  );
};

export default Login;
