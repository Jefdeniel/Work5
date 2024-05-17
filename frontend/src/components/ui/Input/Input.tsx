import React from 'react';
import { FieldMetaState } from 'react-final-form';
import { useTranslation } from 'react-i18next';
import ErrorText from '../ErrorText/ErrorText';
import './Input.scss';

interface Props {
  title?: string;
  meta?: FieldMetaState<any>;
  isTextArea?: boolean;
  disableSpacing?: boolean;
  disableErrorText?: boolean;
  value?: string;
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
  value,
  isSmall,
  disabled,
  onChange,
  icon,
  ...rest
}: Props) => {
  const { t } = useTranslation(['general']);
  const isNotValid = meta?.error?.[0] && meta.touched;
  const [isFocused, setIsFocused] = React.useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleLoseFocus = () => {
    setIsFocused(false);
  };

  return (
    <div
      className={`full-input ${disableSpacing ? '' : 'my-sm'} ${isFocused ? 'input--focused' : ''}`}
    >
      {title && (
        <label className={`title ${isFocused ? 'small-text' : ''}`}>
          {title}
        </label>
      )}

      <div className="input-with-icon">
        {!isTextArea ? (
          <input
            className={`form-control ${isNotValid ? 'is-invalid' : ''} ${
              isSmall ? 'small' : ''
            } ${disabled ? 'disabled' : ''}`}
            value={value} // Use value instead of defaultValue
            disabled={disabled}
            onFocus={handleFocus}
            onBlur={handleLoseFocus}
            onChange={onChange}
            {...rest}
          />
        ) : (
          <textarea
            className={`form-control textarea ${isNotValid ? 'is-invalid' : ''} ${
              isSmall ? 'small' : ''
            } ${disabled ? 'disabled' : ''}`}
            value={value} // Use value instead of defaultValue
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
