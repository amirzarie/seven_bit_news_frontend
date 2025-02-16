import React, { useState } from 'react';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [showTerms, setShowTerms] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);

  const TermsModal = () => (
    <div className="modal-overlay" onClick={() => setShowTerms(false)}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <h2>Terms of Service</h2>
        <div className="modal-body">
          <h3>1. Acceptance of Terms</h3>
          <p>By accessing and using 7-bit News, you accept and agree to be bound by these Terms of Service.</p>
          
          <h3>2. Use License</h3>
          <p>Permission is granted to temporarily access the materials on 7-bit News for personal, non-commercial use.</p>
          
          <h3>3. Data Usage</h3>
          <p>We analyze publicly available news data to provide insights and analytics. All data is processed in accordance with fair use principles.</p>
          
          <h3>4. User Conduct</h3>
          <p>Users agree not to misuse the service or assist any third party in misusing the service.</p>
          
          <h3>5. Disclaimer</h3>
          <p>The news analysis and insights are provided "as is" without any guarantees of accuracy or completeness.</p>
        </div>
        <button className="modal-close" onClick={() => setShowTerms(false)}>Close</button>
      </div>
    </div>
  );

  const PrivacyModal = () => (
    <div className="modal-overlay" onClick={() => setShowPrivacy(false)}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <h2>Privacy Policy</h2>
        <div className="modal-body">
          <h3>1. Information Collection</h3>
          <p>We collect basic user information through Google authentication and search history for service improvement.</p>
          
          <h3>2. Data Usage</h3>
          <p>User data is used to provide personalized news analytics and improve our services.</p>
          
          <h3>3. Data Protection</h3>
          <p>We implement security measures to protect your personal information and maintain data privacy.</p>
          
          <h3>4. Third-Party Services</h3>
          <p>We use Google Authentication and news APIs. Their respective privacy policies may also apply.</p>
          
          <h3>5. User Rights</h3>
          <p>Users have the right to access, correct, or delete their personal data.</p>
        </div>
        <button className="modal-close" onClick={() => setShowPrivacy(false)}>Close</button>
      </div>
    </div>
  );

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h4>About 7-bit News</h4>
          <p>A modern news analytics platform powered by AI, providing comprehensive insights into current events.</p>
        </div>
        
        <div className="footer-section">
          <h4>Contact</h4>
          <p>Email: zarieamir@gmail.com</p>
          <p>Location: Toronto, Canada</p>
        </div>

        <div className="footer-section">
          <h4>Legal</h4>
          <p>© {currentYear} 7-bit News™. All rights reserved.</p>
          <p>
            <button className="link-button" onClick={() => setShowTerms(true)}>Terms of Service</button>
            {' • '}
            <button className="link-button" onClick={() => setShowPrivacy(true)}>Privacy Policy</button>
          </p>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>
          7-bit News™ is a registered trademark. News data is sourced from publicly available APIs and services.
          Built with ❤️ in Toronto.
        </p>
      </div>

      {showTerms && <TermsModal />}
      {showPrivacy && <PrivacyModal />}
    </footer>
  );
};

export default Footer; 