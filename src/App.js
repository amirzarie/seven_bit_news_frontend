// src/App.js
import React, { useState } from "react";
import "./App.css";
import MessageForm from "./components/MessageForm";
import SignIn from "./components/SignIn";
import "./App.css";
// import { getAuth, signOut } from "firebase/auth";
import SignOut from "./components/SignOut";

function App() {
  const [user, setUser] = useState(null);

  return (
    <div className="App">
      <h1>Welcome to 7-bit news!</h1>
      {user ? (
        <>
          <p>Signed in as: {user.displayName}</p>
          <MessageForm />
          <SignOut setUser={setUser} />
        </>
      ) : (
        <SignIn setUser={setUser} />
      )}
    </div>
  );
}

export default App;
