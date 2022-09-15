import React, { useState } from 'react'
import './App.css';
import StockInformation from './components/StockInformation/StockInformation.js'
import SearchBar from './components/SearchBar/SearchBar.js'
import stockList from './stocks.json'

function App() {
  const stocks = stockList.map((stock) => {
    return [stock.symbol, stock.name, stock.price]
  })
  const [selectedStock, setSelectedStock] = useState("")

  return (
    <div className="App">
      <button onClick={() => setSelectedStock("")}>Home</button>
      <SearchBar stocks={stocks} setSelectedStock={setSelectedStock}/>
      { selectedStock.length > 0 ? <StockInformation ticker={selectedStock} /> : null}
    </div>
  );
}

export default App;
