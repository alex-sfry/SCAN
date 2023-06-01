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
    const dispatch = useDispatch();
    const { fetch } = useFetchData();
    //const [loadedQty, setLoadedQty] = useState(0)
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
        if (Object.hasOwn(selectedData.query, 'histogram') /* && selectedData.query.loadedDocsQty === 0 */) handleResult()
    }, [selectedData.query])

    //let ignoreFetch = true
    let shouldFetch = useRef(true);

    useEffect(() => {
        if (Object.hasOwn(selectedData.query, 'docIDs') && docsToShow > 0) {
            if (selectedData.query.docs.length === 0) {
                for (let i = 0; i < docsToShow; i++) {
                    req.ids.push(selectedData.query.docIDs[i].encodedId)
                }

                if (shouldFetch.current && selectedData.query.loadedDocsQty < selectedData.query.docIDs.length) {
                    shouldFetch = false;
                    fetch('/api/v1/documents', req, token, 'searchInstance', 'docs')
                    slides.length > 0 && dispatch({ type: 'ADD_LOADED_DOCS_QTY', payload: docsToShow })
                    //setLoadedQty(docsToShow)
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
            const sortedTotalDocsQty = totalDocsQty.sort((b, a) => moment(a.date).diff(b.date))
            const sortedRiskFactorsQty = riskFactorsQty.sort((b, a) => moment(a.date).diff(b.date))
            console.log('sortedTotalDocsQty', sortedTotalDocsQty)
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
            setSlides([])
        }
    }

    const handleClick = () => {
        console.log('loadedQty', selectedData.query.loadedDocsQty)
        let toLoadQty;

        if (selectedData.query.loadedDocsQty >= selectedData.query.docIDs.length) return
        const req = { ids: [] };

        if (selectedData.query.docIDs.length - selectedData.query.loadedDocsQty < 10) {
            toLoadQty = selectedData.query.docIDs.length
        } else toLoadQty = selectedData.query.loadedDocsQty + 10

        for (let i = selectedData.query.loadedDocsQty; i < toLoadQty; i++) {
            req.ids.push(selectedData.query.docIDs[i].encodedId)
        }
        dispatch({ type: 'ADD_LOADED_DOCS_QTY', payload: toLoadQty })
        //setLoadedQty(toLoadQty)
        fetch('/api/v1/documents', req, token, 'searchInstance', 'docs')
    }

    return (
        <div className={css.result}>
            <ResultTop />
            {
                // Object.hasOwn(selectedData.query, 'histogram') &&
                <ResultSlider slides={slides} slidesToShow={slidesToShow} />
            }
            {
                !selectedData.query.histIsLoading && selectedData.query.docIDs ?
                    <ResultDocuments /* loadedQty={loadedQty} */ handleClick={handleClick} /> :
                    null
            }
        </div>
    )
}

export default Result;