<template>
    <button @click="onLogout"  class="w-full text-left block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Logout</button>
</template>

<script setup>
import { useAuthStore } from '@/stores'
import {useFlash} from '@/composables/useFlash.js'

let authStore = useAuthStore()
let {flash} = useFlash()

let onLogout = () => {
  authStore.logout()
  //flash('Success', 'You have been logged out', 'success')
}
</script>

<style scoped> 

</style>