import { Col, Row } from 'react-bootstrap';
import { ColorResult, TwitterPicker } from 'react-color';
import './ColorPicker.scss';

interface ColorPickerProps {
  color?: string;
  title?: string;
  onChange?: (color: string) => void;
}

const ColorPicker = ({ color, onChange }: ColorPickerProps) => {
  const handleColorChange = (colorResult: ColorResult) => {
    const selectedColor = colorResult.hex;
    if (onChange) {
      onChange(selectedColor);
    }
  };

  return (
    <Row className="align-items-center">
      <Col xs="auto">
        <TwitterPicker color={color} onChange={handleColorChange} />
      </Col>
    </Row>
  );
};

export default ColorPicker;
