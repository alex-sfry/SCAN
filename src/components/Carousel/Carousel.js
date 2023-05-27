import React, { useRef } from 'react';
import css from './Carousel.module.css';
import './slick-styles.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import uniqid from 'uniqid';

export const Carousel = ({ sliderClass, slides, sliderSettings }) => {
    const settings = sliderSettings;
    const sliderRef = useRef();

    const slideList = slides.map(item => {
        return <div key={uniqid()} className={css.intSlide} >
            {item}
        </div>
    })
    
    return (
        <div className= {css[sliderClass]}>
            <Slider ref={sliderRef} {...settings} >
                {slideList}
            </Slider>
        </div>
    )
}

export default Carousel;