// export const signup = async (userData) => {
//   const response = await fetch("http://localhost:5000/signup", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(userData),
//   });
//   return response.json();
// };

// export const login = async (userData) => {
//   const response = await fetch("http://localhost:5000/login", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(userData),
//   });
//   return response.json();
// };

// export const forgotPassword = async (email) => {
//   const response = await fetch("http://localhost:5000/forgot-password", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ email }),
//   });
//   return response.json();
// };

// export const resetPassword = async (token, newPassword) => {
//   const response = await fetch("http://localhost:5000/reset-password", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ token, newPassword }),
//   });
//   return response.json();
// };

import axios from "axios";

const API_URL = "http://localhost:5000";

// Signup
export const signup = async (userData) => {
  const response = await axios.post(`${API_URL}/signup`, userData, {
    headers: { "Content-Type": "application/json" },
  });
  return response.data;
};

// Login
export const login = async (userData) => {
  const response = await axios.post(`${API_URL}/login`, userData, {
    headers: { "Content-Type": "application/json" },
  });
  return response.data;
};

// Forgot Password
export const forgotPassword = async (email) => {
  const response = await axios.post(
    `${API_URL}/forgot-password`,
    { email },
    { headers: { "Content-Type": "application/json" } }
  );
  return response.data; 
};

// Reset Password
export const resetPassword = async (token, newPassword) => {
  const response = await axios.post(
    `${API_URL}/reset-password`,
    { token, newPassword },
    { headers: { "Content-Type": "application/json" } }
  );
  return response.data;
};

