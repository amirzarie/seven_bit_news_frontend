import React, { useState } from "react";

function MessageForm() {
  const [message, setMessage] = useState(""); // State to hold user input
  const [response, setResponse] = useState(""); // State to hold backend response

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Backend URL
    const backendUrl = "https://your-backend-url.com/api/send-message";

    try {
      // Send the message to the backend
      const res = await fetch(backendUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });

      if (!res.ok) {
        throw new Error("Failed to send message");
      }

      const data = await res.json(); // Parse the response
      setResponse(data.response); // Assuming backend sends a "response" field
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
      {response && <p>Backend Response: {response}</p>}
    </div>
  );
}

export default MessageForm;
