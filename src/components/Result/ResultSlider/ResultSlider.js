import { React, useEffect, useState } from 'react';
import css from './ResultSlider.module.css';
import Carousel from '../../Carousel/Carousel.js';
import Arrow from '../../Arrow/Arrow';
import { useSelector, shallowEqual } from 'react-redux';
import spinner from '../../../assets/images/histogram-spinner.svg';

const ResultSlider = ({ slides, slidesToShow }) => {
    const [varQty, setVarQty] = useState(0)
    const selectedData = useSelector((state) => state, shallowEqual);

    useEffect(() => {
        if (Object.hasOwn(selectedData.query, 'histogram')) {
            if (Object.hasOwn(selectedData.query.histogram, 'totalDocuments')) {
                setVarQty(selectedData.query.histogram.totalDocuments.length);
            }
        }
    }, [selectedData.query])
    console.log('varQty', varQty)
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
                            <img className={css.spinner} src={spinner} alt="загружается..." width={50} height={50} />
                        </div> :
                        slidesToShow.length === 0 ? <div></div> :
                            <Carousel
                                sliderClass={'resultSlider'}
                                slides={slides}
                                sliderSettings={{
                                    variableWidth: slidesToShow < 8 ? true : false,
                                    dots: false,
                                    infinite: true,
                                    speed: 500,
                                    slidesToShow: slidesToShow,
                                    slidesToScroll: 1,
                                    arrows: true,
                                    className: 'resultSlider',
                                    nextArrow: <Arrow direction={'arrowRight'} parentSlider={'resultSlider'} />,
                                    prevArrow: <Arrow direction={'arrowLeft'} parentSlider={'resultSlider'} />,
                                    responsive: [
                                        // {
                                        //     breakpoint: 1200,
                                        //     settings: {
                                        //         slidesToShow: 5,
                                        //         slidesToScroll: 1,
                                        //         infinite: true,
                                        //         dots: true
                                        //     }
                                        // },
                                        {
                                            breakpoint: 1024,
                                            settings: {
                                                slidesToShow: slidesToShow < 5 ? slidesToShow: 5,
                                                slidesToScroll: 1,
                                                variableWidth: true
                                            }
                                        },
                                        {
                                            breakpoint: 768,
                                            settings: {
                                                slidesToShow: 1,
                                                slidesToScroll: 1
                                            }
                                        }
                                    ]
                                }
                                }
                            />
                }
            </div>
        </>
    )
}

export default ResultSlider;