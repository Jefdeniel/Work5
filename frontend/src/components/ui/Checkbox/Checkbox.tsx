import { Field } from 'react-final-form';

import './Checkbox.scss';

interface Props {
  name: string;
  label: string;
}

const Checkbox = ({ name, label }: Props) => (
  <label className={`custom-checkbox`}>
    <Field name={name} component="input" type="checkbox" />

    {label}
  </label>
);

export default Checkbox;
