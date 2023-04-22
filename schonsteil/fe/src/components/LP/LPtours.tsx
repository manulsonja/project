import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import {  MEDIA_URL } from '../../SETTINGS';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import Rating from '@mui/material/Rating';

const useStyles = makeStyles((theme) => ({
    card: {
        border: "5px solid #EE0E79"
    },
	cardMedia: {
		paddingTop: '56.25%', // 16:9
	},
	link: {
	},
	cardHeader: {
		backgroundColor:
			theme.palette.type === 'light'
				? theme.palette.grey[200]
				: theme.palette.grey[700],
	},
	postTitle: {
		fontSize: '16px',
		textAlign: 'left',
	},
	postText: {
		display: 'flex',
		justifyContent: 'left',
		alignItems: 'baseline',
		fontSize: '12px',
		textAlign: 'left',
		marginBottom: theme.spacing(2),
	},
    firstRow: {
        width: "100%",
        float: 'left',
    },
    gridItem: {

    },
  
}));


export default function LPNewestTours(props) {
	const classes = useStyles();
    const appState=props.props;
    console.log(appState);

if ((!appState.posts || appState.posts.length === 0) ) return <p>Bergrettung kann nicht ausruecken.</p>;


  return (
    console.log(appState),

    <React.Fragment>
        <Container maxWidth="xl" component="main">
            <Grid container spacing={6} className={classes.container}>
                {appState.posts.map((touren) => {
                    return (
                        // Enterprise card is full width at sm breakpoint
                        <Grid item key={touren.id} xs={12} md={6} lg={4} className={classes.gridItem}>
                            <Card className={classes.card}>
                                <Link
                                    color="textPrimary"
                                    href={'tour/' + touren.tourtype +"/"+touren.slug}
                                    className={classes.link} >
                                    <CardMedia
                                        className={classes.cardMedia}
                                        image={MEDIA_URL+touren.image.ratios['16/9'].sources['image/jpeg']['800']}
                                        title="Image title" />
                                </Link>
                                <CardContent className={classes.cardContent}>
                                        <div className={classes.firstRow}> 
                                            <div style={{float: "left", width: '60%'}}> <h2>{touren.title}</h2></div>
                                            <div style={{float: "left", width: '40%'}}>
                                                <div style={{float: "right"}}>
                                                <Rating name="read-only" value={touren.rating} readOnly />	
                                                </div>		
                                            </div>
                                        </div>
                                        <div className={classes.secondRow}> 
                                            <div dangerouslySetInnerHTML={{__html: `${touren.subtitle}`}} />	</div>
                                        <div className={classes.thirdRow}>     
                                    </div>
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




