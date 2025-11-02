// main.tsx

import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

import AppRoutes from './AllRoutes.tsx'

createRoot(document.getElementById('root')!).render(
<BrowserRouter>
  <Toaster
    position="top-right"
    toastOptions={{
      duration: 4000,
    }}
  />
  <AppRoutes />
</BrowserRouter>
)