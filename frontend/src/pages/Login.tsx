import { Component, ChangeEvent, FormEvent } from 'react';
import Cookies from 'universal-cookie';

interface AppState {
  username: string;
  password: string;
  error: string;
  isAuthenticated: boolean;
}

const cookies = new Cookies();

class Login extends Component<{}, AppState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      username: '',
      password: '',
      error: '',
      isAuthenticated: false,
    };
  }

  componentDidMount(): void {
    this.getSession();
  }

  getSession(): void {
    fetch('/api/session', {
      credentials: 'same-origin',
    })
      .then((res) => {
        return res.json();
      })
      .then((data: { isAuthenticated: boolean }) => {
        console.log(data);
        if (data.isAuthenticated) {
          this.setState({ isAuthenticated: true });
        } else {
          this.setState({ isAuthenticated: false });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  whoami(): void {
    fetch('/api/whoami', {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        return res.json(); // Explicitly return the response data
      })
      .then((data: { username: string }) => {
        // Specify the type of the response data
        console.log('Logged in as: ', data.username);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handlePasswordChange = (event: ChangeEvent<HTMLInputElement>): void => {
    this.setState({ password: event.target.value });
  };

  handleUsernameChange = (event: ChangeEvent<HTMLInputElement>): void => {
    this.setState({ username: event.target.value });
  };

  isResponseOk = (response: Response): any => {
    if (response.status >= 200 && response.status <= 299) {
      return response.json();
    } else {
      throw Error(response.statusText);
    }
  };

  login = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    // make POST request to /api/login
    fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': cookies.get('csrftoken'),
      },
      credentials: 'same-origin',
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
      }),
    })
      .then(this.isResponseOk)
      .then((data) => {
        this.setState({
          isAuthenticated: true,
          username: '',
          password: '',
          error: '',
        });
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
        this.setState({ error: 'Invalid username or password' });
      });
  };

  logout = (): void => {
    fetch('/api/logout', {
      credentials: 'same-origin',
    })
      .then(this.isResponseOk)
      .then((data) => {
        this.setState({ isAuthenticated: false });
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  render() {
    return (
      <>
        <div className="container mx-auto my-auto flex flex-row justify-center items-center">
          <form onSubmit={this.login}>
            <input
              type="text"
              placeholder="Username"
              value={this.state.username}
              onChange={this.handleUsernameChange}
            />
            <input
              type="password"
              placeholder="Password"
              value={this.state.password}
              onChange={this.handlePasswordChange}
            />
            <button type="submit">Login</button>
          </form>
          <p>{this.state.error && <small>{this.state.error}</small>}</p>
        </div>
      </>
    );
  }
}

export default Login;
