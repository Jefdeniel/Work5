import { useTranslation } from 'react-i18next';
import useFetch from '../../../hooks/useFetch';
import { Row } from 'react-bootstrap';
import { Form } from 'react-final-form';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

import LoadingScreen from '../../ui/Loading/LoadingScreen';
import Button from '../../ui/Button/Button';

import './Input.scss';

const LabelColorInput = () => {
  const { t } = useTranslation(['calendar']);

  const labels = [
    { name: 'Work', color: '#FF0000' },
    { name: 'Personal', color: '#00FF00' },
    { name: 'Family', color: '#0000FF' },
    { name: 'School', color: '#FFFF00' },
    { name: 'Other', color: '#00FFFF' },
  ];

  // TODO: Change to api call that gets the specific calendar and get categories trough that
  const { fetchData: getCategories, loading: isLoading } = useFetch('GET', [
    'categories',
  ]);

  const onSubmit = async (values) => {};

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <Row className={`label-color-inputs`}>
      <div className={`input-intro`}>
        <span className={`title mb-1`}>
          {t('calendar:calendar-customize.event-labels.title')}
        </span>

        <p className={`w-75`}>
          {t('calendar:calendar-customize.event-labels.description')}
        </p>
      </div>

      <Form
        onSubmit={onSubmit}
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <ul className={`input-list`}>
              {labels.map((label) => (
                <li key={label.name} className={`input-item`}>
                  <label>
                    <input
                      className={`input`}
                      type="color"
                      name="color-label"
                      defaultValue={label.color}
                    />

                    <span>{label.name}</span>
                  </label>
                </li>
              ))}
            </ul>

            <Button className="btn--success mt-2" type="submit">
              {t('calendar:calendar-customize.event-labels.save')}
            </Button>
          </form>
        )}
      />
    </Row>
  );
};

export default LabelColorInput;
