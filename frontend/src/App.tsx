import { Settings } from 'luxon';
import { useTranslation } from 'react-i18next';
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.scss';

import Layout from './layout/Layout';
import ProfilePage from './pages/ProfilePage';
import Calendar from './pages/Calendar/Calendar';
import CustomizePage from './pages/CustomizePage';
import SharingHubPage from './pages/SharingHubPage';
import CalendarLayout from './layout/CalendarLayout';
import NotificationPage from './pages/NotificationPage';
import SettingsPage from './pages/Settings/SettingsPage';
import CreateCalendar from './pages/Calendar/CreateCalendar';

function App() {
  const { i18n } = useTranslation();
  Settings.defaultLocale = i18n.language;

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Navigate to="/calendar/create" replace />} />
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
    </Routes>
  );
}

export default App;
