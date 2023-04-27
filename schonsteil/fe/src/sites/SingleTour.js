import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Rating from '@mui/material/Rating';
import AuthorCard from '../components/authorCard.tsx';
import InfoBox from '../components/box.tsx';
import Gallery from '../components/gallery.js';
import DetailMap from '../components/detailMap.js';
import './css/singleTour.css'


const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',},

	image: {
		width:'100%'	
	},
}));

export default function SingleTour(values) {

	const { category, slug } = useParams();
	const classes = useStyles();

	const [data, setData] = useState({ posts: [] });
	useEffect(() => {
		const apiUrl = `${process.env.REACT_APP_API_URL}/touren/${category.toLowerCase()}/${slug}/`;
		fetch(apiUrl)
			.then((data) => data.json())
			.then((posts) => {
				setData({  posts: posts });
			});
	}, [setData]);

	const [value, setValue] = useState({ value: 3 });
	useEffect(() => {
	
	}, [setValue]);

	const tour_rating = parseInt(data.posts.rating)
	if(!data.posts.author) return null;
	return (
		<Container component="main" maxWidth="xl" className='tourArticle'>
				<CssBaseline />
					<Container maxWidth="sm">				
				</Container>
				<Container maxWidth="lg">
					<Typography
						component="h1"
						variant="h2"
						align="center"
						color="textPrimary"
						gutterBottom>
						{data.posts.title}
					</Typography>
					<div className="rating"> 
							<Rating name="read-only" value={tour_rating} readOnly />			
        				</div>
					<Gallery props={data.posts.photoalbum}/>
					<InfoBox data={data}/>
					<DetailMap data={data}/>			
				</Container>

			<div className={classes.heroContent}>
				<Container maxWidth="lg">		
					<Typography
						variant="h5"
						align="left"
						color="textSecondary"
						paragraph >
						<div dangerouslySetInnerHTML={{__html: `${data.posts.text}`}} />	
					</Typography>
				</Container>
			</div>
			<AuthorCard data={data.posts.author}/>

		</Container>

	);
}