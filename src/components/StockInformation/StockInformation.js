import React, { useState, useEffect } from 'react' 
import ReactDOM from 'react-dom'
import fmp from 'financialmodelingprep'

const StockInformation = (props) => {
  const [stock, setStock] = useState([])
  const [historical, setHistorical] = useState([])

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

  }, [])

  const Table = () => {
    return (
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
                <td>{value[0]}</td>
                <td>{value[1]}</td>
              </tr>
            )
          })}          
        </tbody>
      </table>
    )
  }
  

  console.log(stock)
  return (
    <div>
      <Table />
    </div>
  )
}

export default StockInformation
