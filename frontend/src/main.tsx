import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './App.scss';
import App from './App.tsx';
import LoadingScreen from './components/ui/Loading/LoadingScreen';
import './i18n.js';
import { SettingsContextProvider } from './store/SettingsContext.js';
import { ToastContainer } from 'react-bootstrap';

// as per docs, createRoot is the new way to render in React 18
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <SettingsContextProvider>
        <React.Suspense fallback={<LoadingScreen />}>
          <App />
        </React.Suspense>
        <ToastContainer theme="colored" position="bottomRight" closeOnClick />
      </SettingsContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
