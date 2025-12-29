import axios from "axios";

const API_URL = "http://localhost:3000/auth";

axios.defaults.withCredentials = true;

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const registerUser = (data) => {
  return axios.post(`${API_URL}/register`, data);
};

export const loginUser = (data) => {
  return axios.post(`${API_URL}/login`, data);
};

// verify 6-digit code
export const verifyCode = (data) => {
  return axios.post(`${API_URL}/verify`, data);
};

// Save user
export const saveUser = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
  window.dispatchEvent(new Event("user:login")); // ✨ event custom
};

// Get user
export const getUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

// Logout user
export const logoutUser = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
  window.dispatchEvent(new Event("user:logout")); // ✨ event custom
};