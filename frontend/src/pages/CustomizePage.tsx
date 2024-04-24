import Col from '../components/ui/Flex/Col';
import Row from '../components/ui/Flex/Row';
import Input from '../components/ui/Input/Input';
import useSetTitle from '../hooks/setTitle';

const CustomizePage = () => {
  useSetTitle('Customize');
  // hoe the fuck fix ik die responsive row and cols (max 12 etc.)
  return (
    <>
      <Row md={6} justifyContent="between" className="border p-2 m-5">
        <Col md={12} lg={6} className="border">
          test
        </Col>
        <Col md={12} lg={6}>
          <Input label="Name" title="Name" placeholder="Name" />
        </Col>
      </Row>
      <div className="flex flex-row justify-between border p-5 m-5">
        <div>
          <p>1</p>
        </div>
        <div>
          <p>2</p>
        </div>
      </div>
    </>
  );
};

export default CustomizePage;
