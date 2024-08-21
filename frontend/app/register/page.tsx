'use client';


import { useState } from 'react';
import Step1Form from '../components/Step1RegisterForm';
import Step2Form from '../components/Step2RegisterForm';
import Step3Form from '../components/Step3RegisterForm';
import ProgressBar from '../components/ProgressBar';

const RegisterPage = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<any>({});

  const handleNext = (data: any) => {
    setFormData(prev => ({ ...prev, ...data }));
    setStep(step + 1);
  };

  const handlePrevious = () => {
    setStep(step - 1);
  };

  const handleSubmit = async () => {
    const response = await fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      // Handle success
      alert('Form submitted successfully!');
    } else {
      // Handle error
      alert('Error submitting form');
    }
  };

  return (
    <div className="w-3/4 mx-auto p-6">
      <ProgressBar currentStep={step} />
      {step === 1 && <Step1Form onNext={handleNext} />}
      {step === 2 && (
        <Step2Form onPrevious={handlePrevious} onNext={handleNext} />
      )}
      {step === 3 && (
        <Step3Form onPrevious={handlePrevious} onSubmit={handleSubmit} />
      )}
    </div>
  );
};

export default RegisterPage;
