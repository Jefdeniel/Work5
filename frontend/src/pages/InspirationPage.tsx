import { useTranslation } from 'react-i18next';
import { Row } from 'react-bootstrap';
import { Field, Form } from 'react-final-form';

import useSetTitle from '../hooks/setTitle';

import Heading from '../components/ui/Heading/Heading';
import Button from '../components/ui/Button/Button';
import Icon from '../components/ui/Icon/Icon';
import { InspirationIcon } from '../components/ui/Icon/SvgIcons';
import Input from '../components/ui/Input/Input';

const InspirationPage = () => {
  const { t } = useTranslation(['general', 'calendar']);
  // TODO: Add other translations
  useSetTitle(t('general:navigation.inspiration'));

  const handleMessageSubmit = (values: any) => {
    console.log(values);
  };

  return (
    <div
      className={`px-5 height-80 d-flex flex-column justify-content-between`}
    >
      <Row className={`w-75`}>
        <Heading level={1} className="heading--lg clr-primary mb-small" />
        {/* TODO: Add other translations */}
        <p className={`mb-large`}>{t('calendar:inspiration.description')}</p>
      </Row>

      <div
        className={`h-100 d-flex justify-content-center align-items-center flex-column`}
      >
        {/* TODO: if no messages yet */}
        <InspirationIcon isBig className={`mb-xlarge`} />

        <span className={`heading heading--lg clr-primary-300 mt-4`}>
          {t('calendar:inspiration.slogan')}
        </span>

        {/* TODO: if messages -> add to this div */}
        <div></div>
      </div>

      <Form
        onSubmit={handleMessageSubmit}
        render={({ handleSubmit }) => (
          <form
            onSubmit={handleSubmit}
            className={`height-50px d-flex align-items-center gap-3`}
          >
            <Field name="message">
              {({ input }) => (
                <Input
                  isBig
                  isSearch
                  type="text"
                  placeholder={t('calendar:inspiration.placeholder')}
                  className={`h-100 flex-grow-1`}
                  {...input}
                />
              )}
            </Field>

            <Button
              className="h-100 btn--primary d-flex"
              type="submit"
              icon={<Icon src="/icons/send.svg" alt="Send icon" />}
              disabled={/*isLoading*/ false}
            >
              {t('calendar:inspiration.send')}
            </Button>
          </form>
        )}
      />
    </div>
  );
};

export default InspirationPage;
