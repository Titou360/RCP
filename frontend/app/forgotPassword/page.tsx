import Link from "next/link"
import ButtonInForm from "../components/ButtonInForm"


const forgotPassword = () => {
  return (
<section className="bg-gray-50 dark:bg-gray-900" id="login-section">
          <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 grid lg:grid-cols-2 gap-8 lg:gap-16">
            <div className="flex flex-col justify-center">
              <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
              Vous avez oublié votre mot de passe ?
              </h1>
              <p className="mb-6 text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
                Aucune inquiétude, remplissez ce formulaire et recevez un nouveau mot de passe !
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
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M1 5h12m0 0L9 1m4 4L9 9"
                  />
                </svg>
              </Link>
            </div>
            <div>
              <div className="w-full lg:max-w-xl p-6 space-y-8 sm:p-8 bg-white rounded-lg shadow-xl dark:bg-gray-800">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Récupérer son compte à RoomCare.Pro
                </h2>
                <form className="mt-8 space-y-6">
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
                      placeholder="Email"
                      required
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary dark:focus:border-primary"
                    />
                  </div>

                  <div className="flex items-start">
                  </div>
                  <button
                    type="submit"
                    className="w-full px-5 py-3 text-base font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:ring-green-300 sm:w-auto dark:bg-primary dark:hover:bg-green-700 dark:focus:ring-green-800"
                  >
                    Récupérer mon mot de passe
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
  )
}

export default forgotPassword
