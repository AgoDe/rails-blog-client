<template>
    <button @click="onLogout">Logout</button>
</template>

<script setup>
import { useSessionStore } from '@/stores';
import {useFlash} from '@/composables/useFlash.js'

let store = useSessionStore();
let {flash} = useFlash()

let onLogout = () => {
  store.logoutUser()
}
</script>

<style scoped> 

</style>