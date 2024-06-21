<template>
    <header class="navbar">
    <nav>
      <ul class="nav-links">
        <li><RouterLink to="/todos" class="nav-link">Todos</RouterLink></li>
        <li><RouterLink to="/post" class="nav-link">Post</RouterLink></li>
        <li><RouterLink to="/albums" class="nav-link">Albums</RouterLink></li>
      </ul>
    </nav>
  </header>
  <RouterView />
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&family=Open+Sans:wght@400;700&display=swap');

/* CSS untuk header */
header {
  font-family: 'Poppins';
  background-color: #2a2a29; 
  color: white;
  padding: 20px;
  text-align: center;
  font-weight: 600;
  
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
  background-color: #7d7d7c; 
}

.nav-link {
  color: aliceblue;
}
</style>
