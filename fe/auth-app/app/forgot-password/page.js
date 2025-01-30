"use client";
import { useState } from "react";
import { forgotPassword } from "../api/auth";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await forgotPassword(email);
    setMessage(response.message);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-2xl font-bold">Forgot Password</h2>
      <form onSubmit={handleSubmit} className="w-96 p-4 border rounded">
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full p-2 border rounded mb-2"
        />
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Send Reset Link</button>
      </form>
      {message && <p className="mt-4 text-green-500">{message}</p>}
    </div>
  );
}
