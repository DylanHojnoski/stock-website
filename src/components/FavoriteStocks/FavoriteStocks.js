import React, { useState, useEffect } from 'react'
import './FavoriteStocks.css'

const FavoriteStocks = (props) => {


  
  return (
    <div className={'favoriteStocksHolder'}>
      <h2>Favorites</h2>
      <ul>
        {[...props.favoriteStocks].map((value, key) => {
          return (
            <li className={'favoriteStocks'} onClick={() => props.setSelectedStock(value[0])}>{value[0]} ${value[1]}</li>
          )
        })}
      </ul>
    </div>
  )
}

export default FavoriteStocks
