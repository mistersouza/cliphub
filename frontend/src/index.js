import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AppProvider } from './context/AppContext';
import { BrowserRouter as Router } from 'react-router-dom'; // Import Router here

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <AppProvider>
      <App />
    </AppProvider>
  </Router>
);
// Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
