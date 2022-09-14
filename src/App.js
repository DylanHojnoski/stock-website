import React, { useState } from 'react'
import './App.css';
import StockInformation from './components/StockInformation/StockInformation.js'
import SearchBar from './components/SearchBar/SearchBar.js'
import stockList from './stocks.json'

function App() {
  const stocks = stockList.map((stock) => {
    return [stock.symbol, stock.name]
  })
  const [selectedStock, setSelectedStock] = useState("")

  return (
    <div className="App">
      <SearchBar stocks={stocks} setSelectedStock={setSelectedStock}/>
      { selectedStock.length > 0 ? <StockInformation ticker={selectedStock} /> : null}
    </div>
  );
}

export default App;
