'use client';
import React, { useState, useEffect, useCallback } from 'react';
import { PhoneInput, defaultCountries, parseCountry } from 'react-international-phone';
import 'react-international-phone/style.css';
import { PhoneNumberUtil } from 'google-libphonenumber';
import axios from 'axios';

const Register = () => {
  const phoneUtil = PhoneNumberUtil.getInstance();

  const [phoneNumber, setPhoneNumber] = useState('');
  const [isPhoneNumberValid, setIsPhoneNumberValid] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    company: {
      name: '',
      logo: null,
      floors: 0,
      rooms: 0,
      address: {
        address_line1: '',
        address_line2: '',
        postal_code: '',
        city: '',
        state: '',
        country: ''
      }
    }
  });

  type Address = {
    [key: string]: string; // Signature d'index pour les propriétés dynamiques
    address_line1: string;
    address_line2: string;
    postal_code: string;
    city: string;
    state: string;
    country: string;
  };

  type Company = {
    [key: string]: any; // Ajouter une signature d'index ici aussi si nécessaire
    name: string;
    logo: File | null;
    floors: number;
    rooms: number;
    address: Address;
  };

  type FormDataType = {
    [key: string]: any; // Ajouter une signature d'index ici
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    company: Company;
  };

  const [formValid, setFormValid] = useState(false);

  const isPhoneValid = useCallback(
    (phone) => {
      try {
        return phoneUtil.isValidNumber(phoneUtil.parseAndKeepRawInput(phone));
      } catch (error) {
        return false;
      }
    },
    [phoneUtil]
  ); // Pas de dépendances nécessaires pour isPhoneValid

  const validateForm = useCallback(() => {
    const isValidFirstName = formData.firstName !== '';
    const isValidLastName = formData.lastName !== '';
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
    const isValidPhoneNumber = isPhoneValid(phoneNumber);

    let isValidCompany = true;
    if (currentStep > 1) {
      isValidCompany =
        formData.company.name !== '' &&
        formData.company.address.address_line1 !== '' &&
        formData.company.address.city !== '' &&
        formData.company.address.postal_code !== '' &&
        formData.company.address.country !== '';
    }

    setIsPhoneNumberValid(isValidPhoneNumber);
    setFormValid(isValidFirstName && isValidLastName && isValidEmail && isValidPhoneNumber && isValidCompany);
  }, [formData, phoneNumber, isPhoneValid, currentStep]);

  useEffect(() => {
    validateForm();
  }, [formData, phoneNumber, validateForm]);

  const countries = defaultCountries.filter((country) => {
    const { iso2 } = parseCountry(country);
    return ['us', 'fr', 'gb'].includes(iso2);
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleNestedInputChange = (e) => {
    const { name, value } = e.target;
    const [outerKey, innerKey] = name.split('.');
    setFormData((prevData) => ({
      ...prevData,
      [outerKey]: {
        ...prevData[outerKey],
        [innerKey]: value
      }
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      company: {
        ...prevData.company,
        [name]: files[0]
      }
    }));
  };

  const nextStep = () => {
    if (formValid) {
      setCurrentStep((prevStep) => prevStep + 1);
    }
  };

  const prevStep = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formValid) {
      alert('Veuillez remplir tous les champs obligatoires');
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append('firstName', formData.firstName);
    formDataToSend.append('lastName', formData.lastName);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('phoneNumber', formData.phoneNumber);
    formDataToSend.append('companyName', formData.company.name);
    formDataToSend.append('companyLogo', formData.company.logo);
    formDataToSend.append('companyFloors', formData.company.floors.toString());
    formDataToSend.append('companyRooms', formData.company.rooms.toString());
    formDataToSend.append('companyAddressLine1', formData.company.address.address_line1);
    formDataToSend.append('companyAddressLine2', formData.company.address.address_line2);
    formDataToSend.append('companyCity', formData.company.address.city);
    formDataToSend.append('companyState', formData.company.address.state);
    formDataToSend.append('companyPostalCode', formData.company.address.postal_code);
    formDataToSend.append('companyCountry', formData.company.address.country);

    try {
      const res = await axios.post('http://localhost:8081/addUser', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('Enregistrement réussi', res.data);
      alert('Enregistrement réussi');
    } catch (err) {
      console.error("Erreur lors de l'enregistrement", err);
      alert("Erreur lors de l'enregistrement");
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900" id="register-section">
      {currentStep === 1 && (
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 grid lg:grid-cols-2 gap-8 lg:gap-16">
          <div className="flex flex-col justify-center">
            <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
              S&apos;enregistrer
            </h1>
            <p className="mb-6 text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">Commençons par vos coordonnées</p>
            <a href="#" className="text-primary dark:text-primary hover:underline font-medium text-lg inline-flex items-center">
              Un problème ? Besoin d&apos;aide ?
              <svg className="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
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
                    onChange={handleInputChange}
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
                    onChange={handleInputChange}
                    required
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary dark:focus:border-primary"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                    Votre email
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="exemple@nomdomaine.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary dark:focus:border-primary"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                    Votre téléphone
                  </label>
                  <PhoneInput
                    value={phoneNumber}
                    onChange={(value) => setPhoneNumber(value)}
                    defaultCountry="fr"
                    countries={countries}
                    inputProps={{
                      name: 'phoneNumber',
                      required: true,
                      className:
                        'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary dark:focus:border-primary'
                    }}
                  />
                </div>
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="terms"
                      type="checkbox"
                      required
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary dark:ring-offset-gray-800"
                    />
                  </div>
                  <div className="text-sm ml-3">
                    <label htmlFor="terms" className="font-medium text-gray-500 dark:text-gray-400">
                      J'accepte les <a className="font-medium text-primary hover:underline dark:text-primary">termes et conditions</a>
                    </label>
                  </div>
                </div>
                <button
                  type="submit"
                  className={`w-full text-white bg-primary hover:bg-primary-800 focus:ring-4 focus:ring-primary font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary ${
                    formValid ? '' : 'opacity-50 cursor-not-allowed'
                  }`}
                  disabled={!formValid}
                  onClick={nextStep}
                >
                  Continuer
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
              Informations sur l&apos;entreprise
            </h1>
            <p className="mb-6 text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">Quelques détails à propos de votre entreprise</p>
          </div>
          <div>
            <div className="w-full lg:max-w-xl p-6 space-y-8 sm:p-8 bg-white rounded-lg shadow-xl dark:bg-gray-800">
              <form className="mt-8 space-y-6" onSubmit={handleSubmit} encType="multipart/form-data">
                <div>
                  <label htmlFor="companyName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Nom de l&apos;entreprise
                  </label>
                  <input
                    type="text"
                    name="company.name"
                    placeholder="Nom de l'entreprise"
                    value={formData.company.name}
                    onChange={handleNestedInputChange}
                    required
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary dark:focus:border-primary"
                  />
                </div>
                <div>
                  <label htmlFor="companyAddressLine1" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Adresse ligne 1
                  </label>
                  <input
                    type="text"
                    name="company.address.address_line1"
                    placeholder="Adresse ligne 1"
                    value={formData.company.address.address_line1}
                    onChange={handleNestedInputChange}
                    required
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary dark:focus:border-primary"
                  />
                </div>
                <div>
                  <label htmlFor="companyAddressLine2" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Adresse ligne 2
                  </label>
                  <input
                    type="text"
                    name="company.address.address_line2"
                    placeholder="Adresse ligne 2"
                    value={formData.company.address.address_line2}
                    onChange={handleNestedInputChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary dark:focus:border-primary"
                  />
                </div>
                <div>
                  <label htmlFor="companyPostalCode" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Code postal
                  </label>
                  <input
                    type="text"
                    name="company.address.postal_code"
                    placeholder="Code postal"
                    value={formData.company.address.postal_code}
                    onChange={handleNestedInputChange}
                    required
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary dark:focus:border-primary"
                  />
                </div>
                <div>
                  <label htmlFor="companyCity" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Ville
                  </label>
                  <input
                    type="text"
                    name="company.address.city"
                    placeholder="Ville"
                    value={formData.company.address.city}
                    onChange={handleNestedInputChange}
                    required
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary dark:focus:border-primary"
                  />
                </div>
                <div>
                  <label htmlFor="companyCountry" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Pays
                  </label>
                  <input
                    type="text"
                    name="company.address.country"
                    placeholder="Pays"
                    value={formData.company.address.country}
                    onChange={handleNestedInputChange}
                    required
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary dark:focus:border-primary"
                  />
                </div>
                <div className="w-full flex flex-row justify-between">
                  <button
                    type="submit"
                    className={`w-[45%] text-white bg-primary hover:bg-primary-800 focus:ring-4 focus:ring-primary font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary`}
                    onClick={prevStep}
                  >
                    Retour
                  </button>
                  <button
                    type="submit"
                    className={`w-[45%] text-white bg-primary hover:bg-primary-800 focus:ring-4 focus:ring-primary font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary ${
                      formValid ? '' : 'opacity-50 cursor-not-allowed'
                    }`}
                    disabled={!formValid}
                    onClick={nextStep}
                  >
                    Continuer
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      {currentStep === 3 && (
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 grid lg:grid-cols-2 gap-8 lg:gap-16">
          <div className="flex flex-col justify-center">
            <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
              Personnalisation
            </h1>
            <p className="mb-6 text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">Mettons un peu de paillettes dans votre outil</p>
          </div>
          <div>
            <div className="w-full lg:max-w-xl p-6 space-y-8 sm:p-8 bg-white rounded-lg shadow-xl dark:bg-gray-800">
              <div>
                <label htmlFor="company.logo" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                  Logo de l&apos;établissement
                </label>
                <input
                  type="file"
                  name="logo"
                  onChange={handleFileChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary dark:focus:border-primary"
                />
              </div>
              <div>
                {' '}
                <label htmlFor="company.floors" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                  Nombre d&apos;étages
                </label>
                <input
                  type="number"
                  name="company.floors"
                  placeholder="0"
                  value={formData.company.floors}
                  onChange={handleNestedInputChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary dark:focus:border-primary"
                />
              </div>
              <div>
                <label htmlFor="company.rooms" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                  Nombre de chambres
                </label>
                <input
                  type="number"
                  name="company.rooms"
                  placeholder="0"
                  value={formData.company.rooms}
                  onChange={handleNestedInputChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary dark:focus:border-primary"
                />
              </div>

              <button
                type="submit"
                className="w-full text-white bg-primary hover:bg-primary-800 focus:ring-4 focus:ring-primary font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary"
                onClick={handleSubmit}
              >
                Soumettre
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Register;
