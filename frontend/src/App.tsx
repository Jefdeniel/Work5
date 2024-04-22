import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import useAuth from './hooks/useAuth';
import Layout from './layout/Layout';
import AccountLayout from './layout/AccountLayout';
import Login from './pages/Login';

function App() {
  const auth = useAuth();
  return (
    <Routes>
      {auth.isLoggedIn ? (
        // alle routing
        <Route element={<Layout title="Agenda" />} />
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
