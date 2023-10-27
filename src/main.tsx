import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from '../node_modules/react-router-dom/dist/index'
import App from './App'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>,
)
