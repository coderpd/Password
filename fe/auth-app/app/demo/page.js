"use client"
import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function signup(){
  const[form,setForm]=useState({
    username:"",
    email:"",
    password:""
  });

  const router =useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/signup", form,{ headers: { "Content-Type": "application/json" }}); 
      alert("Signup successful! Redirecting to login.");
      // router.push("/login");
    } catch (error) {
      alert(error.response?.data?.message || "Error signing up");
    }
  };


return(

  <div>
    <h2>SignUp</h2>
    <form onSubmit={handleSubmit} >
      <input type="text" placeholder='username' onChange={(e)=>setForm({...form,username:e.target.value})}/>
      <input type="email" placeholder='email' onChange={(e)=>setForm({...form,email:e.target.value})}/>
      <input type="password" placeholder='password' onChange={(e)=>setForm({...form,password:e.target.value})}/>
      <button>signup</button>
    </form>
    
  </div>
  
 
)
}