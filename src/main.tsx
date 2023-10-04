import '@/assets/styles/main.scss'
import React from 'react'
import ReactDOM from 'react-dom/client'

import App from '@/App'
import { mobileAdaptor } from '@/tools'

import '@/i18n'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

mobileAdaptor()
