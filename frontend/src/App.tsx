import './App.css';
import Logo from './components/ui/Logo';
import Test from './components/test';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p className="header">
          <Logo width="100px" height="100px" />
          Agenda tool
        </p>
        <Test />
        <div className="body"></div>
      </header>
    </div>
  );
}

export default App;
