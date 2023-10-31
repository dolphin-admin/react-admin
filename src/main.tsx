import '@/assets/styles/main.scss'
import '@/i18n'

import React from 'react'
import ReactDOM from 'react-dom/client'

import App from '@/App'

BrowserUtils.loadFavicon()
BrowserUtils.disableGestureScale()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
