<template>
  
    <div class="w-1/3 m-auto">
  
      <div class="mb-6">
        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Title
        </label>
        <input type="text"  
               class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  
               v-model="title"
        >
      </div>
  
      <div class="mb-6">
        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Body
        </label>
        <input type="text"  
               class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  
               v-model="body"
        >
      </div>
  
       <!-- only render if editing -->
      <button v-if="isEditing" @click="updatePost(post_id)" 
              class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      >Update</button>
      <button v-if="isEditing" @click="cancelEdit"
              class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
      >
        Cancel
      </button>
      
      <!-- only render is creating post -->
      <button v-else @click="createPost"
              class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      >
        Create post
      </button>
      
    </div>
  
  
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg mt-8">
        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" class="px-6 py-3">
                        ID
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Title
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Body
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Action
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr class="bg-white border-b dark:bg-gray-900 dark:border-gray-700" 
                  v-for="post in posts" :key="post.id"
                >
                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {{ post.id }}
                    </th>
                    <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {{ post.title }}
                    </td>
                    <td class="px-6 py-4">
                        {{ post.body }}
                    </td>
                    <td class="px-6 py-4">
                      <button 
                      class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                      @click="editPost(post.id)"
                      >
                      Edit
                    </button>
                      <button 
                      class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                      @click="deletePost(post.id)"
                      >
                        Delete</button>
                    </td>
                </tr>
               
            </tbody>
        </table>
    </div>
  
  
  
  
  
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  /* TODO: provare a gestire i post con lo store */
  
  const posts = ref([])
  const API_URL = "http://localhost:3000/posts"
  const title = ref('')
  const body  = ref('')
  const post_id = ref(0)
  const isEditing = ref(false)
  

  onMounted( async() => {
    const res = await fetch(API_URL)
    posts.value = await res.json()
  } )
  

  const createPost =  async() => {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type' : 'application/json'},
      body: JSON.stringify({
        title: title.value,
        body: body.value,
      })
    })
  
    const data = await res.json()
    posts.value.push(data)
    
    title.value = ''
    body.value = ''
    post_id.value = 0
  }
  
  const editPost = async(id) => {
    const post = posts.value.find(post => post.id === id)
  
    title.value = post.title
    body.value = post.body
    post_id.value = post.id
    isEditing.value = true
  
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }
  
  const updatePost = async() => {
    const res =  await fetch (`${API_URL}/${post_id.value}`, {
      method: 'PUT',
      headers: {'Content-Type' : 'application/json'},
      body: JSON.stringify({
        title: title.value,
        body: body.value,
        id: post_id.value,
      })
    })
  
    const data = await res.json()
  
    const index = posts.value.findIndex(post => post.id === data.id )
    posts.value[index] = data
  
    title.value = ''
    body.value = ''
    post_id.value = 0
    isEditing.value = false
  }
  
  const cancelEdit = () => {
    title.value = ''
    body.value = ''
    post_id.value = 0
    isEditing.value = false
  
  }
  
  const deletePost = async(id) => {
    await fetch(`${API_URL}/${id}`, {
      method: 'DELETE'
    })
    posts.value = posts.value.filter(post => post.id !== id)
  }
  
  
  </script>
  
  <style scoped>
  
  </style>
  