import $api from '@/api/apiInstance';

const authApi = {
  async register(body) {
    return await $api.post('/register', body);
  },

  async login(body) {
    return await $api.post('/login', body);
  },

  async logout() {
    return await $api.post('/logout', {});
  },

};

export default authApi;
