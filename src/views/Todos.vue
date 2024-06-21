<template>
    <div class="cards">
    <div class="container">
      <h2>Daftar Kegiatan Kustom</h2>
      <div class="card">
        <input v-model="newTodo" placeholder="Tambahkan kegiatan baru" @keyup.enter="addNewTodo" />
        <button @click="addNewTodo" class="add">Tambah</button>
      </div>
      <div class="card">
        <button @click="todoStore.toggleShowCompleted" class="toggle">
          Tampilkan yang {{ todoStore.showCompleted ? 'belum selesai saja' : 'sudah selesai' }}
        </button>
        <p>Jumlah Kegiatan Selesai: {{ todoStore.completedCount }}</p>
        <ul>
          <li v-for="(todo, index) in todoStore.visibleTodos" :key="index">
            <label>
                <div class="flex-center">
              <input type="checkbox" v-model="todo.completed" />
              <span :style="{ textDecoration: todo.completed ? 'line-through' : 'none' }">
                {{ todo.text }}
              </span>
              <button @click="todoStore.removeTodo(index)" class="delete">Hapus</button>
            </div>
            </label>
            <button @click="todoStore.removeTodo(index)" class="delete">Hapus</button>
          </li>
        </ul>
      </div>
    </div>
</div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useTodoStore } from '../store/todoStore';
  
  const newTodo = ref('');
  const todoStore = useTodoStore();
  
  const addNewTodo = () => {
    if (newTodo.value.trim()) {
      todoStore.addTodo({
        text: newTodo.value,
        completed: false,
      });
      newTodo.value = '';
    }
  };
  </script>
  
  <style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&family=Open+Sans:wght@400;700&display=swap');
* {
  font-family: 'Poppins'; 
}
  /* Container and Card Styling */
  .container {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
  }
  
  h2 {
    font-weight: 600;
    color: #3a4e71;
    text-align: center;
    margin-bottom: 10px;
  }
 
  
  .card {
    background: #444242;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    margin-bottom: 20px;
  }
  
  /* Input and Button Styling */
  input, button {
    font-size: 1em;
    padding: 10px;
    border-radius: 4px;
    border: 1px solid #ddd;
    margin: 5px 0;
  }
  
  input {
    width: calc(100% - 90px);
    display: inline-block;
  }
  
  button.add {
    background-color: #82c91e;
    color: white;
    border: none;
    cursor: pointer;
    width: 80px;
    display: inline-block;
    vertical-align: top;
  }
  .flex-center {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  button.toggle {
    background-color: #5f76a7;
    color: white;
    width: 100%;
    border: none;
    cursor: pointer;
  }
  
  button.delete {
    background-color: #ff6b6b;
    color: white;
    border: none;
    cursor: pointer;
    padding: 5px 10px;
    margin-left: 10px;
  }
  
  button.delete:hover {
    background-color: #272424;
  }
  
  button.complete {
    background-color: #ff9800;
    color: white;
    border: none;
    cursor: pointer;
    padding: 5px 10px;
    margin-left: 10px;
  }
  
  /* List and Item Styling */
  ul {
    list-style-type: none;
    padding: 0;
  }
  
  li {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 0;
    border-bottom: 1px solid #ddd;
  }
  
  li label {
    display: flex;
    align-items: center;
    flex: 1;
  }
  
  li span {
    margin-left: 10px;
  }
  
  li input[type="checkbox"] {
    transform: scale(1.2);
    margin-right: 10px;
  }
  
  li button {
    margin-left: 10px;
  }
  p {
    text-align: center;
  }


  </style>
  