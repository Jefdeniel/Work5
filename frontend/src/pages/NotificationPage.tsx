import React, { useState } from 'react';
import ColorPicker from '../components/agenda/notifications/ColorPicker/ColorPicker';
import CircleWithTitle from '../components/ui/Circle/CircleWithTitle';
import { Col, Row } from 'react-bootstrap';
import { Colors } from '../@types/Colors';

const NotificationPage = () => {
  const [yourColor, setYourColor] = useState<string>(Colors.Primary300);
  const [otherColor, setOtherColor] = useState<string>(Colors.Error300);
  const [yourColorPickerVisible, setYourColorPickerVisible] =
    useState<boolean>(false);
  const [otherColorPickerVisible, setOtherColorPickerVisible] =
    useState<boolean>(false);

  const handleYourColorChange = (color: string) => {
    setYourColor(color);
    setYourColorPickerVisible(false);
  };

  const handleOtherColorChange = (color: string) => {
    setOtherColor(color);
    setOtherColorPickerVisible(false);
  };

  return (
    <>
      <p>Notification Page</p>
      <Row className="align-items-start">
        <Col>
          <CircleWithTitle
            color={yourColor}
            title="Your Color"
            onClick={() => setYourColorPickerVisible(true)}
          />
          {yourColorPickerVisible && (
            <ColorPicker
              color={yourColor}
              title="Select Your Color"
              onChange={handleYourColorChange}
            />
          )}
        </Col>
        <Col>
          <CircleWithTitle
            color={otherColor}
            title="Other Color"
            onClick={() => setOtherColorPickerVisible(true)}
          />
          {otherColorPickerVisible && (
            <ColorPicker
              color={otherColor}
              title="Select Other Color"
              onChange={handleOtherColorChange}
            />
          )}
        </Col>
      </Row>
    </>
  );
};

export default NotificationPage;
