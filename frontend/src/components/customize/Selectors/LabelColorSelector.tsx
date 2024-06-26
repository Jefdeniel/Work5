import { useEffect } from 'react';
import { Row } from 'react-bootstrap';
import { Form } from 'react-final-form';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import useFetch from '../../../hooks/useFetch';

import Button from '../../ui/Button/Button';
import LoadingScreen from '../../ui/Loading/LoadingScreen';

import './Input.scss';

const LabelColorSelector = () => {
  const { t } = useTranslation(['calendar']);

  const LABELS = [
    { name: 'Work', color: '#FF0000' },
    { name: 'Personal', color: '#00FF00' },
    { name: 'Family', color: '#0000FF' },
    { name: 'School', color: '#FFFF00' },
    { name: 'Other', color: '#00FFFF' },
  ];

  const { fetchData: getCategories, loading: isLoading } = useFetch('GET', [
    'categories',
  ]);

  const handleEditLabels = async (values: any) => {
    console.log(values);
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getCategories();
        if (!response.ok) {
          throw new Error(response.statusText);
        }
      } catch (error) {
        console.error(error);
        toast.error(t('calendar:calendar-customize.event-labels.error'));
      }
    };
    fetchCategories();
  }, []);

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
        onSubmit={handleEditLabels}
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <ul className={`input-list`}>
              {LABELS.map((label) => (
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

export default LabelColorSelector;
