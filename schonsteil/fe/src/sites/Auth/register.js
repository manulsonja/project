import React, { useState } from 'react';
import {  Navigate } from 'react-router-dom';
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
import axios from 'axios';
import { signup } from '../../actions/auth';
import { TooShortAlert, ExistsAlert, NoInputAlert, NoMatchAlert} from '../../components/alerts/SuAlert.tsx';
import { Link } from 'react-router-dom';
import { FormControl } from '@material-ui/core';
import { clearerror } from '../../actions/auth';

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

const SignUp = ({ signup, isAuthenticated, errorMessage, clearerror }) => {
	const classes = useStyles();
	const [accountCreated, setAccountCreated] = useState(false);
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        re_password: '',
        user_name: '',
		errorMessage: '',
    });

    const { email, user_name, first_name, last_name, password, re_password  } = formData;
    const onChange = e =>  {
		clearerror()
		setFormData({ ...formData, [e.target.name]: e.target.value, errorMessage:'' });}
	const onSubmit = e => {
        e.preventDefault();
		if(formData.first_name=='' || formData.last_name=='' || formData.email=='' || formData.password=='' || formData.re_password=='' || formData.user_name =='') {
			setFormData({...formData, errorMessage:'noInput'})}
        else if (password === re_password) {
            signup(first_name, last_name, email, password, re_password, user_name);
            setAccountCreated(true);
        }
		else setFormData({ ...formData, errorMessage: 'noMatch' });
    };

    const continueWithGoogle = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/auth/o/google-oauth2/?redirect_uri=${process.env.REACT_APP_API_URL}/google`)

            window.location.replace(res.data.authorization_url);
        } catch (err) {
        }
    };
   const continueWithFacebook = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/auth/o/facebook/?redirect_uri=${process.env.REACT_APP_API_URL}/facebook`)

            window.location.replace(res.data.authorization_url);
        } catch (err) {
   }
    };
    if (isAuthenticated) {
        return <Navigate to='/' /> }
		return (
		<React.Fragment>
			{ (errorMessage == 'new user with this email address already exists.') ? <ExistsAlert/>: null }
			{ (errorMessage == 'This password is too short. It must contain at least 8 characters.') ? <TooShortAlert/>: null }
			{ (formData.errorMessage == 'noInput') ? <NoInputAlert/>: null }
			{ (formData.errorMessage == 'noMatch') ? <NoMatchAlert/>: null }

		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<div className={classes.paper}>
				<Avatar className={classes.avatar}></Avatar>
				<Typography component="h1" variant="h5">
					Registrieren
				</Typography>
				<FormControl className={classes.form}>
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
						id="user_name"
						label="Benutzername"
						name="user_name"
						autoComplete="user+name"
						autoFocus
						onChange={e => onChange(e)}

					/>
						<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						id="first_name"
						label="Vorname"
						name="first_name"
						autoComplete="first_name"
						autoFocus
						onChange={e => onChange(e)}
				/>
						<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						id="last_name"
						label="Nachname"
						name="last_name"
						autoComplete="last_name"
						autoFocus
						onChange={e => onChange(e)}
					/>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						name="password"
						label="Passwort"
						type="password"
						id="password"
						autoComplete="current-password"
						onChange={e => onChange(e)}
					/>
						<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						name="re_password"
						label="Passwort"
						type="password"
						id="re_password"
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
						Registrieren
					</Button>
					<Grid container>
						<Grid item xs>
							<Link to="/reset-password" variant="body2">
								Passwort vergessen?
							</Link>
						</Grid>
						<Grid item>
							<Link to="/login" variant="body2">
								{"Haben Sie einen Account? Log In"}
							</Link>
						</Grid>
					</Grid>
				</FormControl>
				<button className='btn btn-danger mt-3' onClick={continueWithGoogle}>
                Continue With Google
            </button>
            <br />
            <button className='btn btn-primary mt-3' onClick={continueWithFacebook}>
                Continue With Facebook
            </button>
			</div>
		</Container></React.Fragment>
	);
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
	errorMessage: state.auth.errorMessage
});

export default connect(mapStateToProps, { signup, clearerror })(SignUp);