<template>
  <div>
    <h2>Postingan Pengguna Kustom</h2>
    <div class="user-posts-container">
      <div class="user-select-card">
        <label for="user-select">Pilih Pengguna:</label>
        <select id="user-select" v-model="selectedUserId" @change="onChange" :disabled="isLoadingUsers || isLoadingPosts">
          <option value="" disabled>Pilih pengguna</option>
          <option v-for="user in users" :key="user.id" :value="user.id">{{ user.name }}</option>
        </select>
        <div v-if="isLoadingUsers" class="loading">Memuat pengguna...</div>
      </div>
      <div v-if="isLoadingPosts" class="loading">Memuat postingan...</div>
      <div v-if="!isLoadingPosts && posts.length" class="post-list">
        <h2>Postingan</h2>
        <ul class="post-items">
          <li v-for="(post, index) in posts" :key="post.id" class="post-item" :class="{ 'last-in-row': (index + 1) % 3 === 0 }">
            <div class="post-card">
              <div class="post-header">{{ post.title }}</div>
              <div class="post-body">
                <p>{{ post.body }}</p>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div v-if="!isLoadingPosts && posts.length === 0" class="no-posts">
        Tidak ada postingan yang ditemukan.
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue';
import { usePostStore } from '../store/postStore';

export default {
  setup() {
    const postStore = usePostStore();
    const isLoadingUsers = ref(true); // Loading state for users
    const isLoadingPosts = ref(false); // Loading state for posts

    onMounted(async () => {
      try {
        await postStore.fetchUsers();
      } finally {
        isLoadingUsers.value = false;
      }
    });

    const onChange = async (event) => {
      const userId = event.target.value;
      try {
        isLoadingPosts.value = true; // Set isLoadingPosts to true when fetching posts
        await postStore.selectUser(userId);
      } finally {
        isLoadingPosts.value = false; // Set isLoadingPosts back to false after selecting user
      }
    };

    return {
      users: postStore.users,
      selectedUserId: computed(() => postStore.selectedUserId),
      posts: computed(() => postStore.posts),
      onChange,
      isLoadingUsers,
      isLoadingPosts,
    };
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&family=Open+Sans:wght@400;700&display=swap');

/* Global font family */
* {
  font-family: 'Poppins'; 
}

/* Heading style */
h2 {
  color: #3a4e71;
  text-align: center;
  margin-bottom: 20px;
  font-weight: 520;
}

/* Main container for user posts */
.user-posts-container {
  display: flex;
  justify-content: center;
  align-items: flex-start; /* Align items to the top */
  flex-direction: column;
  padding: 20px;
}

/* Card style for selecting user */
.user-select-card {
  width: 100%;
  background-color: #333; /* Dark background */
  color: #fff; /* White text */
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-bottom: 20px;
  max-width: 350px; /* Adjust width as needed */
  margin-left: auto; /* Centered to the right */
  margin-right: auto; /* Centered to the left */
}

/* Label style */
.user-select-card label {
  font-size: 1.2em;
  margin-bottom: 10px;
}

/* Select dropdown style */
select {
  width: 100%;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #666; /* Darker border */
  background-color: #555; /* Darker background */
  color: #fff; /* White text */
  font-size: 1em;
  -webkit-appearance: none; /* Remove default arrow for better styling */
  -moz-appearance: none;
  appearance: none;
  background-image: url('data:image/svg+xml;utf8,<svg fill="#fff" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M7.41 8.59L12 13.17l4.59-4.58L18 12l-6 6-6-6z"/></svg>');
  background-position: right 10px center;
  background-repeat: no-repeat;
  background-size: 16px 12px;
  padding-right: 30px;
}

/* Select focus style */
select:focus {
  outline: none;
  border-color: #42b983; /* Vue.js green */
}

/* Loading text style */
.loading {
  font-size: 1.2em;
  color: #42b983;
  text-align: center;
  margin-top: 10px;
}

/* List of posts style */
.post-list {
  width: 100%;
  max-width: 1200px; /* Adjust width as needed */
  margin-left: auto; /* Centered to the right */
  margin-right: auto; /* Centered to the left */
}

/* Heading style for posts */
.post-list h2 {
  color: #333; /* Dark gray text */
  font-size: 1.5em;
  margin-bottom: 10px;
}

/* Container for post items */
.post-items {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* Three columns layout */
  gap: 20px; /* Adjust gap between posts */
}

/* Style for each post item */
.post-item {
  list-style: none; /* Remove default list style */
}

/* Style for the post card */
.post-card {
  background-color: #333; /* Dark background */
  color: #fff; /* White text */
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  height: 100%; /* Ensure all cards have the same height */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

/* Style for post header */
.post-header {
  background-color: gray; /* Vue.js green */
  color: white;
  padding: 10px;
  border-radius: 8px 8px 0 0;
}

/* Style for post body */
.post-body {
  padding: 16px;
}

/* Style for no posts message */
.no-posts {
  margin-top: 20px;
  color: #666; /* Gray text */
  font-size: 1.2em;
}

/* Media query for smaller screens */
@media (max-width: 992px) {
  .post-items {
    grid-template-columns: repeat(2, 1fr); /* Two columns layout */
  }
}

/* Media query for mobile screens */
@media (max-width: 600px) {
  .post-items {
    grid-template-columns: 1fr; /* Single column layout */
  }
}

</style>
