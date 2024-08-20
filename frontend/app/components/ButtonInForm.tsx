import React from 'react';

interface ButtonInFormProps {
  disabled: boolean;
  onClick: () => void;
  buttonName: string;
  className?: string;
}

const ButtonInForm: React.FC<ButtonInFormProps> = ({ onClick, buttonName, className }) => {
  return (
    <button
      type="button"
      className={`w-full px-5 py-3 text-base font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:ring-green-300 sm:w-auto dark:bg-primary dark:hover:bg-green-700 dark:focus:ring-green-800 ${className}`}
      onClick={onClick}
    >
      {buttonName}
    </button>
  );
};

export default ButtonInForm;
