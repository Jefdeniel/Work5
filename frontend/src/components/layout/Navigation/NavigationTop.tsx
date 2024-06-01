import IconButton from '../../ui/IconButton/IconButton';
import ProfileButton from '../../ui/ProfileButton/ProfileButton';

interface Props {
  title?: string;
  onMenuClose: () => void;
}

const NavigationTop = ({ title, onMenuClose }: Props) => {
  return (
    <div className="sidebar-toggler d-flex justify-content-between align-items-center">
      <IconButton
        onClick={onMenuClose}
        icon={
          <svg
            width="16"
            height="14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.47 0C.66 0 0 .663 0 1.49c0 .828.66 1.491 1.47 1.491h13.06c.81 0 1.47-.663 1.47-1.49C16 .663 15.34 0 14.53 0H1.47ZM1.47 5.51C.66 5.51 0 6.172 0 7s.66 1.49 1.47 1.49h13.06C15.34 8.49 16 7.828 16 7s-.66-1.49-1.47-1.49H1.47ZM14.53 14c.81 0 1.47-.663 1.47-1.49 0-.828-.66-1.492-1.47-1.492H1.47c-.81 0-1.47.664-1.47 1.491C0 13.337.66 14 1.47 14h13.06Z"
              fill="#FCFCFC"
            />
          </svg>
        }
        filled={true}
      />

      {title && <h1 className="text-left p-0">{title}</h1>}

      <ProfileButton />
    </div>
  );
};

export default NavigationTop;
