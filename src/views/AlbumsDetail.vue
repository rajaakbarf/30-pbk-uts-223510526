<template>
  <div class="photo-detail">
    <h2>Photos</h2>

    <!-- Daftar thumbnail foto -->
    <div class="album-detail">
      <div class="photo-card-container">
        <div v-for="photo in photos" :key="photo.id" class="photo-card" @click="showFullSizePhoto(photo)">
          <img :src="photo.thumbnailUrl" :alt="photo.title" class="photo-thumbnail">
        </div>
      </div>
    </div>

    <!-- Overlay untuk foto ukuran penuh -->
    <div v-if="showFullPhoto" class="full-photo-overlay" @click="showFullSizePhoto(null)">
      <div class="full-photo-container">
        <img :src="fullPhotoUrl" :alt="selectedPhoto.title" class="full-size-photo">
      </div>
    </div>
  </div>
</template>

  <script setup>
  import { usePostStore } from '../store/postStore';
  import { onMounted, ref } from 'vue';
  import { useRouter, useRoute } from 'vue-router';
  
  const postStore = usePostStore();
  const route = useRoute();
  const router = useRouter();
  
  const albumId = Number(route.params.albumId);
  
  // Menggunakan ref untuk photos
  const photos = ref([]);
  const showFullPhoto = ref(false);
  const selectedPhoto = ref(null);
  const fullPhotoUrl = ref('');
  
  // Menjalankan fetchPhotos saat komponen dimuat
  onMounted(() => {
    postStore.fetchPhotos(albumId).then(() => {
      photos.value = postStore.photos;
    });
  });
  
  // Menampilkan foto ukuran penuh saat thumbnail diklik
  const showFullSizePhoto = (photo) => {
    if (photo) {
      selectedPhoto.value = photo;
      fullPhotoUrl.value = photo.url; // Menggunakan atribut `url` untuk foto ukuran penuh
      showFullPhoto.value = true;
    } else {
      showFullPhoto.value = false;
    }
  };
  </script>
  <style scoped>
  .photo-detail {
    padding: 20px;
  }
  
  h2 {
    font-family: 'Poppins';
    font-weight: 600;
    color: #3a4e71;
    text-align: center;
    margin-bottom: 20px;
  }
  
  .album-detail {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
  }
  
  .photo-card-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
    max-width: 1000px; /* Adjust the max-width as needed */
    margin: 0 auto; /* Center align the photos */
  }
  
  .photo-card {
    width: calc(20% - 20px); /* Adjust the width to show 5 photos per row */
    padding: 10px;
    cursor: pointer;
    perspective: 1000px;
    transition: transform 0.3s ease-in-out;
  }
  
  .photo-thumbnail {
    width: 100%;
    height: auto;
    border-radius: 5px;
    transition: transform 0.3s ease-in-out;
  }
  
  .photo-card:hover .photo-thumbnail {
    transform: scale(1.4);
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  }
  
  /* Overlay untuk foto ukuran penuh */
  .full-photo-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.8); /* Latar belakang gelap */
    z-index: 9999;
  }
  
  .full-photo-container {
    max-width: 90%;
    max-height: 90%;
    overflow: hidden;
  }
  
  .full-size-photo {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
    cursor: pointer;
  }
  </style>
  