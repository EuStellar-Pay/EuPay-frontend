import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Toaster } from 'react-hot-toast'
import './index.css'
import App from './App'
import { WalletProvider } from './context/WalletContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <WalletProvider>
      <App />
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: { background: '#18181b', color: '#f4f4f5', border: '1px solid #27272a', fontSize: '13px' },
          success: { iconTheme: { primary: '#6366f1', secondary: '#18181b' } },
        }}
      />
    </WalletProvider>
  </StrictMode>,
)
