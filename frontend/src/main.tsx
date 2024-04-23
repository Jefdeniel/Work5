import './index.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import LoadingScreen from './components/ui/Loading/LoadingScreen';
import './i18n.js';

import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <React.Suspense fallback={<LoadingScreen />}>
        <App />
      </React.Suspense>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
