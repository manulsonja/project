import React from 'react'


const renderOpen = () => {
    return(
    <div style={{ 
                float: 'left',
                backgroundColor: '#16A30B', 
                color:'white', 
                fontWeight:'bold',
                padding: '2px 10px'}}>
            Geoeffnet
    </div>
    )
}

const renderUncertain = () => {
    return(
    <div style={{
                float: 'left',
                backgroundColor: '#d3d3d3', 
                fontWeight:'bold',
                padding: '2px 10px'}}>
            Vielleicht Geoeffnet
    </div>
    )
}

const renderClosed = () => {
    return(
    <div style={{
                float: 'left',
                backgroundColor: 'red', 
                color:'white', 
                fontWeight:'bold',
                padding: '2px 10px'}}>
            Geschlossen
    </div>
    )
}

const OpenedWidget = ({open}) => {
  return (
    (open==2? renderOpen():   
    (open==1? renderUncertain(): renderClosed())
    )
  )
}

export default OpenedWidget