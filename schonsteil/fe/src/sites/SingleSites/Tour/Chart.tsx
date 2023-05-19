import React, { useState } from 'react'
import { useEffect, useRef } from 'react'
import { select,  axisBottom, axisLeft, scaleLinear, area, drag } from 'd3'
import {bisect } from 'd3'
import { connect } from 'react-redux'
import { setd3selection, setd3index,d3setelevation} from '../../../actions/map'
import './chart.css';

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
const overScgRef = useRef()

const wrapperRef = useRef()

const dimensions = useResizeObserver(wrapperRef)

useEffect(() => {
    console.log('rerender')

    if(ele && dist && dimensions){

        const xmax = dist[dist.length -1]
        const w = dimensions.width;
        const h = dimensions.height;
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

            const handleDrag = (e) => {
                console.log("herure")
                const x = e.x + 40
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
        
         const myLine = area()
            .x((value, i) => xScale(dist[i]*1000))
            .y1(value => yScale(value))
            .y0(h)
        
 
         
        //svg
        svg
        .attr('width', '100%')
        .attr('height',h)
        .style('background', 'LightGray')
   




        //indicator line   
        svg.select('.indicator-line')
        .attr('class','overlay')
        .attr('stroke','red')
        .attr('stroke-width', 20)
        .attr('x1', 3000)
        .attr('x2', 3000)
        .attr('y1', 0)
        .attr('y2', h)
        .call(dr); 

        
         svg.select('.overlay')
        .attr('x1', xScale(d3selection))
        .attr('x2', xScale(d3selection))
        .attr('y1', 0)
        .attr('y2', h);


  
        
        svg.select('.action-layer')
        .attr('width', innerwidth)
        .attr('height', innerheight)

        .style('transform',`translate(${margin}px,${margin}px)`) 
        .attr('fill', "none")
        .attr('pointer-events', 'all')
   /*      .on("mousemove", function(event) {
            const e = event.layerX
            const x = e +40
            const loc = xScale.invert(x)
            setd3selection(loc)

            const needle = loc/1000
            const bisected =  bisect(dist, needle)

            setd3index(bisected)
            d3setelevation(ele[bisected])
            
          }); */
         
          svg.selectAll('.graph')
          .data([ele])
          .attr('d', myLine)
    }
   
},[d3selection, dimensions]);
 

  return (
    <div ref={wrapperRef} style={{ height: '200px'}}>
        
        <svg ref={svgRef} style={{verticalAlign: 'middle'}}>
        <path className='graph'></path>
        <rect className='action-layer'></rect>
        <g className='xAxis'></g>        
        <g className='yAxis'></g>
        <g>
        <line className='indicator-line'></line>
        <rect className='touch_area'></rect>

        </g>
    </svg>
    </div>
  
)}

const mapStateToProps = state => ({
    d3selection: state.map.d3selection,
    d3index: state.map.d3setindex,
    d3elevation: state.map.d3elevation,
})
export default connect(mapStateToProps, {setd3selection, setd3index, d3setelevation})(Chart)