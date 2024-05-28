import { jwtDecode } from 'jwt-decode';
import React, { useEffect, useState } from 'react';
import useFetch from '../hooks/useFetch';
import {
  getLocalstorageItem,
  removeLocalstorageItem,
  setLocalstorageItem,
} from '../service/LocalStorageService';

interface JwtToken {
  sub: string;
  unique_name: string;
  user_id: string;
  exp: number;
}

interface AuthContextType {
  token: string | null;
  user_id: string | null;
  isLoggedIn: boolean;
  login: (token: string, refreshToken: string) => void;
  logout: () => void;
  refreshToken: () => Promise<void>;
}

const AuthContext = React.createContext<AuthContextType>({
  token: null,
  user_id: null,
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
  refreshToken: async () => {},
});

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [token, setToken] = useState<string | null>(
    getLocalstorageItem('token')
  );

  const getUserId = () => token && jwtDecode<JwtToken>(token).user_id;

  const isLoggedIn = () => {
    // here is the problem with the token expiration (logging out)
    return (
      !!token && new Date(jwtDecode<JwtToken>(token).exp * 1000) > new Date()
    );
  };

  const loginHandler = (token: string, refreshToken: string) => {
    setToken(token);
    setLocalstorageItem('token', token);
    setLocalstorageItem('refresh_token', refreshToken);
  };

  const logoutHandler = () => {
    setToken(null);
    removeLocalstorageItem('token');
    removeLocalstorageItem('refresh_token');
  };

  const { fetchData: refreshTheToken } = useFetch('GET', [
    'api/token/refresh/',
  ]);

  // check for problem here
  const refreshToken = async () => {
    try {
      const refreshToken = getLocalstorageItem('refresh_token');

      const response = await refreshTheToken({}, { refresh: refreshToken });

      if (response.status === 200) {
        const newToken = await response.json();
        setToken(newToken);
        setLocalstorageItem('token', newToken);
      }
      // } else {
      //   logoutHandler();
      // }
    } catch (error) {
      logoutHandler();
    }
  };

  // 🐛 this is the problem! Causes logout on every refresh
  // useEffect(() => {
  //   if (token && !isLoggedIn()) {
  //     refreshToken();
  //   }
  // }, [token]);

  const contextValue: AuthContextType = {
    token,
    user_id: getUserId() || null,
    isLoggedIn: isLoggedIn() || false,
    login: loginHandler,
    logout: logoutHandler,
    refreshToken,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthContext;
