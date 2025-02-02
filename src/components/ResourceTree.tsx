import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFolderOpen,
  faUsers,
  faTruck,
  faAnglesDown,
  faAddressCard
} from '@fortawesome/free-solid-svg-icons';

interface ResourceTreeProps {
  className?: string;
}

const ResourceTree: React.FC<ResourceTreeProps> = ({ className = '' }) => {
  return (
    <div className={`tree-content ${className}`}>
      <div className="tree-item client">
        <div className="tree-header">
          <FontAwesomeIcon icon={faAnglesDown} className="expand-icon" />
          <span>GCG Control</span>
        </div>
        <div className="tree-content">
          <div className="tree-item contractor">
            <div className="tree-header">
              <FontAwesomeIcon icon={faAnglesDown} className="expand-icon" />
              <img src="/images/ARG.png" alt="Argentina" className="flag-icon" />
              <span className="contractor-id">6c656f6e</span>
              <span>Razón Social Contratista</span>
              <span className="status-circle yellow"></span>
              <span className="expiry-date">31-12-2028</span>
              <div className="action-buttons">
                <button className="folder-btn">
                  <FontAwesomeIcon icon={faFolderOpen} />
                </button>
                <button className="card-btn">
                  <FontAwesomeIcon icon={faAddressCard} />
                </button>
              </div>
            </div>
            <div className="tree-content">
              <div className="tree-item workers">
                <div className="tree-header">
                  <FontAwesomeIcon icon={faAnglesDown} className="expand-icon" />
                  <FontAwesomeIcon icon={faUsers} className="section-icon" />
                  <span>Trabajadores - 3</span>
                </div>
                <div className="tree-content">
                  {[
                    { id: '6172646f', num: 1 },
                    { id: '206d6972', num: 2 },
                    { id: '6b696e0a', num: 3 }
                  ].map(({ id, num }) => (
                    <div key={num} className="tree-item worker">
                      <div className="tree-header">
                        <FontAwesomeIcon icon={faUsers} className="item-icon" />
                        <img src="/images/ARG.png" alt="Argentina" className="flag-icon" />
                        <span className="contractor-id">{id}</span>
                        <span>{`Colaborador ${num}`}</span>
                        <span className="status-circle green"></span>
                        <span className="expiry-date">-</span>
                        <div className="action-buttons">
                          <button className="folder-btn">
                            <FontAwesomeIcon icon={faFolderOpen} />
                          </button>
                          <button className="card-btn">
                            <FontAwesomeIcon icon={faAddressCard} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="tree-item vehicles">
                <div className="tree-header">
                  <FontAwesomeIcon icon={faAnglesDown} className="expand-icon" />
                  <FontAwesomeIcon icon={faTruck} className="section-icon" />
                  <span>Vehículos - 3</span>
                </div>
                <div className="tree-content">
                  {[
                    { id: 'AA123CD', num: 1 },
                    { id: 'BB456EF', num: 2 },
                    { id: 'CC789GH', num: 3 }
                  ].map(({ id, num }) => (
                    <div key={num} className="tree-item vehicle">
                      <div className="tree-header">
                        <FontAwesomeIcon icon={faTruck} className="item-icon" />
                        <span className="contractor-id">{id}</span>
                        <span className="status-circle red"></span>
                        <span className="expiry-date">31-12-2023</span>
                        <div className="action-buttons">
                          <button className="folder-btn">
                            <FontAwesomeIcon icon={faFolderOpen} />
                          </button>
                          <button className="card-btn">
                            <FontAwesomeIcon icon={faAddressCard} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResourceTree; 