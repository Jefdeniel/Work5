import React from 'react';
import './i18n.js';
import App from './App.tsx';
import ReactDOM from 'react-dom/client';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.min.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { AuthContextProvider } from './store/AuthContext.tsx';
import { SettingsContextProvider } from './store/SettingsContext.js';
import LoadingScreen from './components/ui/Loading/LoadingScreen.tsx';

import './App.scss';
import { CalendarContextProvider } from './store/CalendarContext.tsx';

// As per docs, createRoot is the new way to render in React 18
ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <AuthContextProvider>
      <SettingsContextProvider>
        <CalendarContextProvider>
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
        </CalendarContextProvider>
      </SettingsContextProvider>
    </AuthContextProvider>
  </BrowserRouter>
);
