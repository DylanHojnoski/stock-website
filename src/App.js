import React, { useEffect, useState } from 'react'
import './App.css';
import StockInformation from './components/StockInformation/StockInformation.js'
import SearchBar from './components/SearchBar/SearchBar.js'
import stockList from './stocks.json'
import FavoriteStocks from './components/FavoriteStocks/FavoriteStocks.js'

function App() {
  const stocks = stockList.map((stock) => {
    return [stock.symbol, stock.name, stock.price]
  })
  const [selectedStock, setSelectedStock] = useState("")
  const [favoriteStocks, setFavoriteStocks] = useState(new Map())



/*  useEffect(() => {

    if (localStorage.length > 0) {
      localStorage.clear()
    }
    favoriteStocks.forEach((value, key) => {
      localStorage.setItem(key, value)
    })
  }, [favoriteStocks])
  */

  return (
    <div className="App">
      <div className={'navBar'}>
        <button onClick={() => setSelectedStock("")}>Home</button>
        <SearchBar stocks={stocks} setSelectedStock={setSelectedStock}/>
      </div>
      { selectedStock.length > 0 ? <StockInformation ticker={selectedStock} setFavoriteStocks={setFavoriteStocks} favoriteStocks={favoriteStocks} /> :
        <FavoriteStocks setFavoriteStocks={setFavoriteStocks} favoriteStocks={favoriteStocks} setSelectedStock={setSelectedStock} stocks={stocks}/>}
    </div>
  );
}

export default App;
