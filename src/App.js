// src/App.js
import React, { useState } from "react";
import "./App.css";
import MessageForm from "./components/MessageForm";
import SignIn from "./components/SignIn";
import SignOut from "./components/SignOut";

function App() {
  const [user, setUser] = useState(null);

  return (
    <div className="App">
      <header className="app-header">
        <h1>7-bit news</h1>
        {user ? <SignOut setUser={setUser} /> : <SignIn setUser={setUser} />}
      </header>
      {user ? (
        <>
          <p>Signed in as: {user.displayName}</p>
          <div className="content-container">
            <MessageForm user={user} />
          </div>
        </>
      ) : (
        <p>Please sign in to start chatting.</p>
      )}
    </div>
  );
}

export default App;
