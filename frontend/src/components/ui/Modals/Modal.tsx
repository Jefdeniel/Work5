interface Props {
  show: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
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

  const modalSize =
    size === 's'
      ? 'w-96'
      : size === 'sm'
        ? 'w-128'
        : size === 'lg'
          ? 'w-192'
          : size === 'xl'
            ? 'w-256'
            : 'w-128';

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-opacity"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`relative bg-white rounded-lg shadow-lg ${modalSize} ${fullscreen ? 'w-screen h-screen' : ''}`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div>
            <h3 className="text-lg font-semibold">{title}</h3>
            {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
          </div>
          <button onClick={onClose} className="text-gray-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
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
          </button>
        </div>
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
