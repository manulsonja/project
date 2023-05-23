import React, { useState } from 'react'
import { useEffect, useRef } from 'react'
import { select,  axisBottom, axisLeft, scaleLinear, area, drag } from 'd3'
import {bisect } from 'd3'
import { connect } from 'react-redux'
import { setd3selection, setd3index,d3setelevation} from '../../../actions/map'
import './chart.css';
import NewChart from './NewChart.tsx'

const useResizeObserver = ref => {

    const [dimensions, setDimensions] = useState(null)
    useEffect(() => {
        const observeTarget = ref.current;
        const resizeObserver = new ResizeObserver((entries) =>{
            entries.forEach(entry => {
                setDimensions(entry.contentRect);

            })
            
        })
    resizeObserver.observe(observeTarget);
    return () => {
        resizeObserver.unobserve(observeTarget);
    }
},[ref])
    return dimensions

}


const Chart = ({props, d3selection, setd3selection, setd3index, d3setelevation}) => {
  
const ele = props.posts.elevation_values
const dist = props.posts.steps

const svgRef = useRef()
const wrapperRef = useRef()
const dimensions = useResizeObserver(wrapperRef)

    if(ele && dist && dimensions){

        const xmax = dist[dist.length -1]
        const w = dimensions.width;
        const h = dimensions.height;
        const margin = 40

        const y_max = Math.max(...ele)
        const y_min = Math.min(...ele) 
        
        const svg = select(svgRef.current)



        const xScale = scaleLinear()
            .domain([0, xmax*1000])
            .range([0+margin, w-margin]) ;
        const yScale = scaleLinear()
            .domain([y_min,y_max])
            .range([h-margin,0+margin])


        const handleDrag = (e) => {
                console.log("herure")
                const x = e.x 
                const loc = xScale.invert(x)
                setd3selection(loc)
        
                const needle = loc/1000
                const bisected =  bisect(dist, needle)
        
                setd3index(bisected)
                d3setelevation(ele[bisected])    }   

        const dr = drag()
            .on('drag', handleDrag);
         
     
        const xAxis = axisBottom(xScale);
        svg.select('.xAxis')
        .style('transform',`translateY(${h-margin}px)`)    
        .call(xAxis)
        
        const yAxis = axisLeft(yScale)

        svg.select('.yAxis')
        .style('transform',`translateX(${margin}px)`)    
        .call(yAxis)
        
         const myArea = area()
            .x((value, i) => xScale(dist[i]*1000))
            .y1(value => yScale(value))
            .y0(yScale(y_min))
            console.log(yScale(y_min))
        
 
         
        //svg
        svg
        .attr('width', '100%')
        .attr('height',h)
        .style('background', 'LightGray')
   

        //indicator line   
        svg.select('.indicator-line')
        .attr('x1', xScale(d3selection))
        .attr('x2', xScale(d3selection))
        .attr('stroke','red')
        .attr('stroke-width', 20)
        .attr('y1', 0)
        .attr('y2', h)
        .call(dr); 
 
        
   svg.select('.graph')
          .data([ele])
          .attr('d', myArea)

    
    }
   
  return (
    <React.Fragment>
    <div>
    <div ref={wrapperRef} style={{ aspectRatio: '3/1'}}>
      <svg ref={svgRef} style={{verticalAlign: 'middle'}}>
        <path className='graph'></path>
       <g className='xAxis'></g>        
        <g className='yAxis'></g>
         <line className='indicator-line'></line>
    </svg></div>
    </div>
    <NewChart ele={ele} dist={dist}/>
    </React.Fragment>
)}

const mapStateToProps = state => ({
    d3selection: state.map.d3selection,
    d3index: state.map.d3setindex,
    d3elevation: state.map.d3elevation,
})
export default connect(mapStateToProps, {setd3selection, setd3index, d3setelevation})(Chart)