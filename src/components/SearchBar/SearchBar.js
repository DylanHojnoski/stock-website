import React, { useState, useEffect } from 'react'
import './SearchBar.css'
import StockInformation from '../StockInformation/StockInformation.js'

const SearchBar = (props) => {
  const [searchValue, setSearchValue] = useState("")
  const [showResults, setShowResults] = useState(false)
  
  const handleInputChange = (event) => {
    setSearchValue(event.target.value)
  }

  let count = 0
  const filteredStocks = props.stocks.filter((stock) => {
    if (count <= 10 && (stock[0].includes(searchValue.toUpperCase()) || stock[1].toUpperCase().includes(searchValue.toUpperCase()))) {
      count++
      return  true
    }
  })


  const changeShowResults = () => {
    if (showResults) {
      setTimeout(() => {
        setShowResults(!showResults)
<<<<<<< HEAD
      }, 150)
=======
      }, 110)
>>>>>>> 8d8d6e4513b5d8b8481d173d93fd52fed757648c
    }
    else {
      setShowResults(!showResults)
    }
  }

  const buttonClick = (ticker) => {
   props.setSelectedStock("") 
   props.setSelectedStock(ticker) 
  }

  return (
    <div>
      <input type='text' placeholder="Search" value={searchValue} onChange={handleInputChange} onFocus={changeShowResults} onBlur={changeShowResults}/>
      <ul>
        {showResults ? filteredStocks.map((stock) => {
          return <button onClick={()=>buttonClick(stock[0])} key={stock[0]}>{stock[1]}</button>
        }) : null}
      </ul>
    </div>
  )
}

export default SearchBar
