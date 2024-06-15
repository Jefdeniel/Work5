import { useTranslation } from 'react-i18next';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface Message {
  prompt: string;
  inspiration: string;
}

interface MessageListProps {
  messages: Message[];
}

const MessageList = ({ messages }: MessageListProps) => {
  const { t } = useTranslation(['calendar']);

  return (
    <div
      className="w-100 overflow-auto"
      style={{ flexGrow: 1, maxHeight: '60vh' }}
    >
      {messages.map((message, index) => (
        <div key={index}>
          <div className="ml-3">
            <strong>{t('calendar:inspiration.response')}:</strong>
            <Markdown remarkPlugins={[remarkGfm]}>
              {message.inspiration}
            </Markdown>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessageList;
