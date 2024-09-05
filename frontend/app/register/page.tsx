"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Step1Form from '../components/Step1RegisterForm';
import Step2Form from '../components/Step2RegisterForm';
import Step3Form from '../components/Step3RegisterForm';
import Step4Form from '../components/Step4RegisterForm';
import ProgressBar from '../components/ProgressBar';

interface FormData {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  companyName?: string;
  addressLine1?: string;
  addressLine2?: string;
  postalCode?: string;
  city?: string;
  state?: string;
  country?: string;
  logo?: string;
  password?: string;
  confirmPassword?: string;
}

const RegisterPage = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({});
  const [error, setError] = useState<string | null>(null); // Ajouter un état pour les erreurs
  const router = useRouter();

  const handleNext = (data: any) => {
    setFormData((prev) => ({ ...prev, ...data }));
    setStep(step + 1);
  };

  const handlePrevious = () => {
    setStep(step - 1);
  };

  const handleSubmit = async (data: FormData) => {
    console.log('FormData:', formData); // Devrait contenir les données combinées
    console.log('Données soumises:', data); // Devrait être identique à formData
  
    try {
      if (Object.keys(formData).length === 0) {
        console.error('Aucune donnée à soumettre');
        setError('Aucune donnée à soumettre');
        return;
      }
  
      // Merge les données de la dernière étape avec les données précédentes
      const combinedData = { ...formData, ...data };
  
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(combinedData),
      });
  
      const responseData = await response.json();
      console.log('Réponse de l\'API:', responseData);
  
      if (!response.ok) {
        console.error('Erreur lors de l\'inscription:', responseData);
        setError('Erreur lors de l\'inscription : ' + responseData.error); // Afficher l'erreur
        return;
      }
  
      console.log('Inscription réussie:', responseData);
  
      setTimeout(() => {
        router.push('/dashboard');
      }, 100);
  
    } catch (error) {
      console.error('Erreur de réseau:', error);
      setError('Erreur de réseau : ' + error.message); // Afficher l'erreur
    }
  };

  return (
    <div className="w-3/4 mx-auto p-6">
      {error && <div className="text-red-500 mb-4">{error}</div>} {/* Afficher les erreurs */}
      <ProgressBar currentStep={step} />
      {step === 1 && <Step1Form onNext={handleNext} />}
      {step === 2 && <Step2Form onPrevious={handlePrevious} onNext={handleNext} />}
      {step === 3 && <Step3Form onPrevious={handlePrevious} onNext={handleNext} />}
      {step === 4 && <Step4Form onPrevious={handlePrevious} onSubmit={handleSubmit} />}
    </div>
  );
};

export default RegisterPage;
