import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import HeadingSection from '../components/calendar/inspiration/HeadingSection';
import MessageList from '../components/calendar/inspiration/MessageList';
import PromptForm from '../components/calendar/inspiration/PromptForm';
import { InspirationIcon } from '../components/ui/Icon/SvgIcons';
import { PRE_PROMPT } from '../constants/pre-prompt';
import useSetTitle from '../hooks/setTitle';
import useFetch from '../hooks/useFetch';
import {
  getLocalstorageItem,
  removeLocalstorageItem,
  setLocalstorageItem,
} from '../service/LocalStorageService';

interface Message {
  prompt: string;
  inspiration: string;
}

const LOCAL_STORAGE_KEY = 'inspirationMessages';

const formatCalendarDataToJson = (data) => {
  if (!data) {
    return '[]';
  }
  return JSON.stringify(data, null, 2);
};

const InspirationPage = () => {
  const { t } = useTranslation(['general', 'calendar']);
  useSetTitle(t('general:navigation.inspiration'));
  const calendarId = useParams<{ id: string }>().id ?? '';

  const [isWelcomeVisible, setIsWelcomeVisible] = useState<boolean>(true);
  const [currentCalendarData, setCurrentCalendarData] = useState<any[]>([]);
  const [messages, setMessages] = useState<Message[]>(() => {
    const storedMessages = getLocalstorageItem(LOCAL_STORAGE_KEY);
    return storedMessages ? JSON.parse(storedMessages) : [];
  });

  const { fetchData: getInspiration, loading: isLoading } = useFetch('POST', [
    'prompt',
    'inspiration',
  ]);

  const { fetchData: getCalendarData } = useFetch('GET', [
    'events',
    'calendar',
    calendarId?.toString(),
  ]);

  useEffect(() => {
    const fetchCalendarData = async () => {
      try {
        const response = await getCalendarData();
        if (response.ok) {
          const data = await response.json();
          setCurrentCalendarData(data);
          console.log('Calendar data:', data);
        } else {
          throw new Error(response.statusText);
        }
      } catch (error) {
        console.error('Error fetching calendar data:', error);
      }
    };
    fetchCalendarData();
  }, []);

  useEffect(() => {
    setLocalstorageItem(LOCAL_STORAGE_KEY, JSON.stringify(messages));
  }, [messages]);

  const handlePromptSubmit = async (values: { prompt: string }) => {
    try {
      const calendarDataJson = formatCalendarDataToJson(currentCalendarData);
      console.log('Prompt:', values.prompt);
      const fullPrompt = `${PRE_PROMPT}\n\n${values.prompt}\n\nHere is my current calendar data:\n${calendarDataJson}`;
      console.log('Full prompt:', fullPrompt);

      const response = await getInspiration({}, { prompt: fullPrompt });
      if (response.ok) {
        const data = await response.json();
        setMessages((prevMessages) => [
          ...prevMessages,
          { prompt: fullPrompt, inspiration: data.message },
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
