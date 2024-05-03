import { Col, Row } from 'react-bootstrap';
import './Switch.scss';

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
    <Row className="d-flex flex-row justify-content-between ">
      <Col>
        <Row>
          <Col className="d-flex flex-row align-items-center">
            <span className="title">{title}</span>
          </Col>
        </Row>
        <Row>
          <Col className="d-flex flex-row align-items-center">
            <small className="description">{description}</small>
          </Col>
        </Row>
      </Col>
      <Col className="d-flex flex-row align-items-center justify-content-end">
        <label className="switch-label">
          <input
            id="switch"
            type="checkbox"
            className="form-control"
            checked={checked}
            onChange={handleChange}
          />
          <div className="switch-slider"></div>
        </label>
      </Col>
    </Row>
  );
};

export default Switch;
