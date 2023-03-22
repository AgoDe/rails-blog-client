<template>
    <h1>Home</h1>

</template>

<script setup>
import { computed, onMounted } from 'vue';
import { usePostsStore } from '../stores/PostsStore';

let store = usePostsStore()

const getPosts = computed(() => {
    return store.getPosts
})

const posts = computed(() => {
    return store.posts
})

onMounted(() => {
    store.fetchPosts()
})


</script>

<style scoped>
</style>