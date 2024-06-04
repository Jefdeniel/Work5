import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Row } from 'react-bootstrap';
import { Form } from 'react-final-form';

import useSetTitle from '../hooks/setTitle';
import Heading from '../components/ui/Heading/Heading';
import Button from '../components/ui/Button/Button';
import LabelColorInput from '../components/customize/inputs/LabelColorInput';

const CustomizePage = () => {
  useSetTitle('Customize calendar');
  const { t } = useTranslation(['general', 'customize']);
  const [selectedColor, setSelectedColor] = useState<string>('');

  const labels = [
    { name: 'Work', color: '#FF0000' },
    { name: 'Personal', color: '#00FF00' },
    { name: 'Family', color: '#0000FF' },
    { name: 'School', color: '#FFFF00' },
    { name: 'Other', color: '#00FFFF' },
  ];

  const handleSaveLabelColors = async (values) => {};

  const handleSaveTimeBlocking = async (values) => {};

  const handleSavePermissions = async (values) => {};

  return (
    <>
      <Row>
        <Heading level={1} className="heading--lg clr-primary mb-large">
          {t('calendar:sharing-hub.title')}
        </Heading>
      </Row>

      <Form
        onSubmit={handleSaveLabelColors}
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <LabelColorInput
              labels={labels}
              value={selectedColor}
              onChange={handleSaveLabelColors}
            />

            <Button
              className="btn--success"
              type="submit" /*disabled={isLoading}*/
            >
              {t('settings:save')}
            </Button>
          </form>
        )}
      />


































      <Form
        onSubmit={handleSaveTimeBlocking}
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <Button
              className="btn--success"
              type="submit" /*disabled={isLoading}*/
            >
              {t('settings:save')}
            </Button>
          </form>
        )}
      />

      <Form
        onSubmit={handleSavePermissions}
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <Button
              className="btn--success"
              type="submit" /*disabled={isLoading}*/
            >
              {t('settings:save')}
            </Button>
          </form>
        )}
      />
    </>
  );
};

export default CustomizePage;
