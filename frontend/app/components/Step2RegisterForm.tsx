import { useState } from 'react';

const Step2RegisterForm = ({ onPrevious, onNext }: { onPrevious: () => void; onNext: (data: any) => void }) => {
  const [formData, setFormData] = useState({
    companyName: '',
    addressLine1: '',
    addressLine2: '',
    postalCode: '',
    city: '',
    state: '',
    country: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext(formData);
  };

  return (
    <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 grid lg:grid-cols-2 gap-8 lg:gap-16">
      <div className="flex flex-col justify-center">
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
          Informations sur l&apos;entreprise
        </h1>
        <p className="mb-6 text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">Quelques détails à propos de votre entreprise</p>
      </div>

      <div>
        <div className="w-full lg:max-w-xl p-6 space-y-8 sm:p-8 bg-white rounded-lg shadow-xl dark:bg-gray-800">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="companyName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Nom de l&apos;entreprise
              </label>
              <input
                type="text"
                name="companyName"
                placeholder="Company Name"
                value={formData.companyName}
                onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                className="w-full p-2 border rounded"
                required
              />
            </div>

            <div>
              <label htmlFor="companyAddressLine1" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Adresse ligne 1
              </label>
              <input
                type="text"
                name="addressLine1"
                placeholder="Address Line 1"
                value={formData.addressLine1}
                onChange={(e) => setFormData({ ...formData, addressLine1: e.target.value })}
                className="w-full p-2 border rounded"
                required
              />
            </div>

            <div>
              <label htmlFor="companyAddressLine2" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Adresse ligne 2
              </label>{' '}
              <input
                type="text"
                name="addressLine2"
                placeholder="Address Line 2"
                value={formData.addressLine2}
                onChange={(e) => setFormData({ ...formData, addressLine2: e.target.value })}
                className="w-full p-2 border rounded"
              />
            </div>

            <div>
              <label htmlFor="companyPostalCode" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Code postal
              </label>
              <input
                type="text"
                name="postalCode"
                placeholder="Postal Code"
                value={formData.postalCode}
                onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                className="w-full p-2 border rounded"
                required
              />
            </div>

            <div>
              <label htmlFor="companyCity" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Ville
              </label>
              <input
                type="text"
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className="w-full p-2 border rounded"
                required
              />
            </div>

            <div>
              <label htmlFor="state" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                État, Province,
              </label>{' '}
              <input
                type="text"
                name="state"
                placeholder="State"
                value={formData.state}
                onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                className="w-full p-2 border rounded"
              />
            </div>

            <div>
              <label htmlFor="companyCountry" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Pays
              </label>{' '}
              <input
                type="text"
                name="country"
                placeholder="Country"
                value={formData.country}
                onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                className="w-full p-2 border rounded"
                required
              />
            </div>

            <div className="w-full flex flex-row justify-between">
              <button
                type="button"
                onClick={onPrevious}
                className={`w-[45%] text-white bg-primary hover:bg-primary-800 focus:ring-4 focus:ring-primary font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary`}
              >
                Précédent
              </button>
              <button type="submit" className="w-[45%] text-white bg-primary hover:bg-primary-800 focus:ring-4 focus:ring-primary font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary">
                Suivant
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Step2RegisterForm;
