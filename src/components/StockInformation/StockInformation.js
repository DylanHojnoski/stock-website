import React, { useState, useEffect } from 'react' 
import ReactDOM from 'react-dom'
import fmp from 'financialmodelingprep'
import StockGraph from '../StockGraph/StockGraph.js'
import FavoriteStocks from '../FavoriteStocks/FavoriteStocks.js'

const StockInformation = (props) => {
  const [stock, setStock] = useState([])
  const [historical, setHistorical] = useState(new Map())

  useEffect(() => {
    fetch("https://financialmodelingprep.com/api/v3/quote/"+props.ticker.toUpperCase()+"?apikey=11c771c287c55dc7ad7deca367d2c0c7")
      .then(res=>res.json())
      .then((stockArray) => {
        const newStock = new Map()
        for (let info in stockArray[0]) {
         newStock.set(info, stockArray[0][info]) 
        }
        setStock(newStock)
        
      })

    fetch("https://financialmodelingprep.com/api/v3/historical-price-full/"+props.ticker.toUpperCase()+"?serietype=line&apikey=11c771c287c55dc7ad7deca367d2c0c7")
    .then(res => res.json())
    .then(historicalData => {
        const newData = new Map()
        for (let info in historicalData.historical) {
          newData.set(historicalData.historical[info].date, historicalData.historical[info].close)
        }
        setHistorical(newData)
      })
  }, [props.ticker])

  const favorite = () => {
    if (props.favoriteStocks.has(props.ticker)) {
      props.setFavoriteStocks(props.favoriteStocks.remove(props.ticker))
      localStorage.removeItem(props.ticker)
    }
    else {
      props.setFavoriteStocks(props.favoriteStocks.set(props.ticker, stock.get('price')))
      localStorage.setItem(props.ticker, stock.get('price'))
    }
  }

  const Table = () => {
    return (
      <div>
        {stock.size > 0 ? <div><h1>{stock.get('name')}</h1> <button onClick={favorite}>Favorite</button></div> : null}
        <StockGraph data={historical} ticker={props.ticker}/>
        <table>
          <thead>
          <tr>
            <th>Property</th>
            <th>Value</th>
          </tr>
          </thead>
          <tbody>
           {[...stock.entries() ].map((value, key) => {
              return (
                <tr>
                  <td key={value[0]}>{value[0]}</td>
                  <td key={value[1]}>{value[1]}</td>
                </tr>
              )
            })}          
          </tbody>
        </table>
      </div>
    )
  }
  

  return (
    <div>
      <Table />
    </div>
  )
}

export default StockInformation
