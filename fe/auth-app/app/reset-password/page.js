"use client";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { resetPassword } from "../api/auth";

export default function ResetPassword() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token"); // Extract token from URL
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) {
      setMessage("Invalid or missing reset token.");
      return;
    }

    const response = await resetPassword(token, newPassword);
    setMessage(response.message);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-2xl font-bold">Reset Password</h2>
      <form onSubmit={handleSubmit} className="w-96 p-4 border rounded">
        <input
          type="password"
          name="newPassword"
          placeholder="Enter new password"
          onChange={(e) => setNewPassword(e.target.value)}
          required
          className="w-full p-2 border rounded mb-2"
        />
        <button type="submit" className="w-full bg-green-500 text-white p-2 rounded">
          Reset Password
        </button>
      </form>
      {message && <p className="mt-4 text-green-500">{message}</p>}
    </div>
  );
}
