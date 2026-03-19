import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

// Polyfill window.storage for local dev (uses localStorage)
if (!window.storage) {
  window.storage = {
    async get(key) {
      const v = localStorage.getItem(key);
      return v ? { key, value: v } : null;
    },
    async set(key, value) {
      localStorage.setItem(key, value);
      return { key, value };
    },
    async delete(key) {
      localStorage.removeItem(key);
      return { key, deleted: true };
    },
    async list(prefix) {
      const keys = [];
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i);
        if (!prefix || k.startsWith(prefix)) keys.push(k);
      }
      return { keys };
    }
  };
}

ReactDOM.createRoot(document.getElementById('root')).render(<React.StrictMode><App/></React.StrictMode>)
