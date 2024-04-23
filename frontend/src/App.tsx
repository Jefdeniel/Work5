import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import useAuth from './hooks/useAuth';
import Layout from './layout/Layout';
import AccountLayout from './layout/AccountLayout';
import Login from './pages/Login';
import Agenda from './pages/Agenda/Agenda';
import { useTranslation } from 'react-i18next';
import { Settings } from 'luxon';

function App() {
  const auth = useAuth();
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

    <Routes>
      {/* layout with detailed sidebar */}
      <Route element={<Layout title="Agenda" />}>
        <Route path="/" element={<Navigate to="/" replace />} />
        <Route index path="agenda" element={<Agenda />} />
      </Route>
      {/* layout without other sidebar */}
    </Routes>
  );
}

export default App;
