import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import LanguageSelector from '../../components/settings/LanguageSelector';
import Button from '../../components/ui/Button/Button';
import useSetTitle from '../../hooks/setTitle';
import useFetch from '../../hooks/useFetch';
import { useSettings } from '../../hooks/useSettings';
import saveIcon from '/icons/menu.svg';
import Heading from '../../components/ui/Heading/Heading';
import Row from '../../components/ui/Flex/Row';

const SettingsPage = () => {
  const { t } = useTranslation(['settings']);
  useSetTitle(t('settings:title'));
  const settings = useSettings();
  // TODO: write function in backend
  const { fetchData: updateDeviceSettings } = useFetch('POST', ['settings']);
  const handleSaveSettings = async () => {
    try {
      const response = await updateDeviceSettings(
        {},
        { language: settings.language }
      );

      if (response.ok) {
        toast.success(t('settings:toasts.success'));
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Heading level={1}>{t('settings:general.title')}</Heading>
      <LanguageSelector
        onChange={settings.setLanguage}
        initialLanguage={settings.language}
      />
      {/* why tf werkt dit niet */}
      <Row alignItems="end" justifyContent="end">
        <Button
          icon={<img src={saveIcon} alt="menu" />}
          isOutline={false}
          text={t('settings:save')}
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onClick={handleSaveSettings}
        />
      </Row>
    </>
  );
};

export default SettingsPage;
