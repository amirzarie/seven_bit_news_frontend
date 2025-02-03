import React, { useState } from "react";
import TrendingNews from "./TrendingNews";
import "./TrendingNewsMenu.css";

const TrendingNewsMenu = ({ articles }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="trending-menu">
      <button
        className={`hamburger-button ${isOpen ? "open" : ""}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="hamburger-icon">☰</span>
        <span className="menu-text">Trending News</span>
      </button>
      {isOpen && (
        <>
          <div className="menu-overlay" onClick={() => setIsOpen(false)} />
          <div className="trending-sidebar">
            <div className="trending-sidebar-header">
              <h2>Trending News</h2>
              <button className="close-button" onClick={() => setIsOpen(false)}>
                ×
              </button>
            </div>
            <div className="trending-sidebar-content">
              <TrendingNews articles={articles} />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default TrendingNewsMenu;
