import { Col, Row } from 'react-bootstrap';
import { Field, Form } from 'react-final-form';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import Button from '../components/ui/Button/Button';
import Heading from '../components/ui/Heading/Heading';
import Input from '../components/ui/Input/Input';
import useFetch from '../hooks/useFetch';
import Validators from '../utils/Validators';

const Register = () => {
  const { t } = useTranslation(['auth']);
  const handleRegister = () => {
    toast.success(t('auth:register.success'));
  };

  // request to backend to register user
  const { fetchData: register } = useFetch('POST', ['register']);

  return (
    <Row className="h-100">
      <Col sm={12} md={6} className="d-none d-lg-block"></Col>
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
              <Button type="submit">{t('auth:register.register')}</Button>
            </form>
          )}
        ></Form>
      </Col>
    </Row>
  );
};

export default Register;
