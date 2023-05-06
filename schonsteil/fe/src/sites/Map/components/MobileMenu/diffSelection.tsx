import React from 'react'

const diffSelection = () => {
    
    function ToggleDiff(data) {
        const  props  = data 
        const style={...{[props.bgtype]:props.bg}}
        const isIncluded = hardness.includes(props.selectorItem)
          return (
            <DiffToggleButton
              style={style}
              value="check"
              selected={isIncluded}
              onChange={() => {
               if(isIncluded){
                 const array = hardness              
                 diffselection(array.filter(a => a !== props.selectorItem))
               }
               else {
                 diffselection(hardness.concat(props.selectorItem));
               } 
             }}
            >
              {props.selectorItem}
            </DiffToggleButton>
          );
        }
  return (
    <div>diffSelection</div>
  )
}

export default diffSelection
