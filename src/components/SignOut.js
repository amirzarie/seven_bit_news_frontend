// src/components/SignOut.js
import React from "react";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";

const SignOut = ({ setUser }) => {
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        setUser(null);
        console.log("User signed out successfully");
      })
      .catch((error) => {
        console.error("Error signing out: ", error);
      });
  };

  return <button onClick={handleSignOut}>Sign Out</button>;
};

export default SignOut;
