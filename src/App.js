import './App.css';
import StockInformation from './components/StockInformation/StockInformation.js'

function App() {
  return (
    <div className="App">
      <StockInformation ticker={"vti"} />
    </div>
  );
}

export default App;
