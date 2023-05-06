import { QueryClientProvider } from '@tanstack/react-query'
import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'
import queryClient from './lib/queryClient'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Suspense>
          <App />
        </Suspense>
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
