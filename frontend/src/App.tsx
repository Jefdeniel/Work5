import './App.scss';
import Logo from './components/ui';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p className="header">
          <Logo width="100px" height="100px" />
          Agenda tool
        </p>
        <div className="body"></div>
      </header>
    </div>
  );
}

export default App;
