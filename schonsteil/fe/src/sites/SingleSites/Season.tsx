import React from 'react'
import { Grid } from '@material-ui/core'
import { ClassNames } from '@emotion/react'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles({
        seasonItem: {
                padding: '4px',
                textAlign: 'center',
                fontWeight: 'bold',
                border: '1px solid white',
                backgroundColor: '#FFECFF',
        }
})
const array = ['Jan',"Feb",'Mar','Apr','Mai','Jun','Jul','Aug','Sep','Okt','Nov',"Dez"]
const Season = ({season, offseason}) => {
    const classes = useStyles()
  return (
    <Grid container spacing={1}>
        {array.map((ele, i) => {
            return  (season.includes(`${i+1}`)==true? 
            <Grid item xs={1} style={{backgroundColor:'#E012A9', color: 'white'}} className={classes.seasonItem}>{ele}</Grid>: 

            (offseason.includes(`${i+1}`)==true? <Grid item xs={1} style={{backgroundColor:'#E69CD2'}} className={classes.seasonItem}>{ele}</Grid>: 
            <Grid item xs={1} className={classes.seasonItem}>{ele}</Grid>)
            )

        })}
    </Grid>
  )
}

export default Season