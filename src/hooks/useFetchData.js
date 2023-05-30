import { useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';

const useFetchData = (url, req, token) => {
    //const selectedData = useSelector((state) => state, shallowEqual);
    const dispatch = useDispatch();
    const [idList, setIdList] = useState(null)
    const [histoGram, setHistoGram] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [status, setStatus] = useState({
        data: null,
        isLoading: true
    })

    function fetch(url = null, req = null, token = null, instance = null, type = null) {
        type === 'histoGram' && setIsLoading(true)

        const searchInstance = axios.create({
            baseURL: 'https://gateway.scan-interfax.ru',
            timeout: 5000,
            headers: {
                Accept: 'application/json',
            }
        });

        const loginInstance = axios.create({
            baseURL: 'https://gateway.scan-interfax.ru',
            method: "POST",
            timeout: 5000,
            headers: {
                Accept: 'application/json',
            }
        });

        const queryInstance = axios.create({
            baseURL: 'https://gateway.scan-interfax.ru',
            method: "GET",
            timeout: 5000,
            headers: {
                Accept: 'application/json',
            }
        });

        queryInstance.interceptors.request.use(
            (config) => {
                if (token) {
                    config.headers['Authorization'] = `Bearer ${token}`;
                }
                return config;
            },
            (error) => {
                Promise.reject(error);
            }
        );

        searchInstance.interceptors.request.use(
            (config) => {
                if (token) {
                    config.headers['Authorization'] = `Bearer ${token}`;
                }
                return config;
            },
            (error) => {
                Promise.reject(error);
            }
        );

        searchInstance.interceptors.response.use(function (response) {
            console.log(response)
            type === 'histoGram' && /* setHistoGram(response.data.data) */ 
                dispatch({ type: 'ADD_HISTOGRAM', payload: [response.data.data, isLoading] })
            type === 'idList' && /* setIdList(response.data) */
                dispatch({ type: 'ADD_DOC_IDS', payload: response.data.items })
            type === 'docs' && dispatch({ type: 'ADD_DOCUMENTS', payload: response.data })

            return response;
            
          }, function (error) {
            // Any status codes that falls outside the range of 2xx cause this function to trigger
            // Do something with response error
            return Promise.reject(error);
          });
        
        if (instance === 'searchInstance') {
            searchInstance({
                method: 'POST',
                url: url,
                data: req
            })
                .then(function (response) {
                    setIsLoading(false)
                    
                })
                .catch(function (error) {
                    console.log(error);
                    setIsLoading(false)
                })
        }

        if (instance === 'loginInstance') {
            loginInstance({
                url: url,
                data: req
            })
                .then(function (response) {
                    setStatus({ data: response, isLoading: false })
                })
                .catch(function (error) {
                    console.log(error);
                })
        }

        if (instance === 'queryInstance') {
            queryInstance({
                url: url
            })
                .then(function (response) {
                    setStatus({ data: response, isLoading: false })
                })
                .catch(function (error) {
                    console.log(error);
                })
        }

    }

    return {idList, histoGram, isLoading, status, fetch}
}

export default useFetchData;