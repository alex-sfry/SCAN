import React from 'react';
import css from './ResultSlider.module.css';
import Carousel from '../../Carousel/Carousel.js';
import Arrow from '../../Arrow/Arrow';
import { useSelector, shallowEqual } from 'react-redux';
import spinner from '../../../assets/images/histogram-spinner.svg';

const ResultSlider = ({ slides, slidesToShow }) => {
    let varQty = 0;
    const selectedData = useSelector((state) => state, shallowEqual);
    
    if (Object.hasOwn(selectedData.query, 'histogram')) {
        varQty = selectedData.query.histogram.totalDocuments.length;
    }

    return (
        <>
            <div className={css.sliderTitle}>
                <h2 className={css.sliderHeading}>Общая сводка</h2>
                <p className={css.sliderInfo}>Найдено {varQty} вариантов</p>
            </div>
            <div className={css.slider}>
                <div className={css.leftHeader}>
                    <p>Период</p>
                    <p>Всего</p>
                    <p>Риски</p>
                </div>
                {
                    selectedData.query.histIsLoading ?
                        <div className={css.spinnerDiv}>
                            <img className={css.spinner} src={spinner} alt="загружается..." width={50} height={50}/>
                        </div>  :
                        <Carousel
                            sliderClass={'resultSlider'}
                            slides={slides}
                            sliderSettings={{
                                className: 'resultSlider',
                                dots: false,
                                infinite: true,
                                speed: 500,
                                slidesToShow: slidesToShow,
                                slidesToScroll: 1,
                                arrows: true,
                                nextArrow: <Arrow direction={'arrowRight'} parentSlider={'resultSlider'} />,
                                prevArrow: <Arrow direction={'arrowLeft'} parentSlider={'resultSlider'} />
                            }}
                        />
                }
            </div>
        </>
    )
}

export default ResultSlider;