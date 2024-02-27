import React, { useEffect, useState } from 'react'
import './App.css';
import StockInformation from './components/StockInformation/StockInformation.js'
import SearchBar from './components/SearchBar/SearchBar.js'
import FavoriteStocks from './components/FavoriteStocks/FavoriteStocks.js'
import home from './images/house-svgrepo-com.svg'
import star from './images/star-svgrepo-com.svg'
import starClicked from './images/starClicked.png'
import arrow from './images/arrow.svg'

function App() {
  const [selectedStock, setSelectedStock] = useState("")
  const [favoriteStocks, setFavoriteStocks] = useState(new Map())
  const [stocks, setStocks] = useState(new Map())
  const apiKey = process.env.REACT_APP_API_KEY

  useEffect(() => {
    fetch('https://financialmodelingprep.com/api/v3/available-traded/list?apikey='+apiKey)
    .then(res => res.json())
    .then((stockList) => {
        const stockListMap = new Map()
        stockList.map((stock => {
          stockListMap.set(stock.symbol, [stock.name, stock.price])
        }))
        setStocks(stockListMap)
      })
  }, [])

  return (
    <div className="App">
      <div className={'navBar'}>
        <button onClick={() => setSelectedStock("")} className={'homeButton'}><img src={home} className={'homeImg'} /></button>
        { stocks.size> 0 ? <SearchBar stocks={stocks} setSelectedStock={setSelectedStock}/> : null}
      </div>
      { selectedStock.length > 0 ? <StockInformation ticker={selectedStock} setFavoriteStocks={setFavoriteStocks} favoriteStocks={favoriteStocks} arrow={arrow} star={[star, starClicked]} /> :
        <FavoriteStocks setFavoriteStocks={setFavoriteStocks} favoriteStocks={favoriteStocks} setSelectedStock={setSelectedStock} stocks={stocks}/>}
    </div>
  );
}

export default App;
