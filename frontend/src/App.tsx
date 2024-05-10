import { Settings } from 'luxon';
import { useTranslation } from 'react-i18next';
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.scss';
import AgendaLayout from './layout/AgendaLayout';
import Layout from './layout/Layout';
import CreateAgenda from './pages/Agenda/CreateAgenda';
import CustomizePage from './pages/CustomizePage';
import NotificationPage from './pages/NotificationPage';
import SettingsPage from './pages/Settings/SettingsPage';
import SharingHubPage from './pages/SharingHubPage';
import useAuth from './hooks/useAuth';
import AccountLayout from './layout/AccountLayout';
import Login from './pages/Auth/Login';

function App() {
  const { i18n } = useTranslation();
  Settings.defaultLocale = i18n.language;
  const auth = useAuth();

  return (
    <Routes>
      {auth.isLoggedIn ? (
        <>
          <Route path="/" element={<Layout title="Agenda" />}>
            <Route index element={<SettingsPage />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route path="notifications" element={<NotificationPage />} />
            <Route path="sharing-hub" element={<SharingHubPage />} />
            <Route path="customize-agenda" element={<CustomizePage />} />
          </Route>
          <Route path="/agenda" element={<AgendaLayout title="Agenda" />}>
            <Route path="create" element={<CreateAgenda />} />
          </Route>
        </>
      ) : (
        // If the user is not logged in, render the login page
        <Route path="/" element={<AccountLayout />}>
          <Route index element={<Login />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      )}
    </Routes>
  );
}

export default App;
