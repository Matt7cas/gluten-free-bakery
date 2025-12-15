import React from 'react';
import ReactDOM from 'react-dom/client';
import { PerformanceProvider } from './contexts/PerformanceContext';
import App from '../App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <PerformanceProvider>
      <App />
    </PerformanceProvider>
  </React.StrictMode>,
);