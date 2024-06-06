import { useTranslation } from 'react-i18next';
import { Row } from 'react-bootstrap';

import useSetTitle from '../hooks/setTitle';
import Heading from '../components/ui/Heading/Heading';
import LabelColorInput from '../components/customize/inputs/LabelColorInput';
import TimeBlockingInput from '../components/customize/inputs/TimeBlockingInput';
import PermissionBoxes from '../components/customize/inputs/PermissionBoxes';

const CustomizePage = () => {
  const { t } = useTranslation(['general', 'customize']);
  useSetTitle(t('calendar:calendar-customize.title'));

  return (
    <div className={`d-flex flex-column gap-large`}>
      <Row>
        <Heading level={1} className="heading--lg clr-primary" />
      </Row>

      <LabelColorInput />

      <TimeBlockingInput />

      <PermissionBoxes />
    </div>
  );
};

export default CustomizePage;
