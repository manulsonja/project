import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
//MaterialUI
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Rating from '@mui/material/Rating';
import AuthorCard from './authorCard.tsx';
import InfoBox from './box.tsx';

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	image: {
		width:'100%'
	
	},
}));

export default function SingleTour() {
	const { category, slug } = useParams();
	const classes = useStyles();

	const [data, setData] = useState({ posts: [] });
	useEffect(() => {
		const apiUrl = `http://127.0.0.1:8000/api/${category.toLowerCase()}/${slug}`;
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


	return (
		
		<Container component="main" maxWidth="xl">

				<CssBaseline />
					<Container maxWidth="sm">
						<div className={classes.paper}>
							<img src={data.posts.image} className={classes.image}/>
						</div>
				</Container>


				<Container maxWidth="md"
							>
			{/* 	<Typography component="legend">Controlled</Typography>
					<Rating
					name="simple-controlled"
					value={value}
					onChange={(event, newValue) => {
						setValue(newValue);
					}}
					/> */}
						<Typography component="legend"></Typography>
						<Rating name="read-only" value={tour_rating} readOnly />
					
				</Container>



			<div className={classes.heroContent}>
				<Container maxWidth="md">

					<Typography
						component="h1"
						variant="h2"
						align="center"
						color="textPrimary"
						gutterBottom
					>
						{data.posts.title}
					</Typography>
					<InfoBox/>
					<Typography
						variant="h5"
						align="left"
						color="textSecondary"
						paragraph
					>
						<div dangerouslySetInnerHTML={{__html: `${data.posts.text}`}} />
						
					</Typography>
					<AuthorCard data={data}/>
				</Container>
			</div>
		</Container>
	);
}