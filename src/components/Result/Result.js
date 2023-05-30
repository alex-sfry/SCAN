import { React, useEffect, useState, useRef } from 'react';
import css from './Result.module.css';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import moment from "moment";
import useFetchData from '../../hooks/useFetchData.js';
import ResultSlider from './ResultSlider';
import ResultTop from './ResultTop';
import ResultDocuments from './ResultDocuments';

const Result = () => {
    const selectedData = useSelector((state) => state, shallowEqual);
    //const dispatch = useDispatch();
    const { fetch } = useFetchData();
    const [loadedQty, setLoadedQty] = useState(0)
    const [slides, setSlides] = useState([])
    const [slidesToShow, setSlidesToShow] = useState(1)
    const [docsToShow, setDocsToShow] = useState(0)
    const token = selectedData.login.token.accessToken;
    const req = { ids: [] };

    console.log(selectedData)
    useEffect(() => {
        if (Object.hasOwn(selectedData.query, 'docIDs')) {
            selectedData.query.docIDs.length > 10 ? setDocsToShow(10) : setDocsToShow(selectedData.query.docIDs.length)
        }
    }, [selectedData.query])

    useEffect(() => {
        if (Object.hasOwn(selectedData.query, 'histogram') && loadedQty === 0) handleResult()
    }, [selectedData.query])

    //let ignoreFetch = true
    let shouldFetch = useRef(true);

    useEffect(() => {
        if (Object.hasOwn(selectedData.query, 'docIDs') && docsToShow > 0) {
            if (selectedData.query.docs.length === 0) {
                for (let i = 0; i < docsToShow; i++) {
                    req.ids.push(selectedData.query.docIDs[i].encodedId)
                }

                if (shouldFetch.current) {
                    shouldFetch = false;
                    fetch('/api/v1/documents', req, token, 'searchInstance', 'docs')
                    setLoadedQty(docsToShow)
                }
            }
        }
    }, [docsToShow])

    console.log('docsToShow', docsToShow)

    const handleResult = () => {
        console.log('handleResult')
        if (Object.hasOwn(selectedData.query.histogram, 'totalDocuments')) {
            const totalDocsQty = selectedData.query.histogram.totalDocuments;
            const riskFactorsQty = selectedData.query.histogram.riskFactors;

            //sorting by date
            const sortedTotalDocsQty = totalDocsQty.sort((a, b) => moment(a.date).diff(b.date))
            const sortedRiskFactorsQty = riskFactorsQty.sort((a, b) => moment(a.date).diff(b.date))

            setSlidesToShow(sortedTotalDocsQty.length >= 8 ? 8 : sortedTotalDocsQty.length)

            const formatDate = (date) => {
                return moment(date).utc().format('DD-MM-YYYY')
            }

            setSlides(sortedTotalDocsQty.map((item, index) => {
                return <div className={css.resultCard}>
                    <p className={css.cardDate}>{formatDate(item.date)}</p>
                    <p>{item.value}</p>
                    <p>{sortedRiskFactorsQty[index].value}</p>
                </div>
            }))
        } else {
            setSlidesToShow(1)
            setSlides([<div className={css.resultCard}>0 document found</div>])
        }

    }

    const handleClick = () => {
        console.log('loadedQty', loadedQty)
        let toLoadQty;

        if (loadedQty >= selectedData.query.docIDs.length) return
        const req = { ids: [] };

        if (selectedData.query.docIDs.length - loadedQty < 10) {
            toLoadQty = selectedData.query.docIDs.length
        } else toLoadQty = loadedQty + 10

        for (let i = loadedQty; i < toLoadQty; i++) {
            req.ids.push(selectedData.query.docIDs[i].encodedId)
        }
        setLoadedQty(toLoadQty)
        fetch('/api/v1/documents', req, token, 'searchInstance', 'docs')
    }

    return (
        <div className={css.result}>
            <ResultTop />
            <div className={css.sliderContainer}>
                {
                    // Object.hasOwn(selectedData.query, 'histogram') &&
                    <ResultSlider slides={slides} slidesToShow={slidesToShow} />
                }
            </div>
            {
             !selectedData.query.histIsLoading ? 
                <ResultDocuments handleClick={handleClick} /> : 
                    null
            }
            
        </div>
    )
}

export default Result;