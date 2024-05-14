import { Settings } from 'luxon';
import { useTranslation } from 'react-i18next';
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.scss';
import useAuth from './hooks/useAuth';
import CalendarLayout from './layout/CalendarLayout';
import Layout from './layout/Layout';
import Calendar from './pages/Calendar/Calendar';
import CreateCalendar from './pages/Calendar/CreateCalendar';
import CustomizePage from './pages/CustomizePage';
import NotificationPage from './pages/NotificationPage';
import SettingsPage from './pages/Settings/SettingsPage';
import SharingHubPage from './pages/SharingHubPage';

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
    </Routes>
  );
}

export default App;
