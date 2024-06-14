import { Field, Form } from 'react-final-form';
import { useTranslation } from 'react-i18next';
import Validators from '../../../utils/Validators';
import Button from '../../ui/Button/Button';
import Icon from '../../ui/Icon/Icon';
import Input from '../../ui/Input/Input';
import ResetButton from './ResetButton';

interface PromptFormProps {
  onSubmit: (values: { prompt: string }) => void;
  onReset: () => void;
  isLoading: boolean;
}

const PromptForm = ({
  onSubmit,
  onReset,
  isLoading,
}: PromptFormProps): JSX.Element => {
  const { t } = useTranslation(['calendar']);

  return (
    <Form
      onSubmit={onSubmit}
      render={({ handleSubmit }) => (
        <form
          onSubmit={handleSubmit}
          className="d-flex align-items-center gap-3 mt-3"
          style={{ height: '50px' }}
        >
          <Field
            name="prompt"
            validate={Validators.compose(Validators.required())}
          >
            {({ input, meta }) => (
              <Input
                {...input}
                meta={meta}
                isBig
                isSearch
                type="text"
                placeholder={t('calendar:inspiration.placeholder')}
                className="flex-grow-1"
              />
            )}
          </Field>

          <ResetButton onClick={onReset} />

          <Button
            className="btn--primary"
            type="submit"
            icon={<Icon src="/icons/send.svg" alt="Send icon" />}
            isLoading={isLoading}
          >
            {t('calendar:inspiration.send')}
          </Button>
        </form>
      )}
    />
  );
};

export default PromptForm;
