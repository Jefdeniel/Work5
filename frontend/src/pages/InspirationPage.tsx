import React, { useState } from 'react';
import { Row } from 'react-bootstrap';
import { Field, Form } from 'react-final-form';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import Button from '../components/ui/Button/Button';
import Heading from '../components/ui/Heading/Heading';
import Icon from '../components/ui/Icon/Icon';
import { InspirationIcon } from '../components/ui/Icon/SvgIcons';
import Input from '../components/ui/Input/Input';

import useSetTitle from '../hooks/setTitle';
import useFetch from '../hooks/useFetch';
import Validators from '../utils/Validators';

interface Message {
  prompt: string;
  inspiration: string;
}

const InspirationPage: React.FC = () => {
  const { t } = useTranslation(['general', 'calendar']);
  useSetTitle(t('general:navigation.inspiration'));

  const [messages, setMessages] = useState<Message[]>([]);
  const [isWelcomeVisible, setIsWelcomeVisible] = useState<boolean>(true);

  const { fetchData: getInspiration, loading: isLoading } = useFetch('POST', [
    'prompt',
    'inspiration',
  ]);

  const handlePromptSubmit = async (values: { prompt: string }) => {
    try {
      const response = await getInspiration({}, { prompt: values.prompt });
      if (response.ok) {
        const data = await response.json();
        setMessages((prevMessages) => [
          ...prevMessages,
          { prompt: values.prompt, inspiration: data.message },
        ]);
        setIsWelcomeVisible(false);
        toast.success('Prompt submitted successfully');
      } else {
        console.error('Error fetching inspiration');
        toast.error('Error submitting prompt');
      }
    } catch (error) {
      console.error(error);
      toast.error('Error submitting prompt');
    }
  };

  return (
    <div
      className="d-flex flex-column justify-content-between"
      style={{ height: '100vh' }}
    >
      <Row className="w-75">
        <Heading level={1} className="heading--lg clr-primary mb-small" />
        <p className="mb-large">{t('calendar:inspiration.description')}</p>
      </Row>

      <div className="flex-grow-1 d-flex flex-column justify-content-center align-items-center">
        {isWelcomeVisible ? (
          <>
            <InspirationIcon isBig className="mb-xlarge" />
            <span className="heading heading--lg clr-primary-300 mt-4">
              {t('calendar:inspiration.slogan')}
            </span>
          </>
        ) : (
          <div
            className="w-100 overflow-auto"
            style={{ flexGrow: 1, maxHeight: '60vh' }}
          >
            {messages.map((message, index) => (
              <div key={index}>
                <div className="font-weight-bold mb-2">
                  <strong> {t('calendar:inspiration.prompt')}:</strong>{' '}
                  {message.prompt}
                </div>
                <div className="ml-3">
                  <strong> {t('calendar:inspiration.response')}:</strong>
                  <Markdown remarkPlugins={[remarkGfm]}>
                    {message.inspiration}
                  </Markdown>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Form
        onSubmit={handlePromptSubmit}
        render={({ handleSubmit }) => (
          <form
            onSubmit={handleSubmit}
            className="d-flex align-items-center gap-3 mt-3"
            style={{ height: '50px' }}
          >
            <Field
              name="prompt"
              validate={Validators.compose(Validators.required())}
            >
              {({ input, meta }) => (
                <Input
                  {...input}
                  meta={meta}
                  isBig
                  isSearch
                  type="text"
                  placeholder={t('calendar:inspiration.placeholder')}
                  className="flex-grow-1"
                />
              )}
            </Field>
            <Button
              className="h-100 btn--primary d-flex"
              type="submit"
              icon={<Icon src="/icons/send.svg" alt="Send icon" />}
              isLoading={isLoading}
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
