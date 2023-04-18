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

const routing = (
	<BrowserRouter>
			<Header />
			<Routes>
					<Route exact path="" element={<App/>} />
					<Route exact path="huts" element={<HutList/>} />

        			<Route path="/tour/:category/:slug" element={<SingleTour/>} />
					<Route path="/register" element={<Register/>} />
					<Route path="/login" element={<Login/>} />
					<Route path="/logout" element={<Logout/>} />
				</Routes>
{/* 			<Footer />
 */}	</BrowserRouter>
);

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();