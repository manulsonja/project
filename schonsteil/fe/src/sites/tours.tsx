import * as React from 'react';
import axiosInstance from '../utils/axios';
import { useState, useEffect } from 'react';
import Tours from '../components/Tours.tsx';

export default function TourList(props) {
	const [appState, setAppState] = useState({
		loading: false,
		posts: null,
	});

	useEffect(() => {
        const url = 'touren/touren/'
		axiosInstance.get(url).then((res) => {
			const allPosts = res.data;
			setAppState({ ...appState,loading: false, posts: allPosts });
		});
	},[]);

if ((!appState.posts || appState.posts.length === 0) ) return <p>Bergrettung kann nicht ausruecken.</p>;
  return (
    <React.Fragment>
    <Tours props={appState}/>
    </React.Fragment>

);

}




