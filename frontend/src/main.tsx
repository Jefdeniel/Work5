import './i18n.js';
import ReactDOM from 'react-dom/client';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.min.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import App from './App.tsx';
import { SettingsContextProvider } from './store/SettingsContext.js';
import { AuthContextProvider } from './store/AuthContext.tsx';

import './App.scss';

// As per docs, createRoot is the new way to render in React 18
ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <AuthContextProvider>
      <SettingsContextProvider>
        <App />
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
    </AuthContextProvider>
  </BrowserRouter>
);
