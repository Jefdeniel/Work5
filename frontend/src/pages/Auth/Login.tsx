import { Col, Row } from 'react-bootstrap';
import { Field, Form } from 'react-final-form';
import Cookies from 'universal-cookie';
import Button from '../../components/ui/Button/Button';
import Heading from '../../components/ui/Heading/Heading';
import Input from '../../components/ui/Input/Input';
import Validators from '../../utils/Validators';
import { useTranslation } from 'react-i18next';
import Logo from '../../components/ui/Logo';

const Login = () => {
  const { t } = useTranslation('auth');
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

  const handleRegister = () => {
    window.location.href = '/register';
  };

  return (
    <Row className="h-100 align-items-center justify-content-center m-3">
      <Col sm={12} md={6} className="h-100 d-none d-lg-block d-flex ">
        <Logo width="75px" height="75px" />
      </Col>
      <Col className="d-flex flex-row align-items-center justify-content-center">
        <Form onSubmit={onLoginHandler}>
          {({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <Heading level={2}>{t('auth:login.login')}</Heading>
              <Field name="username" validate={Validators.required()}>
                {({ input, meta }) => (
                  <Input
                    {...input}
                    meta={meta}
                    type="text"
                    placeholder={t('auth:login.username')}
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
                    placeholder={t('auth:login.password')}
                    style={{ marginBottom: '10px' }}
                  />
                )}
              </Field>

              <Button type="submit">{t('auth:login.login')}</Button>
              <br />
              <Button onClick={handleRegister}>
                {t('auth:register.title')}
              </Button>
            </form>
          )}
        </Form>
      </Col>
    </Row>
  );
};

export default Login;
