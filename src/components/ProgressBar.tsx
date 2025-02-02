import React from 'react';
import './ProgressBar.css';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep, totalSteps }) => {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="progress-container">
      <div className="progress-bar" style={{ width: `${progress}%` }}>
        <span className="progress-text">{Math.round(progress)}% Complete</span>
      </div>
    </div>
  );
};

export default ProgressBar; 