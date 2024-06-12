import Button from '../Button/Button';
import { ActionItem } from '../../../constants/profile';

interface Props {
  items: ActionItem[];
  className?: string;
  functionMap: Record<string, () => void>;
}

const ActionButtonList = ({ items, className, functionMap }: Props) => {
  return (
    <ul className={`d-flex flex-wrap gap-3`}>
      {items.map((item, index) => (
        <li key={index}>
          <Button
            className={`${className}`}
            text={item.label}
            icon={
              item.iconSrc ? (
                <img src={item.iconSrc} alt={item.label} />
              ) : undefined
            }
            onClick={functionMap[item.onClick]} // Use functionMap to resolve function
          />
        </li>
      ))}
    </ul>
  );
};

export default ActionButtonList;
