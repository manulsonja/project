import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { verify } from '../../actions/auth';
import { useParams } from 'react-router-dom';

//MaterialUI
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';


const useStyles = makeStyles((theme) => ({
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));



const Activate = ({ verify }) => {
    const params = useParams()
	const classes = useStyles();

    const [verified, setVerified] = useState(false);

    const verify_account = e => {
        const uid = params.uid;
        const token = params.token;

        verify(uid, token);
        setVerified(true);
    };

    if (verified) {
        return <Navigate to='/' />
    }

    return (

		<Container component="main" maxWidth="xs">
				<Typography component="h1" variant="h5">
                Verifizieren
                </Typography>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
                        onClick={verify_account}
					>
						Verify
					</Button>
            </Container> 

    );
};

export default connect(null, { verify })(Activate);