<script setup>
import Navbar from './components/Shared/Navbar.vue';
</script>

<template>
  <Navbar/>
  <div class="container mx-auto mt-8">
    <RouterView>
    </RouterView>
  </div>
</template>

<style scoped>
</style>
