import React, { useState } from 'react';
import './App.css';
import TutorialStep from './components/TutorialStep';
import NavigationBar from './components/NavigationBar';
import ProgressBar from './components/ProgressBar';

const TOTAL_STEPS = 11;

const App: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const handleNext = () => {
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleStepChange = (step: number) => {
    if (step >= 1 && step <= TOTAL_STEPS) {
      setCurrentStep(step);
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>GCG EVOLUTION</h1>
        <p>Un recorrido por nuestro sistema de gestión documental</p>
        <p className="disclaimer">
          Simulación simplificada para <strong>contratistas</strong> con fines educativos. <strong>Este no es el sistema oficial.</strong><br />
          Para acceder al sistema real, visite: <a href="http://sistema.gcgevolution.com/login" target="_blank" rel="noopener noreferrer">sistema.gcgevolution.com/login</a>
        </p>
        <p className="copyright">© Estudio GCG. Todos los derechos reservados.</p>
        <ProgressBar currentStep={currentStep} totalSteps={TOTAL_STEPS} />
      </header>
      <main className="app-main">
        <TutorialStep step={currentStep} onStepChange={handleStepChange} />
      </main>
      <NavigationBar
        currentStep={currentStep}
        totalSteps={TOTAL_STEPS}
        onNext={handleNext}
        onStepChange={handleStepChange}
      />
    </div>
  );
};

export default App; 