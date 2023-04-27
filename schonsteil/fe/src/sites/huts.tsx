import * as React from 'react';
import axiosInstance from '../utils/axios';
import { useState, useEffect } from 'react';
import Huts from '../components/Huts.tsx';
import CssBaseline from '@mui/material/CssBaseline';

export default function HutList(props) {
	const [appState, setAppState] = useState({
		loading: false,
		posts: null,
	});

	useEffect(() => {
        const url = 'huts/'
		axiosInstance.get(url).then((res) => {
			const allPosts = res.data;
			setAppState({ ...appState,loading: false, posts: allPosts });
		});
	}, []);

if ((!appState.posts || appState.posts.length === 0) ) return <p>Bergrettung kann nicht ausruecken.</p>;
  return (
    <React.Fragment>
            <CssBaseline /> 
            <Huts props={appState}/>
    </React.Fragment>
);


}




