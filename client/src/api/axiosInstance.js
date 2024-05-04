import axios from 'axios';

const serverURL = 'http://localhost:8080/api';

const createAxiosInstance = (URL) => axios.create({
  withCredentials: true, baseURL: URL,
});

const $axios = createAxiosInstance(serverURL);

$axios.interceptors.response.use((config) => config, async (error) => {
  const originalRequest = error.config;
  if (error.response && error.response.status === 401 && originalRequest.url !== `${serverURL}/refresh`) {
    await $axios.get(`${serverURL}/refresh`, { withCredentials: true });
    return $axios(originalRequest);
  } if (error.response && error.response.status === 401 && error.config.url === `${serverURL}/refresh`) {
    window.location.href = '/login';
  }
  throw error;
});

export { $axios, serverURL };
