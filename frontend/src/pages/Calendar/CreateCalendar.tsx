import Heading from '../../components/ui/Heading/Heading';
import Input from '../../components/ui/Input/Input';
import useSetTitle from '../../hooks/setTitle';
import Icon from '../../components/ui/Icon/Icon';
import Button from '../../components/ui/Button/Button';
import { useTranslation } from 'react-i18next';

const CreateCalendar = () => {
  const { t } = useTranslation(['calendar']);
  useSetTitle(t('calendar-create.title'));

  return (
    <div>
      <Heading
        level={1}
        title=""
        className={`heading--lg clr-primary mb-base`}
      />

      <form action="#" className={`d-flex flex-column align-items-start gap-5`}>
        <section>
          <Heading
            level={2}
            children={t('calendar-create.general')}
            className={`heading--sm clr-primary-400 mb-small-neg`}
          />

          <Input title={t('calendar-create.name-input')} />

          <Input
            isBig
            title={t('calendar-create.description-input')}
            className={`mb-large`}
          />

          <div className={`d-flex align-items-center gap-3`}>
            <Icon src="/icons/add-image.svg" alt="Add image icon" />

            <Button
              className="btn--primary"
              text={t('calendar-create.change-img-btn')}
            />
          </div>
        </section>

        <section>
          <Heading
            level={2}
            children={t('calendar-create.people')}
            className={`heading--sm clr-primary-400 mb-small`}
          />

          <span className={`mb-base`}>
            {t('calendar-create.people-description')}
          </span>

          <div className={`d-flex align-items-center gap-3`}>
            <Icon src="/icons/add-image.svg" alt="Add image icon" />

            <Button
              className="btn--primary"
              icon={<Icon src="/icons/plus.svg " alt="" />}
              text={t('calendar-create.invite-btn')}
            />
          </div>
        </section>

        <section>
          <Heading
            level={2}
            children={t('calendar-create.date-range')}
            className={`heading--sm clr-primary-400 mb-small`}
          />

          <span className={`mb-base`}>
            {t('calendar-create.date-range-description')}
          </span>

          {/* Need to be fixed */}
          <div className={`d-flex align-items-center gap-3`}>
            <Input
              defaultValue={t('calendar-create.no')}
              type="radio"
              className={`form-radio`}
            />
            <Input
              defaultValue={t('calendar-create.yes')}
              type="radio"
              className={`form-radio`}
            />
          </div>
        </section>

        <Button
          type="submit"
          text={t('calendar-create.title')}
          icon={<Icon src="/icons/plus.svg " alt="" />}
          className="btn--success inline-block"
        />
      </form>
    </div>
  );
};

export default CreateCalendar;
