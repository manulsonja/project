			import * as React from 'react';
			import Typography from '@mui/material/Typography';
			import axiosInstance from '../../utils/axios';
			import { useState, useEffect } from 'react';
			import Container from '@material-ui/core/Container';
			import { makeStyles } from '@material-ui/core/styles';
			import CssBaseline from '@material-ui/core/CssBaseline';
			import { useParams } from 'react-router-dom';
			import AuthorCard from '../../components/authorCard.tsx';
			import Gallery from '../../components/gallery';

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
		

			firstRow: {
				width: "100%",
				float: 'left',
			},
			tourArticle: {
			marginTop: '20px',
			[theme.breakpoints.up('md')]: {
				marginTop: '50px',
			},
			},
			articleHeader: {
				[theme.breakpoints.up('md')]: {
					fontSize: '50px',
				},
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
				console.log('dfsdfdsf')
				const url = '/blog/articles/' + slug + '/'
				axiosInstance.get(url).then((res) => {
					const article = res.data;
					setAppState({ ...appState,loading: false, article: article });
				});
			},[]);



			console.log(appState)
			if ((!appState.article || appState.article.length === 0) ) return <p>Bergrettung kann nicht ausruecken.</p>;
			console.log(appState.article.author)
			return (

				<Container component="main" maxWidth="lg" className={classes.tourArticle}>
						<CssBaseline />
						
						<Gallery props={appState.article.photoalbum}/> 		

							<Typography
								className={classes.articleHeader}
								component="h1"
								variant="articleTitle"
								align="center"
								color="textPrimary"
								gutterBottom>
								{appState.article.title}
							</Typography>
							<Typography
								component="h1"
								variant="h5"
								color="textPrimary"
								gutterBottom>
								{appState.article.subtitle}
							</Typography>
							
									
					<div className={classes.heroContent}>
						
								{appState.article.content.map((chunk) => {

												return(


												<React.Fragment>

												{chunk.image!==null? 
												<img className={classes.articleImage} src={process.env.REACT_APP_API_URL + chunk.image.image.ratios['16/9'].sources['image/jpeg']['800']}></img>
												: null}
												
												<Typography
												component="h1"
												variant="h5"
												align="center"
												color="textPrimary"
												gutterBottom>
												{chunk.image_subtext}
												</Typography>

												<Typography
												component="h1"
												variant="h1"
												align="center"
												color="textPrimary"
												gutterBottom>
												{chunk.heading}
												</Typography>	
												<Typography
												component="h1"
												variant="h6"
												color="textPrimary"
												gutterBottom>
												{chunk.text}
												</Typography>
												</React.Fragment>

												)

								})}

					</div>
					<AuthorCard data={appState.article.author}/>
				</Container>
			);
			}