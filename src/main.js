import { createApp } from 'vue'
import {createPinia} from 'pinia'
import router from './router'
import './style.css'
import 'flowbite'
import App from './App.vue'

const pinia = createPinia()
const app = createApp(App)

import { useSessionStore } from './stores/SessionStore'
// load JWT from local storage on refresh


app.use(router)
app.use(pinia)
app.mount('#app')

let store = useSessionStore()
let localAuthToken = localStorage.auth_token;
let cookieExist = localAuthToken !== 'undefinded' && localAuthToken !== null;
if (cookieExist) {
    const auth_token = localStorage.getItem('auth_token');
    const authTokenExist = auth_token !== 'undefined' && auth_token !== null
    if (authTokenExist) {
        store.dispatch("logginUserWithToken", {auth_token})
    }
}
