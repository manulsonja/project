import React from 'react';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@mui/material';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { useLocation } from "react-router-dom";
import { MEDIA_URL } from '../SETTINGS';
import { Link } from 'react-router-dom';
const useStyles = makeStyles((theme) => ({
	footer: {
		borderTop: `1px solid ${theme.palette.divider}`,
		marginTop: theme.spacing(8),
		paddingTop: theme.spacing(3),
		paddingBottom: theme.spacing(3),
		[theme.breakpoints.up('sm')]: {
			paddingTop: theme.spacing(6),
			paddingBottom: theme.spacing(6),
		},

	},
}));

function Copyright() {
	return (
		<Typography variant="body2" color="textSecondary" align="center">
			{'Copyright © '}
			<Link color="inherit" to="/">
				Schonsteil.com
			</Link>{' '}
			{new Date().getFullYear()}
			{'.'}
		</Typography>
	);
}

const footers = [
	{
		title: 'Schonsteil',
		description: ['Warum Manul?', 'Ueber uns', 'Kontakt',],
	},
	{
		title: 'Social',
		description: [
			'Facebook',
			'Instagram ',
		],
	},

	{
		title: 'Legal',
		description: ['Impressum', 'Datenschutzerklaerung'],
	},
];

function Footer() {
	const classes = useStyles();
	const { pathname } = useLocation();
	if(pathname == "/map") return null;
	return (
		<React.Fragment>
			<Container maxWidth="md" component="footer" className={classes.footer}>
				<Grid container spacing={4} justify="space-evenly">
						<Grid item xs={6} sm={3} key='Legal'>
							<Typography variant="h6" color="primaryText" gutterBottom>
								Legal
							</Typography>
							<ul>
										<Link to="impressum" variant="p" color="primaryText">
										<Typography variant="text" color="textPrimary" gutterBottom>
											Impressum<br></br>
											</Typography>
											</Link>
											
							</ul>
							<ul>
										<Link to="datenschutz" variant="p" color="primaryText">
										<Typography variant="text" color="textPrimary" gutterBottom>
											Datenschutzerklaerung<br></br>
											</Typography>
											</Link>
											
							</ul>
						</Grid>
				</Grid>
				<Box mt={5}>
					<Copyright />
				</Box>
			</Container>
		</React.Fragment>
	);
}

export default Footer;