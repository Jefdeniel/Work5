import React from 'react';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import LoadingScreen from './components/ui/Loading/LoadingScreen';
import './i18n.js';
import './index.css';

import { SettingsContextProvider } from './store/SettingsContext.js';

import { createRoot } from 'react-dom/client';

// as per docs, createRoot is the new way to render in React 18
const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <SettingsContextProvider>
        <React.Suspense fallback={<LoadingScreen />}>
          <App />
        </React.Suspense>
      </SettingsContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
