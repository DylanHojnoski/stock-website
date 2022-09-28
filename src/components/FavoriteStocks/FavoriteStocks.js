import React, { useState, useEffect } from 'react'
import './FavoriteStocks.css'

const FavoriteStocks = (props) => {
  const [tickers, setTickers] = useState("")

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) 
    if (storedFavorites != null) {
      storedFavorites.forEach((value, key) => {
        props.setFavoriteStocks(props.favoriteStocks.set(value[0], value[1]))
    })
    }
  }, [])

  return (
    <div className={'favoriteStocksHolder'}>
      <h2>Favorites</h2>
      <ul>
        {[...props.favoriteStocks].map((value, key) => {
          return (
            <li key={value[0]} className={'favoriteStocks'} onClick={() => props.setSelectedStock(value[0])}>{value[0]} ${props.stocks.get(value[0])[1]}</li>
          )
        })}
      </ul>
    </div>
  )
}

export default FavoriteStocks
