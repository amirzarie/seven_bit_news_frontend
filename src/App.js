// src/App.js
import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import MessageForm from "./components/MessageForm";
import SignIn from "./components/SignIn";
import SignOut from "./components/SignOut";
import SourcesPieChart from "./components/SourcesPieChart";
import WordCloud from "./components/WordCloud";
import ArticleTable from "./components/ArticleTable";
import SentimentBarChart from "./components/SentimentBarChart";
import TrendingNewsMenu from "./components/TrendingNewsMenu";
import LocationChart from "./components/LocationChart";
import NetworkGraph from "./components/NetworkGraph";
import { API_ENDPOINTS } from "./config";
import TutorialContent from './components/TutorialContent';
import TutorialMenu from './components/TutorialMenu';
import canadaFlag from './assets/media/canada-flag.png';
import Footer from './components/Footer';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import 'highlight.js/styles/github-dark.css';

const loadingIcons = [
  '📰', // newspaper
  '🌍', // globe for geography/world news
  '🔬', // microscope for science
  '💻', // computer for tech
  '⚕️', // medical symbol for health
  '⚖️', // scales for law/justice/politics
  '📊', // chart for business/economics
  '🎓', // graduation cap for education
  '🏛️', // classical building for government/politics
  '🏥', // hospital for healthcare
  '📱', // mobile phone for tech news
  '🌡️', // thermometer for weather/climate
  '💼', // briefcase for business
  '🏆', // trophy for sports
  '🎨'  // art palette for culture/arts
];

const fetchWithTimeout = async (url, options, timeout = 300000) => {
  // 5 minute timeout
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    if (error.name === "AbortError") {
      throw new Error("Request timed out");
    }
    throw error;
  }
};

