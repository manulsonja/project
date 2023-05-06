import React from 'react'
import { Grid } from '@mui/material'
import { ButtonBase } from '@mui/material'
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import {TextField} from '@mui/material';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
    navImage: {
        width: '100%',
        padding: '3px',
    },
})

const NavButtons = () => {
    const classes = useStyles();
    const navigate = useNavigate()



  return (
    <Grid container>
        <Grid item xs={6} >
        <ButtonBase onClick={() => navigate('/tours')}>        
        <img className={classes.navImage} src={`${process.env.REACT_APP_API_URL}/media/touren.jpeg`}></img>
        </ButtonBase>
        </Grid>
        <Grid item xs={6} >
        <ButtonBase onClick={() => navigate('/huts')}>        
        <img className={classes.navImage} src={`${process.env.REACT_APP_API_URL}/media/hutten.jpeg`}></img>
        </ButtonBase> 
        </Grid>
        <Grid item xs={6}>
        <ButtonBase onClick={() => navigate('/parking')}>        
        <img className={classes.navImage} src={`${process.env.REACT_APP_API_URL}/media/locations.jpeg`}></img>
        </ButtonBase> 
        </Grid>
       
        <Grid item xs={6} >
        <ButtonBase onClick={() => navigate('/map')}>        
        <img className={classes.navImage} src={`${process.env.REACT_APP_API_URL}/media/karte.jpeg`}></img>
        </ButtonBase>
        </Grid>
 
       

    </Grid>
 )
}

export default NavButtons