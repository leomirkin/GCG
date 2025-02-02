import React, { useState, useEffect } from 'react';
import './TutorialStep.css';
import Sidebar from './Sidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faEnvelopeOpen, 
  faRotate,
  faMagnifyingGlass,
  faList,
  faCalendar,
  faEye,
  faEnvelopesBulk,
  faClock,
  faArrowRotateLeft,
  faBan,
  faTimes
} from '@fortawesome/free-solid-svg-icons';
import { useAudio } from '../hooks/useAudio';
import ResourceTree from './ResourceTree';

const getTitleForStep = (step: number): string => {
  switch (step) {
    case 1: return "Dashboard";
    case 2: return "Listado de Comunicados";
    case 3: return "Árbol de recursos";
    case 4: return "Estado";
    case 5: return "Vencimiento";
    case 6: return "Documentos";
    case 7: return "Recursos";
    case 8: return "Historial";
    case 9: return "Tickets";
    case 10: return "Aviso de Trabajo";
    case 11: return "Manuales";
    default: return "Dashboard";
  }
};

const getCurrentDate = () => {
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const yyyy = today.getFullYear();
  return `${dd}-${mm}-${yyyy}`;
};

const ComunicadosTable = () => (
  <table className="comunicados-table">
    <thead>
      <tr>
        <th></th>
        <th>Asunto</th>
        <th>Fecha</th>
        <th>Acción</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>
          <FontAwesomeIcon icon={faEnvelopeOpen} className="message-icon" />
        </td>
        <td>Nueva Funcionalidad - Módulo de Tickets</td>
        <td>29-10-2024 09:00</td>
        <td>
          <button className="action-button">
            <FontAwesomeIcon icon={faEye} />
          </button>
        </td>
      </tr>
    </tbody>
  </table>
);

interface TutorialStepProps {
  step: number;
  onStepChange: (step: number) => void;
  highlightedSection: string | null;
  onPlayEffect: (type: 'sistemdata' | 'teleport') => void;
}

