import React from 'react';
import {
  BrowserRouter,
  Routes, // instead of "Switch"
  Route,
} from "react-router-dom";
import Map from './sites/Map.tsx';
import Footer from './components/Footer';
import SingleTour from './sites/SingleTour';
import Register from './sites/register';
import Login from './sites/login';
import HutList from './sites/huts.tsx';
import ParkingList from './sites/parking.tsx';
import TourList from './sites/tours.tsx';
import SingleHut from './sites/SingleHut';
import SingleParking from './sites/singleParking';
import Landing from './sites/LandingPage.tsx';
import PrivateRoute from './utils/PrivateRoute';
import { ThemeProvider } from '@mui/material/styles';
import ResetPassword from './sites/resetPassword';
import ResetPasswordConfirm from './sites/resetPasswordConfirm';
import Activate from './sites/activate.tsx';
import Layout from './hocs/Layout';
import { Provider } from 'react-redux';
import store from './store';
import Facebook from './sites/Facebook';
import Google from './sites/Google';
import SingleArticle from './sites/singleArticle';
import Dashboard from './dashboard/Dashboard.tsx';
import theme from './theme';

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
					<Route path="/article/:slug" element={<SingleArticle/>} />
					
					{/* --------------------------------------------------------- */}
					<Route exact path="tours" element={<TourList/>} />
        			<Route path="/tour/:category/:slug" element={<SingleTour/>} />
					
					{/* --------------------------------------------------------- */}
					<Route exact path="huts" element={<HutList/>} />
					<Route path="/hut/:slug" element={<SingleHut/>} />
					
					{/* --------------------------------------------------------- */}
					<Route exact path="parking" element={<ParkingList/>} />
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




