import './Switch.scss';

interface Props {
  checked: boolean;
  onChange: (value: boolean) => void;
}

const Switch = ({ checked, onChange }: Props) => {
  const handleChange = () => {
    onChange(!checked);
  };

  return (
    <div className="switch d-flex flex-row align-items-center justify-content-end">
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
    </div>
  );
};

export default Switch;
