// components/ProgressBar.tsx

const ProgressBar = ({ currentStep }: { currentStep: number }) => {
    return (
      <div className="flex mb-4">
        <div className={`flex-1 ${currentStep >= 1 ? 'bg-primary' : 'bg-gray-300'} h-1`} />
        <div className={`flex-1 ${currentStep >= 2 ? 'bg-primary' : 'bg-gray-300'} h-1`} />
        <div className={`flex-1 ${currentStep >= 3 ? 'bg-primary' : 'bg-gray-300'} h-1`} />
        <div className={`flex-1 ${currentStep >= 4 ? 'bg-primary' : 'bg-gray-300'} h-1`} />
      </div>
    );
  };
  
  export default ProgressBar;
  