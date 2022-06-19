import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AutoBatch } from './components/page/AutoBatch'
import { SuspenseDemo } from './components/page/Suspense'
import { NestedSuspense } from './components/page/NestedSuspense'
import { Concurrent } from './components/page/Concurrent'
import { UseId } from './components/page/UseId'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      suspense: true,
    },
  },
})

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  // <React.StrictMode>
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/autobatch" element={<AutoBatch />} />
        <Route path="/suspense" element={<SuspenseDemo />} />
        <Route path="/nested_suspense" element={<NestedSuspense />} />
        <Route path="/concurrent" element={<Concurrent />} />
        <Route path="/useid" element={<UseId />} />
      </Routes>
    </BrowserRouter>
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>,
  // </React.StrictMode>
)

reportWebVitals()
