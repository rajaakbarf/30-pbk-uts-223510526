import { defineStore } from 'pinia'
import axios from 'axios'

export const useAlbumStore = defineStore('albumStore', {
  state: () => ({
    albums: [],
    photos: [],
    loadingAlbums: false,
    loadingPhotos: false
  }),

  actions: {
    async fetchAlbums() {
      this.loadingAlbums = true
      try {
        const response = await axios.get('http://jsonplaceholder.typicode.com/albums')
        this.albums = response.data
      } finally {
        this.loadingAlbums = false
      }
    },

    async fetchPhotos(albumId) {
      this.loadingPhotos = true
      try {
        const response = await axios.get(`http://jsonplaceholder.typicode.com/photos?albumId=${albumId}`)
        this.photos = response.data
      } finally {
        this.loadingPhotos = false
      }
    }
  }
})