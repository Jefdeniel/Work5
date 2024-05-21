import './Switch.scss';

interface Props {
  checked: boolean;
  onChange: (value: boolean) => void;
  [x: string]: any;
}

const Switch = ({ checked, onChange, ...rest }: Props) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.checked);
    console.log(event.target.checked);
  };

  return (
    <div className="switch d-flex flex-row align-items-center justify-content-end">
      <label className="switch-label">
        <input
          id="switch"
          className="form-control"
          type="checkbox"
          checked={checked}
          onChange={handleChange}
          {...rest}
        />
        <div className="switch-slider"></div>
      </label>
    </div>
  );
};

export default Switch;
