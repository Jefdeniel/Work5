import React from 'react';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import LoadingScreen from './components/ui/Loading/LoadingScreen';
import './i18n.js';
import './index.css';
import 'react-toastify/dist/ReactToastify.css';

import { ToastContainer } from 'react-toastify';
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
        <ToastContainer theme="colored" position="bottom-right" closeOnClick />
      </SettingsContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
