import React from 'react';
import './NavigationBar.css';

interface NavigationBarProps {
  currentStep: number;
  totalSteps: number;
  onNext: () => void;
  onStepChange: (step: number) => void;
}

const NavigationBar: React.FC<NavigationBarProps> = ({
  currentStep,
  totalSteps,
  onNext,
  onStepChange
}) => {
  const handleBack = () => {
    if (currentStep > 1) {
      onStepChange(currentStep - 1);
    }
  };

  return (
    <div className="step-navigation">
      <button className="nav-button" onClick={handleBack} disabled={currentStep === 1}>
        Volver
      </button>
      <span className="step-text">Paso {currentStep} de {totalSteps}</span>
      <button className="nav-button" onClick={onNext} disabled={currentStep === totalSteps}>
        Siguiente
      </button>
    </div>
  );
};

export default NavigationBar; 