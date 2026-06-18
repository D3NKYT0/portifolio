import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'react-hot-toast'
import './styles/global/index.css'
import App from './App'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60_000,
      retry: 2,
    },
  },
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            fontFamily: 'var(--pixel-font)',
            fontSize: '10px',
            background: '#000',
            color: '#fcfcfc',
            border: '4px solid #e52521',
          },
        }}
      />
    </QueryClientProvider>
  </StrictMode>,
)
