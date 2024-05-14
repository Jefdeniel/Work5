import React from 'react';
import './i18n.js';
import SSRProvider from 'react-bootstrap/SSRProvider';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

import './App.scss';
import App from './App.tsx';
import LoadingScreen from './components/ui/Logo/LoadingScreen.tsx';
import { SettingsContextProvider } from './store/SettingsContext.js';

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
