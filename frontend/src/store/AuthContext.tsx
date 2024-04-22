import { jwtDecode } from 'jwt-decode';
import React, { useState } from 'react';
import {
  getLocalstorageItem,
  removeLocalstorageItem,
  setLocalstorageItem,
} from '../service/LocalStorageService';

interface JwtToken {
  sub: string;
  unique_name: string;
  Id: string;
  exp: number;
}

interface AuthContextType {
  token: string;
  id: string;
  isLoggedIn: boolean;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = React.createContext<AuthContextType>({
  token: '',
  id: '',
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const AuthContextProvider = ({ children }: { children: any }) => {
  const [token, setToken] = useState<string | null>(
    getLocalstorageItem('token')
  );

  const getUserId = () => token && jwtDecode<JwtToken>(token).Id;

  const isLoggedIn = () => {
    return (
      !!token && new Date(jwtDecode<JwtToken>(token).exp * 1000) > new Date()
    );
  };

  const loginHandler = (token: string) => {
    const strippedToken = token.replaceAll('"', '');
    setToken(strippedToken);
    setLocalstorageItem('token', strippedToken);
  };

  const logoutHandler = () => {
    setToken(null);
    removeLocalstorageItem('token');
  };

  const contextValue: AuthContextType = {
    token: token!,
    id: getUserId()!,
    isLoggedIn: isLoggedIn(),
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthContext;
