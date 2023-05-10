	import * as React from 'react';
	import Typography from '@mui/material/Typography';
	import axiosInstance from '../../../utils/axios';
	import { useState, useEffect } from 'react';
	import Container from '@material-ui/core/Container';
	import { makeStyles } from '@material-ui/core/styles';
	import Rating from '@mui/material/Rating';
	import AuthorCard from '../../../components/authorCard.tsx';
	import Gallery from '../../../components/gallery.js';
	import { useParams } from 'react-router-dom';
	import InfoBox from './InfoBox.tsx';
	import DetailMap from './DetailMap.js';
	import Season from '../Season.tsx';
import OpenedWidget from './OpenedWidget';

	const useStyles = makeStyles((theme) => ({	
	rating: {
		margin: '-10px auto 10px',
		width: "120px",

	},
	tourArticle: {	
			marginTop: '20px',
			marginBottom: '15px',
			[theme.breakpoints.up('md')]: {
				marginTop: '50px',
				},
	},
	}));

	export default function SingleHut(props) {
	const { slug } = useParams();
	const classes = useStyles();
	const [appState, setAppState] = useState({
		loading: false,
		posts: null,
	});

	useEffect(() => {
		const url = 'huts/' + slug + '/'
		axiosInstance.get(url).then((res) => {
			const allPosts = res.data;
			setAppState({ ...appState,loading: false, posts: allPosts });
		});
	}, []);

	if ((!appState.posts || appState.posts.length === 0) ) return <p>Bergrettung kann nicht ausruecken.</p>;
	return (
		<Container component="main" maxWidth="lg" className={classes.tourArticle}>
				<Container maxWidth="lg" xs={12}>
				<OpenedWidget open={appState.posts.open}/>

					<Typography
						component="h1"
						variant="h1"
						align="center"
						color="textPrimary"
						gutterBottom>
						{appState.posts.name}
					</Typography>
						<div className={classes.rating}> 
							<Rating name="read-only" value={appState.posts.rating} readOnly />			
						</div>
					<Gallery props={appState.posts.gallery}/>			
				</Container>
				
				<Container maxWidth="lg">
				<Season season={appState.posts.season} offseason={appState.posts.offseason}/>
					<InfoBox data={appState.posts}/>
					<DetailMap position={appState.posts.position}/>		
					<Typography
						align="left"
						paragraph 
						variant='h6'
						color="textSecondary"
						dangerouslySetInnerHTML={{__html: `${appState.posts.text}`}}>
					</Typography>
				</Container>
			<AuthorCard data={appState.posts.author}/>
		</Container>
	);
	}