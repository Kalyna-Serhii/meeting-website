import axios from 'axios';
import router from '../router/router.js';

const serverURL = 'http://localhost:8080/api';

const createAxiosInstance = (serverURL) => {
    return axios.create({
        withCredentials: true, baseURL: serverURL,
    });
};

const $axios = createAxiosInstance(serverURL);

$axios.interceptors.response.use(config => config, async error => {
    const originalRequest = error.config;
    if (error.response && error.response.status === 401 && originalRequest.url !== `${serverURL}/refresh`) {
        await $axios.get(`${serverURL}/refresh`, {withCredentials: true});
        return $axios(originalRequest);
    } else if (error.response && error.response.status === 401 && error.config.url === `${serverURL}/refresh`) {
        localStorage.removeItem('token');
        await router.push('/auth');
    }
    throw error;
});

export {$axios, serverURL};