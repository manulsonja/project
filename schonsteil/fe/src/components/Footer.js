import React from 'react';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@mui/material';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import { useLocation } from "react-router-dom";
import { MEDIA_URL } from '../SETTINGS';

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
			<Link color="inherit" href="https://material-ui.com/">
				Your Website
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
			<div style={{backgroundPosition: 'center top', backgroundSize: '100%', backgroundImage: `url(${MEDIA_URL}/media/footerbg.jpeg)`}}>
			<Container maxWidth="md" component="footer" className={classes.footer}>
				<Grid container spacing={4} justify="space-evenly">
					{footers.map((footer) => (
						<Grid item xs={6} sm={3} key={footer.title}>
							<Typography variant="footerH1" color="primary.light" gutterBottom>
								{footer.title}
							</Typography>
							<ul>
								{footer.description.map((item) => (

										<Link href="#" variant="subtitle1" color="textSecondary">
										<Typography variant="footer" color="primary.light" gutterBottom>

											{item}<br></br>
											</Typography>

										</Link>

								))}
							</ul>
						</Grid>
					))}
				</Grid>
				<Box mt={5}>
					<Copyright />
				</Box>
			</Container>
			</div>
		</React.Fragment>
	);
}

export default Footer;