import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import AuthorCard from '../../components/authorCard.tsx';
import InfoBox from './InfoBox.tsx';
import Gallery from '../../components/gallery.js';
import DetailMap from '../../components/detailMap.js';
import Chart from './Chart.tsx';
import { connect } from 'react-redux';
import Season from './Season.tsx';

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

function SingleTour({d3selection, d3elevation}) {

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

const tour_rating = parseInt(data.posts.rating)
if(!data.posts.author) return null;
return (
	<Container component="main" maxWidth="lg" className={classes.tourArticle}>
			<Container maxWidth="lg">
			<Typography
					align="center"
					color="textPrimary"
					gutterBottom>
					{data.posts.created}
				</Typography>
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




			<Container maxWidth="lg" style={{marginTop:'15px'}}>
		{(data.posts.season? <Season season={data.posts.season} offseason={data.posts.offseason}/>: null)}						
			<InfoBox data={data}/>
				<DetailMap props={data}/>
					<Chart props={data}/>
					<h4>Wegpunkt: {d3selection}m</h4>
					<h4>Hoehe: {d3elevation}m</h4>

			</Container>

			<Container maxWidth="lg">		
				<Typography
					align="left"
					color="textSecondary"
					dangerouslySetInnerHTML={{__html: `${data.posts.text}`}} 	
					paragraph >
				</Typography>
			</Container>
		<AuthorCard data={data.posts.author}/> 

	</Container>

);
}

const mapStateToProps = state => ({
d3selection: state.map.d3selection,
d3elevation: state.map.d3elevation,
})
export default connect(mapStateToProps, null)(SingleTour)