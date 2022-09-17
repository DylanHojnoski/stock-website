import React, {useState} from 'react'
import './StockGraph.css'
import Chart from 'chart.js/auto'
import { Line } from 'react-chartjs-2'

const StockGraph = (props) => {
  const [months, setMonths] = useState(1)
  
  Chart.defaults.elements.point.radius = 0
  Chart.defaults.backgroundColor = '#E3E9E9'
  Chart.defaults.elements.line.borderColor = '#8FA5B2'

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
      <button onClick={() => setMonths(1)} className={'timeButton'}>1M</button>
      <button onClick={() => setMonths(3)} className={'timeButton'}>3M</button>
      <button onClick={() => setMonths(6)} className={'timeButton'}>6M</button>
      <button onClick={() => setMonths(12)} className={'timeButton'}>1Y</button>
      <button onClick={() => setMonths(12*5)} className={'timeButton'}>5Y</button>
      <button onClick={() => setMonths(props.data.size)} className={'timeButton'}>All time</button>
  </div>
  )
}

export default StockGraph
