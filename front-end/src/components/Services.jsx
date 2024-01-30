import data from '../assets/Data/datas.json';

const servicesData = data.services;

const Services = () => {
  return (
    <div id="features" className="w-full flex flex-row gap-10 justify-center items-baseline">
      {servicesData.map((service, index) => (
        <div className="w-[25%] flex justify-center items-center min-h-screen" key={index}>
          <div className="w-full ml-1 mr-1 flex flex-col justify-center items-center sm:w-96 border-gray-700 text-center">
            <div className="w-full rounded-2xl p-8 text-white bg-gradient-to-br from-primary to-second pb-44 relative">
              <h1 className="text-xl mb-4">{service.title}</h1>
              <p>{service.description}</p>
            </div>
            <div className="text-center bg-white shadow-lg w-[80%] rounded-xl -mt-32 z-10 p-9 flex items-center flex-col">
              <h2 className="font-semibold text-xl">{service.subtitle}</h2>
              <img src={service.image} alt={service.alt} className="w-[40%] mt-7 object-cover" />

              <button className="w-full gradient rounded-md text-primary p-4 mt-4 hover:shadow-xl transition-all duration-200 ease-in">
                + d&apos;infos
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Services;
