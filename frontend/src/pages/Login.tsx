import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../store/AuthContext';

export default function Login() {
  // react-router #######################
  const navigate = useNavigate();
  const backendIp = process.env.REACT_APP_BACKEND_IP;

  let { setIsAuthenticated }: any = useContext(AuthContext);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const login = () => {
    axios({
      method: 'post',
      url: backendIp + '/api/token',
      data: {
        username: username,
        password: password,
      },
      withCredentials: true,
    })
      .then((res) => {
        if (res.status == 200) {
          // set username to localStorage
          let userCount = 0;
          let existUserId = [];
          let userAlreadyExsist = false;

          for (let i = 0; i < localStorage.length; i++) {
            if (localStorage.key(i)?.slice(0, 9) == 'username_') {
              if (
                username == localStorage.getItem(Object.keys(localStorage)[i])
              ) {
                userAlreadyExsist = true;
                localStorage.setItem('currentUser', username);
              }
            }
          }

          if (!userAlreadyExsist) {
            for (let i = 0; i < localStorage.length; i++) {
              if (localStorage.key(i)?.slice(0, 9) == 'username_') {
                existUserId.push(localStorage.key(i)?.slice(9));
                userCount += 1;
              }
            }

            for (let i = 0; i < userCount + 1; i++) {
              if (!existUserId.includes(String(i + 1))) {
                localStorage.setItem('username_' + String(i + 1), username);
                localStorage.setItem('currentUser', username);
                break;
              }
            }
          }
          setIsAuthenticated(true);
          navigate('/');
        } else {
          console.log('error message');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return <>...</>;
}
