import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import Rating from '@mui/material/Rating';
import { Box } from '@material-ui/core';
import { Typography } from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';


const useStyles = makeStyles((theme) => ({
    card: {
        border: "5px solid #EE0E79"
    },
	cardMedia: {
		paddingTop: '56.25%', // 16:9
	},
    firstRow: {
        width: "100%",
        float: 'left',
    },
}));



export default function Huts(props) {
    const theme = useTheme()
    const matches = useMediaQuery(theme.breakpoints.up('sm'));

    const [dialogeOpen, setDialogeOpen] = useState(false)
	const classes = useStyles();
    const appState=props.props;


const render_dialoge = () => {
    return (
     <React.Fragment>
    <Dialog
    open={dialogeOpen}
    onClose={() => {setDialogeOpen(false)}}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
  >
    <DialogTitle id="alert-dialog-title">
      {`Kontaktdaten ${dialogeOpen.hut_name}`}
    </DialogTitle>
    <DialogContent>
      <DialogContentText id="alert-dialog-description">
        <ul>
            <li>Telephone: {dialogeOpen.telephone}</li>
            <li>Email: {dialogeOpen.email}</li>
            <li>          
            <Button                
                target="_blank"
                component="a"
                href= {`http://${dialogeOpen.website}`}
                rel="noreferrer">
                {dialogeOpen.website}
                </Button>
            </li>

        </ul>
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={() => {setDialogeOpen(false)}} autoFocus>
        Schliessen
      </Button>
    </DialogActions>
  </Dialog>
  </React.Fragment>   
  )
}

if ((!appState.posts || appState.posts.length === 0) ) return <p>Keine Huetten gefunden.</p>;
  return (
    <React.Fragment>
        {render_dialoge(appState.posts)}
        <Container component="main" maxWidth="xl">
            <Grid container spacing={2}>
                {appState.posts.map((touren) => {
                    return (
                        // Enterprise card is full width at sm breakpoint
                        <Grid item key={touren.id} xs={12} md={6} lg={4} >
                            <Card className={classes.card}>
                                <Link
                                    color="textPrimary"
                                    href={'hut/' + touren.slug}
                                    className={classes.link} >
                                    <CardMedia
                                        className={classes.cardMedia}
                                        image={process.env.REACT_APP_API_URL+touren.image.ratios['16/9'].sources['image/jpeg']['800']}
                                        title="Image title" />
                                </Link>
                                <CardContent className={classes.cardContent}>
                                <Grid container spacing={0}>
                                    <Grid  xs={8}>
                                    <Typography variant='h2'>  {touren.name}
                                    </Typography>
                                    </Grid>
                                    <Grid  xs={4}>

                                    {(matches? <Rating name="read-only" value={touren.rating} readOnly  />  
                                    : <Rating name="read-only" value={touren.rating} readOnly size="small"  />  )}
                                    
                                    
                                    
                                    </Grid>

                                    <Grid  xs={8}>
                                    <Box dangerouslySetInnerHTML={{__html: `${touren.subtitle}`}} />	
                                    </Grid>
                                    <Grid  xs={4}>


                                    {(matches?    <PhoneIcon fontSize='large' onClick={() => {setDialogeOpen({'hut_name':touren.name, 
                                                                                                'telephone':touren.telephone, 
                                                                                                'email':touren.email, 
                                                                                                'website':touren.website})}}/>

                                    :    <PhoneIcon  onClick={() => {setDialogeOpen({'hut_name':touren.name, 
                                            'telephone':touren.telephone, 
                                            'email':touren.email, 
                                            'website':touren.website})}}/> )}
                                    
                                    



                                 
                                    </Grid>
                                    </Grid>          
                                </CardContent>
                            </Card>
                        </Grid>
                    );
                })}
            </Grid>
        </Container>
    </React.Fragment>
);
}







