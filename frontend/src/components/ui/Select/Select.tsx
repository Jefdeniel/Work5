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
  meta?: FieldMetaState<any>;
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
    <div>
      <Row className="full-select d-flex flex-row gap-2">
        <Col>
          <Row className="d-flex flex-row align-items-center">
            <span className="title">{title}</span>
          </Row>
          <Row className="d-flex flex-row align-items-center">
            <small className="description">{description}</small>
          </Row>
        </Col>
        <Col sm={12} md={6} className="d-flex flex-col justify-content-end p-0">
          <select
            className={`form-control m-2 ${isNotValid ? 'is-invalid' : ''}`}
            {...rest}
          >
            {options?.map((option) => (
              <option
                key={option.title}
                value={option.value}
                // selected={defaultValue === option.value}
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
    </div>
  );
};

export default Select;
