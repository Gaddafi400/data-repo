import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { AppProvider } from './context';
import 'react-toastify/dist/ReactToastify.css';

import { ToastContainer } from 'react-toastify';

import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppProvider>
      <ToastContainer position="top-right" autoClose={2000} />
      <App />
    </AppProvider>
  </React.StrictMode>
);
