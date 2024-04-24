class Validators {
  static compose =
    (...validators: any) =>
    (value: any) =>
      validators.reduce(
        (error: any, validator: any) => error || validator(value),
        undefined
      );

  static required = () => {
    return (input: any) => {
      return input && input.length > 0 ? undefined : ['required', null];
    };
  };

  static maxLength = (amount: any) => {
    return (input: any) => {
      return !input || (input && input.length <= amount)
        ? undefined
        : ['maxLength', amount];
    };
  };

  static minLength = (amount: any) => {
    return (input: any) => {
      return input && input.length >= amount
        ? undefined
        : ['minLength', amount];
    };
  };

  static maxValue = (amount: any) => {
    return (input: any) => {
      return input && input <= amount ? undefined : ['maxValue', amount];
    };
  };

  static minValue = (amount: any) => {
    return (input: any) => {
      return input && input >= amount ? undefined : ['minValue', amount];
    };
  };

  static number = () => {
    return (input: any) => {
      const re = /^[0-9]*$/;
      return !input || (input && re.test(input)) ? undefined : ['number', null];
    };
  };

  static email = () => {
    return (input: any) => {
      const re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return !input || (input && re.test(input)) ? undefined : ['email', null];
    };
  };

  static telephone = () => {
    return (input: any) => {
      const re = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/;
      return !input || (input && re.test(input))
        ? undefined
        : ['telephone', null];
    };
  };

  static date = (dateFormat: string) => {
    const getRegexPattern = (dateFormat: string) => {
      const dateFormats: Record<string, string> = {
        'dd/MM/yyyy': '^(0[1-9]|[12]\\d|3[01])/(0[1-9]|1[0-2])/\\d{4}$',
        'MM/dd/yyyy': '^(0[1-9]|1[0-2])/(0[1-9]|[12]\\d|3[01])/\\d{4}$',
      };

      return dateFormats[dateFormat] || '';
    };

    const regexPattern = getRegexPattern(dateFormat);

    return (input: string) => {
      const re = new RegExp(regexPattern, 'g');
      return !input || (input && re.test(input)) ? undefined : ['date', null];
    };
  };

  static colorCode = () => {
    return (input: any) => {
      const re = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
      return !input || (input && re.test(input))
        ? undefined
        : ['colorCode', null];
    };
  };

  static devicePattern = (pattern: any) => {
    return (input: any) => {
      const re = /^(\d{5}-\d[a-zA-Z])?$/;
      return !input || (input && re.test(input))
        ? undefined
        : ['devicePattern', pattern];
    };
  };

  static matchesField = (fieldName: string, errorMessage: string) => {
    return (value: any, allValues: any) => {
      const fieldValueToMatch = allValues[fieldName];
      return value === fieldValueToMatch ? undefined : errorMessage;
    };
  };

  static checkCurrentPassword = (password: string, errorMessage: string) => {
    return (input: any) => {
      return input === password ? undefined : [errorMessage, null];
    };
  };

  static password = () => {
    return (input: string) => {
      // Regex for each requirement
      const minLengthRegex = /^.{8,}$/;
      const numberRegex = /^(?=.*[0-9])/;
      const uppercaseRegex = /^(?=.*[A-Z])/;
      const specialCharRegex = /^(?=.*[!@#$%^&*])/;

      // Check each requirement
      const hasMinLength = minLengthRegex.test(input);
      const hasNumber = numberRegex.test(input);
      const hasUppercase = uppercaseRegex.test(input);
      const hasSpecialChar = specialCharRegex.test(input);

      // If all requirements are met, return undefined (no error)
      if (hasMinLength && hasNumber && hasUppercase && hasSpecialChar) {
        return undefined;
      } else {
        return ['password', null];
      }
    };
  };
}

export default Validators;
