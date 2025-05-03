<template>
  <div class="min-h-screen bg-gray-50 flex flex-col">
    <!-- Sabit Başlık ve Durum -->
    <header class="sticky top-0 z-20 bg-white shadow flex flex-col gap-2 px-4 py-3">
      <div class="flex items-center justify-between">
        <h1 class="text-xl font-bold tracking-tight">Notlarım</h1>
        <span class="flex items-center gap-1">
          <span class="w-2 h-2 rounded-full" :class="isOnline ? 'bg-green-500' : 'bg-gray-400'" />
          <span class="text-xs text-gray-500">{{ isOnline ? 'Online' : 'Offline' }}</span>
        </span>
      </div>
      <!-- Not Ekleme Alanı (Sticky) -->
      <form @submit.prevent="handleAddNote" class="flex gap-2 pt-2">
        <input v-model="newNote" type="text" placeholder="Yeni not ekle..." class="flex-1 border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400 transition" />
        <button class="px-4 py-2 bg-green-600 text-white rounded-lg font-semibold shadow hover:bg-green-700 transition">Ekle</button>
      </form>
    </header>

    <!-- Not Listesi -->
    <main class="flex-1 p-4 flex flex-col gap-4">
      <transition-group name="fade" tag="ul" class="flex flex-col gap-3">
        <li v-for="note in notes" :key="note.id" class="bg-white rounded-xl shadow p-4 flex flex-col gap-1 border border-gray-100">
          <div class="font-semibold text-base">{{ note.title }}</div>
          <div class="text-sm text-gray-600">{{ note.summary }}</div>
          <div class="text-xs text-gray-400 mt-1">{{ formatDate(note.created_at) }}</div>
        </li>
      </transition-group>
      <div v-if="notes.length === 0" class="text-center text-gray-400 py-8">
        Henüz hiç not yok.
      </div>
    </main>

    <!-- Alt Tab Bar App.vue'da -->
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getNotes, addNote } from '../services/sqlite';

const notes = ref([]);
const newNote = ref('');
const isOnline = ref(navigator.onLine);

function formatDate(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return d.toLocaleDateString('tr-TR', { day: '2-digit', month: 'short', year: 'numeric' });
}

async function loadNotes() {
  notes.value = await getNotes();
}

async function handleAddNote() {
  if (!newNote.value.trim()) return;
  await addNote({ title: newNote.value });
  newNote.value = '';
  await loadNotes();
}

onMounted(() => {
  loadNotes();
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