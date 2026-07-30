import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext.tsx'
import './index.css'
import App from './App.tsx'
import "./styles/variables.css"
import "./styles/globals.css";
import "./styles/typography.css";
import "./styles/animations.css";
import "./styles/utilities.css";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