const TutorialStep: React.FC<TutorialStepProps> = ({ 
  step, 
  onStepChange, 
  highlightedSection,
  onPlayEffect 
}) => {
  const [isTreeBouncing, setIsTreeBouncing] = useState(false);
  const [referencesPanelOpen, setReferencesPanelOpen] = useState(false);

  useEffect(() => {
    if (isTreeBouncing) {
      const timer = setTimeout(() => setIsTreeBouncing(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [isTreeBouncing]);

  // Función para manejar el cambio de paso con sonido
  const handleStepChange = (newStep: number) => {
    onPlayEffect('teleport');
    onStepChange(newStep);
  };

  return (
    <div className="tutorial-step">
      <Sidebar currentStep={step} onStepChange={onStepChange} />
      <div className="main-content">
        <div className="dashboard-header">
          <h2>{getTitleForStep(step)}</h2>
          <div className="header-controls">
            <button className="language-button">
              <img src="/images/ARG.png" alt="Argentina" />
            </button>
            <button className="messages-button">
              <FontAwesomeIcon icon={faEnvelopeOpen} className="icon" />
            </button>
            <button className="user-button">
              <img src="/images/profile.png" alt="Usuario" className="icon" />
            </button>
          </div>
        </div>
        
        <div className="dashboard-content">
          {step === 1 ? (
            <>
              <div className="client-selector">
                <label>Clientes</label>
                <div className="select-container">
                  <select disabled defaultValue="">
                    <option value="">Razón Social Cliente</option>
                  </select>
                  <button 
                    className="refresh-button" 
                    onClick={() => onPlayEffect('sistemdata')}
                  >
                    <FontAwesomeIcon icon={faRotate} className="icon" />
                  </button>
                </div>
              </div>

              <div className={`status-section ${highlightedSection === 'status' ? 'highlight-bounce' : ''}`}>
                <h3 className="section-title">ESTADOS SOLICITUDES</h3>
                <div className="status-cards">
                  <div className="status-card pending">
                    <div 
                      className="icon-container" 
                      onClick={() => handleStepChange(8)}
                    >
                      <FontAwesomeIcon icon={faEnvelopesBulk} className="icon" />
                    </div>
                    <div className="details">
                      <h4>2</h4>
                      <p>SOLICITUDES PENDIENTES</p>
                    </div>
                  </div>
                  <div className="status-card delay">
                    <div className="icon-container">
                      <FontAwesomeIcon icon={faClock} className="icon" />
                    </div>
                    <div className="details">
                      <h4>4 Hs</h4>
                      <p>DEMORA SOLICITUDES</p>
                    </div>
                  </div>
                  <div className="status-card rejected">
                    <div 
                      className="icon-container" 
                      onClick={() => handleStepChange(8)}
                    >
                      <FontAwesomeIcon icon={faArrowRotateLeft} className="icon" />
                    </div>
                    <div className="details">
                      <h4>1</h4>
                      <p>RECHAZADAS</p>
                    </div>
                  </div>
                  <div className="status-card cancelled">
                    <div 
                      className="icon-container" 
                      onClick={() => handleStepChange(8)}
                    >
                      <FontAwesomeIcon icon={faBan} className="icon" />
                    </div>
                    <div className="details">
                      <h4>0</h4>
                      <p>CANCELADAS</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="charts-container">
                <div className="chart-section">
                  <h3 className="chart-title">ESTADOS CONTRATISTAS</h3>
                  <div className="donut-chart">
                    <img src="/images/chart-contractors.png" alt="Estados Contratistas" style={{ width: '100%' }} />
                  </div>
                </div>
                <div className="chart-section">
                  <h3 className="chart-title">ESTADOS TRABAJADORES</h3>
                  <div className="donut-chart">
                    <img src="/images/chart-workers.png" alt="Estados Trabajadores" style={{ width: '100%' }} />
                  </div>
                </div>
                <div className="chart-section">
                  <h3 className="chart-title">ESTADOS VEHICULOS</h3>
                  <div className="donut-chart">
                    <img src="/images/chart-vehicles.png" alt="Estados Vehículos" style={{ width: '100%' }} />
                  </div>
                </div>
              </div>
            </>
          ) : step === 2 ? (
            <div className="comunicados-section">
              <ComunicadosTable />
              <div className="pagination">
                <span className="pagination-prev">«</span>
                <span className="pagination-number active">1</span>
                <span className="pagination-next">»</span>
              </div>
            </div>
          ) : step === 3 ? (
            <>
              <div className="filter-section">
                <div className="filter-row">
                  <div className="filter-group">
                    <label>Clientes</label>
                    <select disabled defaultValue="">
                      <option value="">GCG Control</option>
                    </select>
                  </div>
                  <div className="filter-group">
                    <label>Locaciones:</label>
                    <select disabled defaultValue="">
                      <option value=""></option>
                    </select>
                  </div>
                </div>
                <div className="filter-row">
                  <div className="filter-group">
                    <label>Estado:</label>
                    <select disabled defaultValue="">
                      <option value=""></option>
                    </select>
                  </div>
                  <div className="filter-group">
                    <label>Situacion:</label>
                    <select disabled defaultValue="">
                      <option value="">Activo</option>
                    </select>
                  </div>
                  <div className="filter-group">
                    <label>Fecha de habilitación:</label>
                    <div className="date-input-container">
                      <input type="text" value={getCurrentDate()} readOnly />
                      <button className="calendar-button">
                        <FontAwesomeIcon icon={faCalendar} />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="filter-actions">
                  <button className="search-button" onClick={() => setIsTreeBouncing(true)}>
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                    Buscar
                  </button>
                  <button className="references-button" onClick={() => setReferencesPanelOpen(true)}>
                    <FontAwesomeIcon icon={faList} />
                    Referencias
                  </button>
                </div>
              </div>
              <div className={`tree-section ${isTreeBouncing ? 'bounce' : ''}`}>
                <ResourceTree />
              </div>
            </>
          ) : (
            <div className="placeholder-content">
              <h3>Contenido del Paso {step}</h3>
              <p>El contenido para este paso se agregará próximamente.</p>
            </div>
          )}
        </div>
      </div>
      
      {referencesPanelOpen && (
        <div className="modal-overlay">
          <div className="modal-content references-modal">
            <button 
              className="modal-close"
              onClick={() => setReferencesPanelOpen(false)}
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
            <img 
              src="/images/referencias.png" 
              alt="Referencias de estados" 
              className="references-image"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default TutorialStep; 