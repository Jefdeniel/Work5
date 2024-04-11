import './App.css';
import Logo from './components/ui/Logo';
import Test from './components/test';

// IsAuthenticated
import { useContext } from 'react';
import AuthContext from './store/AuthContext';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';

function App() {
  let { isAuthenticated }: any = useContext(AuthContext);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        {/* main layout ########################### */}
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <div className="App">
                <header className="App-header">
                  <p className="header">
                    <Logo width="100px" height="100px" />
                    Agenda tool
                  </p>
                  <Test />
                  <div className="body"></div>
                </header>
              </div>
            ) : (
              <Navigate to="/login" />
            )
          }
        >
          <Route path="/" element={<Navigate to="/expense/TWD" />} />
          {/* <Route path="*" element={<NotFound />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
