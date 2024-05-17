import React, { useState, useEffect, useContext } from 'react';
import {
  getLocalstorageItem,
  removeLocalstorageItem,
  setLocalstorageItem,
} from '../service/LocalStorageService';
import { jwtDecode } from 'jwt-decode';

interface JwtToken {
  sub: string;
  unique_name: string;
  Id: string;
  exp: number;
}

interface AuthContextType {
  token: string | null;
  id: string | null;
  isLoggedIn: boolean;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = React.createContext<AuthContextType>({
  token: null,
  id: null,
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
});

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [token, setToken] = useState<string | null>(
    getLocalstorageItem('token')
  );

  const getUserId = () => token && jwtDecode<JwtToken>(token).Id;

  const isLoggedIn = () => {
    return (
      token && new Date(jwtDecode<JwtToken>(token).exp * 1000) > new Date()
    );
  };

  const loginHandler = (token: string) => {
    setToken(token);
    setLocalstorageItem('token', token);
  };

  const logoutHandler = () => {
    setToken(null);
    removeLocalstorageItem('token');
  };

  useEffect(() => {
    if (token) {
      if (!isLoggedIn()) {
        logoutHandler();
      }
    }
  }, [token]);

  const contextValue: AuthContextType = {
    token,
    id: getUserId() || null,
    isLoggedIn: isLoggedIn() || false,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthContext;
