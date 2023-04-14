import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { Link } from '@material-ui/core';

var color = "white";
const  setcolor = (tourtype) => {
    let grade=tourtype;
    switch (true) { // change to true 
        case (grade=="Wandern"):
            color = "orange";
            break;
        case (grade=="Klettern"):
            color = "red";
            break;
        case (grade=="Hochtour"):
            color = "green";
            break;
        case (grade=="Schitour"):
            color = "yellow";
            break;
        case (grade=="Hike and Fly"):
            color = "blue";
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
	tourType: {
		fontSize: '12px',
		textAlign: 'left',
		fontWeight: 'bold',
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
	if ((!posts || posts.length === 0) ) return <p>Can not find any posts, sorry</p>;
	return (
		<React.Fragment>
			<Container maxWidth="md" component="main" disableGutters="true">
				<Grid container spacing={1} alignItems="flex-end">
					{posts.map((post) => {
						setcolor(post.tourtype)
						return (
							<Grid item key={post.id} xs={12} md={12}>
								<Card className={classes.card}>
									<Link
									href={'tour/'+post.tourtype+'/'+post.slug}>
									<CardMedia
										style={{ borderBottom: `10px solid ${color}` }}
										className={classes.cardMedia}
										image={`${post.image}`}
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
											className={classes.postTitle}
										>
											{post.title.substr(0, 50)}...
										</Typography>
										<div className={classes.postText}>
											<Typography
												component="p"
												color="textPrimary"
											></Typography>
											<Typography variant="p" color="textSecondary">
												{post.subtitle.substr(0, 60)}...
											</Typography>
										</div>
									</CardContent>
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