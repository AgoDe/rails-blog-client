<template>
    <div class="w-1/2 m-auto">
        
        <h1 class="mb-8">Vue Session Manager</h1>
        <form @submit.prevent="onSignUp">
            <div class="mb-6">
                <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                <input type="email" 
                id="email" 
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                placeholder="name@flowbite.com" 
                required
                v-model="signupEmail"
                >
            </div>
            <div class="mb-6">
                <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                <input type="password" 
                id="password" 
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                required
                v-model="signupPassword"
                >
            </div>
        
            <button type="submit" 
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
                Submit
            </button>
        </form>

    </div>
</template>

<script setup>
import { useSessionStore } from '@/stores/SessionStore'
import {computed, ref } from 'vue'

let store = useSessionStore()

let signupEmail = ref('')
let signupPassword = ref('')
let loginEmail = ref('')
let loginPassword = ref('')

const resetData = () => {
    signupEmail = ''
    signupPassword = ''
    loginEmail = ''
    loginPassword = ''
}

const onSignUp = () => {
    let data = {
            user: {
                email: signupEmail.value,
                password: signupPassword.value
        }
    }

    store.register(data)
    resetData()
};

const login = () => {
    event.preventDefault();
    let data = {
        user: {
            email: this.loginEmail,
            password: this.loginPassword
        }
    }
    store.loginUser(data)
    resetData()
}



</script>

<style scoped>
</style>