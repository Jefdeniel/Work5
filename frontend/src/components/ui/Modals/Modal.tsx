import Heading from '../Heading/Heading';
import IconButton from '../IconButton/IconButton';

interface Props {
  title?: string;
  subtitle?: string;
  show: boolean;
  onClose: () => void;
  message?: string;
  size?: 's' | 'sm' | 'lg' | 'xl';
  fullscreen?: boolean;
  isDanger?: boolean;
  children: React.ReactNode;
}

// WORK IN PROGRESS
const Modal = ({
  show,
  onClose,
  title,
  subtitle,
  message,
  size = 'sm',
  fullscreen = false,
  isDanger = false,
  children,
}: Props) => {
  if (!show) return null;

  const MODAL_SIZE =
    size === 's'
      ? 'w-2/12'
      : size === 'sm'
        ? 'w-4/12'
        : size === 'lg'
          ? 'w-6/12'
          : size === 'xl'
            ? 'w-8/12'
            : 'w-4/12';

  const ICON = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6"
      fill={isDanger ? 'red' : 'none'}
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  );

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-opacity"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`relative bg-white rounded-lg shadow-lg ${MODAL_SIZE} ${fullscreen ? 'w-screen h-screen' : ''}`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div>
            <Heading level={3} className={isDanger ? 'text-red-500' : ''}>
              {title}
            </Heading>
            {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
          </div>
          <IconButton icon={ICON} onClick={onClose}></IconButton>
        </div>
        <div className="p-4">
          {message && <p className="text-sm mb-3 text-gray-500">{message}</p>}
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
