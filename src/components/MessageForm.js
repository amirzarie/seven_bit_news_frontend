// src/components/MessageForm.js
import React, { useState } from "react";

const MessageForm = ({ onSendMessage, isLoading, currentTopic }) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="message-form">
      <div className="message-input-container">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={
            currentTopic
              ? "Type your message..."
              : "Select a topic to start chatting..."
          }
          className="message-input"
          disabled={isLoading || !currentTopic}
        />
        <button
          type="submit"
          className="send-button"
          disabled={isLoading || !message.trim() || !currentTopic}
        >
          Send
        </button>
      </div>
    </form>
  );
};

export default MessageForm;
