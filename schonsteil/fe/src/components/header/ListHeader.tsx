import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import { NavLink } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { logout } from '../../actions/auth';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import { lightBlue } from '@mui/material/colors'
function Header({ logout, isAuthenticated, user }) {
	const [state, setState] = React.useState({
		top: false,
		left: false,
		bottom: false,
		right: false,
		});

	const useStyles = makeStyles((theme) => ({
		appBar: {
			borderBottom: `1px solid ${theme.palette.divider}`,
			height: "55px",
			backgroundColor: 'white',
			paddingLeft: '150px',
		
		},
		link: {
			color: 'white',
			margin: theme.spacing(1, 1.5), 

		},
		toolbarTitle: {
			flexGrow: 1,
			fontWeight: 700,
		},
		mAppbar: {
			backgroundColor: '#272727',
		
		},
		fullLink: {
			color: 'black',
			margin: theme.spacing(1, 1.5), 
		},	
}));

	const list = (anchor: Anchor) => (
		<Box
			sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
			role="presentation"
			onClick={toggleDrawer(anchor, false)}
			onKeyDown={toggleDrawer(anchor, false)}
		>
			<List>
			<Link to="/">
				<ListItem key='Home' disablePadding>
				<ListItemButton>
					<ListItemIcon>
					<InboxIcon /> 
					</ListItemIcon>
					<ListItemText primary="Home" />
				</ListItemButton>
				</ListItem>
			</Link>
			<Link to="/map">
				<ListItem key='Karte' disablePadding>
				<ListItemButton>
					<ListItemIcon>
					<InboxIcon /> 
					</ListItemIcon>
					<ListItemText primary="Karte" />
				</ListItemButton>
				</ListItem>
			</Link>
			<Link to="/tours">
			<ListItem key='Touren' disablePadding>
				<ListItemButton>
					<ListItemIcon>
					<InboxIcon /> 
					</ListItemIcon>
					<ListItemText primary="Touren" />
				</ListItemButton>
				</ListItem>
				</Link>

				<Link to="/huts">
				<ListItem key='Huetten' disablePadding>
				<ListItemButton>
					<ListItemIcon>
					<InboxIcon /> 
					</ListItemIcon>
					<ListItemText primary="Huetten" />
				</ListItemButton>
				</ListItem>
				</Link>

				<Link to="/parking">
				<ListItem key='Locations' disablePadding>
				<ListItemButton>
					<ListItemIcon>
					<InboxIcon /> 
					</ListItemIcon>
					<ListItemText primary="Locations" />
				</ListItemButton>
				</ListItem>
				</Link>

			<Divider />
			</List>

		</Box>
		);
		const toggleDrawer =
		(anchor: Anchor, open: boolean) =>
		(event: React.KeyboardEvent | React.MouseEvent) => {
		if (
			event &&
			event.type === 'keydown' &&
			((event as React.KeyboardEvent).key === 'Tab' ||
			(event as React.KeyboardEvent).key === 'Shift')
		) {
			return;
		}

		setState({ ...state, [anchor]: open });
		};
	const theme = useTheme();
	const matches = useMediaQuery(theme.breakpoints.up('sm'));
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
		</React.Fragment>
	)};

	function MobileAppbar() {
		return (
			<React.Fragment>
			<div>				
				<SwipeableDrawer
					anchor={"bottom"}
					open={state["bottom"]}
					onClose={toggleDrawer('bottom', false)}
					onOpen={toggleDrawer('bottom', true)}
				>
					{list("bottom")}
				</SwipeableDrawer>
			</div>
			<Box sx={{ flexGrow: 1 }}>
			<AppBar position="static" 
			>
				<Toolbar className={classes.mAppbar} >
				<IconButton
					size="large"
					edge="start"
					color="inherit"
					aria-label="menu"
					sx={{ mr: 2 }}
					onClick={toggleDrawer("bottom", true)}
				>
					<MenuIcon />
				</IconButton>
				<Link
							color="textPrimary"
							href="#"
							className={classes.link}
							component={NavLink}
							to="/"
						>
							Home
						</Link>
				{(isAuthenticated && user)? authLinksMobile() :  guestLinks()}

				</Toolbar>
			</AppBar>
			</Box>
			</React.Fragment>
		);
		}
		
	const authLinks = () => {
		return(
			<React.Fragment>
					<Button
						href="#"
						variant="outlined"
						component={NavLink}
						to="login"
						onClick={logout}
					>
						Logout
					</Button>
					<Link to="/dashboard" className={classes.fullLink}>
					<div>Hallo, {user.first_name}</div>
					</Link>
			</React.Fragment>
		)  
	};
	const authLinksMobile = () => {
		return(
			<React.Fragment>
					<Button
						href="#"
						color="secondary"
						variant="outlined"
						component={NavLink}
						to="login"
						onClick={logout}
					>
						Logout
					</Button>
					<Link to="/dashboard" className={classes.link}>
					<div>Hallo, {user.first_name}</div>
					</Link>
			</React.Fragment>
		)  
	};



	const FullSizeAppBar = () => {
		return(
		<React.Fragment>
			<CssBaseline />
			<AppBar
				position="relative"
				color="black"
				elevation={0}
				className={classes.appBar}
				xs={{ display: { xs: "none" }}}
			>
				<Toolbar className={classes.toolbar}>
					<Typography
						variant="button"
						noWrap
						className={classes.toolbarTitle}
					> 
						<Link
							className={classes.fullLink}
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
							className={classes.fullLink}
							component={NavLink}
							to="/map"
						>
							Karte
						</Link>
						<Link
							color="textPrimary"
							href="#"
							className={classes.fullLink}
							component={NavLink}
							to="/tours"
						>
							Touren
						</Link>
						<Link
							color="textPrimary"
							href="#"
							className={classes.fullLink}
							component={NavLink}
							to="/huts"
						>
							Huetten
						</Link>
						<Link
							color="textPrimary"
							href="#"
							className={classes.fullLink}
							component={NavLink}
							to="/parking/"
						>
							Locations
						</Link>
						
						{(isAuthenticated && user)? authLinks() :  guestLinks()}

				</Toolbar>
			</AppBar>
		</React.Fragment>)
	}
	return (
		(matches ? FullSizeAppBar(): MobileAppbar())
	);
	}

	const mapStateToProps = state => ({
	isAuthenticated: state.auth.isAuthenticated,
	user: state.auth.user,
	});

	export default connect(mapStateToProps, { logout })(Header);