// src/components/MessageForm.js
import React, { useState } from "react";

function MessageForm({ user }) {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // const res = await fetch("http://127.0.0.1:8000/api/chat", {
      const res = await fetch("https://backend-dot-seven-bit-news.nn.r.appspot.com/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-User-ID": user?.uid || "anonymous", // Use user's ID or "anonymous" if not signed in
        },
        body: JSON.stringify({ message, chat_history: chatHistory }),
      });

      if (!res.ok) throw new Error("Failed to send message");

      const data = await res.json();
      setChatHistory((prev) => [
        ...prev,
        { role: "user", content: message },
        { role: "assistant", content: data.response },
      ]);
      setMessage(""); // Clear the input field
    } catch (error) {
      console.error(error);
      setChatHistory((prev) => [
        ...prev,
        { role: "assistant", content: "Error: Could not send message" },
      ]);
    }
  };

  const handleReset = async () => {
    try {
      // const res = await fetch("http://127.0.0.1:8000/api/reset", {
        const res = await fetch("https://backend-dot-seven-bit-news.nn.r.appspot.com/api/reset", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-User-ID": user?.uid || "anonymous", // Use user's ID or "anonymous" if not signed in
        },
      });

      if (!res.ok) throw new Error("Failed to reset model and chat history");

      // Clear local state
      setChatHistory([]);
      setMessage("");
      console.log("Chat history and model reset successfully");
    } catch (error) {
      console.error("Error resetting chat history:", error);
      setChatHistory((prev) => [
        ...prev,
        { role: "assistant", content: "Error: Could not reset chat" },
      ]);
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        <h2>Chat</h2>
        {chatHistory.map((entry, index) => (
          <div
            key={index}
            className={`chat-message ${
              entry.role === "user" ? "user" : "assistant"
            }`}
          >
            <strong>{entry.role === "user" ? "You" : "Assistant"}:</strong>{" "}
            {entry.content}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="message-form">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message here..."
          required
        />
        <button type="submit" className="send-button">
          Send
        </button>
        <button type="button" onClick={handleReset} className="reset-button">
          Reset
        </button>
      </form>
    </div>
  );
}

export default MessageForm;