import Button from '../../../../ui/Button/Button';

const ToolbarViewList = ({ view, setView, viewOptions }) => {
  return (
    <ul className="toolbar__view-list">
      {viewOptions.map(({ id, label, key }) => (
        <li key={key}>
          <Button
            className={`toolbar__view-button ${id === view ? 'active' : ''}`}
            onClick={() => setView(id)}
          >
            {label}
          </Button>
        </li>
      ))}
    </ul>
  );
};

export default ToolbarViewList;
