import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { applyTheme } from './lib/theme';
import './styles/globals.css';

applyTheme();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
