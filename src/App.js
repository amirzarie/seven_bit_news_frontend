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
import TrendingNews from "./components/TrendingNews";

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

  const handleSendMessage = async (message) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        // "https://backend-dot-seven-bit-news.nn.r.appspot.com/api/chat",
        "http://localhost:8000/api/chat",
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
      await fetch(
        // "https://backend-dot-seven-bit-news.nn.r.appspot.com/api/reset",
        "http://localhost:8000/api/chat",
        {
          method: "POST",
          headers: {
            "X-User-ID": userId,
          },
        }
      );
      setMessages([]);
      setSourceCounts({});
      setWordFrequencies({});
      setCurrentTopic("");
      setArticles([]);
    } catch (error) {
      console.error("Error resetting chat:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const fetchTrendingNews = async () => {
    try {
      // const response = await fetch("https://backend-dot-seven-bit-news.nn.r.appspot.com/api/trending");
      const response = await fetch("http://localhost:8000/api/trending");
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

  return (
    <div className="App">
      <header className="app-header">
        <h1>7-bit News</h1>
        {user ? <SignOut setUser={setUser} /> : <SignIn setUser={setUser} />}
      </header>
      {user ? (
        <>
          <p>Signed in as: {user.displayName}</p>
          {currentTopic && (
            <div className="current-topic">
              <div className="topic-content">
                <span className="topic-label">Current Topic:</span>
                <span className="topic-text">
                  "{currentTopic.toUpperCase()}"
                </span>
              </div>
            </div>
          )}
          <div className="content-container">
            <div className="articles-section">
              <ArticleTable articles={articles} currentTopic={currentTopic} />
            </div>
            {(Object.keys(sourceCounts).length > 0 ||
              Object.keys(wordFrequencies).length > 0) && (
              <div className="visualizations-section">
                <div className="visualization-container">
                  <SourcesPieChart
                    sourceCounts={sourceCounts}
                    currentTopic={currentTopic}
                  />
                </div>
                <div className="visualization-container">
                  <WordCloud
                    wordFrequencies={wordFrequencies}
                    currentTopic={currentTopic}
                  />
                </div>
                <div className="visualization-container">
                  <SentimentBarChart
                    articles={articles}
                    currentTopic={currentTopic}
                  />
                </div>
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
          <TrendingNews articles={trendingNews} />
        </>
      ) : (
        <p>Please sign in to start chatting.</p>
      )}
    </div>
  );
}

export default App;
