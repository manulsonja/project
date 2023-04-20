import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import './index.css';
import {
  BrowserRouter,
  Routes, // instead of "Switch"
  Route,
} from "react-router-dom";
import App from './App';
import Header from './components/Header';
import Footer from './components/Footer';
import SingleTour from './components/SingleTour';
import Register from './components/register';
import Logout from './components/logout';
import Login from './components/login';
import HutList from './components/huts.tsx';
import ParkingList from './components/parking.tsx';
import TourList from './components/tours.tsx';
import SingleHut from './components/SingleHut';
import SingleParking from './components/singleParking';
import Landing from './LandingPage.tsx';
import PrivateRoute from './utils/PrivateRoute';
import { AuthProvider } from './context/AuthContext';

const routing = (
	<BrowserRouter>
			<AuthProvider>

			<Header />
			<Routes>
			<Route exact path=""element={
            <PrivateRoute>
            	<Landing />
            </PrivateRoute>
          }
        />					
		
					<Route exact path="map" element={<App/>} />
					<Route exact path="huts" element={<HutList/>} />
					<Route exact path="parking" element={<ParkingList/>} />
					<Route exact path="tours" element={<TourList/>} />
        			<Route path="/tour/:category/:slug" element={<SingleTour/>} />
					<Route path="/hut/:slug" element={<SingleHut/>} />
					<Route path="/parking/:slug" element={<SingleParking/>} />
					<Route path="/register" element={<Register/>} />
					<Route path="/login" element={<Login/>} />
					<Route path="/logout" element={<Logout/>} />
				</Routes>
{/* 			<Footer />
 */}	</AuthProvider></BrowserRouter>
);

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();