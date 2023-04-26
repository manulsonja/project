import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { connect } from 'react-redux';
import { reset_password } from '../actions/auth';
import { Link, Navigate } from 'react-router-dom';
import { NoEmailAlert } from '../components/alerts/SuAlert.tsx';
import { clearerror, successmessage } from '../actions/auth';

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


const ResetPassword = ({ reset_password, errorMessage, clearerror, successmessage }) => {
	const reg = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
	const classes = useStyles();
    const [requestSent, setRequestSent] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
		errormsg:'',
    });

    const { email } = formData;
    const onChange = e =>  {
		setFormData({ ...formData, [e.target.name]: e.target.value, errormsg:'' });
		clearerror()
	}
 
    const onSubmit = e => {
		e.preventDefault();
		if(email=='') setFormData({ ...formData, errormsg: 'noInput' });
		else if(!reg.test(email)) {
			setFormData({ ...formData, errormsg: 'noInput' });
			console.log('heureka')
		}
		else {
			reset_password(email);
			setRequestSent(true);
			successmessage()
		}		
    };

	const  renderform = () => {
		return(
	<Container component="main" maxWidth="xs">
	<CssBaseline />
	<div className={classes.paper}>
		<Avatar className={classes.avatar}></Avatar>
		<Typography component="h1" variant="h5">
			Passwort Zuruecksetzen
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
			<Button
				type="submit"
				fullWidth
				variant="contained"
				color="primary"
				className={classes.submit}
				onClick={e => onSubmit(e)}
			>
				Abschicken
			</Button>
			<Grid container>
				<Grid item>
					<Link to="/register" variant="body2">
						{"Don't have an account? Sign Up"}
					</Link>
				</Grid>
			</Grid>
		</form>
	</div>
</Container>
)}
	return (
		<React.Fragment>
				{requestSent==true? <Navigate to='/login'/> : null}
				{((formData.errormsg=='noInput' || errorMessage == 'Enter a valid email address.')? <NoEmailAlert/>: null)}
				{renderform()}
		</React.Fragment>
	);
}


const mapStateToProps = state => ({
	errorMessage: state.auth.errorMessage
});

export default connect(mapStateToProps, { reset_password, clearerror, successmessage })(ResetPassword);