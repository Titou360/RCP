import { useState, useEffect } from 'react';

const Step4RegisterForm = ({ onPrevious, onSubmit }: { onPrevious: () => void; onSubmit: (data: any) => void }) => {
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  });

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const savedFormData = localStorage.getItem('step4FormData');
    if (savedFormData) {
      setFormData(JSON.parse(savedFormData));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('step4FormData', JSON.stringify(formData));
  }, [formData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Appelle preventDefault pour éviter le rechargement de la page

    // Validation des mots de passe
    if (formData.password !== formData.confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      return;
    }
    if (formData.password.length < 8) {
      setError('Le mot de passe doit contenir au moins 8 caractères');
      return;
    }
    setError('');

    // Passer les données du formulaire à la fonction onSubmit
    onSubmit(formData);
  };

  return (
    <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 grid lg:grid-cols-2 gap-8 lg:gap-16">
      <div className="flex flex-col justify-center">
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
          Protégeons tout ça <span className="text-xl">😊</span>
        </h1>
        <p className="mb-6 text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">Utilisez un mot de passe robuste pour vous protéger</p>
      </div>
      <div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <label htmlFor="password" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
              Votre mot de passe
            </label>
            <input
              type={passwordVisible ? 'text' : 'password'}
              id="password"
              name="password"
              autoComplete="new-password"
              value={formData.password}
              onChange={handleInputChange}
              className="p-2 border rounded w-full"
            />
            <button type="button" onClick={() => setPasswordVisible(!passwordVisible)} className="absolute inset-y-0 right-0 pr-3 flex items-center ">
              <i className={`fas ${passwordVisible ? 'fa-eye-slash' : 'fa-eye'}`}></i>
            </button>
          </div>

          <div className="relative">
            <label htmlFor="confirmPassword" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
              Confirmez votre mot de passe
            </label>
            <input
              type={confirmPasswordVisible ? 'text' : 'password'}
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className="p-2 border rounded w-full"
            />
            <button
              type="button"
              onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              <i className={`fas ${confirmPasswordVisible ? 'fa-eye-slash' : 'fa-eye'}`}></i>
            </button>
          </div>

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
          {error && <p className="text-red-500">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default Step4RegisterForm;
