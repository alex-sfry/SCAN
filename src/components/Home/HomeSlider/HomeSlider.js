import React from 'react';
import css from './HomeSlider.module.css';
import Arrow from '../../Arrow/Arrow';
import Carousel from '../../Carousel/Carousel.js';
import cards from '../../../data/whyUsCards.js'

const HomeSlider = () => {
    //create cards array for slider from array of objects (whyUsCards.js)
    const slides = cards.map(item => {
        return <div className={css.cardContainer}>
            <img src={item.icon} alt="" />
            <p>{item.text}</p>
        </div>
    })

    return (
        <section className={css.homeSlider}>
            <div className={css.homeSliderTop}>
                <h2 className={css.homeSliderHeading}>
                    Почему именно мы
                </h2>
                <Carousel
                    sliderClass={'homeSlider'}
                    slides={slides}
                    sliderSettings={{
                        dots: false,
                        infinite: true,
                        speed: 500,
                        slidesToShow: 3,
                        slidesToScroll: 1,
                        arrows: true,
                        className: 'homeSlider',
                        nextArrow: <Arrow direction={'arrowRight'} parentSlider={'homeSlider'} />,
                        prevArrow: <Arrow direction={'arrowLeft'} parentSlider={'homeSlider'} />,
                        responsive: [
                            {
                                breakpoint: 1024,
                                settings: {
                                    slidesToShow: 2,
                                    slidesToScroll: 1,
                                    infinite: true,
                                }
                            },
                            {
                                breakpoint: 768,
                                settings: {
                                    slidesToShow: 1,
                                    slidesToScroll: 1,

                                }
                            }
                        ]
                    }}
                />
            </div>
            <div className={css.homeSliderBottom}></div>
        </section>
    )
}

export default HomeSlider;