import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
//MaterialUI
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { connect } from 'react-redux';
import axios from 'axios';
import { signup } from '../actions/auth';

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


const SignUp = ({ signup, isAuthenticated }) => {
	const classes = useStyles();

	const [accountCreated, setAccountCreated] = useState(false);
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        re_password: '',
        user_name: ''

    });


    const { email, user_name, first_name, last_name, password, re_password  } = formData;
    const onChange = e =>  setFormData({ ...formData, [e.target.name]: e.target.value });
	const onSubmit = e => {
        e.preventDefault();

        if (password === re_password) {
            signup(first_name, last_name, email, password, re_password, user_name);
            setAccountCreated(true);
        }
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
        return <Navigate to='/' />
    }

	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<div className={classes.paper}>
				<Avatar className={classes.avatar}></Avatar>
				<Typography component="h1" variant="h5">
					Registrieren
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
							<Link href="#" variant="body2">
								Passwort vergessen?
							</Link>
						</Grid>
						<Grid item>
							<Link href="#" variant="body2">
								{"Haben Sie einen Account? Log In"}
							</Link>
						</Grid>
					</Grid>
				</form>
			</div>
		</Container>
	);
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { signup })(SignUp);