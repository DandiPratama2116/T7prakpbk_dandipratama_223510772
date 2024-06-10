<template>
  <div :style="{ backgroundColor: backgroundColor }">
    <h1>Todo List</h1>
    <input v-model="newTask" placeholder="Tambah tugas..." />
    <button @click="addTask">Tambah</button>
    
    <table>
      <thead>
        <tr>
          <th>Tugas</th>
          <th>Status</th>
          <th>Aksi</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(task, index) in tasks" :key="index">
          <td>{{ task.name }}</td>
          <td>{{ task.completed ? 'Selesai' : 'Belum Selesai' }}</td>
          <td>
            <input type="checkbox" v-model="task.completed" />
            <button @click="removeTask(index)">Hapus</button>
          </td>
        </tr>
      </tbody>
    </table>

    <p>{{ unfinishedTasks }} tugas belum selesai</p>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { useCountStore } from './stores/countStore'

export default {
  setup() {
    const countStore = useCountStore()

    const newTask = ref('')
    const tasks = ref([])

    const addTask = () => {
      if (newTask.value.trim() !== '') {
        tasks.value.push({ name: newTask.value, completed: false })
        newTask.value = ''
      }
    }

    const removeTask = (index) => {
      tasks.value.splice(index, 1)
    }

    const unfinishedTasks = computed(() => tasks.value.filter(task => !task.completed).length)

    const backgroundColor = computed(() => tasks.value.length === 0 ? 'lightcoral' : 'lightgreen')

    return {
      newTask,
      tasks,
      addTask,
      removeTask,
      unfinishedTasks,
      backgroundColor,
      countStore
    }
  }
}
</script>

<style>
.completed {
  text-decoration: line-through;
}
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

th, td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

th {
  background-color: #f2f2f2;
}
</style>
