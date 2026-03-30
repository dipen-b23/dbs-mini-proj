import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// Ensure Inter font is loaded (in index.html or via CSS)
// If you want to use Tailwind preflight, ensure index.css has @tailwind directives.

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
