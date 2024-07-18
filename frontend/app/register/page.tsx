'use client';
import React, { useState, useEffect } from 'react';
import { register } from '../../services/authService';
import { PhoneInput, defaultCountries, parseCountry } from 'react-international-phone';
import 'react-international-phone/style.css';
import { PhoneNumberUtil } from 'google-libphonenumber';

const phoneUtil = PhoneNumberUtil.getInstance();

const isPhoneValid = (phone) => {
  try {
    return phoneUtil.isValidNumber(phoneUtil.parseAndKeepRawInput(phone));
  } catch (error) {
    return false;
  }
};

const Register = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isPhoneNumberValid, setIsPhoneNumberValid] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    establishment: {
      name: '',
      logo: null,
      floors: 0,
      rooms: 0,
    },
    team: [],
  });

  const [formValid, setFormValid] = useState(false);

  useEffect(() => {
    validateForm();
  }, [formData, phoneNumber]);

  const countries = defaultCountries.filter((country) => {
    const { iso2 } = parseCountry(country);
    return ['us', 'fr', 'gb'].includes(iso2);
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('establishment.')) {
      const key = name.split('.')[1];
      setFormData((prevState) => ({
        ...prevState,
        establishment: {
          ...prevState.establishment,
          [key]: value,
        },
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (name.startsWith('establishment.')) {
      const key = name.split('.')[1];
      setFormData((prevState) => ({
        ...prevState,
        establishment: {
          ...prevState.establishment,
          [key]: files[0],
        },
      }));
    }
  };

  const validateForm = () => {
    const isValidFirstName = formData.firstName !== '';
    const isValidLastName = formData.lastName !== '';
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
    const isValidPhoneNumber = isPhoneValid(phoneNumber);

    setIsPhoneNumberValid(isValidPhoneNumber);
    setFormValid(isValidFirstName && isValidLastName && isValidEmail && isValidPhoneNumber);
  };

  const nextStep = () => {
    if (formValid) {
      setCurrentStep((prevStep) => prevStep + 1);
    }
  };

  const prevStep = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form data being submitted:', formData);
    try {
      const response = await register(formData);
      alert(response.message);
      // Redirection ou autre action après inscription réussie
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <section className="bg-gray-50 dark:bg-gray-900">
        {currentStep === 1 && (
          <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 grid lg:grid-cols-2 gap-8 lg:gap-16">
            <div className="flex flex-col justify-center">
              <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
                S&apos;enregistrer
              </h1>
              <p className="mb-6 text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
                Merci de nous indiquer vos coordonnées
              </p>
              <a href="#" className="text-primary dark:text-primary hover:underline font-medium text-lg inline-flex items-center">
                Un problème ? Besoin d&apos;aide ?
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
              </a>
            </div>
            <div>
              <div className="w-full lg:max-w-xl p-6 space-y-8 sm:p-8 bg-white rounded-lg shadow-xl dark:bg-gray-800">
                <form className="mt-8 space-y-6" onSubmit={handleSubmit} encType="multipart/form-data">
                  <div>
                    <label htmlFor="firstname" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Votre prénom
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      placeholder="Prénom"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary dark:focus:border-primary"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastname" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                      Votre nom
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Nom de famille"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary dark:focus:border-primary"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                      Votre adresse @
                    </label>
                    <input
                      type="email"
                      name="email"
                      placeholder="votre@mail.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary dark:focus:border-primary"
                    />
                  </div>
                  <div>
                    <label htmlFor="phoneNumber" className="mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Votre numéro de téléphone :
                    </label>
                    <PhoneInput
                      defaultCountry="fr"
                      countries={countries}
                      value={phoneNumber}
                      onChange={(phoneNumber) => {
                        setPhoneNumber(phoneNumber);
                        setFormData((prevState) => ({
                          ...prevState,
                          phoneNumber,
                        }));
                      }}
                    />
                    {!isPhoneNumberValid && <div style={{ color: 'red' }}>Votre numéro de téléphone est incorrect</div>}
                  </div>
                  <button
                    type="button"
                    disabled={!formValid}
                    className={`w-full px-5 py-3 text-base font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:ring-green-300 sm:w-auto dark:bg-primary dark:hover:bg-green-700 dark:focus:ring-green-800 ${
                      !formValid ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                    onClick={nextStep}
                  >
                    Suivant
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
        {currentStep === 2 && (
          <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 grid lg:grid-cols-2 gap-8 lg:gap-16">
            <div className="flex flex-col justify-center">
              <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
                S&apos;enregistrer
              </h1>
              <p className="mb-6 text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
                Merci de nous indiquer les informations de votre établissement
              </p>
              <a href="#" className="text-primary dark:text-primary hover:underline font-medium text-lg inline-flex items-center">
                Un problème ? Besoin d&apos;aide ?
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
              </a>
            </div>
            <div>
              <div className="w-full lg:max-w-xl p-6 space-y-8 sm:p-8 bg-white rounded-lg shadow-xl dark:bg-gray-800">
                <form className="mt-8 space-y-6" onSubmit={handleSubmit} encType="multipart/form-data">
                  <div>
                    <label htmlFor="establishment.name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Nom de votre établissement
                    </label>
                    <input
                      type="text"
                      name="establishment.name"
                      placeholder="Nom de l'établissement"
                      value={formData.establishment.name}
                      onChange={handleChange}
                      required
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary dark:focus:border-primary"
                    />
                  </div>
                  <div>
                    <label htmlFor="establishment.logo" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                      Logo de l&apos;établissement
                    </label>
                    <input
                      type="file"
                      name="establishment.logo"
                      onChange={handleFileChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary dark:focus:border-primary"
                    />
                  </div>
                  <div>
                    <label htmlFor="establishment.floors" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                      Nombre d&apos;étages
                    </label>
                    <input
                      type="number"
                      name="establishment.floors"
                      placeholder="0"
                      value={formData.establishment.floors}
                      onChange={handleChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary dark:focus:border-primary"
                    />
                  </div>
                  <div>
                    <label htmlFor="establishment.rooms" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                      Nombre de chambres
                    </label>
                    <input
                      type="number"
                      name="establishment.rooms"
                      placeholder="0"
                      value={formData.establishment.rooms}
                      onChange={handleChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary dark:focus:border-primary"
                    />
                  </div>
                  <div className="flex justify-between">
                    <button
                      type="button"
                      className="px-5 py-3 text-base font-medium text-center text-white bg-gray-500 rounded-lg hover:bg-gray-700 focus:ring-4 focus:ring-gray-300 sm:w-auto dark:bg-primary dark:hover:bg-gray-500 dark:focus:ring-gray-800"
                      onClick={prevStep}
                    >
                      Précédent
                    </button>
                    <button
                      type="button"
                      className={`w-full px-5 py-3 text-base font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:ring-green-300 sm:w-auto dark:bg-primary dark:hover:bg-green-700 dark:focus:ring-green-800 ${
                        !formValid ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                      onClick={nextStep}
                    >
                      Suivant
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default Register;
