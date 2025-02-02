import React, { useState, useEffect, useCallback } from 'react';
import './App.css';
import TutorialStep from './components/TutorialStep';
import NavigationBar from './components/NavigationBar';
import ProgressBar from './components/ProgressBar';
import { useAudio } from './hooks/useAudio';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faVolumeHigh, faVolumeMute } from '@fortawesome/free-solid-svg-icons';

const TOTAL_STEPS = 11;

const App: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [hasStarted, setHasStarted] = useState(false);
  const [isAudioMuted, setIsAudioMuted] = useState(false);
  const [highlightedSection, setHighlightedSection] = useState<string | null>(null);
  const { playAudio, stopAllAudio, muteAllAudio, setTimeEventCallback, setCurrentStep: setAudioStep } = useAudio();

  const handleTimeEvent = useCallback((action: string) => {
    switch (action) {
      case 'highlight-status':
        setHighlightedSection(null);
        requestAnimationFrame(() => {
          setHighlightedSection('status');
          setTimeout(() => {
            setHighlightedSection(null);
          }, 1000);
        });
        break;
      // Agregar más casos según sea necesario
    }
  }, []);

  useEffect(() => {
    setTimeEventCallback(handleTimeEvent);
  }, [handleTimeEvent]);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleStart = async () => {
    try {
      setAudioStep(1);
      await playAudio('narration', 1);
      setHasStarted(true);
    } catch (error) {
      console.error('Error playing initial audio:', error);
      setHasStarted(true);
    }
  };

  const handleStepChange = (step: number) => {
    if (step >= 1 && step <= TOTAL_STEPS) {
      stopAllAudio();
      setCurrentStep(step);
      setAudioStep(step);
      playAudio('narration', step);
    }
  };

  const handlePlayEffect = (type: 'sistemdata' | 'teleport') => {
    playAudio(type);
  };

  const toggleAudio = () => {
    const newMutedState = !isAudioMuted;
    muteAllAudio(newMutedState);
    setIsAudioMuted(newMutedState);
  };

  const handleNext = () => {
    if (currentStep < TOTAL_STEPS) {
      handleStepChange(currentStep + 1);
    }
  };

  if (isLoading) {
    return (
      <div className="loading-screen">
        <div className="loading-content">
          <h1>GCG EVOLUTION</h1>
          <div className="loading-spinner"></div>
          <p>Cargando tutorial...</p>
        </div>
      </div>
    );
  }

  if (!hasStarted) {
    return (
      <div className="start-screen">
        <div className="start-content">
          <h1>GCG EVOLUTION</h1>
          <p>Un recorrido por nuestro sistema de gestión documental</p>
          <button className="start-button" onClick={handleStart}>
            <FontAwesomeIcon icon={faPlay} />
            <span>Comenzar Tutorial</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <div className="audio-controls">
        <button className="audio-toggle" onClick={toggleAudio}>
          <FontAwesomeIcon icon={isAudioMuted ? faVolumeMute : faVolumeHigh} />
          <span>{isAudioMuted ? 'Activar Audio' : 'Silenciar'}</span>
        </button>
      </div>
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
        <TutorialStep 
          step={currentStep} 
          onStepChange={handleStepChange}
          highlightedSection={highlightedSection}
          onPlayEffect={handlePlayEffect}
        />
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