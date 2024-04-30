import { Col, Row } from 'react-bootstrap';
import { Field, Form } from 'react-final-form';
import Cookies from 'universal-cookie';
import Button from '../components/ui/Button/Button';
import Heading from '../components/ui/Heading/Heading';
import Input from '../components/ui/Input/Input';
import Validators from '../utils/Validators';

const Login = () => {
  const onLoginHandler = async (values: any) => {
    const response = await fetch('http://localhost:8000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    });

    if (response.ok) {
      const data = await response.json();
      const cookies = new Cookies();
      cookies.set('token', data.token, { path: '/' });
      window.location.href = '/';
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
