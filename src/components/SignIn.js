// src/components/SignIn.js
import React from "react";
import { auth, provider, signInWithPopup } from "../firebase";

function SignIn({ setUser }) {
  const handleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  return (
    <div>
      <button onClick={handleSignIn}>Sign in with Google</button>
    </div>
  );
}

export default SignIn;
