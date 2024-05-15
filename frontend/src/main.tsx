import './i18n.js';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.min.css';

import './App.scss';
import App from './App.tsx';
import { SettingsContextProvider } from './store/SettingsContext.js';
import LoadingScreen from './components/ui/Logo/LoadingScreen.tsx';

// as per docs, createRoot is the new way to render in React 18
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <SettingsContextProvider>
        <React.Suspense fallback={<LoadingScreen />}>
          <App />
        </React.Suspense>
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </SettingsContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
