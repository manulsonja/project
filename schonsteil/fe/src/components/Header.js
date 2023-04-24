import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import { NavLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import { useContext } from 'react';
import { connect } from 'react-redux';
import { logout } from '../actions/auth';

const useStyles = makeStyles((theme) => ({
	appBar: {
		borderBottom: `1px solid ${theme.palette.divider}`,
		height: "55px",
		backgroundColor: '#272727',
 
	},
	link: {
		margin: theme.spacing(1, 1.5), 
		color: 'white',
		borderColor: 'white',

	},
	toolbarTitle: {
		flexGrow: 1,
		color: 'white',
		fontWeight: 700,
	},
}));

function Header({ logout, isAuthenticated, user }) {
	const classes = useStyles();
	
	const guestLinks = () => {
		return(
		<React.Fragment>
       	<nav 
>
						<Link
							color="textPrimary"
							href="#"
							className={classes.link}
							component={NavLink}
							to="/register"
						>
							Register
						</Link>
					</nav>
					<Button
						href="#"
						color="primary"
						variant="outlined"
						className={classes.link}
						component={NavLink}
						to="/login"
					>
						Login
					</Button>
					<div style={{color:'white'}}>Bergrettung geh weg!</div>
	   </React.Fragment>
    )};

    const authLinks = () => {
		return(
			<React.Fragment>
					<Button
						href="#"
						color="primary"
						variant="outlined"
						className={classes.link}
						component={NavLink}
						to="login"
						onClick={logout}
					>
						Logout
					</Button>
					<div style={{color:'white'}}>Hallo, {user.first_name}</div>
			</React.Fragment>
		)  
	};

	return (
		<React.Fragment>
			<CssBaseline />
			<AppBar
				position="static"
				color="default"
				elevation={0}
				className={classes.appBar}
			>
				<Toolbar className={classes.toolbar}>
				 	<Typography
						variant="button"
						noWrap
						className={classes.toolbarTitle}
					> 
						<Link
							className={classes.link}
							component={NavLink}
							to="/"
							underline="none"
						>
							Schon steil.com 
						</Link>
 					</Typography>
					
					 <Link
							color="textPrimary"
							href="#"
							className={classes.link}
							component={NavLink}
							to="/map"
						>
							Karte
						</Link>
					 <Link
							color="textPrimary"
							href="#"
							className={classes.link}
							component={NavLink}
							to="/tours"
						>
							Touren
						</Link>
						<Link
							color="textPrimary"
							href="#"
							className={classes.link}
							component={NavLink}
							to="/huts"
						>
							Huetten
						</Link>
						<Link
							color="textPrimary"
							href="#"
							className={classes.link}
							component={NavLink}
							to="/parking/"
						>
							Locations
						</Link>
					 
					 {(isAuthenticated && user)? authLinks() :  guestLinks()}

				

				</Toolbar>
			</AppBar>
		</React.Fragment>
	);
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
	user: state.auth.user,

});
export default connect(mapStateToProps, { logout })(Header);