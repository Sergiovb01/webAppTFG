import { StrictMode } from 'react'
import { LoginPage } from './auth'
import { createRoot } from 'react-dom/client'

createRoot(document.getElementById('root')).render(
  // <StrictMode>
    <LoginPage/>
  // </StrictMode>,
)
