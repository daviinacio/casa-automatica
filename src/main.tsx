import React from 'react'
import ReactDOM from 'react-dom/client'
import './style/global.css'

import Home from './pages/Home'
import { Providers } from './lib/providers'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Providers>
      <main className="min-h-screen h-screen max-h-screen bg-background">
        <Home />
      </main>
    </Providers>
  </React.StrictMode>,
)
