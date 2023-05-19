import * as React from 'react';

import Typography from '@mui/material/Typography';
import axiosInstance from '../../../utils/axios';
import { useState, useEffect } from 'react';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Gallery from '../../../components/gallery.js';
import { useParams } from 'react-router-dom';
import InfoBox from './InfoBox.tsx';
import DetailMap from './DetailMap.js';

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
		difsplay: 'flex',
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

export default function SingleParking() {
	const { slug } = useParams();
	const classes = useStyles();
	const [appState, setAppState] = useState({
		loading: false,
		posts: null,
	});

	useEffect(() => {
        const url = 'parking/' + slug + '/'
		axiosInstance.get(url).then((res) => {
			const allPosts = res.data;
			setAppState({ ...appState,loading: false, posts: allPosts });
		});
	},[]);

if ((!appState.posts || appState.posts.length === 0) ) return <p>Bergrettung kann nicht ausruecken.</p>;
	return (
		<Container component="main" maxWidth="lg" className='tourArticle'>
				<CssBaseline />
					<Container maxWidth="lg">				
				</Container>
				<Container maxWidth="lg">
					<Typography
						component="h1"
						variant="h1"
						align="center"
						color="textPrimary"
						gutterBottom>
						{appState.posts.name}
					</Typography>
					
					<Gallery props={appState.posts.gallery}/> 	
{/* 					<InfoBox data={appState.posts} />		
 */}					<DetailMap position={appState.posts.position}/>		
				</Container>
			<div className={classes.heroContent}>
				<Container maxWidth="lg">		
					<Typography
						variant="h6"
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