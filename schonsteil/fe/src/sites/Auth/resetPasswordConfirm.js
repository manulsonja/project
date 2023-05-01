import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
//MaterialUI
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { connect } from 'react-redux';
import { reset_password_confirm } from '../../actions/auth';
import { InvalidTokenAlert, SuccessChangeAlert } from '../../components/alerts/SuAlert.tsx';

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


const ResetPasswordConfirm = ({ reset_password_confirm, errorMessage }) => {
	const params = useParams()
	const classes = useStyles();
    const [requestSent, setRequestSent] = useState(false);
    const [formData, setFormData] = useState({
        new_password: '',
		re_new_password: '',

    });

    const { new_password, re_new_password } = formData;
    const onChange = e =>  setFormData({ ...formData, [e.target.name]: e.target.value });
 
    const onSubmit = e => {
        e.preventDefault();

		const uid = params.uid;
		const token = params.token;

        reset_password_confirm(uid, token, new_password, re_new_password);
        setRequestSent(true);
    };


	return (
		<React.Fragment>
        {(errorMessage=='prcs'? <SuccessChangeAlert/>: null)}
		{(errorMessage=='invalid'? <InvalidTokenAlert/>: null)}

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
						name="new_password"
						label="Password"
						type="password"
						id="new_password"
						autoComplete="current-password"
						onChange={e => onChange(e)}

					/>
						<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						name="re_new_password"
						label="Password"
						type="password"
						id="re_new_password"
						autoComplete="current-password"
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
						<Grid item xs>
							<Link href="/reset-password" variant="body2">
							</Link>
						</Grid>
						<Grid item>
							<Link href="#" variant="body2">
								{"Don't have an account? Sign Up"}
							</Link>
						</Grid>
					</Grid>
				</form>
			</div>
		</Container>
		</React.Fragment>

	);
}

const mapStateToProps = state => ({
	errorMessage: state.auth.errorMessage
});
export default connect(mapStateToProps, { reset_password_confirm })(ResetPasswordConfirm);