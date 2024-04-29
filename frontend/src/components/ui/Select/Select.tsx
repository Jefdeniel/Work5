import { Col, Row } from 'react-bootstrap';
import { FieldMetaState } from 'react-final-form';
import { useTranslation } from 'react-i18next';
import ErrorText from '../ErrorText/ErrorText';
import './Select.scss';

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
    <label>
      <Row>
        <Col>
          <Row className="d-flex flex-row align-items-center">
            <span className="title">{title}</span>
          </Row>
          <Row className="d-flex flex-row align-items-center">
            <small className="description">{description}</small>
          </Row>
        </Col>
        <Col sm={12} md={6} className="d-flex flex-col">
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
        </Col>
      </Row>
    </label>
  );
};

export default Select;
