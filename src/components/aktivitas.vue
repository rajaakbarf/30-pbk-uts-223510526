<template>
  <div>
    <!-- Header dengan menu "Post" dan "Todos" -->
    <header>
      <nav>
        <ul>
          <li @click="toggleView('todos')">Todos</li>
          <li @click="toggleView('posts')">Post</li>
        </ul>
      </nav>
    </header>

    <!-- Menampilkan fitur yang dipilih -->
    <div v-if="view === 'todos'">
      <div class="todo-app">
        <h1>Daftar Kegiatan</h1>
        
        <!-- Form untuk menambahkan kegiatan baru -->
        <form @submit.prevent="addActivity">
          <input type="text" v-model="newActivity" placeholder="Tambahkan kegiatan baru">
          <button type="submit">Tambah</button>
        </form>

        <!-- Daftar kegiatan -->
        <ul class="activities-list">
          <li v-for="activity in filteredActivities" :key="activity.id">
            <input type="checkbox" v-model="activity.completed">
            <span :class="{ completed: activity.completed }">{{ activity.name }}</span>
            <button @click="cancelActivity(activity.id)">Hapus</button>
          </li>
        </ul>
        
        <!-- Filter kegiatan yang belum selesai -->
        <label>
          <input type="checkbox" v-model="showIncompleteOnly">
          Tampilkan yang belum selesai saja
        </label>
      </div>
    </div>

    <div v-else-if="view === 'posts'">
      <div class="post-app">
        <!-- Konten Postingan -->
        <h1>Postingan Pengguna</h1>
        <label for="users">Pilih Pengguna:</label>
        <select id="users" v-model="selectedUser" @change="fetchPosts">
          <option v-for="user in users" :value="user.id">{{ user.name }}</option>
        </select>
        <ul class="post-list">
          <li v-for="post in posts" :key="post.id">
            <h3>{{ post.title }}</h3>
            <p>{{ post.body }}</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';

// Kode sebelumnya untuk Todos
const activities = ref([
  { id: 1, name: 'Makan siang', completed: false },
  { id: 2, name: 'Belajar VueJS', completed: false }
]);

const newActivity = ref('');
const showIncompleteOnly = ref(false);

function addActivity() {
  if (newActivity.value.trim() !== '') {
    activities.value.push({ id: Date.now(), name: newActivity.value, completed: false });
    newActivity.value = '';
  }
}

function cancelActivity(id) {
  const index = activities.value.findIndex(activity => activity.id === id);
  if (index !== -1) {
    activities.value.splice(index, 1);
  }
}

function completeActivity(activity) {
  activity.completed = !activity.completed;
}

const filteredActivities = computed(() => {
  if (showIncompleteOnly.value) {
    return activities.value.filter(activity => !activity.completed);
  } else {
    return activities.value;
  }
});

// Menampilkan Postingan
const view = ref(null); 
const users = ref([]);
const selectedUser = ref(null);
const posts = ref([]);

// Method untuk mengambil data pengguna dari JSONPlaceholder API
async function fetchUsers() {
  const response = await fetch('https://jsonplaceholder.typicode.com/users');
  users.value = await response.json();
}

// Method untuk mengambil data postingan berdasarkan pengguna yang dipilih
async function fetchPosts() {
  if (selectedUser.value) {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${selectedUser.value}`);
    posts.value = await response.json();
  }
}

// Toggle tampilan antara "Todos" dan "Post"
function toggleView(selectedView) {
  view.value = selectedView;
}

// Mengambil daftar pengguna saat komponen dimuat
onMounted(fetchUsers);
</script>

<style scoped>
/* CSS untuk header */
header {
  background-color: #b1d100; 
  color: white;
  padding: 10px;
}

nav ul {
  list-style-type: none;
  padding: 0;
}

nav ul li {
  display: inline-block;
  margin-right: 20px;
  cursor: pointer;
  transition: background-color 0.3s ease; 
}

/* Efek hover */
nav ul li:hover {
  background-color: #8aa000; 
}

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

/* CSS untuk komponen TodoApp */
.todo-app {
  max-width: 400px;
  margin: 20px auto; 
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-family: Arial, sans-serif;
  background-color: #f9f9f9; 
}

/* CSS untuk teks kegiatan yang selesai */
.activities-list li .completed {
  text-decoration: line-through;
  color: #888;
}

/* Gaya CSS untuk form */
form {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

input[type="text"] {
  flex: 1;
  padding: 10px;
  font-size: 16px;
  border: 2px solid #ddd;
  border-radius: 4px;
  outline: none;
}

button[type="submit"] {
  padding: 10px 20px;
  font-size: 16px;
  color: white;
  background-color: #66bb6a;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button[type="submit"]:hover {
  background-color: #4caf50;
}

/* CSS untuk daftar kegiatan */
.activities-list {
  list-style-type: none;
  padding: 0;
}

.activities-list li {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid #ddd;
}

.activities-list li:last-child {
  border-bottom: none;
}

.activities-list li input[type="checkbox"] {
  margin-right: 10px;
}

.activities-list li .activity-name {
  flex: 1;
  font-size: 16px;
  color: #333;
}

.activities-list li button {
  padding: 8px 12px;
  font-size: 14px;
  color: white;
  background-color: #ff6666;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.activities-list li button:hover {
  background-color: #cc0000;
}
</style>
