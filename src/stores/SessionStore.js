import { defineStore } from "pinia";
import axios from "axios";

export let useSessionStore = defineStore("Session", {
    state: () => ({
        auth_token: null,
        base_URL: 'http://localhost:3000',
        user: {},
    }), // end of state

    getters: {
        getAuthToken(state) {
            return state.auth_token;
        },
        getUserEmail(state) {
            return state.user.email;
        },
        getUserId(state) {
            return state.user.id;
        },
        isLoggedIn(state) {
            const loggedOut = state.auth_token == null || state.auth_token == JSON.stringify(null);
            return !loggedOut
        },
    }, // end of getters

    actions: {
        setUserInfo(payload) {
            this.user = payload.data.user;
            this.auth_token = payload.headers.authorization;
            axios.defaults.headers.common["Authorization"] = payload.headers.authorization
            localStorage.setItem("auth_token", payload.headers.authorization)
        },
        setUserInfoFromToken(payload) {
            this.user = payload.data.user
            this.auth_token = localStorage.getItem("auth_token")
        },
        resetUserInfo() {
            this.user = {}
            this.auth_token = null
            localStorage.removeItem("auth_token")
            axios.defaults.headers.common["Authorization"] = null
        },
        registerUser(payload) {
            return new Promise((resolve, reject) => {
                axios
                .post(`${this.base_URL}/users`, payload)
                .then((res) => {
                    
                   this.setUserInfo(res);
                    resolve(res)
                })
                .catch((e) => {
                    reject(e)
                })
            })
        },
        loginUser(payload) {
            new Promise((resolve, reject) => {
                axios
                .post(`${this.base_URL}/users/sign_in`, payload)
                .then((res) => {
                    this.setUserInfo(res)
                    resolve(res)
                })
                .catch((e) => {
                    reject(e)
                })
            })
        },
        logoutUser() {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: this.auth_token,
                }
            };

            new Promise((resolve, reject) => {
                axios
                .delete(`${this.base_URL}/users/sign_out`, config)
                .then((res) => {
                    this.resetUserInfo();
                    resolve(res)
                })
                .catch((e) => {
                    reject(e)
                })
            })
        },
        loginUserWithToken(auth_token) {
            const config = {
                headers: {
                    Authorization: auth_token,
                }
            };

            new Promise((resolve, reject) => {
                axios
                .get(`${this.base_URL}/member-data`, config)
                .then((res) => {
                    this.setUserInfoFromToken(res)
                    resolve(res)

                })
                .catch((e) => {
                    reject(e)
                })
            })
        },
    } // end of actions
})