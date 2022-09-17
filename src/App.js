import React, { useEffect, useState } from 'react'
import './App.css';
import StockInformation from './components/StockInformation/StockInformation.js'
import SearchBar from './components/SearchBar/SearchBar.js'
//import stockList from './stocks.json'
import FavoriteStocks from './components/FavoriteStocks/FavoriteStocks.js'
import home from './images/house-svgrepo-com.svg'
import star from './images/star-svgrepo-com.svg'
import starClicked from './images/starClicked.png'

function App() {
  const [selectedStock, setSelectedStock] = useState("")
  const [favoriteStocks, setFavoriteStocks] = useState(new Map())
  const [stocks, setStocks] = useState(new Map())

  useEffect(() => {
    fetch('https://financialmodelingprep.com/api/v3/available-traded/list?apikey=11c771c287c55dc7ad7deca367d2c0c7')
    .then(res => res.json())
    .then((stockList) => {
        const stockListMap = stockList.map((stock => {
          return [stock.symbol, stock.name, stock.price]
        }))
        setStocks(stockListMap)
      })
  }, [])


  return (
    <div className="App">
      <div className={'navBar'}>
        <button onClick={() => setSelectedStock("")} className={'homeButton'}><img src={home} className={'homeImg'} /></button>
        { stocks.length > 0 ? <SearchBar stocks={stocks} setSelectedStock={setSelectedStock}/> : null}
      </div>
      { selectedStock.length > 0 ? <StockInformation ticker={selectedStock} setFavoriteStocks={setFavoriteStocks} favoriteStocks={favoriteStocks} star={[star, starClicked]} /> :
        <FavoriteStocks setFavoriteStocks={setFavoriteStocks} favoriteStocks={favoriteStocks} setSelectedStock={setSelectedStock} stocks={stocks}/>}
    </div>
  );
}

export default App;
