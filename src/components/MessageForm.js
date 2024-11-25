import React, { useState } from "react";

function MessageForm() {
  const [message, setMessage] = useState(""); // State to hold user input
  const [chatHistory, setChatHistory] = useState([]); // State to hold chat history
  const [response, setResponse] = useState(""); // State to hold backend response

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Backend URL
    const backendUrl = "http://127.0.0.1:8000/api/send-message";

    try {
      // Send the message and chat history to the backend
      const res = await fetch(backendUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message, chat_history: chatHistory }),
      });

      if (!res.ok) {
        throw new Error("Failed to send message");
      }

      const data = await res.json(); // Parse the response

      // Update the chat history with the new messages
      setChatHistory(data.chat_history || []);
      setResponse(data.response); // Display the latest response
      setMessage(""); // Clear the input field
    } catch (error) {
      console.error(error);
      setResponse("Error: Could not send message");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Enter your message:
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message here..."
            required
          />
        </label>
        <button type="submit">Send</button>
      </form>

      <div>
        <h3>Chat History:</h3>
        <ul>
          {chatHistory.map((entry, index) => (
            <li key={index}>
              <strong>{entry.role === "user" ? "You" : "Assistant"}:</strong> {entry.content}
            </li>
          ))}
        </ul>
      </div>

      {response && <p><strong>Latest Response:</strong> {response}</p>}
    </div>
  );
}

export default MessageForm;
