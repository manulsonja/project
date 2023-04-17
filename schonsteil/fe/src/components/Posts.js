import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { Link } from '@material-ui/core';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import HeightIcon from '@mui/icons-material/Height';
import SettingsEthernetIcon from '@mui/icons-material/SettingsEthernet';
import { roundToDeciKMs, format_duration } from '../utils/formatting';
import { hiking_diff } from './cardDifficulty';
import { MEDIA_URL } from '../SETTINGS';

var color = "white";
const  setcolor = (tourtype) => {
    let grade=tourtype;
    switch (true) { // change to true 
        case (grade=="Wandern"):
            color = "#4BDE7C";
            break;
        case (grade=="Klettern"):
            color = "#FAC13B";
            break;
        case (grade=="Hochtour"):
            color = "#2D7BFA";
            break;
        case (grade=="Schitour"):
            color = "#B3D3FF";
            break;
        case (grade=="Hike and Fly"):
            color = "#F05FB4";
            break;   
    }
}

const useStyles = makeStyles((theme) => ({
	cardMedia: {
		paddingTop: '56.25%', // 16:9
	},
	link: {
		margin: theme.spacing(0, 1.5),
	},
	cardHeader: {
		backgroundColor:
			theme.palette.type === 'light'
				? theme.palette.grey[200]
				: theme.palette.grey[700],
	},
	postTitle: {
		fontSize: '20px',
		textAlign: 'left',
	},
	cardContent: {
		width: '70%',
		float: 'left'
	},
	tourType: {
		fontSize: '12px',
		textAlign: 'left',
		fontWeight: 'bold',
	},
	cardDataWidget: {
		width: '30%',
		bgcolor: 'background.paper', 
		float: 'left',	
	},

	postText: {
		display: 'flex',
		justifyContent: 'left',
		alignItems: 'baseline',
		fontSize: '16px',
		textAlign: 'left',
		marginBottom: theme.spacing(2),
	},
}));

const Posts = (props) => {
	const { posts } = props;
	const classes = useStyles();
	if ((!posts || posts.length === 0) ) return <p>Bergrettung kann nicht ausruecken.</p>;
	return (
		<React.Fragment>
			<Container maxWidth="md" component="main" disableGutters={true}>
				<Grid container spacing={1} alignItems="flex-end">
					{posts.map((post) => {

						setcolor(post.tourtype)
						return (
							<Grid item key={post.id} xs={12} md={12}>
								<Card className={classes.card}>
									<Link
									href={'tour/'+post.tourtype+'/'+post.slug}>
									{hiking_diff(post.difficulty)}
									<CardMedia
										style={{ borderBottom: `10px solid ${color}` }}
										className={classes.cardMedia}
										image={`${MEDIA_URL + post.image.ratios['16/9'].sources['image/jpeg']['500']}`}
										title="Image title"
									/>
									</Link>
									<CardContent className={classes.cardContent}>
									<Typography
											gutterBottom
											variant="h6"
											component="h2"
											className={classes.tourType}
										>
											{post.tourtype}
										</Typography>
										<Typography
											gutterBottom
											variant="h1"
											component="h1"
											className={classes.postTitle}>
											{post.title.substr(0, 50)}...
										</Typography>
										<div className={classes.postText}>
											<Typography
												component="p"
												color="textPrimary"
											></Typography>
											<Typography color="textSecondary">
												{post.subtitle.substr(0, 60)}...
											</Typography>
										</div>
									</CardContent>
									<List className={classes.cardDataWidget}>
										<ListItem className={classes.listItem} disablePadding={true}> 
												<AccessTimeIcon />
											<ListItemText primary={format_duration(post.tour_duration)}  />
										</ListItem>
										<ListItem disablePadding={true}>
												<HeightIcon />
											<ListItemText primary="Work" />
										</ListItem>
										<ListItem disablePadding={true}>								
												<SettingsEthernetIcon />
											<ListItemText primary={roundToDeciKMs(post.distance)+'km'}  />
										</ListItem>
										</List>
								</Card>
							</Grid>
						);
					})}
				</Grid>
			</Container>
		</React.Fragment>
	);
};
export default Posts;