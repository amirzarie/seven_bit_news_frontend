// src/components/SignIn.js
import React from "react";
import { auth, provider, signInWithPopup } from "../firebase";

function SignIn({ setUser }) {
  const handleSignIn = async () => {
    try {
      console.log("Attempting to sign in...");
      const result = await signInWithPopup(auth, provider);
      console.log("Sign in successful:", result.user);
      setUser(result.user);
    } catch (error) {
      console.error("Error signing in:", error);
      console.error("Error code:", error.code);
      console.error("Error message:", error.message);
      alert(`Sign in failed: ${error.message}`);
    }
  };

  return (
    <div>
      <button onClick={handleSignIn}>Sign in with Google</button>
    </div>
  );
}

export default SignIn;
