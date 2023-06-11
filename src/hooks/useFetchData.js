import { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';


const useFetchData = (url, req, token) => {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const [status, setStatus] = useState({
        data: null,
        isLoading: true
    })

    function fetch(url = null, req = null, token = null, instance = null, type = null) {
        type === 'histoGram' && setIsLoading(true)

        const searchInstance = axios.create({
            baseURL: 'https://gateway.scan-interfax.ru',
            timeout: 10000,
            headers: {
                Accept: 'application/json',
            }
        });

        const loginInstance = axios.create({
            baseURL: 'https://gateway.scan-interfax.ru',
            method: "POST",
            timeout: 10000,
            headers: {
                Accept: 'application/json',
            }
        });

        const queryInstance = axios.create({
            baseURL: 'https://gateway.scan-interfax.ru',
            method: "GET",
            timeout: 10000,
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
                setError(error);
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
                setError(error);
            }
        );

        searchInstance.interceptors.response.use(function (response) {
            console.log('response', response)
            type === 'histoGram' && 
                dispatch({ type: 'ADD_HISTOGRAM', payload: [response.data.data, isLoading] })
            type === 'idList' && 
                dispatch({ type: 'ADD_DOC_IDS', payload: response.data.items })
            type === 'docs' && dispatch({ type: 'ADD_DOCUMENTS', payload: response.data })

            return response;
            
          }, function (error) {
            setError(error);
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
                    setError(error);
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
                    setError(error);
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
                    setError(error);
                })
        }

    }

    return {error, status, fetch}
}

export default useFetchData;