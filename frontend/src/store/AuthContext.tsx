import { useState, createContext, useEffect } from 'react';
import axios from 'axios';

let AuthContext = createContext({});
export default AuthContext;

export const AuthProvider = ({ children }: any) => {
  const [isAuthenticatedState, setIsAuthenticatedState] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const setIsAuthenticated = (val: boolean) => {
    setIsAuthenticatedState(val);
  };

  const BACKEND_IP = process.env.REACT_APP_BACKEND_IP;

  let verifyToken = () => {
    axios({
      method: 'post',
      url: BACKEND_IP + '/api/token/refresh',
      withCredentials: true,
      data: {
        username: localStorage.getItem('currentUser'),
      },
    })
      .then((res) => {
        if (res.status == 200) {
          // verify token #####################
          axios({
            method: 'post',
            url: BACKEND_IP + '/api/token/verify',
            withCredentials: true,
            data: {
              username: localStorage.getItem('currentUser'),
            },
          }).then((res) => {
            setIsLoading(false);

            // if token valid ########
            if (res.status == 200) {
              setIsAuthenticatedState(true);
            }
          });
        } else {
          setIsLoading(false);
        }
      })
      .catch((err) => {
        setIsLoading(false);
      });
  };

  let contextData = {
    isAuthenticated: isAuthenticatedState,
    setIsAuthenticated: setIsAuthenticated,
  };
  useEffect(() => {
    verifyToken();
  }, []);

  return (
    <AuthContext.Provider value={contextData}>
      {isLoading ? null : children}
    </AuthContext.Provider>
  );
};
