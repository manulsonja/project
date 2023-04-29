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
	const classes = useStyles();
    const appState=props.props;

if ((!appState.posts || appState.posts.length === 0) ) return <p>Bergrettung kann nicht ausruecken.</p>;
  return (
    <React.Fragment>
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
                                    <Rating name="read-only" value={touren.rating} readOnly  />  </Grid>

                                    <Grid  xs={12}>
                                    <Box dangerouslySetInnerHTML={{__html: `${touren.subtitle}`}} />	
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




