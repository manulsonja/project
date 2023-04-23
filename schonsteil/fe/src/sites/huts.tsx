import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import axiosInstance from '../axios';
import { useState, useEffect } from 'react';
import { API_URL, MEDIA_URL } from '../SETTINGS';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import Rating from '@mui/material/Rating';
import AlertDialog from '../components/contactDialog.tsx';

const useStyles = makeStyles((theme) => ({
	cardMedia: {
		paddingTop: '56.25%', // 16:9
	},
	link: {
		margin: theme.spacing(1, 1.5),
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
    }
}));


export default function HutList(props) {
	const classes = useStyles();
	const [appState, setAppState] = useState({
		loading: false,
		posts: null,
	});

	useEffect(() => {
        const url = 'huts/'
		axiosInstance.get(url).then((res) => {
			const allPosts = res.data;
			setAppState({ ...appState,loading: false, posts: allPosts });
		});
	}, []);

if ((!appState.posts || appState.posts.length === 0) ) return <p>Bergrettung kann nicht ausruecken.</p>;
console.log(appState.posts);
  return (
    <React.Fragment>
        <Container maxWidth="xl" component="main">
            <Grid container spacing={5} alignItems="flex-end">
                {appState.posts.map((huette) => {
                    return (
                        // Enterprise card is full width at sm breakpoint
                        <Grid item key={huette.id} xs={12} md={4}>
                            <Card className={classes.card}>
                                <Link
                                    color="textPrimary"
                                    href={'hut/' + huette.slug}
                                    className={classes.link}
                                >
                                    <CardMedia
                                        className={classes.cardMedia}
                                        image={MEDIA_URL+huette.image.ratios['16/9'].sources['image/jpeg']['400']}
                                        title="Image title"     />
                                </Link>
                                <CardContent className={classes.cardContent}>
                                        <div className={classes.firstRow}> 
                                            <div style={{float: "left", width: '60%'}}> <h2>{huette.name}</h2></div>
                                            <div style={{float: "left", width: '40%'}}>
                                                <div style={{float: "right"}}>
                                                <Rating name="read-only" value={huette.rating} readOnly />	
                                                </div>		
                                            </div>
                                        </div>
                                        <div className={classes.secondRow}> 
                                            <div dangerouslySetInnerHTML={{__html: `${huette.subtitle}`}} />	</div>
                                        <div className={classes.thirdRow}> 
                                        <AlertDialog props={huette}/>
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




