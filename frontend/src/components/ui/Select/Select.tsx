import { useTranslation } from 'react-i18next';
import { FieldMetaState } from 'react-final-form';
import ErrorText from '../ErrorText/ErrorText';
import './Select.css';
import Row from '../Flex/Row';
import Col from '../Flex/Col';

interface Props {
  title?: string;
  description?: string;
  options: {
    title: string;
    value: string;
  }[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  meta?: FieldMetaState<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [x: string]: any;
  defaultValue?: string | boolean | Object;
}

const Select = ({
  title,
  description,
  options,
  meta,
  defaultValue,
  ...rest
}: Props) => {
  const { t } = useTranslation(['general']);
  const isNotValid = meta?.error?.[0] && meta.touched;

  return (
    <Row justifyContent="between">
      <Col>
        <span className="title">{title}</span>
        <small className="description">{description}</small>
      </Col>
      <label>
        <select
          className={`form-select mb-2 my-1 ${isNotValid ? 'is-invalid' : ''}`}
          {...rest}
        >
          {options?.map((option) => (
            <option
              key={option.title}
              value={option.value}
              selected={defaultValue === option.value}
            >
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
    </Row>
  );
};

export default Select;
