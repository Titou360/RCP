import GivemeFive from '../assets/img/Hero/givemefive.jpg';

const Hero = () => {
  return (
    <div className="flex flex-row w-full m-auto bg-gradient-to-r from-primary to-second pt-5">
      <div className="flex flex-col gap-8 w-1/2 items-center justify-center">
        <h1 className="text-3xl w-3/4 text-light">
          Optimisez votre parcours hôtelier : <br /> Gérez votre établissement en toute simplicité.
        </h1>
        <p className="text-light w-3/4">
          Grâce à RoomCare Pro, donnez à votre établissement toutes les chances de réussite.
          <br />
          <br />
          Gérez la communication entre tous les services et bien plus encore !
        </p>
        <button
          type="button"
          className="w-1/4 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
        >
          S&apos;inscrire
        </button>
      </div>
      <div className="flex w-1/2">
        <img src={GivemeFive} alt="Photo de deux collègues qui se tapent la main" className="aspect-square object-scale-down" />
      </div>
    </div>
  );
};

export default Hero;
