import React from 'react';
import { useTranslation } from 'react-i18next';
import { FieldMetaState } from 'react-final-form';
import ErrorText from '../ErrorText/ErrorText';
import './Input.css';

interface Props {
  title?: string;
  meta?: FieldMetaState<any>;
  isTextArea?: boolean;
  disableSpacing?: boolean;
  disableErrorText?: boolean;
  defaultValue?: string;
  isSmall?: boolean;
  disabled?: boolean;
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  icon?: React.ReactNode;
  [x: string]: any;
}

const Input = ({
  title,
  meta,
  isTextArea,
  disableSpacing,
  disableErrorText,
  defaultValue,
  isSmall,
  disabled,
  onChange,
  icon,
  ...rest
}: Props) => {
  const { t } = useTranslation(['general']);
  const isNotValid = meta?.error?.[0] && meta.touched;

  return (
    <div className={disableSpacing ? '' : 'my-1'}>
      {title && (
        <label>
          <span className="title">{title}</span>
        </label>
      )}

      <div className="input-with-icon">
        {!isTextArea ? (
          <input
            className={`form-control ${isNotValid ? 'is-invalid' : ''} ${
              isSmall ? 'small' : ''
            } ${disabled ? 'disabled' : ''}`}
            value={defaultValue}
            placeholder={defaultValue}
            disabled={disabled}
            onChange={onChange}
            {...rest}
          />
        ) : (
          <textarea
            className={`form-control textarea ${isNotValid ? 'is-invalid' : ''} ${
              isSmall ? 'small' : ''
            } ${disabled ? 'disabled' : ''}`}
            value={defaultValue}
            placeholder={defaultValue}
            onChange={onChange}
            {...rest}
          />
        )}

        {/* Conditional rendering of icon */}
        {icon && <div className="input-icon">{icon}</div>}
      </div>

      {isNotValid && !disableErrorText && (
        <ErrorText>
          {t(`general:fields.validators.${meta.error[0]}`, {
            value: meta.error[1],
          })}
        </ErrorText>
      )}
    </div>
  );
};

export default Input;
