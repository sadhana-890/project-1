import React from 'react';

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
  stepLabel: string;
}

const StepIndicator: React.FC<StepIndicatorProps> = ({ 
  currentStep, 
  totalSteps, 
  stepLabel 
}) => {
  return (
    <div className="flex items-center gap-2 sm:gap-3 mb-6 sm:mb-8">
      <div className="flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6 bg-blue-600 text-white rounded-full text-xs sm:text-sm font-medium">
        {currentStep}
      </div>
      <span className="text-xs sm:text-sm font-medium text-gray-900">{stepLabel}</span>
    </div>
  );
};

export default StepIndicator;
