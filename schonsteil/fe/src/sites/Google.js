import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import { googleAuthenticate } from '../actions/auth';
import queryString from 'query-string';
import { Navigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';

const Google = ({ googleAuthenticate, isAuthenticated }) => {
    let location = useLocation();
    useEffect(() => {
        const values = queryString.parse(location.search);
        const state = values.state ? values.state : null;
        const code = values.code ? values.code : null;

        console.log('State: ' + state);
        console.log('Code: ' + code);

        if (state && code) {
            googleAuthenticate(state, code);
        }
    }, [location]);
    if (isAuthenticated) {
        return <Navigate to='/' />
    }
    return (

        <div className='container'>
                        <h1> Ihr LOGIN KONNTE NICHT ZERTIFIZIERT WERDEN</h1>
                    <CircularProgress />
        </div>
    );
};


const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { googleAuthenticate })(Google);