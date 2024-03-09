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
    if (error.response && error.response.status === 401 && originalRequest && !error.config._isRetry) {
        originalRequest._isRetry = true;
        try {
            await axios.get(`${serverURL}/refresh`, {withCredentials: true});
            return $axios(originalRequest);
        } catch (refreshError) {
            if (refreshError.response && refreshError.response.status === 401) {
                await router.push('/login');
            } else {
                throw refreshError;
            }
        }
    }
    throw error;
});

export {$axios, serverURL};