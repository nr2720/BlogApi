import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

//Router
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App.jsx'

import AuthProvider from './components/AuthProvider.jsx';
import Routes from './components/Routes.jsx'






createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <Routes />
    </AuthProvider>
  </StrictMode>,
)
