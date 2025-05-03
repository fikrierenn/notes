<template>
  <div class="min-h-screen bg-gray-50 flex flex-col">
    <!-- Sabit Başlık ve Liste Ekleme Alanı -->
    <header class="sticky top-0 z-20 bg-white shadow flex flex-col gap-2 px-4 py-3">
      <h1 class="text-xl font-bold tracking-tight">Listelerim</h1>
      <form @submit.prevent="handleAddList" class="flex gap-2 pt-2">
        <input v-model="newList" type="text" placeholder="Yeni liste ekle..." class="flex-1 border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition" />
        <button class="px-4 py-2 bg-indigo-600 text-white rounded-lg font-semibold shadow hover:bg-indigo-700 transition">Ekle</button>
      </form>
    </header>

    <!-- Liste Kartları -->
    <main class="flex-1 p-4 flex flex-col gap-4">
      <transition-group name="fade" tag="ul" class="flex flex-col gap-3">
        <li v-for="list in lists" :key="list.id" class="bg-white rounded-xl shadow p-4 flex flex-col gap-2 border border-gray-100">
          <div class="flex items-center justify-between">
            <span class="font-semibold text-base">{{ list.title }}</span>
            <span class="text-xs text-gray-400">{{ formatDate(list.created_at) }}</span>
          </div>
          <div class="flex gap-2 mt-2">
            <button @click="addTaskToList(list.id)" class="flex-1 px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 text-xs">Görev Ekle</button>
            <button @click="addNoteToList(list.id)" class="flex-1 px-3 py-1 bg-green-100 text-green-700 rounded hover:bg-green-200 text-xs">Not Ekle</button>
          </div>
        </li>
      </transition-group>
      <div v-if="lists.length === 0" class="text-center text-gray-400 py-8">
        Henüz hiç liste yok.
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const lists = ref([]);
const newList = ref('');

function formatDate(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return d.toLocaleDateString('tr-TR', { day: '2-digit', month: 'short', year: 'numeric' });
}

async function loadLists() {
  // TODO: SQLite'dan listeleri çek
  lists.value = [
    { id: 1, title: 'Kişisel', created_at: new Date().toISOString() },
    { id: 2, title: 'İş', created_at: new Date().toISOString() },
  ];
}

async function handleAddList() {
  if (!newList.value.trim()) return;
  // TODO: SQLite'a yeni liste ekle
  lists.value.unshift({ id: Date.now(), title: newList.value, created_at: new Date().toISOString() });
  newList.value = '';
}

function addTaskToList(listId) {
  // TODO: O listeye görev ekleme modalı aç
  alert('Bu listeye görev ekleme özelliği eklenecek!');
}

function addNoteToList(listId) {
  // TODO: O listeye not ekleme modalı aç
  alert('Bu listeye not ekleme özelliği eklenecek!');
}

onMounted(loadLists);
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: all 0.3s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style> 