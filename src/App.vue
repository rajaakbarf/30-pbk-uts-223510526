<template>
  <div>
    <header class="navbar">
      <nav>
        <ul class="nav-links">
          <li>
            <RouterLink to="/todos" class="nav-link">
              <q-btn flat round dense icon="note" label="Todos" />
            </RouterLink>
          </li>
          <li>
            <RouterLink to="/post" class="nav-link">
              <q-btn flat round dense icon="instagram" label="Post" />
            </RouterLink>
          </li>
          <li>
            <RouterLink to="/albums" class="nav-link">
              <q-btn flat round dense icon="photo" label="Albums" />
            </RouterLink>
          </li>
        </ul>
      </nav>
    </header>
    <RouterView />
  </div>
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
import '@quasar/extras/material-icons/material-icons.css'
import 'quasar/src/css/index.sass'
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
  display: flex;
  justify-content: center;
}

nav ul li {
  display: inline-block;
  margin-right: 20px;
  cursor: pointer;
}

.nav-link {
  color: aliceblue;
  padding: 100px;
}

.q-btn {
  color: #00acc1;
}

.q-btn .q-icon {
  font-size: 24px;
}
</style>
