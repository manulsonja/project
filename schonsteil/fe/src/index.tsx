import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import './index.css';
import {
  BrowserRouter,
  Routes, // instead of "Switch"
  Route,
} from "react-router-dom";
import Map from './Map';
import Footer from './components/Footer';
import SingleTour from './sites/SingleTour';
import Register from './sites/register';
import Logout from './components/logout';
import Login from './sites/login';
import HutList from './components/huts.tsx';
import ParkingList from './sites/parking';
import TourList from './components/tours.tsx';
import SingleHut from './components/SingleHut';
import SingleParking from './components/singleParking';
import Landing from './sites/LandingPage.tsx';
import PrivateRoute from './utils/PrivateRoute';
import { ThemeProvider } from '@mui/material/styles';
import theme from './components/theme';
import ResetPassword from './sites/resetPassword';
import ResetPasswordConfirm from './sites/resetPasswordConfirm';
import Activate from './sites/activate';
import Layout from './hocs/Layout';
import { useLocation } from 'react-router-dom'
import { Provider } from 'react-redux';
import store from './store';
import App from './App.tsx';


ReactDOM.render(<App/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();