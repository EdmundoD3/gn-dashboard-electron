import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import './Component/styles/normalice.css'
import './Component/styles/dropbox.css'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
)
