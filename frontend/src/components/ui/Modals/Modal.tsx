import { Modal as BootstrapModal, Col } from 'react-bootstrap';
import Heading from '../Heading/Heading';

import IconButton from '../IconButton/IconButton';

import './Modal.scss';

interface Props {
  title?: string;
  subtitle?: string;
  show: boolean;
  onClose: () => void;
  message?: string;
  size?: 'sm' | 'lg' | 'xl';
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

  return (
    <BootstrapModal
      id="modal"
      className={`modal`}
      show={show}
      onHide={onClose}
      size={size as 'sm' | 'lg' | 'xl'}
      fullscreen={fullscreen ? fullscreen : undefined}
    >
      <BootstrapModal.Header className="modal__heading">
        <IconButton
          className={`modal__close-btn`}
          icon={<img src="/icons/plus-dark.svg" alt="Close icon" />}
          onClick={onClose}
        />

        <Col>
          <Heading level={3} className={isDanger ? 'text-red-500' : ''}>
            {title}
          </Heading>

          {subtitle && <Heading level={6}>{subtitle}</Heading>}
        </Col>
      </BootstrapModal.Header>

      <div className="modal__body">
        {message && <p>{message}</p>}
        {children}
      </div>
    </BootstrapModal>
  );
};

export default Modal;
