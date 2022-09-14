import React, {useState} from 'react'
import './StockGraph.css'
import Chart from 'chart.js/auto'
import { Line } from 'react-chartjs-2'

const StockGraph = (props) => {
  
  const data = {
    labels: [...props.data.keys()].reverse(),
    datasets: [
      {
        label: "Graph",
        data: [...props.data.values()].reverse(),
      }
    ],
  }

  console.log(props.data)
  return (
  <div>
      <Line data={data} />
  </div>
  )
}

export default StockGraph
