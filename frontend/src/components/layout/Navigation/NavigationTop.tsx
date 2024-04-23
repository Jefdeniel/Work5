import IconButton from '../../ui/IconButton/IconButton';

interface Props {
  title?: string;
  onMenuClose: () => void;
}

const NavigationTop = ({ title, onMenuClose }: Props) => {
  return (
    <div className="d-flex flex-col justify-content-between align-items-center justify-content-center">
      <IconButton
        onClick={onMenuClose}
        icon={<img src="/icons/menu.svg" alt="menu" />}
      />
      {title && <h1 className="text-center m-0 p-0">{title}</h1>}
      <div></div>
    </div>
  );
};

export default NavigationTop;