function App() {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [userId] = useState(
    () => "user_" + Math.random().toString(36).substr(2, 9)
  );
  const [user, setUser] = useState(null);
  const messagesEndRef = useRef(null);
  const [sourceCounts, setSourceCounts] = useState({});
  const [wordFrequencies, setWordFrequencies] = useState({});
  const [currentTopic, setCurrentTopic] = useState("");
  const [articles, setArticles] = useState([]);
  const [trendingNews, setTrendingNews] = useState([]);
  const [locations, setLocations] = useState([]);
  const [topicInput, setTopicInput] = useState("");
  const [networkData, setNetworkData] = useState(null);
  const [currentLoadingIcon, setCurrentLoadingIcon] = useState(loadingIcons[0]);
  const [isTopicLoading, setIsTopicLoading] = useState(false);

  const handleSendMessage = async (message) => {
    setIsLoading(true);
    try {
      const response = await fetchWithTimeout(API_ENDPOINTS.chat, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-User-ID": userId,
        },
        body: JSON.stringify({
          message: message,
          chat_history: messages,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setMessages(data.chat_history);
      if (messages.length === 0) {
        setCurrentTopic(message);
      }
      if (data.source_counts) {
        setSourceCounts(data.source_counts);
      }
      if (data.word_frequencies) {
        setWordFrequencies(data.word_frequencies);
      }
      if (data.articles) {
        setArticles(data.articles);
      }
      if (data.locations) {
        setLocations(data.locations);
      }
      if (data.network_data) {
        setNetworkData(data.network_data);
      }
    } catch (error) {
      console.error("Error:", error);
      // Add error message to chat
      setMessages([
        ...messages,
        { role: "system", content: "Error: Could not process your request." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = async () => {
    setIsLoading(true);
    try {
      await fetchWithTimeout(API_ENDPOINTS.chat, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-User-ID": userId,
        },
        body: JSON.stringify({
          message: "",
          chat_history: [],
        }),
      });
      setMessages([]);
      setSourceCounts({});
      setWordFrequencies({});
      setCurrentTopic("");
      setArticles([]);
      setLocations([]);
      setNetworkData(null);
    } catch (error) {
      console.error("Error resetting chat:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      const messagesContainer = document.querySelector(".messages-container");
      if (messagesContainer) {
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
      }
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const fetchTrendingNews = async () => {
    try {
      const response = await fetchWithTimeout(API_ENDPOINTS.trending);
      const data = await response.json();
      setTrendingNews(data.trending_articles);
    } catch (error) {
      console.error("Error fetching trending news:", error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchTrendingNews();
    }
  }, [user]);

  const handleTopicSelect = async (topic) => {
    setIsTopicLoading(true);
    try {
      const response = await fetch(API_ENDPOINTS.topic, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-User-ID": userId,
        },
        // Increase timeout by not setting a timeout
        keepalive: true,
        body: JSON.stringify({
          topic: topic,
        }),
      });

      if (!response.ok) {
        if (response.status === 504) {
          throw new Error(
            "The request took too long to process. This usually happens with broad topics that return many articles. Try a more specific topic."
          );
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setCurrentTopic(topic);
      setSourceCounts(data.source_counts);
      setWordFrequencies(data.word_frequencies);
      setArticles(data.articles);
      setLocations(data.locations);
      if (data.chat_history) {
        setMessages(data.chat_history);
      } else if (data.initial_summary) {
        setMessages([{ role: "assistant", content: data.initial_summary }]);
      } else {
        setMessages([]);
      }
      if (data.network_data) {
        setNetworkData(data.network_data);
      }
    } catch (error) {
      console.error("Error setting topic:", error);
      setMessages([
        {
          role: "system",
          content:
            error.message ||
            "An error occurred while processing your request. Please try a more specific topic or try again.",
        },
      ]);
    } finally {
      setIsTopicLoading(false);
    }
  };

  const handleTopicSubmit = (e) => {
    e.preventDefault();
    if (topicInput.trim()) {
      handleTopicSelect(topicInput);
      setTopicInput("");
    }
  };

  useEffect(() => {
    if (isLoading) {
      const intervalId = setInterval(() => {
        const randomIndex = Math.floor(Math.random() * loadingIcons.length);
        setCurrentLoadingIcon(loadingIcons[randomIndex]);
      }, 2000);

      return () => clearInterval(intervalId);
    }
  }, [isLoading]);

  return (
    <div className="App">
      <header className="app-header">
        <div className="header-left">
          {user && (
            <>
              <TutorialMenu />
              <TrendingNewsMenu articles={trendingNews} />
            </>
          )}
        </div>
        <div className="header-center">
          <p className="header-title">
            <span>7-bit News</span>
            <img src={canadaFlag} alt="Canadian Flag" className="flag-icon" />
          </p>
        </div>
        <div className="header-right">
          {user && <span className="user-info">Signed in as: {user.displayName}</span>}
          {user ? <SignOut setUser={setUser} /> : <SignIn setUser={setUser} />}
        </div>
      </header>
      {user ? (
        <>
          {currentTopic && (
            <div className="current-topic">
              <div className="current-topic-inner">
                <div className="topic-content">
                  Current Topic: "{currentTopic}"
                </div>
                <button
                  className="topic-reset-btn"
                  onClick={handleReset}
                >
                  New Topic
                </button>
              </div>
            </div>
          )}
          {!currentTopic && (
            <div className="topic-input-container">
              <form onSubmit={handleTopicSubmit} className="topic-form">
                <input
                  type="text"
                  value={topicInput}
                  onChange={(e) => setTopicInput(e.target.value)}
                  placeholder="Enter a keyword (e.g., OpenAI)"
                  className="topic-input"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  className="topic-submit-btn"
                  disabled={isLoading || !topicInput.trim()}
                >
                  {isLoading ? "Processing..." : "Search Topic"}
                </button>
              </form>
            </div>
          )}
          <div className="content-container">
            <div className="articles-section">
              <ArticleTable articles={articles} currentTopic={currentTopic} />
              {locations &&
                locations.cities &&
                locations.countries &&
                (locations.cities.length > 0 ||
                  locations.countries.length > 0) && (
                  <LocationChart
                    locations={locations}
                    currentTopic={currentTopic}
                  />
                )}
            </div>
            {(Object.keys(sourceCounts).length > 0 ||
              Object.keys(wordFrequencies).length > 0) && (
              <div className="visualizations-section">
                {Object.keys(sourceCounts).length > 0 && (
                  <div className="visualization-container">
                    <SourcesPieChart
                      sourceCounts={sourceCounts}
                      currentTopic={currentTopic}
                    />
                  </div>
                )}
                {articles.length > 0 && (
                  <div className="visualization-container">
                    <SentimentBarChart
                      articles={articles}
                      currentTopic={currentTopic}
                    />
                  </div>
                )}
                {Object.keys(wordFrequencies).length > 0 && (
                  <div className="visualization-container">
                    <WordCloud
                      wordFrequencies={wordFrequencies}
                      currentTopic={currentTopic}
                    />
                  </div>
                )}
                {networkData &&
                  networkData.nodes &&
                  networkData.nodes.length > 0 && (
                    <NetworkGraph
                      networkData={networkData}
                      currentTopic={currentTopic}
                    />
                  )}
              </div>
            )}
            {currentTopic && (
              <div className="chat-section">
                <div className="chat-container">
                  <div className="messages-container">
                    {messages.length === 0 && (
                      <div className="welcome-message">
                        Enter a topic to start the conversation
                      </div>
                    )}
                    {messages.map((msg, index) => (
                      <div
                        key={index}
                        className={`message ${
                          msg.role === "user"
                            ? "user-message"
                            : "assistant-message"
                        }`}
                      >
                        <div className="message-content">
                          {msg.role === "user" ? (
                            msg.content
                          ) : (
                            <ReactMarkdown
                              remarkPlugins={[remarkGfm]}
                              rehypePlugins={[rehypeRaw]}
                              components={{
                                // Custom renderers for better styling
                                // eslint-disable-next-line jsx-a11y/heading-has-content
                                h1: ({node, ...props}) => <h1 style={{marginTop: '1rem', marginBottom: '0.5rem', fontSize: '1.5rem', fontWeight: 'bold'}} {...props} />,
                                // eslint-disable-next-line jsx-a11y/heading-has-content
                                h2: ({node, ...props}) => <h2 style={{marginTop: '0.8rem', marginBottom: '0.4rem', fontSize: '1.3rem', fontWeight: 'bold'}} {...props} />,
                                // eslint-disable-next-line jsx-a11y/heading-has-content
                                h3: ({node, ...props}) => <h3 style={{marginTop: '0.6rem', marginBottom: '0.3rem', fontSize: '1.1rem', fontWeight: 'bold'}} {...props} />,
                                ul: ({node, ...props}) => <ul style={{marginLeft: '1.5rem', marginTop: '0.5rem', marginBottom: '0.5rem'}} {...props} />,
                                ol: ({node, ...props}) => <ol style={{marginLeft: '1.5rem', marginTop: '0.5rem', marginBottom: '0.5rem'}} {...props} />,
                                li: ({node, ...props}) => <li style={{marginBottom: '0.3rem', lineHeight: '1.6'}} {...props} />,
                                p: ({node, ...props}) => <p style={{marginBottom: '0.8rem', lineHeight: '1.6'}} {...props} />,
                                strong: ({node, ...props}) => <strong style={{fontWeight: 'bold', color: '#2563eb'}} {...props} />,
                                em: ({node, ...props}) => <em style={{fontStyle: 'italic', color: '#6366f1'}} {...props} />,
                                code: ({node, inline, ...props}) => 
                                  inline ? (
                                    <code style={{backgroundColor: '#f3f4f6', padding: '0.2rem 0.4rem', borderRadius: '0.25rem', fontFamily: 'monospace', fontSize: '0.9em', color: '#dc2626'}} {...props} />
                                  ) : (
                                    <code style={{display: 'block', backgroundColor: '#1f2937', color: '#f9fafb', padding: '1rem', borderRadius: '0.5rem', overflow: 'auto', fontFamily: 'monospace'}} {...props} />
                                  ),
                                blockquote: ({node, ...props}) => <blockquote style={{borderLeft: '4px solid #3b82f6', paddingLeft: '1rem', marginLeft: '0', fontStyle: 'italic', color: '#4b5563', backgroundColor: '#f3f4f6', padding: '0.8rem 1rem', borderRadius: '0.25rem'}} {...props} />,
                                // eslint-disable-next-line jsx-a11y/anchor-has-content
                                a: ({node, ...props}) => <a style={{color: '#2563eb', textDecoration: 'underline'}} {...props} target="_blank" rel="noopener noreferrer" />,
                                table: ({node, ...props}) => <table style={{borderCollapse: 'collapse', width: '100%', marginTop: '0.5rem', marginBottom: '0.5rem'}} {...props} />,
                                th: ({node, ...props}) => <th style={{border: '1px solid #d1d5db', padding: '0.5rem', backgroundColor: '#f3f4f6', fontWeight: 'bold'}} {...props} />,
                                td: ({node, ...props}) => <td style={{border: '1px solid #d1d5db', padding: '0.5rem'}} {...props} />,
                              }}
                            >
                              {msg.content}
                            </ReactMarkdown>
                          )}
                        </div>
                      </div>
                    ))}
                    {isLoading && (
                      <div className="loading-message">Processing...</div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>
                  <MessageForm
                    onSendMessage={handleSendMessage}
                    isLoading={isLoading}
                    currentTopic={currentTopic}
                  />
                </div>
              </div>
            )}
          </div>
          <Footer />
        </>
      ) : (
        <div className="landing-tutorial">
          <TutorialContent />
          <Footer />
        </div>
      )}
      {isTopicLoading && (
        <div className="loading-spinner-container">
          <div className="loading-spinner">
            <div className="loading-icon">{currentLoadingIcon}</div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
