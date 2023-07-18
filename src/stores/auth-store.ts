import { defineStore } from 'pinia';
import { api } from 'src/boot/axios';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: '',
    expiresAt: 0,
  }),

  getters: {
    isAuthorized(state) {
      return Date.now() < state.expiresAt
    },
  },

  actions: {
    async authenticate(username: string, password: string) {
      const response = await api.post('oauth/token', {
        grant_type: 'password',
        username: username,
        password: password,
        client_id: 1,
        client_secret: 'sL8r8yA2o3yGzbXYeb4xsg7Wie3RmKmUTOTFHVoI',
      });
      if (response.status != 200) {
        throw Error('Request error ' + response.status);
      }
      this.token = response.data.access_token;
      this.expiresAt = Date.now() + response.data.expires_in;
      api.defaults.headers['Authorization'] = 'Bearer ' + this.token;
      this.export();
    },
    async logout() {
      this.token = '';
      this.expiresAt = 0;
      localStorage.removeItem('token');
      localStorage.removeItem('expiresAt');
    },
    import() {
      this.token = localStorage.getItem('token') ?? '';
      this.expiresAt = parseInt(localStorage.getItem('expiresAt') ?? '0');
      if (this.token.length > 0) {
        api.defaults.headers['Authorization'] = 'Bearer ' + this.token;
      }
    },
    export() {
      localStorage.setItem('token', this.token);
      localStorage.setItem('expiresAt', this.expiresAt.toString());
    },
  }
});
