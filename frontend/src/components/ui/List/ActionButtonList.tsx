import { Col } from 'react-bootstrap';
import Button from '../Button/Button';

interface ActionItem {
  onClick: () => void;
  iconSrc?: string;
  label: string;
}

interface Props {
  items: ActionItem[];
  isOutline?: boolean;
}

const ActionButtonList = ({ items, isOutline }: Props) => {
  return (
    <>
      {items.map((item, index) => (
        <Col xs="auto" key={index}>
          <Button
            className="btn--primary mt-2"
            text={item.label}
            icon={
              item.iconSrc ? (
                <img src={item.iconSrc} alt={item.label} />
              ) : undefined
            }
            isOutline={isOutline}
            onClick={item.onClick}
          />
        </Col>
      ))}
    </>
  );
};

export default ActionButtonList;
