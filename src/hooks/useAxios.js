import { useState, useEffect } from 'react';
import axios from 'axios';


const loginInstance = axios.create({
    // Configuration
    baseURL: 'https://gateway.scan-interfax.ru',
    method: "POST",
    timeout: 5000,
    headers: {
        Accept: 'application/json',
    }
});

const queryInstance = axios.create({
    // Configuration
    baseURL: 'https://gateway.scan-interfax.ru',
    timeout: 5000,
    headers: {
        Accept: 'application/json',
    }
});

const useAxios = (url, req = null, token = null, method = null) => {
    queryInstance.interceptors.request.use(
        (config) => {
            //const token = localStorage.getItem('token');
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

    const [status, setStatus] = useState({
        data: null,
        isLoading: true
    })

    useEffect(() => {
        console.log('useEffect Login')
        if (url && req) fetch(url, req)
    }, [req, url])

    useEffect(() => {
        console.log('useEffect query')
        if (token) fetch(url, req, token)
    }, [token, req, url])

    function fetch(url, req, token) {
        console.log('axios');
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
    return { status }
}



// const useAxios = (url) => {
//     const [status, setStatus] = useState({
//         data: null
//     })
//     useEffect(() => {
//         if (url) fetch(url)
//     },[url])

//     function fetch(url) {
//         axios.get(url)
//             .then(function (response) {
//                 setStatus({ data: response })
//             })
//             .catch(function (error) {
//                 // handle error
//                 console.log(error);
//             })
//             .finally(function () {
//                 // always executed
//             });
//     }
//     return {status, fetch}
// }

export default useAxios;