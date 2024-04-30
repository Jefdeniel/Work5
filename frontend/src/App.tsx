import { Settings } from 'luxon';
import { useTranslation } from 'react-i18next';
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.scss';
import AgendaLayout from './layout/AgendaLayout';
import Layout from './layout/Layout';
import CreateAgenda from './pages/Agenda/CreateAgenda.tsx';
import CustomizePage from './pages/CustomizePage.tsx';
import NotificationPage from './pages/NotificationPage.tsx';
import SettingsPage from './pages/Settings/SettingsPage';
import SharingHubPage from './pages/SharingHubPage.tsx';
import AccountLayout from './layout/AccountLayout.tsx';
import Login from './pages/Login.tsx';

function App() {
  const { i18n } = useTranslation();
  Settings.defaultLocale = i18n.language;

  return (
    // <Routes>
    //   {auth.isLoggedIn ? (
    //     // alle routing
    //     <Route element={<Layout title="Agenda" />} />
    //   ) : (
    //     <Route element={<AccountLayout />}>
    //       <Route index path="/" element={<Login />} />
    //       <Route path="*" element={<Navigate to="/" replace />} />
    //     </Route>
    //   )}
    // </Routes>
    <>
      <Routes>
        <Route element={<AccountLayout />}>
          <Route index path="/" element={<Login />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
      <Routes>
        <Route element={<Layout title="Agenda" />}>
          <Route path="/" element={<Navigate to="/" replace />} />
          {/* Settings */}
          <Route index path="/settings" element={<SettingsPage />} />
          <Route index path="/notifications" element={<NotificationPage />} />
          <Route index path="/sharing-hub" element={<SharingHubPage />} />
          <Route index path="/customize-agenda" element={<CustomizePage />} />
        </Route>
        <Route element={<AgendaLayout title="Agenda" />}>
          {/* Agenda */}
          <Route path="agenda">
            <Route path="create" element={<CreateAgenda />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
