import React, { useState, useContext } from 'react';
import { Col, Row } from 'react-bootstrap';
import { Field, Form } from 'react-final-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Button from '../../components/ui/Button/Button';
import Heading from '../../components/ui/Heading/Heading';
import Input from '../../components/ui/Input/Input';
import Logo from '../../components/ui/Logo';
import useFetch from '../../hooks/useFetch';
import Validators from '../../utils/Validators';
import AuthContext from '../../store/AuthContext';

const Login = () => {
  const { t } = useTranslation('auth');
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  const { fetchData: postLogin } = useFetch('POST', ['api/token/']);

  const onLoginHandler = async (values) => {
    try {
      const response = await postLogin(
        {},
        {
          email: values.email,
          password: values.password,
        }
      );

      if (!response.ok) {
        toast.error('Invalid credentials');
        return;
      }

      const tokenData = await response.json();
      if (tokenData && tokenData.access) {
        authContext.login(tokenData.access);
        toast.success('Login successful!');
        navigate('/');
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.');
    }
  };

  const handleRegister = () => {
    navigate('/register');
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
              <Field name="email" validate={Validators.required()}>
                {({ input, meta }) => (
                  <Input
                    {...input}
                    meta={meta}
                    type="text"
                    placeholder={t('auth:login.email')}
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
