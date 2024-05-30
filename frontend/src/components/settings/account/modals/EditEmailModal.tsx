import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { Field, Form } from 'react-final-form';
import { useCallback, useEffect, useState } from 'react';

import useAuth from '../../../../hooks/useAuth';
import useFetch from '../../../../hooks/useFetch';
import Validators from '../../../../utils/Validators';
import { AccountSettings } from '../../../../@types/Settings';

import Input from '../../../ui/Input/Input';
import Modal from '../../../ui/Modals/Modal';
import Button from '../../../ui/Button/Button';

interface Props {
  onClose: () => void;
}

const EditEmailModal = ({ onClose }: Props) => {
  const { t } = useTranslation(['settings']);
  const { user_id } = useAuth();

  const [initialValues, setInitialValues] = useState<AccountSettings>({
    email: '',
  });

  const { fetchData: fetchAccountSettings } = useFetch('GET', [
    'users',
    user_id,
  ]);
  const { fetchData: updateAccountSettings, loading: isLoading } = useFetch(
    'PATCH',
    ['users', user_id]
  );

  const fetchAccountSettingsMemoized = useCallback(fetchAccountSettings, []);

  useEffect(() => {
    const fetchAccountSettingsData = async () => {
      try {
        const response = await fetchAccountSettingsMemoized();
        const data = await response.json();
        setInitialValues({
          email: data.email,
        });
      } catch (error) {
        console.error(error);
      }
    };
    fetchAccountSettingsData();
  }, [fetchAccountSettingsMemoized]);

  const handleEditEmail = async (values: AccountSettings, form: any) => {
    try {
      const response = await updateAccountSettings(
        {},
        {
          ...values,
          id: user_id,
          email: values.email,
        }
      );

      if (response.ok) {
        toast.success(t('settings:account.emailUpdated'));
        form.reset();
        onClose();
      } else {
        toast.error(t('settings:account.emailNotUpdated'));
        console.error(response);
      }
    } catch (error) {
      toast.error(t('settings:account.emailNotUpdated'));
      console.error(error);
    }
  };

  return (
    <Modal
      title={t('settings:account.editEmail')}
      message={t('settings:account.editEmailDescription')}
      show={true}
      isDanger={false}
      size="lg"
      onClose={onClose}
    >
      <Form
        onSubmit={handleEditEmail}
        initialValues={initialValues}
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <Field name="email" validate={Validators.required()}>
              {({ input, meta }) => (
                <Input
                  {...input}
                  meta={meta}
                  title={t('auth:login.email')}
                  type="email"
                  placeholder={initialValues.email}
                  isBig
                />
              )}
            </Field>

            <div className="d-flex justify-content-end">
              <Button
                className="btn--success mt-2"
                type="submit"
                disabled={isLoading}
              >
                {t('settings:save')}
              </Button>
            </div>
          </form>
        )}
      />
    </Modal>
  );
};

export default EditEmailModal;
