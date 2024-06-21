import { defineStore } from 'pinia';
import axios from 'axios';

export const usePostStore = defineStore('postStore', {
  state: () => ({
    users: [],
    posts: [],
    albums: [],
    photos: [],
    selectedUserId: null,
    isLoading: false,
    loadingPhotos: false,
  }),
  actions: {
    async fetchUsers() {
      this.isLoading = true;
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');
        this.users = response.data;
      } catch (error) {
        console.error('Failed to fetch users:', error);
      } finally {
        this.isLoading = false;
      }
    },
    async fetchPosts(userId) {
      try {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
        this.posts = response.data;
      } catch (error) {
        console.error('Failed to fetch posts:', error);
      }
    },
    async fetchUserAlbums(userId) {
      try {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/albums?userId=${userId}`);
        this.albums = response.data;
      } catch (error) {
        console.error('Failed to fetch albums:', error);
      }
    },
    async fetchAllAlbums() {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/albums');
        this.albums = response.data;
      } catch (error) {
        console.error('Failed to fetch albums:', error);
      }
    },
    async fetchPhotos(albumId) {
      this.loadingPhotos = true;
      try {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`);
        this.photos = response.data;
      } finally {
        this.loadingPhotos = false;
      }
    },
    selectUser(userId) {
      this.selectedUserId = userId;
      this.fetchPosts(userId);
      this.fetchUserAlbums(userId);
    },
  },
});