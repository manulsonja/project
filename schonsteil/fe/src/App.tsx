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
import ParkingList from './sites/parking.tsx';
import TourList from './components/tours.tsx';
import SingleHut from './sites/SingleHut';
import SingleParking from './components/singleParking';
import Landing from './sites/LandingPage.tsx';
import PrivateRoute from './utils/PrivateRoute';
import { ThemeProvider } from '@mui/material/styles';
import theme from './components/theme';
import ResetPassword from './sites/resetPassword';
import ResetPasswordConfirm from './sites/resetPasswordConfirm';
import Activate from './sites/activate';
import Layout from './hocs/Layout';
import { Provider } from 'react-redux';
import store from './store';
import Facebook from './sites/Facebook';
import Google from './sites/Google';
import SingleArticle from './sites/singleArticle';


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
					}
					/>	
					<Route exact path="map" element={<Map/>} />
					<Route exact path="huts" element={<HutList/>} />
					<Route exact path="parking" element={<ParkingList/>} />
					<Route exact path="tours" element={<TourList/>} />
					<Route exact path='/facebook' element={<Facebook/>} />
                    <Route exact path='/google' element={<Google/>} />
        			<Route path="/tour/:category/:slug" element={<SingleTour/>} />
					<Route path="/hut/:slug" element={<SingleHut/>} />
					<Route path="/parking/:slug" element={<SingleParking/>} />
					<Route path="/article/:slug" element={<SingleArticle/>} />
					<Route path="/register" element={<Register/>} />
					<Route path="/login" element={<Login/>} />
					<Route path="/logout" element={<Logout/>} />
					<Route path="/reset-password" element={<ResetPassword/>} />
					<Route path="/password/reset/confirm/:uid/:token" element={<ResetPasswordConfirm/>} />
					<Route path="/activate/:uid/:token" element={<Activate/>} />

				</Routes>
				<Footer />
 </ThemeProvider>
 </Layout>
 </BrowserRouter>
 </Provider>
  )
}

export default App




