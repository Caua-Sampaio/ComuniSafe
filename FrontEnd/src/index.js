import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './Context/App';
import { AuthProvider } from './Context/AuthContext'; // ⭐ IMPORTA

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>   {/* ⭐ ENVOLVE O APP AQUI */}
      <App />
    </AuthProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
