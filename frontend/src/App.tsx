import { Settings } from 'luxon';
import { useTranslation } from 'react-i18next';
import { Navigate, Route, Routes } from 'react-router-dom';

import './App.scss';

import useAuth from './hooks/useAuth';
import CalendarLayout from './layout/CalendarLayout';
import Layout from './layout/Layout';
import Login from './pages/Auth/Login';
import CalendarPage from './pages/Calendar/CalendarPage';
import CreateCalendar from './pages/Calendar/CreateCalendarPage';
import CustomizePage from './pages/CustomizePage';
import NotificationPage from './pages/NotificationPage';
import SettingsPage from './pages/Settings/SettingsPage';
import SharingHubPage from './pages/SharingHubPage';
import AccountLayout from './layout/AccountLayout';
import ProfilePage from './pages/ProfilePage';
import Register from './pages/Auth/Register';
import GoogleCalendar from './pages/Calendar/GoogleCalendar';
import CalendarOverviewPage from './pages/Calendar/CalendarOverviewPage';

function App() {
  const auth = useAuth();
  const { i18n } = useTranslation();
  Settings.defaultLocale = i18n.language;

  return (
    <Routes>
      {auth.isLoggedIn ? (
        <>
          {/* Main layout for general pages */}
          <Route element={<Layout />}>
            <Route
              path="/"
              element={<Navigate to="/calendar/main" replace />}
            />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>

          {/* Calendar specific routes with CalendarLayout */}
          <Route path="/calendar" element={<CalendarLayout />}>
            <Route path="overview" element={<CalendarOverviewPage />} />
            <Route path="create" element={<CreateCalendar />} />
          </Route>
          <Route path="/calendar" element={<Layout />}>
            <Route path="main" element={<CalendarPage />} />
            <Route path="google" element={<GoogleCalendar />} />
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
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      )}
    </Routes>
  );
}

export default App;
