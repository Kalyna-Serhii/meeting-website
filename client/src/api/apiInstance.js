import { $axios, serverURL } from '@/api/axiosInstance';

class ApiInstance {
  constructor(URL) {
    this.serverURL = URL;
  }

  async request(url, options = {}) {
    const response = await $axios({
      url: `${this.serverURL}${url}`, ...options,
    });
    return response.data || response;
  }

  async get(url, options = {}) {
    return this.request(url, { method: 'get', ...options });
  }

  async post(url, body, options = {}) {
    return this.request(url, { method: 'post', data: body, ...options });
  }

  async patch(url, body, options = {}) {
    return this.request(url, { method: 'patch', data: body, ...options });
  }

  async delete(url, options = {}) {
    return this.request(url, { method: 'delete', ...options });
  }
}

const $api = new ApiInstance(serverURL);

export default $api;
