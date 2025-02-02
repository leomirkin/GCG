import React, { useState, useEffect } from 'react';
import './Sidebar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { 
  faChartColumn, 
  faBars,
  faDiagramProject,
  faTrafficLight,
  faTicket,
  faHammer,
  faBook,
  faFileMedical,
  faUserPlus,
  faClockRotateLeft,
  faAngleLeft,
  faRotate
} from '@fortawesome/free-solid-svg-icons';
import { 
  faEnvelopeOpen,
  faCalendarDays
} from '@fortawesome/free-regular-svg-icons';
import { faStripeS } from '@fortawesome/free-brands-svg-icons';

// Agregar los íconos que vamos a usar
library.add(
  faChartColumn,
  faBars,
  faDiagramProject,
  faTrafficLight,
  faTicket,
  faHammer,
  faBook,
  faEnvelopeOpen,
  faCalendarDays,
  faFileMedical,
  faUserPlus,
  faClockRotateLeft,
  faAngleLeft,
  faRotate,
  faStripeS
);

interface SidebarProps {
  currentStep: number;
  onStepChange: (step: number) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentStep, onStepChange }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);

  const mainMenuItems = [
    { icon: faChartColumn, label: "Dashboard", step: 1 },
    { icon: faEnvelopeOpen, label: "Comunicados", step: 2 },
    { icon: faDiagramProject, label: "Árbol de recursos", step: 3 },
    { icon: faTrafficLight, label: "Estado", step: 4 },
    { icon: faCalendarDays, label: "Vencimiento", step: 5 },
    { 
      icon: faStripeS, 
      label: "Solicitudes", 
      hasSubmenu: true,
      submenuItems: [
        { icon: faFileMedical, label: "Documentos", step: 6 },
        { icon: faUserPlus, label: "Recursos", step: 7 },
        { icon: faClockRotateLeft, label: "Historial", step: 8 }
      ]
    },
    { icon: faTicket, label: "Tickets", step: 9 },
    { icon: faHammer, label: "Aviso de Trabajo", step: 10 },
    { icon: faBook, label: "Manuales", step: 11 }
  ];

  // Efecto para abrir el submenú cuando se navega a un paso dentro de él
  useEffect(() => {
    const isSubmenuStep = mainMenuItems
      .find(item => item.hasSubmenu)?.submenuItems
      ?.some(subItem => subItem.step === currentStep);

    if (isSubmenuStep) {
      setIsSubmenuOpen(true);
    }
  }, [currentStep]);

  const handleItemClick = (item: any) => {
    if (item.hasSubmenu) {
      setIsSubmenuOpen(!isSubmenuOpen);
    } else {
      onStepChange(item.step);
      if (!isExpanded) {
        setIsSubmenuOpen(false);
      }
    }
  };

  return (
    <div className={`sidebar ${isExpanded ? 'expanded' : 'collapsed'}`}>
      <div className="logo-container">
        <img 
          src={isExpanded ? "/images/gcg-logo.png" : "/images/mini-logo.png"} 
          alt="GCG Logo" 
          className="logo" 
        />
        <button className="toggle-button" onClick={() => {
          setIsExpanded(!isExpanded);
          if (!isExpanded) {
            setIsSubmenuOpen(false);
          }
        }}>
          <FontAwesomeIcon 
            icon={faAngleLeft} 
            className={`toggle-icon ${isExpanded ? 'expanded' : ''}`}
          />
        </button>
      </div>
      <nav className="sidebar-nav">
        {mainMenuItems.map((item) => (
          <React.Fragment key={item.label}>
            <button
              className={`nav-item ${
                item.hasSubmenu 
                  ? isSubmenuOpen && item.submenuItems?.some(sub => sub.step === currentStep)
                    ? 'active'
                    : ''
                  : currentStep === item.step 
                    ? 'active' 
                    : ''
              }`}
              onClick={() => handleItemClick(item)}
            >
              <FontAwesomeIcon icon={item.icon} className="icon" />
              {isExpanded && <span className="label">{item.label}</span>}
              {item.hasSubmenu && isExpanded && (
                <FontAwesomeIcon 
                  icon={faAngleLeft} 
                  className={`submenu-indicator ${isSubmenuOpen ? 'expanded' : ''}`}
                />
              )}
            </button>
            {item.hasSubmenu && isSubmenuOpen && isExpanded && (
              <div className="submenu">
                {item.submenuItems?.map((subItem) => (
                  <button
                    key={subItem.step}
                    className={`nav-item indented ${currentStep === subItem.step ? 'active' : ''}`}
                    onClick={() => handleItemClick(subItem)}
                  >
                    <FontAwesomeIcon icon={subItem.icon} className="icon" />
                    <span className="label">{subItem.label}</span>
                  </button>
                ))}
              </div>
            )}
          </React.Fragment>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar; 