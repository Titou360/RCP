import Image from 'next/image';
import { useState } from 'react';

const Step3RegisterForm = ({ onPrevious, onSubmit }: { onPrevious: () => void; onSubmit: () => void }) => {
  const [formData, setFormData] = useState({
    logo: '',
    type: 'hotel'
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, logo: URL.createObjectURL(file) });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 grid lg:grid-cols-2 gap-8 lg:gap-16">
      <div className="flex flex-col justify-center">
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
          Personnalisation
        </h1>
        <p className="mb-6 text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">Mettons un peu de paillettes dans votre outil</p>
      </div>
      <div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="companylogo" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
              Logo de l&apos;établissement
            </label>{' '}
            <input type="file" accept="image/*" onChange={handleImageUpload} className="p-2 border rounded" />
          </div>

          {formData.logo && <Image src={formData.logo} alt="Logo Preview" className="w-30 h-30" width={200} height={200} />}

          <div className="w-full flex flex-row justify-between">
            <button
              type="button"
              onClick={onPrevious}
              className={`w-[45%] text-white bg-primary hover:bg-primary-800 focus:ring-4 focus:ring-primary font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary`}
            >
              Précédent
            </button>
            <button
              type="submit"
              className={`w-[45%] text-white bg-primary hover:bg-primary-800 focus:ring-4 focus:ring-primary font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary`}
            >
              S&apos;inscrire
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Step3RegisterForm;
