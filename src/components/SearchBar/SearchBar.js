import React, { useState, useEffect } from 'react'
import './SearchBar.css'
import StockInformation from '../StockInformation/StockInformation.js'

const SearchBar = (props) => {
  const [searchValue, setSearchValue] = useState("")
  const [showResults, setShowResults] = useState(false)
  
  const handleInputChange = (event) => {
    setSearchValue(event.target.value)
  }

  const stocks = Array.from(props.stocks.entries())

  let count = 0
  const filteredStocks = stocks.filter((stock) => {
    if (searchValue.length > 0 && count <= 10 && (stock[0].includes(searchValue.toUpperCase()) || stock[1][0].toUpperCase().includes(searchValue.toUpperCase()))) {
      count++
      return  true
    }
  })


  const changeShowResults = () => {
    if (showResults) {
      setTimeout(() => {
        setShowResults(!showResults)
      }, 150)
    }
    else {
      setShowResults(!showResults)
    }
  }

  const buttonClick = (ticker) => {
   props.setSelectedStock("") 
   props.setSelectedStock(ticker) 
  }

  const clearButton = () => {
    setShowResults(false)
    setSearchValue("")
  }

  return (
    <div>
      <div className={"searchBar"}>
      <input type='text' placeholder="Search" value={searchValue} onChange={handleInputChange} onFocus={changeShowResults} onBlur={changeShowResults}/>
        {searchValue.length > 0 ? <button onClick={()=>clearButton()}>X</button> : null}
      </div>
      <ul className={"resultsList"}>
        {showResults ? filteredStocks.map((stock) => {
          return <li key={stock[0]}><button className={"searchItems"} onClick={()=>buttonClick(stock[0])} key={stock[0]}>{stock[1][0]} ${stock[1][1]} </button></li>
        }) : null}
      </ul>
    </div>
  )
}

export default SearchBar
