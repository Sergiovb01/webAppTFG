import { StrictMode } from 'react'
import { LoginPage } from './auth'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { AppRoutes } from './routes/AppRoutes'

createRoot(document.getElementById('root')).render(
  // <StrictMode>
  <BrowserRouter>
    {/* <LoginPage/> */}
    <AppRoutes/>
  </BrowserRouter>
    
  // </StrictMode>,
)
