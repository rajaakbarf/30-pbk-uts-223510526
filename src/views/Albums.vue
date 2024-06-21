<template>
    <h2>Albums</h2>
    <div class="albums">
      <div class="column">
        <ul>
          <li v-for="(album, index) in leftColumnAlbums" :key="album.id" class="album-item" @click="goToAlbumsDetail(album.id)">
            <span class="album-index">{{ index + 1 }}.</span> 
            <span class="album-title">{{ album.title }}</span> 
          </li>
        </ul>
      </div>
      <div class="column">
        <ul>
          <li v-for="(album, index) in rightColumnAlbums" :key="album.id" class="album-item" @click="goToAlbumsDetail(album.id)">
            <span class="album-index">{{ index + 51 }}.</span> 
            <span class="album-title">{{ album.title }}</span> 
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script setup>
  import { usePostStore } from '../store/postStore';
  import { useRouter } from 'vue-router';
  import { onMounted, computed } from 'vue';
  
  const postStore = usePostStore();
  const router = useRouter();
  
  onMounted(() => {
    postStore.fetchAllAlbums();
  });
  
  const albums = computed(() => postStore.albums);
  
  // Split albums into left and right columns
  const leftColumnAlbums = computed(() => albums.value.slice(0, 50));
  const rightColumnAlbums = computed(() => albums.value.slice(50, 100));
  
  const goToAlbumsDetail = (albumId) => {
    router.push({ name: 'AlbumsDetail', params: { albumId: String(albumId) } });
  };
  </script>
  
  <style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&family=Open+Sans:wght@400;700&display=swap');

  .albums {
    display: grid;
    grid-template-columns: 1fr 1fr; /* Two equal-width columns */
    gap: 20px; /* Space between columns */
    justify-content: center;
  }
  
  h2 {
    font-family: 'Poppins';
    color: #3a4e71;
    text-align: center;
    margin-bottom: 20px;
    font-weight: 600;
  }
  
  .column {
    background: #f9f9f9;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  ul {
    list-style-type: none;
    padding: 0;
    margin: 0; /* Reset default margin */
  }
  
  .album-item {
    cursor: pointer;
    margin: 10px 0;
    padding: 15px;
    border: 1px solid #ddd;
    border-radius: 8px;
    display: flex;
    align-items: center;
    transition: background-color 0.3s ease, box-shadow 0.3s ease;
    background-color: #fff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .album-item:hover {
    background-color: #f9f9f9;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }
  
  .album-index {
    margin-right: 10px;
    font-weight: bold;
    color: navy;
  }
  
  .album-title {
    flex: 1;
    font-size: 1.1em;
    color: #333;
  }
  </style>
  