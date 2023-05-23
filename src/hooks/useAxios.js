import { useState, useEffect } from 'react';
import axios from 'axios';

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
    timeout: 5000,
    headers: {
        Accept: 'application/json',
    }
});

const useAxios = (url, req = null, token = null, method = null) => {
    const [status, setStatus] = useState({
        data: null,
        isLoading: true
    })

    useEffect(() => {
        console.log('useEffect Login')
        fetch(url, req, token)
    }, [])


    function fetch(url, req = null, method = "POST", token = null) {
        console.log('axios');
        queryInstance.interceptors.request.use(
            (config) => {
                if (token) {
                    config.headers['Authorization'] = `Bearer ${token}`;
                }
                if (req) {
                    config.data = req;
                }
    
                return config;
            },
            (error) => {
                Promise.reject(error);
            }
        );

        if (req) {
            loginInstance({ url: url, data: req })
                .then(function (response) {
                    console.log('ok')
                    setStatus({ data: response, isLoading: false })
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                })
                .finally(function () {
                    // always executed
                });
        } else if (token) {
            queryInstance({ url: url, method: method, headers: { 'Authorization': `Bearer ${token}`} })
                .then(function (response) {
                    setStatus({ data: response, isLoading: false })
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                })
                .finally(function () {
                    // always executed
                });
        }
    }
    return { status, fetch }
}

export default useAxios;