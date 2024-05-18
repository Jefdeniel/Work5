import { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Button from '../../components/ui/Button/Button';
import Input from '../../components/ui/Input/Input';
import Logo from '../../components/ui/Logo';
import useAuth from '../../hooks/useAuth';
import useFetch from '../../hooks/useFetch';
import Heading from '../../components/ui/Heading/Heading';
import Validators from '../../utils/Validators';
import { Field, Form } from 'react-final-form';

const Login = () => {
  const { t } = useTranslation('auth');
  const auth = useAuth();
  const navigate = useNavigate();

  // Assuming useFetch hook supports passing data in the request body
  const { fetchData: postLogin } = useFetch('POST', ['token/']);

  const onLoginHandler = async (values: {
    email: string;
    password: string;
  }) => {
    const response = await postLogin({}, values);

    if (!response.ok) {
      toast.error(t('auth:login.invalidCredentials'));
      return null;
    }

    const token = await response.json();

    if (token) {
      auth.login(token.access, token.refresh);
      navigate('/calendar/notifications');
    }
  };

  const handleRegister = () => {
    navigate('/register');
  };

  return (
    <Row className="h-100 align-items-center justify-content-center m-3">
      <Col sm={12} md={6} className="h-100 d-none d-lg-block d-flex">
        <Logo width="75px" height="75px" />
      </Col>
      <Col className="d-flex flex-row align-items-center justify-content-center">
        <Form
          onSubmit={onLoginHandler}
          render={({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <Heading level={2}>{t('auth:login.login')}</Heading>
              <Field name="email" validate={Validators.required()}>
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
                validate={Validators.compose(Validators.required())}
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

              <Button className="btn--primary" type="submit">
                {t('auth:login.login')}
              </Button>
              <br />
              <Button onClick={handleRegister}>
                {t('auth:register.title')}
              </Button>
            </form>
          )}
        />
      </Col>
    </Row>
  );
};

export default Login;
