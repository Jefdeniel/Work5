import { Col, Row } from 'react-bootstrap';
import { Field, Form } from 'react-final-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Button from '../../components/ui/Button/Button';
import Heading from '../../components/ui/Heading/Heading';
import Input from '../../components/ui/Input/Input';
import Logo from '../../components/ui/Logo';
import useAuth from '../../hooks/useAuth';
import useFetch from '../../hooks/useFetch';
import Validators from '../../utils/Validators';

const Login = () => {
  const { t } = useTranslation('auth');
  const auth = useAuth();
  const navigate = useNavigate();

  // Assuming useFetch hook supports passing data in the request body
  const { fetchData: postLogin } = useFetch('POST', ['token']);

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
      navigate('/calendar/overview');
    }
  };

  const handleRegister = () => {
    navigate('/register');
  };

  return (
    <Row className="h-100 align-items-center justify-content-center">
      <Col
        sm={12}
        md={6}
        className="bg-primary-light h-100 d-none d-lg-block d-flex"
      >
        <Logo width="50px" height="50px" className={`mt-xsmall`} />
      </Col>

      <Col
        sm={12}
        md={6}
        className="d-flex flex-column align-items-center justify-content-center"
      >
        <Form
          onSubmit={onLoginHandler}
          render={({ handleSubmit }) => (
            <form onSubmit={handleSubmit} className="d-flex flex-column gap-1">
              <Heading level={2} className={`heading--lg fw-bold clr-primary`}>
                {t('auth:login.title')}
              </Heading>

              <Field name="email" validate={Validators.required()}>
                {({ input, meta }) => (
                  <Input
                    {...input}
                    title={t('auth:login.email')}
                    meta={meta}
                    type="email"
                    placeholder={`johndhoe@gmail.com`}
                    isBig
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
                    title={t('auth:login.password')}
                    meta={meta}
                    type="password"
                    placeholder={t('auth:login.password')}
                    className={`mb-xlarge`}
                    isBig
                  />
                )}
              </Field>

              <div>
                <Button
                  isBig
                  className="btn--primary d-flex justify-content-center"
                  type="submit"
                >
                  {t('auth:login.login')}
                </Button>

                <div
                  className={`mt-xsmall mb-large d-flex flex-column align-items-center`}
                >
                  <span className={`bg-body d-inline-block px-3 transl-50`}>
                    {t('auth:login.noAccount')}
                  </span>

                  <div className={`line-1`}></div>
                </div>

                <Button
                  isBig
                  onClick={handleRegister}
                  className={`btn--bordered-primary d-flex justify-content-center`}
                >
                  {t('auth:login.register')}
                </Button>
              </div>
            </form>
          )}
        />
      </Col>
    </Row>
  );
};

export default Login;
