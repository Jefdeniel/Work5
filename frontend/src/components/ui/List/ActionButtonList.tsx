import { Col } from 'react-bootstrap';
import Button from '../Button/Button';

interface ActionItem {
  onClick: () => void;
  iconSrc?: string;
  label: string;
}

interface Props {
  items: ActionItem[];
  className?: string;
}

const ActionButtonList = ({ items, className }: Props) => {
  return (
    <>
      {items.map((item, index) => (
        <Col xs="auto" key={index}>
          <Button
            className={`${className} mt-2`}
            text={item.label}
            icon={
              item.iconSrc ? (
                <img src={item.iconSrc} alt={item.label} />
              ) : undefined
            }
            onClick={item.onClick}
          />
        </Col>
      ))}
    </>
  );
};

export default ActionButtonList;
