import { Col, Row } from 'react-bootstrap';
import { Field, Form } from 'react-final-form';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import Button from '../components/ui/Button/Button';
import Heading from '../components/ui/Heading/Heading';
import Input from '../components/ui/Input/Input';
import useFetch from '../hooks/useFetch';
import Validators from '../utils/Validators';
import Logo from '../components/ui/Logo';

const Register = () => {
  const { t } = useTranslation(['auth']);

  // request to backend to register user
  const { fetchData: register } = useFetch('POST', ['register']);

  const handleRegister = () => {
    register();
    toast.success(t('auth:register.success'));
  };

  const handleLogin = () => {
    window.location.href = '/login';
  };

  return (
    <Row className="h-100 align-items-center justify-content-center m-3">
      <Col sm={12} md={6} className="h-100 d-none d-lg-block d-flex ">
        <Logo width="75px" height="75px" />
      </Col>
      <Col
        sm={12}
        md={6}
        className="d-flex flex-column justify-content-center align-items-center"
      >
        <Form
          onSubmit={handleRegister}
          render={({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <Heading level={2}>{t('auth:register.title')}</Heading>
              <Row>
                <Col sm={12} md={6}>
                  <Field
                    name="firstName"
                    validate={Validators.compose(
                      Validators.required(),
                      Validators.minLength(2),
                      Validators.maxLength(20)
                    )}
                  >
                    {({ input, meta }) => (
                      <Input
                        {...input}
                        meta={meta}
                        onChange={input.onChange}
                        placeholder={t('auth:register.firstName')}
                      />
                    )}
                  </Field>
                </Col>
                <Col sm={12} md={6}>
                  <Field
                    name="lastName"
                    validate={Validators.compose(
                      Validators.required(),
                      Validators.minLength(2),
                      Validators.maxLength(20)
                    )}
                  >
                    {({ input, meta }) => (
                      <Input
                        {...input}
                        meta={meta}
                        onChange={input.onChange}
                        placeholder={t('auth:register.lastName')}
                      />
                    )}
                  </Field>
                </Col>
              </Row>
              <Field
                name="email"
                validate={Validators.compose(
                  Validators.required(),
                  Validators.email()
                )}
              >
                {({ input, meta }) => (
                  <Input
                    {...input}
                    meta={meta}
                    type="email"
                    onChange={input.onChange}
                    placeholder={t('auth:register.email')}
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
                    onChange={input.onChange}
                    placeholder={t('auth:register.password')}
                  />
                )}
              </Field>
              <Field
                name="repeatPassword"
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
                    onChange={input.onChange}
                    placeholder={t('auth:register.repeatPassword')}
                  />
                )}
              </Field>
              <Col>
                <Button type="submit" className="mx-2">
                  {t('auth:register.register')}
                </Button>
                <Button type="button" isOutline={true} onClick={handleLogin}>
                  {t('auth:register.login')}
                </Button>
              </Col>
            </form>
          )}
        ></Form>
      </Col>
    </Row>
  );
};

export default Register;
