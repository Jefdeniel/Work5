import { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { Field, Form } from 'react-final-form';
import Cookies from 'universal-cookie';
import Button from '../components/ui/Button/Button';
import Heading from '../components/ui/Heading/Heading';
import Input from '../components/ui/Input/Input';
import Validators from '../utils/Validators';
import { toast } from 'react-toastify';

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

  const isResponseOk = (response: Response): any => {
    if (response.status >= 200 && response.status <= 299) {
      return response.json();
    } else {
      throw Error(response.statusText);
    }
  };

  const onLoginHandler = async (values: AppState): Promise<void> => {
    console.log(values);
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': cookies.get('csrftoken'),
        },
        credentials: 'same-origin',
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        toast.error('Invalid username or password');
        throw new Error('Invalid username or password');
      }

      const data = await response.json();
      setState((prevState) => ({
        ...prevState,
        isAuthenticated: true,
        username: '',
        password: '',
        error: '',
      }));
      toast.success('Login successful');
    } catch (error) {
      console.error('Error:', error);
      toast.error('Invalid username or password');
      setState((prevState) => ({
        ...prevState,
        error: error.message,
      }));
    }
  };

  return (
    <Row style={{ height: '100%' }}>
      <Col></Col>
      <Col className="d-flex flex-row align-items-center justify-content-center">
        <Form onSubmit={onLoginHandler}>
          {({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <Heading level={2}>Login</Heading>
              <Field name="username" validate={Validators.required()}>
                {({ input, meta }) => (
                  <Input
                    {...input}
                    meta={meta}
                    type="text"
                    placeholder="Username"
                  />
                )}
              </Field>
              <Field
                name="password"
                validate={Validators.compose(
                  Validators.required(),
                  Validators.password()
                )}
              >
                {({ input, meta }) => (
                  <Input
                    {...input}
                    meta={meta}
                    type="password"
                    placeholder="Password"
                    style={{ marginBottom: '10px' }}
                  />
                )}
              </Field>

              <Button type="submit">Login</Button>
            </form>
          )}
        </Form>
      </Col>
    </Row>
  );
};

export default Login;
