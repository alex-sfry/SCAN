import { React, useEffect, useState, useRef } from 'react';
import css from './Result.module.css';
import Arrow from '../Arrow/Arrow';
import Carousel from '../Carousel/Carousel.js';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import moment from "moment";
import useFetchData from '../../hooks/useFetchData.js';


const Result = () => {
    const selectedData = useSelector((state) => state, shallowEqual);
    //const dispatch = useDispatch();
    const { fetch } = useFetchData();
    const [loadedQty, setLoadedQty] = useState(0)
    const token = selectedData.login.token.accessToken;
    const req = { ids: [] };

    for (let i = 0; i < 2; i++) {
        req.ids.push(selectedData.query.docIDs[i].encodedId)
    }

    let shouldFetch = useRef(true);
    useEffect(() => {
        if (shouldFetch.current) {
            shouldFetch = false;
            fetch('/api/v1/documents', req, token, 'searchInstance', 'docs')
            setLoadedQty(2)
        }
    }, [])

    const totalDocsQty = selectedData.query.histogram.totalDocuments;
    const riskFactorsQty = selectedData.query.histogram.riskFactors;

    //sorting by date
    const sortedTotalDocsQty = totalDocsQty.sort((a, b) => moment(a.date).diff(b.date))
    const sortedRiskFactorsQty = riskFactorsQty.sort((a, b) => moment(a.date).diff(b.date))
    const slidesToShow = sortedTotalDocsQty.length >= 8 ? 8 : sortedTotalDocsQty.length
    const formatDate = (date) => {
        return moment(date).utc().format('DD-MM-YYYY')
    }

    const slides = sortedTotalDocsQty.map((item, index) => {
        return <div className={css.resultCard}>
            <p className={css.cardDate}>{formatDate(item.date)}</p>
            <p>{item.value}</p>
            <p>{sortedRiskFactorsQty[index].value}</p>
        </div>
    })

    const handleClick = () => {
        if (loadedQty === 17) return
        const req = { ids: [] };

        for (let i = loadedQty; i < loadedQty + 2; i++) {
            req.ids.push(selectedData.query.docIDs[i].encodedId)
        }

        setLoadedQty(loadedQty + 2)
        fetch('/api/v1/documents', req, token, 'searchInstance', 'docs')
    }

    return (
        <div className={css.result}>
            <div className={css.slider}>
                <div className={css.leftHeader}>
                </div>
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
            </div>
            <button onClick={handleClick} >Load more</button>
        </div>
    )
}

export default Result;