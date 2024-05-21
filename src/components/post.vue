<template>
    <div class="post-app">
      <slot name="header">
        <h1>Postingan Pengguna</h1>
      </slot>
      <label for="users">Pilih Pengguna:</label>
      <select id="users" v-model="selectedUser" @change="fetchPosts">
        <option v-for="user in customUsers" :value="user.id" :key="user.id">{{ user.name }}</option>
      </select>
      <ul class="post-list">
        <li v-for="post in posts" :key="post.id">
          <h3>{{ post.title }}</h3>
          <p>{{ post.body }}</p>
        </li>
      </ul>
    </div>
  </template>
  
  <script setup>
  import { ref, watch, onMounted } from 'vue';
  
  const props = defineProps({
    customUsers: Array
  });
  
  const selectedUser = ref(null);
  const posts = ref([]);
  
  async function fetchPosts() {
    if (selectedUser.value) {
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${selectedUser.value}`);
      posts.value = await response.json();
    }
  }
  
  // Fetch posts when the selectedUser changes
  watch(selectedUser, fetchPosts);
  </script>
  
  <style scoped>
  /* CSS untuk konten postingan */
  .post-app {
    max-width: 800px;
    margin: 20px auto; 
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
    font-family: Arial, sans-serif;
    background-color: #f9f9f9; 
  }
  
  /* CSS untuk daftar postingan */
  .post-list {
    list-style-type: none;
    padding: 0;
  }
  
  .post-list li {
    margin-bottom: 20px;
    background-color: #fff; 
    padding: 10px;
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); 
  }
  
  .post-list li h3 {
    color: #333;
  }
  
  .post-list li p {
    color: #666;
  }
  </style>
  