import { useTranslation } from 'react-i18next';
import { Row } from 'react-bootstrap';

import useSetTitle from '../hooks/setTitle';
import Heading from '../components/ui/Heading/Heading';
import TimeBlockingInput from '../components/customize/Selectors/TimeBlockingSelector';
import PermissionBoxes from '../components/customize/Selectors/PermissionBoxes';
import LabelColorSelector from '../components/customize/Selectors/LabelColorSelector';
import TimeBlockingSelector from '../components/customize/Selectors/TimeBlockingSelector';

const CustomizePage = () => {
  const { t } = useTranslation(['general', 'customize']);
  useSetTitle(t('calendar:calendar-customize.title'));

  return (
    <div className={`d-flex flex-column gap-large`}>
      <Row>
        <Heading level={1} className="heading--lg clr-primary" />
      </Row>

      <LabelColorSelector />

      <TimeBlockingSelector />

      <PermissionBoxes />
    </div>
  );
};

export default CustomizePage;
