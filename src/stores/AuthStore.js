import { defineStore } from 'pinia';

import { fetchWrapper } from '@/helpers';
import  router  from '@/router';
import axios from 'axios';

const baseUrl = `http://127.0.0.1:3000/users`;

export const useAuthStore = defineStore({
    id: 'auth',
    state: () => ({
        // initialize state from local storage to enable user to stay logged in
        user: JSON.parse(localStorage.getItem('user')),
        auth_token : null,
        returnUrl: null
    }),
    actions: {
        login(data) {    
            return new Promise((resolve, reject) => {
                axios
                .post(`${baseUrl}/sign_in`, data)
                .then((res) => {
                
                    this.user = res.data.user;
                    this.auth_token = res.headers.authorization;
                    localStorage.setItem('user', JSON.stringify(res.data.user));
                    localStorage.setItem('auth_token', res.headers.authorization);
                    axios.defaults.headers.common["Authorization"] = res.headers.authorization;
                    resolve(res);
                })
                .catch((e) => {
                    reject(e);
                });
            });
        }

    },

});
