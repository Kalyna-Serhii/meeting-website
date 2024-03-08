import axios from 'axios';

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
        await axios.get(`${serverURL}/refresh`, {withCredentials: true});
        return $axios(originalRequest);
    }
    throw error;
});

export {$axios, serverURL};