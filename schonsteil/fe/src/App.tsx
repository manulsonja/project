	import React from 'react';
	import {
	BrowserRouter,
	Routes, // instead of "Switch"
	Route,
	} from "react-router-dom";
	import Map from './sites/Map/Map.tsx';
	import Footer from './components/Footer';
	import SingleTour from './sites/SingleSites/SingleTour.js';
	import Register from './sites/Auth/register.js';
	import Login from './sites/Auth/login.js';
	import SingleHut from './sites/SingleSites/SingleHut/SingleHut.js';
	import SingleParking from './sites/SingleSites/SingleParking/SingleParking.js';
	import Landing from './sites/LandingPage.tsx';
	import PrivateRoute from './utils/PrivateRoute';
	import { ThemeProvider } from '@mui/material/styles';
	import ResetPassword from './sites/Auth/resetPassword.js';
	import ResetPasswordConfirm from './sites/Auth/resetPasswordConfirm.js';
	import Activate from './sites/Auth/activate.tsx';
	import Layout from './hocs/Layout';
	import { Provider } from 'react-redux';
	import store from './store';
	import Facebook from './sites/Auth/Facebook.js';
	import Google from './sites/Auth/Google.js';
	import Dashboard from './dashboard/Dashboard.tsx';
	import theme from './theme';
	import Tours from './sites/ListViews/Tours.tsx';
	import Huts from './sites/ListViews/Huts.tsx';
	import Locations from './sites/ListViews/Locations.tsx';
	
	const App = () => {
	return (
	<Provider store={store}>
	<BrowserRouter>
			<Layout>
			<ThemeProvider theme={theme}>
			<Routes>
				<Route exact path=""element={
					<PrivateRoute>
						<Landing />
					</PrivateRoute>
				}/>	
					<Route exact path="map" element={<Map/>} />
					
					{/* --------------------------------------------------------- */}
					<Route exact path="tours" element={<Tours/>} />
					<Route path="/tour/:category/:slug" element={<SingleTour/>} />
					
					{/* --------------------------------------------------------- */}
					<Route exact path="huts" element={<Huts/>} />
					<Route path="/hut/:slug" element={<SingleHut/>} />
					
					{/* --------------------------------------------------------- */}
					<Route exact path="parking" element={<Locations/>} />
					<Route path="/parking/:slug" element={<SingleParking/>} />
					
					{/* ------------------  Authentication----------------------- */}

					<Route path="/register" element={<Register/>} />
					<Route path="/dashboard" element={<Dashboard/>} />

					<Route path="/login" element={<Login/>} />
					<Route path="/reset-password" element={<ResetPassword/>} />
					<Route path="/password/reset/confirm/:uid/:token" element={<ResetPasswordConfirm/>} />
					<Route path="/activate/:uid/:token" element={<Activate/>} />
					<Route exact path='/facebook' element={<Facebook/>} />
					<Route exact path='/google' element={<Google/>} />
				</Routes>
				<Footer />
	</ThemeProvider>
	</Layout>
	</BrowserRouter>
	</Provider>
	)
	}

	export default App




