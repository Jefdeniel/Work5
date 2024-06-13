import { Col, Row } from 'react-bootstrap';
import { Field, Form } from 'react-final-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import AuthBanner from '../../components/auth/AuthBanner/AuthBanner';
import Button from '../../components/ui/Button/Button';
import Heading from '../../components/ui/Heading/Heading';
import Input from '../../components/ui/Input/Input';
import useFetch from '../../hooks/useFetch';
import Validators from '../../utils/Validators';

const RegisterPage = () => {
  const { t } = useTranslation(['auth']);
  const navigate = useNavigate();

  // request to backend to register user
  const { fetchData: register } = useFetch('POST', ['signup']);

  const handleRegister = async (values: {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    password2: string;
  }) => {
    const response = await register({}, values);

    if (!response.ok) {
      toast.error(t('auth:register.invalidData'));
      return null;
    }

    toast.success(t('auth:register.success'));
    navigate('/login');
  };

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <Row className="h-100 align-items-center justify-content-center">
      <AuthBanner />

      <Col
        sm={12}
        md={6}
        className="d-flex flex-column justify-content-center align-items-center"
      >
        <Form
          onSubmit={handleRegister}
          render={({ handleSubmit }) => (
            <form onSubmit={handleSubmit} className="d-flex flex-column gap-1">
              <Heading
                level={2}
                className={`heading--lg fw-bold clr-primary text-center`}
              >
                {t('auth:register.title')}
              </Heading>

              <Row>
                <Col sm={12} md={6}>
                  <Field
                    name="first_name"
                    validate={Validators.compose(
                      Validators.required(),
                      Validators.minLength(2),
                      Validators.maxLength(20)
                    )}
                  >
                    {({ input, meta }) => (
                      <Input
                        {...input}
                        title={t('auth:register.firstName')}
                        meta={meta}
                        onChange={input.onChange}
                        placeholder={t('auth:register.firstName')}
                      />
                    )}
                  </Field>
                </Col>

                <Col sm={12} md={6}>
                  <Field
                    name="last_name"
                    validate={Validators.compose(
                      Validators.required(),
                      Validators.minLength(2),
                      Validators.maxLength(20)
                    )}
                  >
                    {({ input, meta }) => (
                      <Input
                        {...input}
                        title={t('auth:register.lastName')}
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
                    title={t('auth:register.email')}
                    meta={meta}
                    type="email"
                    onChange={input.onChange}
                    placeholder={t('auth:register.email')}
                    isBig
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
                    title={t('auth:register.password')}
                    meta={meta}
                    type="password"
                    onChange={input.onChange}
                    placeholder={t('auth:register.password')}
                    isBig
                  />
                )}
              </Field>

              <Field
                name="password2"
                validate={Validators.compose(
                  Validators.required(),
                  Validators.password()
                )}
              >
                {({ input, meta }) => (
                  <Input
                    {...input}
                    title={t('auth:register.repeatPassword')}
                    meta={meta}
                    type="password"
                    onChange={input.onChange}
                    placeholder={t('auth:register.repeatPassword')}
                    className={`mb-xlarge`}
                    isBig
                  />
                )}
              </Field>

              <Row className={`register-buttons px-3 d-flex gap-4`}>
                <Col className={`p-0`}>
                  <Button
                    isBig
                    type="button"
                    className={`btn--bordered-primary d-flex justify-content-center`}
                    isOutline={true}
                    onClick={handleLogin}
                  >
                    {t('auth:register.backToLogin')}
                  </Button>
                </Col>

                <Col className={`p-0`}>
                  <Button
                    isBig
                    type="submit"
                    className="btn--primary d-flex justify-content-center"
                  >
                    {t('auth:register.register')}
                  </Button>
                </Col>
              </Row>
            </form>
          )}
        ></Form>
      </Col>
    </Row>
  );
};

export default RegisterPage;
