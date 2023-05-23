import React from 'react'
import { select,  axisBottom, axisLeft, scaleLinear, area, drag, line } from 'd3'


const NewChart = ({ele, dist}) => {
  const distance = [0].concat(dist)

  console.log(ele)
  console.log(distance)
  const width = 1200
  const height = 400
  const margin = {top: 20, right: 20, botton: 20, left: 20}
  const innerwidth = width - margin.right - margin.left 
  const innerheight = height - margin.top - margin.bottom 
 
  const y_max = Math.max(...ele)
  const y_min = Math.min(...ele) 

  const x_max = distance[distance.length-1]

  const x = scaleLinear()
            .range([0, innerwidth])
  const y = scaleLinear()
              .range([innerheight, 0])

  x.domain(0, x_max)
  y.domain(y_min, y_max)


  const myLine = line(dist, ele)
      .x((d, i) => x(dist[i]))
      .y((d,i) => y(ele[i]))

  const svg = select('#chart-container')
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .style('background', 'LightGray')
      .append('g')
      .attr('transform',`translate(${margin.left}, ${margin.top}`)
      .style('background', 'red')

      svg.append('path')
        .attr('d', myLine(dist, ele))

      return (
    <div id="chart-container"></div>
  )
}

export default NewChart