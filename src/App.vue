<script setup>
import TheNavbar from './components/shared/TheNavbar.vue';
</script>

<template>
  <TheNavbar/>
  <div class="container mx-auto mt-8">
    <RouterView>
    </RouterView>
  </div>
</template>

<style scoped>
</style>
