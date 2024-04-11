import { useContext, useState } from 'react';
import AuthContext from '../store/AuthContext';
import axios from 'axios';

const MainLayout = ({ children }) => {
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const BACKEND_IP = process.env.REACT_APP_BACKEND_IP;

  const verifyToken = () => {
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
              setIsAuthenticated(true);
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
    isAuthenticated: isAuthenticated,
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

useEffect(() => {
  setInterval(
    () => {
      // refresh token ########################
      axios({
        method: 'post',
        url: backendIp + '/api/token/refresh',
        withCredentials: true,
        data: {
          username: localStorage.getItem('currentUser'),
        },
      })
        .then((res) => {
          if (res.status == 200) {
            // verify token #####################
            // if valid -> go to 'to'
            // if not -> go to '/login'
            axios({
              method: 'post',
              url: backendIp + '/api/token/verify',
              withCredentials: true,
              data: {
                username: localStorage.getItem('currentUser'),
              },
            })
              .then((res) => {
                // if token valid ########
                if (res.status != 200) {
                  navigate('/login');
                }
              })
              .catch((err) => {
                // if token is not valid #
                navigate('/login');
              });
          } else {
            navigate('/login');
          }
        })
        .catch((err) => {
          navigate('/login');
        });
    },
    1000 * 60 * 4
  );
}, []);
