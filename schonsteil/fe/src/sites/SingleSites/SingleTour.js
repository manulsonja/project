import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import AuthorCard from '../../components/authorCard.tsx';
import InfoBox from '../../components/box.tsx';
import Gallery from '../../components/gallery.js';
import DetailMap from '../../components/detailMap.js';

const useStyles = makeStyles((theme) => ({
	rating: {
		margin: '-10px auto 10px',
		width: "120px",
	
	},
	tourArticle: {	
			marginTop: '20px',
			[theme.breakpoints.up('md')]: {
				marginTop: '50px',
			  },

	},
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
		<Container component="main" maxWidth="xl" className={classes.tourArticle}>
				<Container maxWidth="lg">
					<Typography
						component="h1"
						variant="h1"
						align="center"
						color="textPrimary"
						gutterBottom>
						{data.posts.title}
					</Typography>
						<div className={classes.rating}> 
							<Rating name="read-only" value={tour_rating} readOnly />			
        				</div>
					</Container>

					<Gallery props={data.posts.photoalbum}/>
				<Container maxWidth="lg">
					<InfoBox data={data}/>
					<DetailMap data={data}/>			
				</Container>

			<div className={classes.heroContent}>
				<Container maxWidth="lg">		
					<Typography
						align="left"
						color="textSecondary"
						dangerouslySetInnerHTML={{__html: `${data.posts.text}`}} 	
						paragraph >
					</Typography>
				</Container>
			</div>
			<AuthorCard data={data.posts.author}/>

		</Container>

	);
}