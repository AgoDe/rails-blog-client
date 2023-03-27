<template>

    <form @submit.prevent="onSubmit">
        <div class="mb-6">
            <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
            <input type="email" 
            id="email" 
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
            placeholder=""
            v-model="email"
            >
        </div>
        <div class="mb-6">
            <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
            <input type="password" 
            id="password" 
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
            v-model="Password"
            >

        </div>

        <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Login
        </button>
    </form>

</template>

<script setup>
import axios from 'axios';
import { useSessionStore } from '@/stores';
import { ref } from 'vue';
import { useFlash } from '@/composables/useFlash.js';

let store = useSessionStore();
let {flash} = useFlash();
let {toast} = useFlash();

async function Login(data) {
    await axios.post("http://localhost:3000/users/sign_in", data)
    .then((res) => {
        if (res.status === 422) {
            flash(res.data.message, 'danger')
        }
        store.setUserInfo(res)
        toast(res.data.message, 'success' )
        resetData();
        router.push('/')
    })
    .catch((e) => {
        return e;
    })

}


let email = ref('');
let Password = ref('');

const resetData = () => {
    email.value = '';
    Password.value = '';
}

async function onSubmit() {

    const data = {
        user: {
            email: email.value,
            password: Password.value
        }
    }
    await Login(data)
};



</script>
