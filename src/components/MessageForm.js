import React, { useState } from "react";
import "./MessageForm.css";

function MessageForm() {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // const res = await fetch("http://127.0.0.1:8000/api/send-message", {
      const res = await fetch("https://backend-dot-seven-bit-news.nn.r.appspot.com/api/send-message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      if (!res.ok) throw new Error("Failed to send message");

      const data = await res.json();
      setChatHistory([...chatHistory, { role: "user", content: message }, { role: "assistant", content: data.response }]);
      setMessage(""); // Clear the input field
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        {chatHistory.map((msg, index) => (
          <div key={index} className={`chat-message ${msg.role}`}>
            {msg.content}
          </div>
        ))}
      </div>
      <div className="message-form-container">
        <form className="message-form" onSubmit={handleSubmit}>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message here..."
            required
          />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
}

export default MessageForm;
