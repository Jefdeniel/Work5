import Button from '../components/ui/Button/Button';
import useSetTitle from '../hooks/setTitle';

const CustomizePage = () => {
  useSetTitle('Customize');
  return (
    <>
      <div>
        <p>Customize your settings here.</p>
        <Button onClick={() => console.log('Save settings')}>
          Save settings
        </Button>
        <div className="card">test</div>
      </div>
    </>
  );
};

export default CustomizePage;
