import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import Cookies from 'universal-cookie';

interface AppState {
  username: string;
  password: string;
  error: string;
  isAuthenticated: boolean;
}

const cookies = new Cookies();

const Login = () => {
  const [state, setState] = useState<AppState>({
    username: '',
    password: '',
    error: '',
    isAuthenticated: false,
  });

  useEffect(() => {
    getSession();
  }, []);

  const getSession = (): void => {
    fetch('/api/session', {
      credentials: 'same-origin',
    })
      .then((res) => res.json())
      .then((data: { isAuthenticated: boolean }) => {
        console.log(data);
        setState((prevState) => ({
          ...prevState,
          isAuthenticated: data.isAuthenticated,
        }));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setState((prevState) => ({
      ...prevState,
      password: event.target.value,
    }));
  };

  const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setState((prevState) => ({
      ...prevState,
      username: event.target.value,
    }));
  };

  const isResponseOk = (response: Response): any => {
    if (response.status >= 200 && response.status <= 299) {
      return response.json();
    } else {
      throw Error(response.statusText);
    }
  };

  const login = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': cookies.get('csrftoken'),
      },
      credentials: 'same-origin',
      body: JSON.stringify({
        username: state.username,
        password: state.password,
      }),
    })
      .then(isResponseOk)
      .then((data) => {
        setState((prevState) => ({
          ...prevState,
          isAuthenticated: true,
          username: '',
          password: '',
          error: '',
        }));
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
        setState((prevState) => ({
          ...prevState,
          error: 'Invalid username or password',
        }));
      });
  };

  // const logout = (): void => {
  //   fetch('/api/logout', {
  //     credentials: 'same-origin',
  //   })
  //     .then(isResponseOk)
  //     .then((data) => {
  //       setState((prevState) => ({
  //         ...prevState,
  //         isAuthenticated: false,
  //       }));
  //       console.log('Success:', data);
  //     })
  //     .catch((error) => {
  //       console.error('Error:', error);
  //     });
  // };

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <div style={{ flex: 1, backgroundColor: '#f2f2f2' }}></div>
      <div
        style={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <form onSubmit={login}>
          <input
            type="text"
            placeholder="Username"
            value={state.username}
            onChange={handleUsernameChange}
            style={{ marginBottom: '10px' }}
          />
          <input
            type="password"
            placeholder="Password"
            value={state.password}
            onChange={handlePasswordChange}
            style={{ marginBottom: '10px' }}
          />
          <button type="submit">Login</button>
          {state.error && <p style={{ color: 'red' }}>{state.error}</p>}
        </form>
      </div>
    </div>
  );
};

export default Login;
