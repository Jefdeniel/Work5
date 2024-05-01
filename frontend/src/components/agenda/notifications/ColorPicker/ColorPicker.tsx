import { Row, Col } from 'react-bootstrap';
import './ColorPicker.scss';
import { TwitterPicker, ColorResult } from 'react-color';

interface ColorPickerProps {
  color?: string;
  title: string;
  onChange?: (color: string) => void;
}

const ColorPicker = ({ color, title, onChange }: ColorPickerProps) => {
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
