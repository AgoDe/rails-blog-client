import { defineStore } from "pinia";

export let usePostsStore = defineStore('posts', {

    state: () => ({
        
        posts : [],
        api_url: 'http://localhost:3000/posts'
        
    }),
    
    actions: {
        fetchPosts() {
           
        fetch(this.api_url)
        .then((res) => res.json())
        .then((data) => this.posts = data)
        .catch((e) => console.log("error API: " + e))
        }
    },

    getters: {
        getPosts(state) {
            return state.posts
        }
    }
}) 