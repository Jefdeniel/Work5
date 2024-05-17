import { Row, Col } from 'react-bootstrap';
import Heading from '../../components/ui/Heading/Heading';
import Input from '../../components/ui/Input/Input';
import useSetTitle from '../../hooks/setTitle';
import Icon from '../../components/ui/Icon/Icon';
import Button from '../../components/ui/Button/Button';

const CreateCalendar = () => {
  useSetTitle('CreateCalendar');
  return (
    <div>
      <Heading level={1} title="Create Calendar" className={`clr-primary`} />

      <form
        action="#"
        className={`d-flex flex-column align-items-start gap-5`}
      >
        <section>
          <Heading level={2} children="General" className={`heading--sm`} />

          <Input title="Calendar Name" />

          <Input title="Calendar Description" />

          <div className={`d-flex align-items-center gap-3`}>
            <Icon src="/icons/add-image.svg" alt="Add image icon" />

            <Button className="btn--primary" text="Change image" />
          </div>
        </section>

        <section>
          <Heading level={2} children="People" className={`heading--sm`} />

          <span>
            Invite others to collaborate on a shared agenda for collective time
            management.
          </span>

          <div className={`d-flex align-items-center gap-3`}>
            <Icon src="/icons/add-image.svg" alt="Add image icon" />

            <Button
              className="btn--primary"
              icon={<Icon src="/icons/plus.svg " alt="" />}
              text="Change image"
            />
          </div>
        </section>

        <section>
          <Heading level={2} children="Date range" className={`heading--sm`} />

          <span>
            For temporal agenda&apos;s (projects for example), choose YES and
            you can define the start + end dates for it. For normal ones, just
            keep it at NO.
          </span>

          {/* Need to be checkboxes */}
          <div className={`d-flex align-items-center gap-3`}>
            <Button className="btn--primary text-uppercase" text="No" />

            <Button className="btn--primary text-uppercase" text="Yes" />
          </div>
        </section>

        <Button
          type="submit"
          text="Create Calendar"
          icon={<Icon src="/icons/plus.svg " alt="" />}
          className="btn--success inline-block"
        />
      </form>
    </div>
  );
};

export default CreateCalendar;
