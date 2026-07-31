import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// 1. Importar CSS de Bootstrap e Iconos
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

// 2. Tus estilos personalizados y el App
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)