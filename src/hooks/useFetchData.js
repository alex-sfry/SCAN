import { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';

const useFetchData = (url, req, token) => {
    const selectedData = useSelector((state) => state, shallowEqual);
    const dispatch = useDispatch();
    const [idList, setIdList] = useState(null)
    const [histoGram, setHistoGram] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    
    useEffect(() => {
        //fetch(url, req, token)
    }, [])

    function fetch(url = null, req = null, token = null, instance = null, type = null) {
        type === 'histoGram' && setIsLoading(true)
        const searchInstance = axios.create({
            baseURL: 'https://gateway.scan-interfax.ru',
            timeout: 5000,
            headers: {
                Accept: 'application/json',
            }
        });

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
            type === 'histoGram' && setHistoGram(response.data.data)
            type === 'idList' && setIdList(response.data)
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
    }

    return {idList, histoGram, isLoading, fetch}
}

export default useFetchData;