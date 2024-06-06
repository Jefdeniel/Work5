import { useState } from 'react';
import { Row } from 'react-bootstrap';
import { Form } from 'react-final-form';
import { useTranslation } from 'react-i18next';

import Checkbox from '../../ui/Checkbox/Checkbox';
import Button from '../../ui/Button/Button';

const PermissionBoxes = () => {
  const { t } = useTranslation(['calendar']);

  // State
  // const [permissions, setPermissions] = useState({
  //   can_view_event_details: false,
  //   can_create_events: false,
  //   can_edit_events: false,
  //   can_delete_events: false,
  //   can_invite_others: false,
  // });

  // TODO: Fetch existing permissions for this agenda and user -> setPermissions

  // const onSubmit = async () => {};

  return (
    <Row className={`mt-4`}>
      <div className={`input-intro`}>
        <span className={`title mb-1`}>
          {t('calendar:calendar-customize.permissions.title')}
        </span>

        <p className={`w-75`}>
          {t('calendar:calendar-customize.permissions.description')}
        </p>
      </div>

      <div className={`mt-3`}>
        {/* <Form
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
        /> */}
      </div>
    </Row>
  );
};

export default PermissionBoxes;
