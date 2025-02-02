// src/components/MessageForm.js
import React, { useState } from "react";

const MessageForm = ({ onSendMessage, isLoading, onReset }) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage("");
    }
  };

  return (
    <form className="message-form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder={
          isLoading ? "Processing..." : "Enter your message or topic..."
        }
        className="message-input"
        disabled={isLoading}
      />
      <div className="buttons-container">
        <button
          type="button"
          onClick={onReset}
          className="reset-button"
          disabled={isLoading}
        >
          New Topic
        </button>
        <button
          type="submit"
          className="send-button"
          disabled={isLoading || !message.trim()}
        >
          Send
        </button>
      </div>
    </form>
  );
};

export default MessageForm;
