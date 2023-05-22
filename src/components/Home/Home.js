import React from 'react';
import css from './Home.module.css';
import HomeTop from '../Home/HomeTop';
import HomeSlider from '../Home/HomeSlider';
import HomeTariffs from '../Home/HomeTariffs/HomeTariffs';

const Home = () => {
	return (
		<div className={css.container}>
			<HomeTop />              
            <HomeSlider />
            <HomeTariffs />
		</div>
	)
}

export default Home;