import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import ColorModeContext from './context/ColorModeContext';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ColorModeContext>
        <App />
      </ColorModeContext>
    </BrowserRouter>
  </React.StrictMode>
);

