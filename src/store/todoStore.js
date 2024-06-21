import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useTodoStore = defineStore('todo', () => {
  const todos = ref([]);
  const showCompleted = ref(true);

  const addTodo = (todo) => {
    todos.value.push(todo);
  };

  const toggleTodo = (index) => {
    todos.value[index].completed = !todos.value[index].completed;
  };

  const removeTodo = (index) => {
    todos.value.splice(index, 1);
  };

  const toggleShowCompleted = () => {
    showCompleted.value = !showCompleted.value;
  };

  const completedCount = computed(() => todos.value.filter(todo => todo.completed).length);

  const visibleTodos = computed(() => {
    return showCompleted.value ? todos.value : todos.value.filter(todo => !todo.completed);
  });

  return { todos, showCompleted, addTodo, toggleTodo, removeTodo, toggleShowCompleted, completedCount, visibleTodos };
});