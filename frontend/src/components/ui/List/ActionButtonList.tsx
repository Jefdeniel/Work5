import { Col } from 'react-bootstrap';
import Button from '../Button/Button';
import { ActionItem } from '../../../constants/profile';

interface Props {
  items: ActionItem[];
  className?: string;
  functionMap: Record<string, () => void>;
}

const ActionButtonList = ({ items, className, functionMap }: Props) => {
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
            onClick={functionMap[item.onClick]} // Use functionMap to resolve function
          />
        </Col>
      ))}
    </>
  );
};

export default ActionButtonList;
