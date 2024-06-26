import React from 'react';
import { FieldMetaState } from 'react-final-form';
import { useTranslation } from 'react-i18next';
import { useSettings } from '../../../hooks/useSettings';
import ErrorText from '../ErrorText/ErrorText';

import './Input.scss';

interface Props {
  className?: string;
  title?: string;
  meta?: FieldMetaState<any>;
  isTextArea?: boolean;
  disableSpacing?: boolean;
  disableErrorText?: boolean;
  defaultValue?: string;
  placeholder?: string;
  isSmall?: boolean;
  isBig?: boolean;
  isSearch?: boolean;
  disabled?: boolean;
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  icon?: React.ReactNode;
  [x: string]: any;
}

const Input = ({
  className,
  title,
  meta,
  isTextArea,
  disableSpacing,
  disableErrorText,
  defaultValue,
  placeholder,
  isSmall,
  isBig,
  isSearch,
  disabled,
  onChange,
  icon,
  ...rest
}: Props) => {
  const { t } = useTranslation(['general']);
  const isNotValid = meta?.error?.[0] && meta.touched;
  const [isFocused, setIsFocused] = React.useState(false);
  const { theme } = useSettings();

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleLoseFocus = () => {
    setIsFocused(false);
  };

  return (
    <div
      className={`full-input ${disableSpacing ? '' : 'my-sm'} ${isFocused ? 'input--focused' : ''} ${className}`}
    >
      {title && (
        <label className={`title ${isFocused ? 'small-text' : ''}`}>
          {title}
        </label>
      )}

      <div className={`input-with-icon ${isSearch ? 'search-bar' : ''}`}>
        {!isTextArea ? (
          <input
            className={`form-control 
            ${theme === 'dark' ? 'clr-bright' : ''}
            ${isNotValid ? 'is-invalid' : ''} 
            ${isSmall ? 'small' : ''} 
            ${disabled ? 'disabled' : ''}
            ${isSearch ? 'search-bar__input' : ''}
            ${isBig ? 'w-100' : ''}`}
            value={defaultValue}
            placeholder={placeholder || defaultValue}
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
            value={defaultValue}
            placeholder={placeholder || defaultValue}
            disabled={disabled}
            onFocus={handleFocus}
            onBlur={handleLoseFocus}
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
