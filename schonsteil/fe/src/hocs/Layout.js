import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { checkAuthenticated, load_user } from '../actions/auth';
import Header from '../components/Header.tsx';
import CssBaseline from '@mui/material/CssBaseline';

const Layout = ({ checkAuthenticated, load_user, children }) => {
    useEffect(() => {
        checkAuthenticated();
        load_user();
    }, []);

    return (
        <div>
            <Header />
            <CssBaseline /> 

            {children}
        </div>
    );
};

export default connect(null, { checkAuthenticated, load_user })(Layout);