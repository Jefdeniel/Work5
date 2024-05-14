import { Settings } from 'luxon';
import { useTranslation } from 'react-i18next';
import { Route, Routes } from 'react-router-dom';
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
import ProfilePage from './pages/ProfilePage';

function App() {
  const { i18n } = useTranslation();
  Settings.defaultLocale = i18n.language;

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<SettingsPage />} />
        <Route path="settings" element={<SettingsPage />} />
        <Route path="notifications" element={<NotificationPage />} />
        <Route path="sharing-hub" element={<SharingHubPage />} />
        <Route path="customize" element={<CustomizePage />} />
        <Route path="profile" element={<ProfilePage />} />
      </Route>
      <Route path="/calendar" element={<CalendarLayout title="Calendar" />}>
        <Route path="overview" element={<Calendar />} />
        <Route path="create" element={<CreateCalendar />} />
      </Route>
    </Routes>
  );
}

export default App;
