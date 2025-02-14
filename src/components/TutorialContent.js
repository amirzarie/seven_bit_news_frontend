import React from 'react';
import './TutorialContent.css';

const TutorialContent = () => {
  return (
    <div className="tutorial-content">
      <section className="tutorial-section intro">
        <h2>Welcome to 7-bit News</h2>
        <p className="intro-text">
          7-bit News is an AI-powered news analysis platform that helps you understand current events through data-driven insights and multiple perspectives.
        </p>
      </section>

      <section className="tutorial-section key-features">
        <h3>Key Features</h3>
        <div className="features-grid">
          <div className="feature-card">
            <h4>Balanced Coverage</h4>
            <p>Articles from left-leaning, centrist, and right-leaning sources to provide comprehensive viewpoints.</p>
          </div>
          <div className="feature-card">
            <h4>AI Analysis</h4>
            <p>Advanced AI processing provides summaries, insights, and answers to your questions about any topic.</p>
          </div>
          <div className="feature-card">
            <h4>Interactive Visualizations</h4>
            <p>Dynamic charts and graphs help you understand news patterns and trends.</p>
          </div>
          <div className="feature-card">
            <h4>Smart Chat</h4>
            <p>Ask questions and get AI-generated responses based on the analyzed news articles.</p>
          </div>
        </div>
      </section>

      <section className="tutorial-section visualization-guide">
        <h3>Understanding the Visualizations</h3>
        
        <div className="viz-guide-item">
          <h4>Source Distribution Chart</h4>
          <p>This pie chart shows the balance of news sources across the political spectrum:</p>
          <ul>
            <li><span className="color-dot left"></span> <strong>Left-leaning sources:</strong> CNN, MSNBC, HuffPost</li>
            <li><span className="color-dot center"></span> <strong>Centrist sources:</strong> Reuters, AP News, BBC</li>
            <li><span className="color-dot right"></span> <strong>Right-leaning sources:</strong> Fox News, WSJ, Washington Times</li>
          </ul>
        </div>

        <div className="viz-guide-item">
          <h4>Sentiment Analysis</h4>
          <p>The sentiment bars show the emotional tone of articles:</p>
          <ul>
            <li><strong>Polarity:</strong> Ranges from -1 (negative) to +1 (positive)</li>
            <li><strong>Subjectivity:</strong> Ranges from 0 (objective) to 1 (subjective)</li>
          </ul>
        </div>

        <div className="viz-guide-item">
          <h4>Word Frequency Cloud</h4>
          <p>Larger words appear more frequently in the articles. The color intensity indicates relative frequency.</p>
        </div>

        <div className="viz-guide-item">
          <h4>Geographic Coverage Map</h4>
          <p>Shows locations mentioned in the articles. Darker colors indicate more frequent mentions.</p>
        </div>

        <div className="viz-guide-item">
          <h4>Entity Network Graph</h4>
          <p>Visualizes connections between people, organizations, and locations:</p>
          <ul>
            <li>Node size indicates mention frequency</li>
            <li>Line thickness shows relationship strength</li>
            <li>Colors represent different entity types</li>
          </ul>
        </div>
      </section>

      <section className="tutorial-section how-to">
        <h3>How to Use</h3>
        <div className="steps-container">
          <div className="step">
            <div className="step-number">1</div>
            <div className="step-content">
              <h4>Sign In</h4>
              <p>Use your Google account to access all features</p>
            </div>
          </div>
          <div className="step">
            <div className="step-number">2</div>
            <div className="step-content">
              <h4>Choose a Topic</h4>
              <p>Enter any keyword you want to analyze from recent news</p>
            </div>
          </div>
          <div className="step">
            <div className="step-number">3</div>
            <div className="step-content">
              <h4>Explore Data</h4>
              <p>View articles and interactive visualizations</p>
            </div>
          </div>
          <div className="step">
            <div className="step-number">4</div>
            <div className="step-content">
              <h4>Ask Questions</h4>
              <p>Use the chat to dive deeper into the topic</p>
            </div>
          </div>
        </div>
      </section>

      <section className="tutorial-section pro-tips">
        <h3>Pro Tips</h3>
        <div className="tips-container">
          <div className="tip">
            <span className="tip-icon">💡</span>
            <p>Use specific topics for more focused results</p>
          </div>
          <div className="tip">
            <span className="tip-icon">🔍</span>
            <p>Compare sources to get balanced perspectives</p>
          </div>
          <div className="tip">
            <span className="tip-icon">📊</span>
            <p>Use sentiment analysis to identify potential bias</p>
          </div>
          <div className="tip">
            <span className="tip-icon">🔗</span>
            <p>Explore the network graph to discover related topics</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TutorialContent; 