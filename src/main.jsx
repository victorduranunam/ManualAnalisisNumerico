import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';

// 1. IMPORTANTE: Cargar los estilos CSS personalizados aquí
import './index.css'; 

import App from './App.jsx';
import ParticipacionesApp from './ParticipacionesApp.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/participaciones/*" element={<ParticipacionesApp />} />
      </Routes>
    </Router>
  </React.StrictMode>
);