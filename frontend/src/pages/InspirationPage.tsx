import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import useSetTitle from '../hooks/setTitle';
import useFetch from '../hooks/useFetch';

import { InspirationIcon } from '../components/ui/Icon/SvgIcons';
import {
  getLocalstorageItem,
  setLocalstorageItem,
  removeLocalstorageItem,
} from '../service/LocalStorageService';
import HeadingSection from '../components/calendar/inspiration/HeadingSection';
import MessageList from '../components/calendar/inspiration/MessageList';
import PromptForm from '../components/calendar/inspiration/PromptForm';
import Button from '../components/ui/Button/Button';

interface Message {
  prompt: string;
  inspiration: string;
}

const LOCAL_STORAGE_KEY = 'inspirationMessages';

const InspirationPage: React.FC = () => {
  const { t } = useTranslation(['general', 'calendar']);
  useSetTitle(t('general:navigation.inspiration'));

  const [messages, setMessages] = useState<Message[]>(() => {
    const storedMessages = getLocalstorageItem(LOCAL_STORAGE_KEY);
    return storedMessages ? JSON.parse(storedMessages) : [];
  });
  const [isWelcomeVisible, setIsWelcomeVisible] = useState<boolean>(true);

  const { fetchData: getInspiration, loading: isLoading } = useFetch('POST', [
    'prompt',
    'inspiration',
  ]);

  useEffect(() => {
    setLocalstorageItem(LOCAL_STORAGE_KEY, JSON.stringify(messages));
  }, [messages]);

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

  const handleReset = () => {
    setMessages([]);
    removeLocalstorageItem(LOCAL_STORAGE_KEY);
    setIsWelcomeVisible(true);
    toast.info('Conversation reset successfully');
  };

  return (
    <div
      className="d-flex flex-column justify-content-between"
      style={{ height: '80vh' }}
    >
      <HeadingSection />

      <div className="flex-grow-1 d-flex flex-column justify-content-center align-items-center">
        {isWelcomeVisible ? (
          <>
            <InspirationIcon isBig className="mb-xlarge" />
            <span className="heading heading--lg clr-primary-300 mt-4">
              {t('calendar:inspiration.slogan')}
            </span>
          </>
        ) : (
          <MessageList messages={messages} />
        )}
      </div>

      <PromptForm
        onSubmit={handlePromptSubmit}
        isLoading={isLoading}
        onReset={handleReset}
      />
    </div>
  );
};

export default InspirationPage;
