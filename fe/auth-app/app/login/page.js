"use client";
import { useState } from "react";
import { signup } from "../api/route";
import Link from "next/link";

export default function Signup() {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await signup(formData);
    alert(response.message);
  };

  return (
   
    <>
     <form onSubmit={handleSubmit} className="p-4 border rounded">
      <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
      <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
      <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
      <button type="submit">Sign Up</button>
    </form>
    <Link href="../forgot-password"><button>Forgot Password</button></Link>
    </>
  );
}
