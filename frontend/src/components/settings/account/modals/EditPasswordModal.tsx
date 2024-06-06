import { Field, Form } from 'react-final-form';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import { AccountSettings } from '../../../../@types/Settings';
import useAuth from '../../../../hooks/useAuth';
import useFetch from '../../../../hooks/useFetch';
import Validators from '../../../../utils/Validators';

import Button from '../../../ui/Button/Button';
import Input from '../../../ui/Input/Input';
import Modal from '../../../ui/Modals/Modal';

interface Props {
  onClose: () => void;
}

const EditPasswordModal = ({ onClose }: Props) => {
  const { t } = useTranslation(['settings']);
  const { user_id } = useAuth();

  const { fetchData: updateAccountSettings, loading: isLoading } = useFetch(
    'PATCH',
    ['users', user_id ? user_id.toString() : '']
  );

  const handleEditPassword = async (values: AccountSettings, form: any) => {
    try {
      const response = await updateAccountSettings(
        {},
        {
          ...values,
          id: user_id,
          password: values.password,
        }
      );

      if (response.ok) {
        toast.success(t('settings:account.passwordUpdated'));
        form.reset();
        onClose();
      } else {
        toast.error(t('settings:account.passwordNotUpdated'));
        console.error(response);
      }
    } catch (error) {
      toast.error(t('settings:account.passwordNotUpdated'));
      console.error(error);
    }
  };

  return (
    <Modal
      title={t('settings:account.editPassword')}
      message={t('settings:account.editPasswordDescription')}
      show={true}
      isDanger={false}
      size="lg"
      onClose={onClose}
    >
      <Form
        onSubmit={handleEditPassword}
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <Field name="password" validate={Validators.password()}>
              {({ input, meta }) => (
                <Input
                  {...input}
                  meta={meta}
                  title={t('auth:login.password')}
                  type="password"
                  placeholder="*************"
                  isBig
                />
              )}
            </Field>

            <div className="d-flex justify-content-end">
              <Button
                className="btn--danger mt-2"
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

export default EditPasswordModal;
