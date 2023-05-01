import React from 'react'
import { useLocation } from 'react-router-dom';
import Header from './Header.tsx';
import ListHeader from './ListHeader.tsx';

const HeaderWrapper = () => {
    const { pathname } = useLocation();
	if(pathname == "/tours" || pathname == "/parking/" || pathname == "/huts") return (<ListHeader/>);
  return (
    <Header/>
    )
}

export default HeaderWrapper