<template>
  <div class="min-h-screen bg-gray-50 flex flex-col">
    <!-- Sabit Başlık ve Durum -->
    <header class="sticky top-0 z-20 bg-white shadow flex flex-col gap-2 px-4 py-3">
      <div class="flex items-center justify-between">
        <h1 class="text-xl font-bold tracking-tight">Görevlerim</h1>
        <span class="flex items-center gap-1">
          <span class="w-2 h-2 rounded-full" :class="isOnline ? 'bg-green-500' : 'bg-gray-400'" />
          <span class="text-xs text-gray-500">{{ isOnline ? 'Online' : 'Offline' }}</span>
        </span>
      </div>
      <!-- Görev Ekleme Alanı (Sticky) -->
      <form @submit.prevent="handleAddTask" class="flex flex-col gap-2 pt-2 md:flex-row md:items-center">
        <input v-model="newTask" type="text" placeholder="Yeni görev ekle..." class="flex-1 border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition" />
        <select v-model="newCategory" class="border border-gray-200 rounded-lg px-2 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition">
          <option disabled value="">Kategori Seç</option>
          <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
        </select>
        <button class="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold shadow hover:bg-blue-700 transition">Ekle</button>
      </form>
    </header>

    <!-- Görev Listesi -->
    <main class="flex-1 p-4 flex flex-col gap-4">
      <transition-group name="fade" tag="ul" class="flex flex-col gap-3">
        <li v-for="task in tasks" :key="task.id" class="bg-white rounded-xl shadow p-4 flex flex-col gap-1 border border-gray-100">
          <div class="flex items-center justify-between">
            <span class="font-medium text-base">{{ task.title }}</span>
            <span class="text-xs px-2 py-1 rounded bg-blue-100 text-blue-700">{{ task.status }}</span>
          </div>
          <div class="flex items-center gap-2 mt-1">
            <span v-if="task.category" class="text-xs px-2 py-1 rounded bg-indigo-100 text-indigo-700 font-semibold">{{ task.category }}</span>
            <span class="text-xs text-gray-400">{{ formatDate(task.created_at) }}</span>
          </div>
        </li>
      </transition-group>
      <div v-if="tasks.length === 0" class="text-center text-gray-400 py-8">
        Henüz hiç görev yok.
      </div>
    </main>

    <!-- Alt Tab Bar App.vue'da -->
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getTasks, addTask } from '../services/sqlite';

const tasks = ref([]);
const newTask = ref('');
const newCategory = ref('');
const isOnline = ref(navigator.onLine);
const categories = ref(['İş', 'Kişisel', 'Alışveriş', 'Okul', 'Diğer']);

function formatDate(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return d.toLocaleDateString('tr-TR', { day: '2-digit', month: 'short', year: 'numeric' });
}

async function loadTasks() {
  tasks.value = await getTasks();
}

async function handleAddTask() {
  if (!newTask.value.trim() || !newCategory.value) return;
  await addTask({ title: newTask.value, category: newCategory.value });
  newTask.value = '';
  newCategory.value = '';
  await loadTasks();
}

onMounted(() => {
  loadTasks();
  window.addEventListener('online', () => (isOnline.value = true));
  window.addEventListener('offline', () => (isOnline.value = false));
});
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: all 0.3s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
.shadow-t {
  box-shadow: 0 -2px 8px 0 rgba(0,0,0,0.04);
}
</style> 