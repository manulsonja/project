import React from 'react'
import { useEffect, useRef } from 'react'
import { select, line, curveCardinal, axisBottom, axisLeft, scaleLinear, event } from 'd3'
import {bisect } from 'd3'
import { connect } from 'react-redux'
import { setd3selection, setd3index } from '../../actions/map'

const Chart = ({props, d3selection, setd3selection, setd3index}) => {

const ele = props.posts.elevation_values
const dist = props.posts.steps

const svgRef = useRef()
const [selected_point, setPoint] = React.useState(5000)
useEffect(() => {

    if(ele && dist){

        const xmax = dist[dist.length -1]
        const valuecount = ele.length -1
        const w = 600;
        const h = 300;
        const margin = 40
        const innerwidth = w-margin*2
        const innerheight = h-margin*2

        const y_max = Math.max(...ele)
        const y_min = Math.min(...ele) 
        
        const svg = select(svgRef.current)
        const xScale = scaleLinear()
            .domain([0, xmax*1000])
            .range([0+margin, w-margin]) ;
        const yScale = scaleLinear()
            .domain([y_min,y_max])
            .range([h-margin,0+margin])

        const xAxis = axisBottom(xScale);
        svg.select('.stuhlgang')
        .style('transform',`translateY(${h-margin}px)`)    
        .call(xAxis)
        
        const yAxis = axisLeft(yScale)

        svg.select('.bergrettunghat')
        .style('transform',`translateX(${margin}px)`)    
        .call(yAxis)
        
        const myLine = line()
            .x((value, i) => xScale(dist[i]*1000))
            .y(value => yScale(value))
            .curve(curveCardinal);
            
        svg
        .attr('width', w)
        .attr('height',h)
        .style('background', 'grey')
        .style('margin-top', '10px')
        .style('margin-left', '100px')
        
            .selectAll('.line')
            .data([ele])
            .join('path')
            .attr('class','line')
            .attr('d', value => myLine(value))
            .attr('fill', 'none')
            .attr('stroke','red');
        
        svg.append('line')
        .attr('class','overlay')
        .attr('stroke','red')
        .attr('x1', 3000)
        .attr('x2', 3000)
        .attr('y1', 0)
        .attr('y2', h);

        svg.select('.overlay')
        .attr('x1', xScale(d3selection))
        .attr('x2', xScale(d3selection))
        .attr('y1', 0)
        .attr('y2', h)
      
        svg.append('rect')
        .attr('width', innerwidth)
        .attr('height', innerheight)

        .style('transform',`translate(${margin}px,${margin}px)`) 
        .attr('fill', "none")
        .attr('pointer-events', 'all')
        .on("mousemove", function(event) {
            const e = event.layerX
            const x = e +40
            const loc = xScale.invert(x)
            setd3selection(loc)

            const needle = loc/1000
            const bisected =  bisect(dist, needle)

            setd3index(bisected)

            
          })
   

        
        
        

    }
   
},[d3selection]);
 

  return (
    <svg ref={svgRef}>
        <g className='stuhlgang'></g>        
        <g className='bergrettunghat'></g>
    </svg>
)}

const mapStateToProps = state => ({
    d3selection: state.map.d3selection,
    d3index: state.map.d3setindex,
})
export default connect(mapStateToProps, {setd3selection, setd3index})(Chart)