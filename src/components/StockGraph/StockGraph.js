import React, {useState} from 'react'
import './StockGraph.css'
import Chart from 'chart.js/auto'
import { Line } from 'react-chartjs-2'

const StockGraph = (props) => {
  const [months, setMonths] = useState(1)
  
  Chart.defaults.elements.point.pointStyle = 'line'
  Chart.defaults.backgroundColor = '#E3E9E9'
  Chart.defaults.elements.line.backgroundColor = '#8FA5B2'
  Chart.defaults.elements.line.fill = '#8FA5B2'

  const data = {
    labels: [...props.data.keys()].slice(0,months*30).reverse(),
    datasets: [
      {
        label: props.ticker,
        data: [...props.data.values()].slice(0,months*30).reverse(),
      }
    ],
  }
  
  return (
  <div>
      <Line data={data} />
      <button onClick={() => setMonths(1)}>1 month</button>
      <button onClick={() => setMonths(3)}>3 months</button>
      <button onClick={() => setMonths(6)}>6 months</button>
      <button onClick={() => setMonths(12)}>1 year</button>
      <button onClick={() => setMonths(12*5)}>5 years</button>
      <button onClick={() => setMonths(props.data.size)}>All time</button>
  </div>
  )
}

export default StockGraph
