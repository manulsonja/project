
export const hiking_diff = (diff) => {
    if ((!diff || diff.length === 0) ) return;
    if(diff=='schwierig'){return(<div style={{ color:'white', fontWeight:600, paddingTop:5, margin:0, float:"right", width:'90px', backgroundColor:'black', zIndex:"-10000"}} >SCHWER</div>)}
    if(diff=='leicht'){return(<div style={{ color:'white', fontWeight:600, paddingTop:5, margin:0, float:"right", width:'90px', backgroundColor:'blue', zIndex:"-10000"}} >LEICHT</div>)}
    if(diff=='mittel'){return(<div style={{ color:'white', fontWeight:600, paddingTop:5, margin:0, float:"right", width:'90px', backgroundColor:'red', zIndex:"-10000"}} >MITTEL</div>)}

   
}