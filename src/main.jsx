import React from 'react'
import ReactDOM from 'react-dom/client'
import { NextUIProvider } from '@nextui-org/react'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store.js'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
     <Provider store={store}>
      <NextUIProvider>
        <App />
      </NextUIProvider>
     </Provider>
    </BrowserRouter>
  </React.StrictMode>,
)
