import { ToolbarProps } from 'react-big-calendar';
import Button from '../../ui/Button/Button';

export interface ICustomToolbarProps {
  toolbar: ToolbarProps;
}

const CustomToolbar = ({ toolbar }: ICustomToolbarProps) => {
  const goToBack = () => {
    toolbar.date.setMonth(toolbar.date.getMonth() - 1);
    toolbar.onNavigate('PREV');
  };

  const goToNext = () => {
    toolbar.date.setMonth(toolbar.date.getMonth() + 1);
    toolbar.onNavigate('NEXT');
  };

  return (
    <div className="rbc-toolbar">
      <Button
        className="btn btn--bordered-primary"
        onClick={goToBack}
        style={{ marginRight: '5px' }}
        text="Previous"
      />
      <Button
        className="btn btn--bordered-primary"
        onClick={goToNext}
        style={{ marginRight: '5px' }}
        text="Next"
      />
    </div>
  );
};

export default CustomToolbar;
