import { useState, useCallback, useEffect } from 'react';

// Telephone management
import { PhoneInput, defaultCountries, parseCountry } from 'react-international-phone';
import { PhoneNumberUtil } from 'google-libphonenumber';
import 'react-international-phone/style.css'; // important !!

const Step1RegisterForm = ({ onNext }: { onNext: (data: any) => void }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  });

  const [phone, setPhone] = useState('');

  // Chargement des données depuis le localStorage lors du rendu initial
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedFormData = localStorage.getItem('formData');
      
      if (savedFormData) {
        const parsedData = JSON.parse(savedFormData);
        setFormData(parsedData);
        setPhone(parsedData.phone || '');  // Charger le téléphone
      }
    }
  }, []);

  // Sauvegarde automatique dans localStorage quand formData ou phone change
  useEffect(() => {
    const updatedFormData = { ...formData, phone: phone };
    localStorage.setItem('formData', JSON.stringify(updatedFormData));
  }, [formData, phone]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Sauvegarder directement dans le localStorage lors de la soumission
    const updatedFormData = { ...formData, phone: phone };
    localStorage.setItem('formData', JSON.stringify(updatedFormData));
  
    onNext(updatedFormData);
  };

  // Telephone Management
  const phoneUtil = PhoneNumberUtil.getInstance();
  const countries = defaultCountries.filter((country) => {
    const { iso2 } = parseCountry(country);
    return ['us', 'fr', 'gb'].includes(iso2);
  });

  const isPhoneValid = useCallback(
    (phone: any) => {
      try {
        return phoneUtil.isValidNumber(phoneUtil.parseAndKeepRawInput(phone));
      } catch (error) {
        return false;
      }
    },
    [phoneUtil]
  );

  return (
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
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="firstname" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Votre prénom
              </label>
              <input
                type="text"
                name="firstName"
                placeholder="Prénom"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                className="w-full p-2 border rounded"
                required
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
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                className="w-full p-2 border rounded"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                Votre email
              </label>
              <input
                type="email"
                name="email"
                placeholder="E-mail"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label htmlFor="phone" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                Votre téléphone
              </label>
              <PhoneInput
                value={phone}
                onChange={(phone) => {
                  setPhone(phone);
                }}
                defaultCountry="fr"
                countries={countries}
                inputProps={{
                  name: 'phone',
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
                  J&apos;accepte les <a className="font-medium text-primary hover:underline dark:text-primary">termes et conditions</a>
                </label>
              </div>
            </div>
            <div className="flex flex-row justify-end">
              <button
                type="submit"
                className="w-[45%] text-white bg-primary hover:bg-primary-800 focus:ring-4 focus:ring-primary font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary"
              >
                Suivant
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Step1RegisterForm;
