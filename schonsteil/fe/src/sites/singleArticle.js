import * as React from 'react';
import Typography from '@mui/material/Typography';
import axiosInstance from '../utils/axios';
import { useState, useEffect } from 'react';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { useParams } from 'react-router-dom';
import AuthorCard from '../components/authorCard.tsx';


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
    },
	articleImage: {
        width: "100%",
    }
}));


export default function SingleArticle(props) {
	const { slug } = useParams();
	const classes = useStyles();
	const [appState, setAppState] = useState({
		loading: false,
		article: null,
	});

	useEffect(() => {
        const url = '/blog/articles/' + slug + '/'
		axiosInstance.get(url).then((res) => {
			const article = res.data;
			setAppState({ ...appState,loading: false, article: article });
		});
	},[]);

 	


if ((!appState.article || appState.article.length === 0) ) return <p>Bergrettung kann nicht ausruecken.</p>;
return (
		<Container component="main" maxWidth="xl" className='tourArticle'>
				<CssBaseline />
					<Container maxWidth="sm">				
				</Container>
				<Container>
					<Typography
						component="h1"
						variant="h2"
						align="center"
						color="textPrimary"
						gutterBottom>
						{appState.article.title}
					</Typography>
					<img src={process.env.REACT_APP_API_URL + appState.article.author.profile.profilepic.ratios['16/9'].sources['image/jpeg']['800']}
					className={classes.articleImage}/>
					<div className="rating"> 
{/* 							<Rating name="read-only" value={appState.article.rating} readOnly />			
 */}        				</div>
					{/* <Gallery props={appState.article.gallery}/> */}			
				</Container>
			<div className={classes.heroContent}>
				<Container >		
					<Typography
						variant="h5"
						align="left"
						color="textSecondary"
						paragraph >
						<div dangerouslySetInnerHTML={{__html: `${appState.article.text}`}} />	
					</Typography>
				</Container>
			</div>
		   <AuthorCard data={appState.article.author}/>
		</Container>
	);
}