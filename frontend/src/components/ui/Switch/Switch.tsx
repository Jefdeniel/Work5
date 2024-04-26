import Col from '../Flex/Col';
import Row from '../Flex/Row';
import './Switch.css';
interface Props {
  title?: string;
  description?: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}

const Switch = ({ title, description, checked, onChange }: Props) => {
  const handleChange = () => {
    onChange(!checked);
  };

  return (
    <>
      <Row justifyContent="between">
        <Col>
          <span className="title">{title}</span>
          <small className="description">{description}</small>
        </Col>
        <Col>
          <label className="switch-label">
            <input
              id="switch"
              type="checkbox"
              className="peer sr-only"
              checked={checked}
              onChange={handleChange}
            />
            <span className="switch-slider"></span>
          </label>
        </Col>
      </Row>
    </>
  );
};

export default Switch;
