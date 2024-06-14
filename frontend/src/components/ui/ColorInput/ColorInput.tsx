import './ColorInput.scss';

interface Props {
  className?: string;
  label?: string;
  name: string;
  value?: string;
  defaultValue?: string;
  onChange: (value: string) => void;
}

const ColorInput = ({
  className,
  label,
  name,
  value,
  defaultValue,
  onChange,
}: Props) => {
  return (
    <label className={className}>
      <input
        className="input"
        type="color"
        name={name}
        value={value}
        defaultValue={defaultValue}
        onChange={(e) => onChange(e.target.value)}
      />

      {label && <span>{label}</span>}
    </label>
  );
};

export default ColorInput;
