import React, { useState } from "react";
import { auth } from "../firebase";

export default function RecipeReviewCard() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  const signIn = (e) => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .catch((err) => setErr(err.message));
  };

  return (
    <form className="login_container">
      <center>
        <div className="logo">
          <h1>Login Here!</h1>
          <h6>{err}</h6>
        </div>

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder=" Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder=" Password"
          required
        />
        <button onClick={signIn}>Sign Up</button>
      </center>
    </form>
  );
}
