import { QueryClientProvider } from '@tanstack/react-query'
import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { RecoilRoot } from 'recoil'
import App from './App'
import BottomSheetModal from './components/@shared/BottomSheetModal'
import Modal from './components/@shared/Modal'
import './index.css'
import queryClient from './lib/queryClient'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RecoilRoot>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <Suspense>
            <App />
            <Modal />
            <BottomSheetModal />
          </Suspense>
        </QueryClientProvider>
      </BrowserRouter>
    </RecoilRoot>
  </React.StrictMode>,
)
