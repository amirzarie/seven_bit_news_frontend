// src/components/MessageForm.js
import React, { useState } from "react";

const MessageForm = ({ onSendMessage, isLoading }) => {
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
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder={
          isLoading ? "Processing..." : "Enter your message or topic..."
        }
        disabled={isLoading}
        className="message-input"
      />
      <button
        type="submit"
        disabled={isLoading || !message.trim()}
        className="send-button"
      >
        Send
      </button>
    </form>
  );
};

export default MessageForm;
