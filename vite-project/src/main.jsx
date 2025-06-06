import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import{ App } from './App.jsx'
import 'bootstrap-icons/font/bootstrap-icons.css';
import './index.css';


createRoot(document.getElementById('root')).render(
  <>
    <div className="dark:bg-gray-900 dark:text-white min-h-screen">
    <App />
   </div>
  </>
)
