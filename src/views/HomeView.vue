<template>
    <h1>Home</h1>

    <button @click="test">
        test
    </button>

</template>

<script setup>
import { computed, onMounted } from 'vue';
import { usePostsStore } from '../stores/PostsStore';
import router from '@/router'

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

const test = () => {
    console.log(router)
    router.push('/posts')
}


</script>

<style scoped>
</style>