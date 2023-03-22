import { defineStore } from "pinia";
import axios from "axios";

export let useSessionStore = defineStore("UserSession", {
    state: () => ({
        auth_token: null,
        base_URL: 'http://localhost:3000',
        user: {
            id: null,
            username: null,
            email: null,
        }
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
            this.auth_token = localStorage.getItem("auth_item")
        },
        resetUserInfo() {
            this.user = {
                id: null,
                username: null,
                email: null,
            }
            this.auth_token = null
            localStorage.removeItem("auth_token")
            axios.defaults.headers.common["Authorization"] = null
        },
        registerUser({ commit }, payload) {
            return new Promise((resolve, reject) => {
                axios
                .post(`${this.base_URL}/users`, payload)
                .then((res) => {
                    commit("setUserInfo" , res);
                    resolve(res)
                })
                .catch((e) => {
                    reject(e)
                })
            })
        },
        loginUser({ commit }, payload) {
            new Promise((resolve, reject) => {
                axios
                .post(`${this.base_URL}/users/sign_in`, payload)
                .then((res) => {
                    commit("setUserInfo", res)
                    resolve(res)
                })
                .catch((e) => {
                    reject(e)
                })
            })
        },
        logoutUser({ commit }) {
            const config = {
                headers: {
                    Authorization: state.auth_token,
                }
            };

            new Promise((resolve, reject) => {
                axios
                .delete(`${this.base_URL}/users`, config)
                .then(() => {
                    commit("resetUserInfo");
                    resolve()
                })
                .catch((e) => {
                    reject(e)
                })
            })
        },
        loginUserWithToken({ commit }, payload) {
            const config = {
                headers: {
                    Authorization: payload.auth_token,
                }
            };

            new Promise((resolve, reject) => {
                axios
                .get(`${this.base_URL}/member-data`, config)
                .then((res) => {
                    commit("setUserInfoFromToken", res)
                    resolve(res)

                })
                .catch((e) => {
                    reject(e)
                })
            })
        },
        async register(user) {
            const requestOptions =  {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(user)
            }

            return fetch(this.base_URL + '/users', requestOptions)
            .then((res) => {
                console.log(res)
            
            })
        }
    } // end of actions
})