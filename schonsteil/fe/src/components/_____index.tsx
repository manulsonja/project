import React from 'react';
import ReactDOM from "react-dom/client";
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
import Leaflet from './components/map';
import Gallery from './components/gallery.js';
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>

<BrowserRouter>
			<Header />
			<Routes>
				<Route exact path="" element={<App/>} />
        			<Route path="/tour/:category/:slug" element={<SingleTour/>} />
					<Route path="/register" element={<Register/>} />
					<Route path="/login" element={<Login/>} />
					<Route path="/logout" element={<Logout/>} />
				</Routes>
{/* 			<Footer />
 */}	</BrowserRouter>
 
  </React.StrictMode>
);

reportWebVitals();




// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();