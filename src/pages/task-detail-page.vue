<template>
  <div class="min-h-screen bg-gray-50 flex flex-col">
    <!-- Sabit Başlık -->
    <header class="sticky top-0 z-20 bg-white shadow flex items-center justify-between px-4 py-3">
      <button @click="$router.back()" class="text-gray-500 hover:text-blue-600 mr-2">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" /></svg>
      </button>
      <h1 class="text-lg font-bold flex-1 text-center">Görev Detayı</h1>
      <span class="w-6"></span>
    </header>

    <main class="flex-1 p-4 flex flex-col gap-4">
      <div class="bg-white rounded-xl shadow p-4 flex flex-col gap-2 border border-gray-100">
        <div class="flex items-center justify-between">
          <span class="font-semibold text-lg">{{ task.title }}</span>
          <span class="text-xs px-2 py-1 rounded bg-blue-100 text-blue-700">{{ task.status }}</span>
        </div>
        <div class="text-xs text-gray-400">Oluşturulma: {{ formatDate(task.created_at) }}</div>
        <div v-if="task.summary" class="text-sm text-gray-700 bg-gray-50 rounded p-2 mt-2">{{ task.summary }}</div>
        <div v-if="task.tags && task.tags.length" class="flex flex-wrap gap-2 mt-2">
          <span v-for="tag in task.tags" :key="tag" class="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded">#{{ tag }}</span>
        </div>
      </div>
      <div class="flex gap-2 mt-4">
        <button @click="editMode = true" class="flex-1 px-4 py-2 bg-yellow-500 text-white rounded-lg font-semibold shadow hover:bg-yellow-600 transition">Düzenle</button>
        <button @click="completeTask" class="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg font-semibold shadow hover:bg-green-700 transition">Tamamla</button>
      </div>
    </main>

    <!-- Düzenleme Modalı -->
    <div v-if="editMode" class="fixed inset-0 z-30 bg-black bg-opacity-40 flex items-center justify-center">
      <div class="bg-white rounded-xl shadow-lg p-6 w-full max-w-md mx-2 flex flex-col gap-4">
        <h2 class="text-lg font-bold mb-2">Görev Düzenle</h2>
        <input v-model="editTitle" class="border rounded px-3 py-2" placeholder="Başlık" />
        <textarea v-model="editSummary" class="border rounded px-3 py-2" placeholder="Açıklama/Özet"></textarea>
        <input v-model="editTags" class="border rounded px-3 py-2" placeholder="Etiketler (virgülle ayır)" />
        <div class="flex gap-2 mt-2">
          <button @click="saveEdit" class="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700">Kaydet</button>
          <button @click="editMode = false" class="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-semibold">Vazgeç</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getTasks, addTask } from '../services/sqlite';

const route = useRoute();
const router = useRouter();
const taskId = Number(route.params.id);
const tasks = ref([]);
const task = ref({});
const editMode = ref(false);
const editTitle = ref('');
const editSummary = ref('');
const editTags = ref('');

function formatDate(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return d.toLocaleDateString('tr-TR', { day: '2-digit', month: 'short', year: 'numeric' });
}

async function loadTask() {
  tasks.value = await getTasks();
  task.value = tasks.value.find(t => t.id === taskId) || {};
  editTitle.value = task.value.title || '';
  editSummary.value = task.value.summary || '';
  editTags.value = (task.value.tags || []).join(', ');
}

function completeTask() {
  // Burada tamamla işlemi yapılacak (sqlite servisinde güncelleme fonksiyonu eklenmeli)
  alert('Tamamla fonksiyonu eklenecek!');
}

function saveEdit() {
  // Burada düzenleme işlemi yapılacak (sqlite servisinde güncelleme fonksiyonu eklenmeli)
  alert('Kaydet fonksiyonu eklenecek!');
  editMode.value = false;
}

loadTask();
</script>

<style scoped>
</style> 