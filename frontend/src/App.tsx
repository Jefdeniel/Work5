import { Settings } from 'luxon';
import { useTranslation } from 'react-i18next';
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.scss';

import useAuth from './hooks/useAuth';
import CalendarLayout from './layout/CalendarLayout';
import Layout from './layout/Layout';
import Login from './pages/Auth/Login';
import Calendar from './pages/Calendar/Calendar';
import CreateCalendar from './pages/Calendar/CreateCalendar';
import CustomizePage from './pages/CustomizePage';
import NotificationPage from './pages/NotificationPage';
import SettingsPage from './pages/Settings/SettingsPage';
import SharingHubPage from './pages/SharingHubPage';
import AccountLayout from './layout/AccountLayout';

function App() {
  const auth = useAuth();
  const { i18n } = useTranslation();
  Settings.defaultLocale = i18n.language;

  console.log(auth);

  return (
    <Routes>
      {auth.isLoggedIn ? (
        <>
          <Route element={<Layout />}>
            <Route
              path="/"
              element={<Navigate to="/calendar/create" replace />}
            />
            <Route path="profile" element={<SettingsPage />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>
          {/* Calendars */}
          <Route element={<CalendarLayout />}>
            <Route path="calendar">
              <Route path="overview" element={<Calendar />} />
              <Route path="create" element={<CreateCalendar />} />
              <Route path="notifications" element={<NotificationPage />} />
              <Route path="sharing-hub" element={<SharingHubPage />} />
              <Route path="customize" element={<CustomizePage />} />
            </Route>
          </Route>

          {/* Account specific routes under /calendar but using a different layout */}
          <Route path="/calendar/notifications" element={<Layout />}>
            <Route index element={<NotificationPage />} />
          </Route>
          <Route path="/calendar/sharing-hub" element={<Layout />}>
            <Route index element={<SharingHubPage />} />
          </Route>
          <Route path="/calendar/customize" element={<Layout />}>
            <Route index element={<CustomizePage />} />
          </Route>
        </>
      ) : (
        <Route element={<AccountLayout />}>
          <Route index path="/" element={<Login />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      )}
    </Routes>
  );
}

export default App;
