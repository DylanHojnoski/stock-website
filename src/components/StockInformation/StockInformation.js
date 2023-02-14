import React, { useState, useEffect } from 'react' 
import ReactDOM from 'react-dom'
import './StockInformation.css'
import fmp from 'financialmodelingprep'
import StockGraph from '../StockGraph/StockGraph.js'
import FavoriteStocks from '../FavoriteStocks/FavoriteStocks.js'

const StockInformation = (props) => {
  const [stock, setStock] = useState([])
  const [historical, setHistorical] = useState(new Map())
  const [starSource, setStarSource] = useState(props.favoriteStocks.has(props.ticker) ? props.star[1] : props.star[0])

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
    if (props.favoriteStocks.size == 1 && props.favoriteStocks.has(props.ticker)) {
      props.setFavoriteStocks(new Map())
      localStorage.setItem("favorites", JSON.stringify([]))
      setStarSource(props.star[0])
    }
    else if (props.favoriteStocks.has(props.ticker)) {
      props.setFavoriteStocks(props.favoriteStocks.delete(props.ticker))
      localStorage.setItem("favorites", JSON.stringify(Array.from(props.favoriteStocks.entries())))
      setStarSource(props.star[0])
    }
    else {
      props.setFavoriteStocks(props.favoriteStocks.set(props.ticker, stock.get('price')))
      localStorage.setItem("favorites", JSON.stringify(Array.from(props.favoriteStocks.entries())))
      setStarSource(props.star[1])
    }
  }

  const Table = () => {
    return (
      <div className={'infoChartHolder'}>
        <table className={'infoChart'}>
          <thead>
          <tr className={'infoRow'}>
            <th key={"property"}>Property</th>
            <th key={"value"}>Value</th>
          </tr>
          </thead>
          <tbody>
           {[...stock.entries() ].map((value, key) => {
              return (
                <tr className={'infoRow'}>
                  <td key={value[0]}>{value[0].replace(/[A-Z]/g , s => ' ' + s)}</td>
                  <td key={value[1]}>{value[1]}</td>
                </tr>
              )
            })}          
          </tbody>
        </table>
      </div>
    )
  }

  console.log(stock)
  return (
    <div>
      {stock.size > 0 ? <div><h1>{stock.get('name')}</h1>
        <h2>${stock.get("price").toFixed(2)} {stock.get('change') > 0 ? <img className={"arrow"} src={props.arrow} /> : <img className={"downArrow"} src={props.arrow} />}</h2>
        <button onClick={favorite} className={'favoriteButton'}><img src={starSource} className={'starImg'} /></button></div> : null}
      <StockGraph data={historical} ticker={props.ticker}/>
      <Table />
    </div>
  )
}

export default StockInformation
