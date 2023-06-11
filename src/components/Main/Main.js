import React from 'react';
import { Routes, Route } from 'react-router-dom';
import css from './Main.module.css';
import Home from '../Home';
import Authorization from '../Authorization';
import Search from '../Search/Search';
import NotFound from '../NotFound/NotFound';

const Main = () => {
	return (
		<main className={css.main}>			
                <Routes>
                    <Route path ='/' element={<Home />} />    
                    <Route path ='authorization' element={<Authorization />} />
                    <Route path ='search' element={<Search />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>                   
		</main>
	)
}

export default Main;