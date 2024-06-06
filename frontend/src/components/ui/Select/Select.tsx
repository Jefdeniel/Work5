import { FieldMetaState } from 'react-final-form';
import { useTranslation } from 'react-i18next';

import ErrorText from '../ErrorText/ErrorText';

import './Select.scss';

interface Props {
  options: {
    title: string;
    value: string | boolean | number;
  }[];
  title?: string;
  meta?: FieldMetaState<any>;
  [x: string]: any;
  value?: string | boolean | number | null;
}

const Select = ({ options, meta, value, title, ...rest }: Props) => {
  const { t } = useTranslation(['general']);
  const isNotValid = meta?.error?.[0] && meta.touched;

  return (
    <label>
      <span className="title">{title}</span>

      <select
        className={`form-control m-2 ${isNotValid ? 'is-invalid' : ''}`}
        value={value as string | number | readonly string[]}
        {...rest}
      >
        {options?.map((option) => (
          <option key={option.value.toString()} value={option.value.toString()}>
            {option.title}
          </option>
        ))}
      </select>

      {isNotValid && (
        <ErrorText>
          {t(`general:fields.validators.${meta.error[0]}`, {
            value: meta.error[1],
          })}
        </ErrorText>
      )}
    </label>
  );
};

export default Select;
