import * as React from 'react';

import Typography from '@mui/material/Typography';
import axiosInstance from '../axios';
import { useState, useEffect } from 'react';
import { API_URL } from '../SETTINGS';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Rating from '@mui/material/Rating';
import CssBaseline from '@material-ui/core/CssBaseline';
import Gallery from '../components/gallery';
import { useParams } from 'react-router-dom';


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


export default function SingleArticle(props) {
	const { slug } = useParams();
	const classes = useStyles();
	const [appState, setAppState] = useState({
		loading: false,
		posts: null,
	});

	useEffect(() => {
        const url = API_URL + 'articles/' + slug + '/'
		axiosInstance.get(url).then((res) => {
			const allPosts = res.data;
			setAppState({ ...appState,loading: false, posts: allPosts });
		});
	},[]);
	console.log(appState);

if ((!appState.posts || appState.posts.length === 0) ) return <p>Bergrettung kann nicht ausruecken.</p>;
console.log(slug);	
return (
		<Container component="main" maxWidth="xl" className='tourArticle'>
				<CssBaseline />
					<Container maxWidth="sm">				
				</Container>
				<Container maxWidth="md">
					<Typography
						component="h1"
						variant="h2"
						align="center"
						color="textPrimary"
						gutterBottom>
						{appState.posts.title}
					</Typography>
					<div className="rating"> 
{/* 							<Rating name="read-only" value={appState.posts.rating} readOnly />			
 */}        				</div>
					{/* <Gallery props={appState.posts.gallery}/> */}			
				</Container>
			<div className={classes.heroContent}>
				<Container maxWidth="md">		
					<Typography
						variant="h5"
						align="left"
						color="textSecondary"
						paragraph >
						<div dangerouslySetInnerHTML={{__html: `${appState.posts.text}`}} />	
					</Typography>
				</Container>
			</div>
		</Container>
	);
}