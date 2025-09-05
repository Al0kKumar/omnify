import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL; 

console.log("backend url is " , API_BASE);

export const api = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
});
