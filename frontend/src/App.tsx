import { Settings } from 'luxon';
import { useTranslation } from 'react-i18next';
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from './layout/Layout';
import Agenda from './pages/Agenda/Agenda';

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
    <Routes>
      <Route element={<Layout title="Agenda" />}>
        <Route path="/" element={<Navigate to="/" replace />} />
        <Route index path="agenda" element={<Agenda />} />
      </Route>
    </Routes>
  );
}

export default App;
