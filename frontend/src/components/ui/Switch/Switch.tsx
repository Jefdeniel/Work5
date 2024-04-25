import React from 'react';
import Col from '../Flex/Col';
import Row from '../Flex/Row';

interface Props {
  title?: string;
  description?: string;
  checked: boolean;
  onChange: (value: boolean) => void;
  isRound?: boolean;
}

const Switch: React.FC<Props> = ({
  title,
  description,
  checked,
  onChange,
  isRound,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.checked);
  };

  return (
    <>
      <Row justifyContent="between">
        <Col>
          <span className="title">{title}</span>
          <small className="description">{description}</small>
        </Col>
        <Col>
          <label className="relative inline-flex cursor-pointer items-center">
            <input
              id="switch"
              type="checkbox"
              className="peer sr-only"
              checked={checked}
              onChange={handleChange}
            />
            <label htmlFor="switch" className="hidden">
              {title}
            </label>
            <div className="peer h-6 w-11 rounded-full border bg-slate-200 after:absolute after:left-[2px] after:top-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-slate-800 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:ring-green-300"></div>
          </label>
        </Col>
      </Row>
    </>
  );
};

export default Switch;
