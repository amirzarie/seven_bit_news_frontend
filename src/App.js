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

  const handleSendMessage = async (message) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        "https://seven-bit-news-207302804909.northamerica-northeast2.run.app/api/chat",
        // "https://seven-bit-news-cgc35suboa-pd.a.run.app/api/chat",
        // "https://backend-dot-seven-bit-news.nn.r.appspot.com/api/chat",
        // "http://localhost:8000/api/chat",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-User-ID": userId,
          },
          body: JSON.stringify({
            message: message,
            chat_history: messages,
          }),
        }
      );

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
      await fetch("https://seven-bit-news-207302804909.northamerica-northeast2.run.app/api/chat", {
      // await fetch("https://seven-bit-news-cgc35suboa-pd.a.run.app/api/chat", {
      // await fetch("https://backend-dot-seven-bit-news.nn.r.appspot.com/api/chat", {
      // await fetch("http://localhost:8000/api/chat", {
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
      const response = await fetch("https://seven-bit-news-207302804909.northamerica-northeast2.run.app/api/trending");
      // const response = await fetch("https://seven-bit-news-cgc35suboa-pd.a.run.app/api/trending");
      // const response = await fetch("https://backend-dot-seven-bit-news.nn.r.appspot.com/api/trending");
      // const response = await fetch("http://localhost:8000/api/trending");
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
    setIsLoading(true);
    try {
      const response = await fetch(
        "https://seven-bit-news-207302804909.northamerica-northeast2.run.app/api/topic",
        // "https://seven-bit-news-cgc35suboa-pd.a.run.app/api/topic",
        // "https://backend-dot-seven-bit-news.nn.r.appspot.com/api/topic",
        // "http://localhost:8000/api/topic",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-User-ID": userId,
          },
          body: JSON.stringify({
            topic: topic,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setCurrentTopic(topic);
      setSourceCounts(data.source_counts);
      setWordFrequencies(data.word_frequencies);
      setArticles(data.articles);
      setLocations(data.locations);
      // Update messages with the initial summary from the backend
      if (data.chat_history) {
        setMessages(data.chat_history);
      } else if (data.initial_summary) {
        // Fallback in case chat_history isn't provided
        setMessages([{ role: "assistant", content: data.initial_summary }]);
      } else {
        setMessages([]); // Clear messages if no summary provided
      }
      if (data.network_data) {
        setNetworkData(data.network_data);
      }
    } catch (error) {
      console.error("Error setting topic:", error);
      setMessages([
        { role: "system", content: "Error: Could not process your request." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTopicSubmit = (e) => {
    e.preventDefault();
    if (topicInput.trim()) {
      handleTopicSelect(topicInput);
      setTopicInput("");
    }
  };

  return (
    <div className="App">
      <header className="app-header">
        <div className="header-left">
          {user && <TrendingNewsMenu articles={trendingNews} />}
        </div>
        <h1>7-bit News</h1>
        <div className="header-right">
          {user && (
            <span className="user-info">Signed in as: {user.displayName}</span>
          )}
          {user ? <SignOut setUser={setUser} /> : <SignIn setUser={setUser} />}
        </div>
      </header>
      {user ? (
        <>
          {currentTopic ? (
            <div className="current-topic">
              <div className="topic-content">
                <span className="topic-label">Current Topic:</span>
                <span className="topic-text">
                  "{currentTopic.toUpperCase()}"
                </span>
              </div>
            </div>
          ) : (
            <div className="topic-input-container">
              <form onSubmit={handleTopicSubmit} className="topic-form">
                <input
                  type="text"
                  value={topicInput}
                  onChange={(e) => setTopicInput(e.target.value)}
                  placeholder="Enter a topic..."
                  className="topic-input"
                />
                <button
                  type="submit"
                  className="topic-submit-btn"
                  disabled={isLoading || !topicInput.trim()}
                >
                  Search Topic
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
                      <div className="message-content">{msg.content}</div>
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
                  onReset={handleReset}
                />
              </div>
            </div>
          </div>
        </>
      ) : (
        <p>Please sign in to start chatting.</p>
      )}
    </div>
  );
}

export default App;
