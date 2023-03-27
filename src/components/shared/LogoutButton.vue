<template>
    <button @click="onLogout">Logout</button>
</template>

<script setup>
import { useSessionStore } from '@/stores';
import {useFlash} from '@/composables/useFlash.js'
import { computed } from 'vue';
import axios from 'axios';

let store = useSessionStore();
let {flash} = useFlash()
let {toast} = useFlash()

let onLogout = () => {

  const auth_token = computed(() => store.getAuthToken);
  const config = {
    headers: {
        "Content-Type": "application/json",
        Authorization: auth_token.value,
    }
  };

  axios.delete(`http://localhost:3000/users/sign_out`, config)
  .then((res) => {
    store.resetUserInfo();
    toast(res.data.message, 'success')
  })
  .catch((e) => {
    
  })
}
</script>

<style scoped> 

</style>