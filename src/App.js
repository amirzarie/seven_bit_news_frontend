// src/App.js
import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import MessageForm from "./components/MessageForm";
import SignIn from "./components/SignIn";
import SignOut from "./components/SignOut";

function App() {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [userId] = useState(
    () => "user_" + Math.random().toString(36).substr(2, 9)
  );
  const [user, setUser] = useState(null);
  const messagesEndRef = useRef(null);

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

  return (
    <div className="App">
      <header className="app-header">
        <h1>7-bit News</h1>
        {user ? (
          <>
            <button
              onClick={handleReset}
              className="reset-button"
              disabled={isLoading}
            >
              New Topic
            </button>
            <SignOut setUser={setUser} />
          </>
        ) : (
          <SignIn setUser={setUser} />
        )}
      </header>
      {user ? (
        <>
          <p>Signed in as: {user.displayName}</p>
          <div className="content-container">
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
                      msg.role === "user" ? "user-message" : "assistant-message"
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
              />
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
