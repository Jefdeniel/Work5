import Heading from '../Heading/Heading';
import IconButton from '../IconButton/IconButton';
import { Modal as BootstrapModal, Col } from 'react-bootstrap';

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
    <BootstrapModal
      id="modal"
      show={show}
      onHide={onClose}
      size={size as 'sm' | 'lg' | 'xl'}
      onClick={onClose}
      fullscreen={fullscreen ? fullscreen : undefined}
    >
      <BootstrapModal.Header className="mt-2 py-3 px-4">
        <Col>
          <Heading level={3} className={isDanger ? 'text-red-500' : ''}>
            {title}
            {subtitle && <Heading level={6}>{subtitle}</Heading>}
          </Heading>
          <div className="text-end pe-1 text-muted">
            <IconButton icon={ICON} onClick={onClose}></IconButton>
          </div>
        </Col>
      </BootstrapModal.Header>

      <div className="p-4">
        {message && <p>{message}</p>}
        {children}
      </div>
    </BootstrapModal>
  );
};

export default Modal;
