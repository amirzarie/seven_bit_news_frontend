import React, { useState } from "react";

function MessageForm() {
  const [message, setMessage] = useState(""); // State to hold user input
  const [response, setResponse] = useState(""); // State to hold backend response

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("https://backend-dot-seven-bit-news.nn.r.appspot.com/api/send-message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      if (!res.ok) throw new Error("Failed to send message");

      const data = await res.json(); // Parse the response
      setResponse(data.response); // Display the backend's response
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

      {response && (
        <p>
          <strong>Response:</strong> {response}
        </p>
      )}
    </div>
  );
}

export default MessageForm;
