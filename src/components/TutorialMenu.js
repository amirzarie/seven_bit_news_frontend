import React, { useState } from "react";
import TutorialContent from "./TutorialContent";
import "./MenuStyles.css";

const TutorialMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="menu-container">
      <button
        className="header-button"
        onClick={() => setIsOpen(!isOpen)}
      >
        Tutorials
      </button>
      
      {isOpen && (
        <>
          <div className="menu-overlay" onClick={() => setIsOpen(false)} />
          <div className="menu-sidebar">
            <div className="menu-sidebar-header">
              <h2>Tutorials</h2>
              <button className="close-button" onClick={() => setIsOpen(false)}>
                ×
              </button>
            </div>
            <div className="menu-sidebar-content">
              <TutorialContent />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default TutorialMenu; 