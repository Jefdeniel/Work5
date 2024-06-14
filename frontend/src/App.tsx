import { Settings } from 'luxon';
import { useTranslation } from 'react-i18next';
import { Navigate, Route, Routes } from 'react-router-dom';

import './App.scss';

import Layout from './layout/Layout';
import useAuth from './hooks/useAuth';
import LoginPage from './pages/Auth/LoginPage';
import RegisterPage from './pages/Auth/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import CustomizePage from './pages/CustomizePage';
import AccountLayout from './layout/AccountLayout';
import SharingHubPage from './pages/SharingHubPage';
import CalendarLayout from './layout/CalendarLayout';
import InspirationPage from './pages/InspirationPage';
import NotificationPage from './pages/NotificationPage';
import NotFound from './components/ui/NotFound/NotFound';
import CalendarPage from './pages/Calendar/CalendarPage';
import SettingsPage from './pages/Settings/SettingsPage';
import GoogleCalendar from './pages/Calendar/GoogleCalendar';
import CreateCalendar from './pages/Calendar/CreateCalendarPage';
import ScrollManager from './components/scrollManager/ScrollManager';
import CalendarOverviewPage from './pages/Calendar/CalendarOverviewPage';

function App() {
  const auth = useAuth();
  const { i18n } = useTranslation();
  Settings.defaultLocale = i18n.language;

  return (
    <>
      <ScrollManager />

      <Routes>
        {auth.isLoggedIn ? (
          <>
            {/* Main layout for general pages */}
            <Route element={<Layout />}>
              <Route
                path="/"
                element={<Navigate to="/calendar/overview" replace />}
              />
              <Route path="profile" element={<ProfilePage />} />
              <Route path="settings" element={<SettingsPage />} />
              <Route path="*" element={<NotFound />} />
            </Route>

            {/* Calendar specific routes with CalendarLayout */}
            <Route path="/calendar" element={<CalendarLayout />}>
              <Route path="overview" element={<CalendarOverviewPage />} />
              <Route path="create" element={<CreateCalendar />} />
              <Route path="*" element={<NotFound />} />
            </Route>
            <Route path="/calendar" element={<Layout />}>
              <Route path="google" element={<GoogleCalendar />} />
              <Route path="/calendar/:id" element={<CalendarPage />} />
              <Route path="*" element={<NotFound />} />
            </Route>

            {/* Account specific routes under /calendar but using a different layout */}
            <Route path="/calendar/notifications/:id" element={<Layout />}>
              <Route index element={<NotificationPage />} />
              <Route path="*" element={<NotFound />} />
            </Route>
            <Route path="/calendar/sharing-hub/:id" element={<Layout />}>
              <Route index element={<SharingHubPage />} />
              <Route path="*" element={<NotFound />} />
            </Route>
            <Route path="/calendar/customize/:id" element={<Layout />}>
              <Route index element={<CustomizePage />} />
              <Route path="*" element={<NotFound />} />
            </Route>
            <Route path="/calendar/inspiration/:id" element={<Layout />}>
              <Route index element={<InspirationPage />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </>
        ) : (
          <Route element={<AccountLayout />}>
            <Route index path="/" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        )}
      </Routes>
    </>
  );
}

export default App;
