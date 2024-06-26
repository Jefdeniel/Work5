import { useState } from 'react';
import { Form } from 'react-final-form';
import { useTranslation } from 'react-i18next';

import Button from '../../ui/Button/Button';
import Checkbox from '../../ui/Checkbox/Checkbox';

const PermissionBoxes = () => {
  const { t } = useTranslation(['calendar']);

  const [permissions, setPermissions] = useState({
    can_view_event_details: false,
    can_create_events: false,
    can_edit_events: false,
    can_delete_events: false,
    can_invite_others: false,
  });

  const onSubmit = async () => {};

  return (
    <>
      <div className={`input-intro`}>
        <span className={`title mb-1`}>
          {t('calendar:calendar-customize.permissions.title')}
        </span>

        <p className={`w-75 customize-intro`}>
          {t('calendar:calendar-customize.permissions.description')}
        </p>
      </div>

      <div className={`mt-3`}>
        <Form
          initialValues={permissions}
          onSubmit={onSubmit}
          render={({ handleSubmit }) => (
            <form
              onSubmit={handleSubmit}
              className={`d-flex flex-column align-items-start gap-4`}
            >
              <Checkbox
                name="can_view_event_details"
                label={t('calendar:calendar-customize.permissions.can-view')}
              />

              <Checkbox
                name="can_create_events"
                label={t('calendar:calendar-customize.permissions.can-create')}
              />

              <Checkbox
                name="can_edit_events"
                label={t('calendar:calendar-customize.permissions.can-edit')}
              />

              <Checkbox
                name="can_delete_events"
                label={t('calendar:calendar-customize.permissions.can-delete')}
              />

              <Checkbox
                name="can_invite_others"
                label={t('calendar:calendar-customize.permissions.can-invite')}
              />

              <Button
                className={`btn--success mt-2 mb-5`}
                type="submit"
                text={t('calendar:calendar-customize.permissions.save')}
              />
            </form>
          )}
        />
      </div>
    </>
  );
};

export default PermissionBoxes;
