import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './App.scss';
import App from './App.tsx';
import LoadingScreen from './components/ui/Logo/LoadingScreen.tsx';
import './i18n.js';
import { SettingsContextProvider } from './store/SettingsContext.js';
import SSRProvider from 'react-bootstrap/SSRProvider';

// as per docs, createRoot is the new way to render in React 18
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <SettingsContextProvider>
        <React.Suspense fallback={<LoadingScreen />}>
          <SSRProvider>
            <App />
          </SSRProvider>
        </React.Suspense>
      </SettingsContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
