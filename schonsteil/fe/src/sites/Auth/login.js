	import React, { useState } from 'react';
	import { useNavigate, Navigate } from 'react-router-dom';
	//MaterialUI
	import Avatar from '@material-ui/core/Avatar';
	import Button from '@material-ui/core/Button';
	import CssBaseline from '@material-ui/core/CssBaseline';
	import TextField from '@material-ui/core/TextField';
	import FormControlLabel from '@material-ui/core/FormControlLabel';
	import Checkbox from '@material-ui/core/Checkbox';
	import Grid from '@material-ui/core/Grid';
	import Typography from '@material-ui/core/Typography';
	import { makeStyles } from '@material-ui/core/styles';
	import Container from '@material-ui/core/Container';
	import { connect } from 'react-redux';
	import { login, clearerror } from '../../actions/auth';
	import axios from 'axios';
	import AuthAlerts from '../../components/alerts/loginAlerts.tsx';
	import { Link } from 'react-router-dom';
	import { NoInputAlert, ResetSuccessAlert } from '../../components/alerts/SuAlert.tsx';

	const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
	}));


	const SignIn = ({ login, clearerror, isAuthenticated, errorMessage }) => {
	const classes = useStyles();
	const [formData, setFormData] = useState({
		email: '',
		password: '',
		errormsg: '',
	});

	const { email, password } = formData;
	const onChange = e =>  {
		setFormData({ ...formData, [e.target.name]: e.target.value, errormsg:'' }); 
		clearerror()
		}
	const onSubmit = e => {
		if(formData.email =='' || formData.password=='') setFormData({...formData, errormsg: 'noInput'});
			e.preventDefault();
			login(email, password);
		
			
	};

	const continueWithGoogle = async () => {
		try {
			const res = await axios.get(`${process.env.REACT_APP_API_URL}/auth/o/google-oauth2/?redirect_uri=${process.env.REACT_APP_API_URL}/google`)

			window.location.replace(res.data.authorization_url);
		} catch (err) {
			console.log(err)
		}
	};

	const continueWithFacebook = async () => {
		try {
			const res = await axios.get(`${process.env.REACT_APP_API_URL}/auth/o/facebook/?redirect_uri=${process.env.REACT_APP_API_URL}/facebook`)

			window.location.replace(res.data.authorization_url);
		} catch (err) {
			console.log(err)
		}
	};

	if (isAuthenticated) {
		return <Navigate to='/' />
	}

	return (			

		<React.Fragment>		
		{ (errorMessage == 'No active account found with the given credentials')? <AuthAlerts/> : null }
		{ (errorMessage == 'success')? <ResetSuccessAlert/> : null }

		{ (formData.errormsg=='noInput') ? <NoInputAlert/>: null } 
		
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<div className={classes.paper}>
				<Avatar className={classes.avatar}></Avatar>
				<Typography component="h1" variant="h5">
					Sign in
				</Typography>
				<form className={classes.form} noValidate>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						id="email"
						label="Email Address"
						name="email"
						autoComplete="email"
						autoFocus
						onChange={e => onChange(e)}

					/>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						name="password"
						label="Password"
						type="password"
						id="password"
						autoComplete="current-password"
						onChange={e => onChange(e)}

					/>
					<FormControlLabel
						control={<Checkbox value="remember" color="primary" />}
						label="Remember me"
					/>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
						onClick={e => onSubmit(e)}

					>
						Sign In
					</Button>
					<Grid container>
						<Grid item xs>
							<Link to="/reset-password" variant="body2">
								Forgot password?
							</Link>
						</Grid>
						<Grid item>
							<Link to="/register" variant="body2">
								{"Don't have an account? Sign Up"}
							</Link>
						</Grid>
					</Grid>
		
				</form>
				<button className='btn btn-danger mt-3' onClick={continueWithGoogle}>
				Continue With Google
			</button>
			<br />
			<button className='btn btn-primary mt-3' onClick={continueWithFacebook}>
				Continue With Facebook
			</button>
			</div>
		</Container>
		</React.Fragment>
	);
	}

	const mapStateToProps = state => ({
	isAuthenticated: state.auth.isAuthenticated,
	errorMessage: state.auth.errorMessage
	});

	export default connect(mapStateToProps, { login, clearerror })(SignIn);