<template>
  <div class="min-h-screen bg-gray-50 flex flex-col">
    <!-- Sabit Başlık ve Liste Ekleme Alanı -->
    <header class="sticky top-0 z-20 bg-white shadow flex flex-col gap-2 px-4 py-3">
      <h1 class="text-xl font-bold tracking-tight">Listelerim</h1>
      <form @submit.prevent="handleAddList" class="flex flex-col gap-2 pt-2 md:flex-row md:items-center">
        <input v-model="newList" type="text" placeholder="Yeni liste ekle..." class="flex-1 border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition" />
        <select v-model="newCategory" class="border border-gray-200 rounded-lg px-2 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition">
          <option disabled value="">Kategori Seç</option>
          <option v-for="cat in categories" :key="cat.id" :value="cat.name">{{ cat.name }}</option>
        </select>
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
          <div class="flex items-center gap-2 mt-1">
            <span v-if="list.category" class="text-xs px-2 py-1 rounded bg-indigo-100 text-indigo-700 font-semibold">{{ list.category }}</span>
            <button @click="openEditModal(list)" class="ml-auto text-xs text-yellow-600 hover:underline">Düzenle</button>
            <button @click="deleteListById(list.id)" class="text-xs text-red-600 hover:underline">Sil</button>
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

    <!-- Düzenleme Modalı -->
    <div v-if="editModal" class="fixed inset-0 z-30 bg-black bg-opacity-40 flex items-center justify-center">
      <div class="bg-white rounded-xl shadow-lg p-6 w-full max-w-md mx-2 flex flex-col gap-4">
        <h2 class="text-lg font-bold mb-2">Liste Düzenle</h2>
        <input v-model="editTitle" class="border rounded px-3 py-2" placeholder="Başlık" />
        <select v-model="editCategory" class="border rounded px-3 py-2">
          <option disabled value="">Kategori Seç</option>
          <option v-for="cat in categories" :key="cat.id" :value="cat.name">{{ cat.name }}</option>
        </select>
        <div class="flex gap-2 mt-2">
          <button @click="saveEdit" class="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700">Kaydet</button>
          <button @click="closeEditModal" class="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-semibold">Vazgeç</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getLists, addList, updateList, deleteList, getCategories } from '../services/sqlite';

const lists = ref([]);
const newList = ref('');
const newCategory = ref('');
const categories = ref([]);

// Düzenleme modalı için
const editModal = ref(false);
const editId = ref(null);
const editTitle = ref('');
const editCategory = ref('');

function formatDate(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return d.toLocaleDateString('tr-TR', { day: '2-digit', month: 'short', year: 'numeric' });
}

async function loadLists() {
  lists.value = await getLists();
}

async function loadCategories() {
  categories.value = await getCategories();
}

async function handleAddList() {
  if (!newList.value.trim() || !newCategory.value) return;
  await addList({ title: newList.value, category: newCategory.value });
  newList.value = '';
  newCategory.value = '';
  await loadLists();
}

function openEditModal(list) {
  editId.value = list.id;
  editTitle.value = list.title;
  editCategory.value = list.category;
  editModal.value = true;
}

function closeEditModal() {
  editModal.value = false;
}

async function saveEdit() {
  if (!editTitle.value.trim() || !editCategory.value) return;
  await updateList({ id: editId.value, title: editTitle.value, category: editCategory.value });
  editModal.value = false;
  await loadLists();
}

async function deleteListById(id) {
  if (confirm('Bu listeyi silmek istediğinize emin misiniz?')) {
    await deleteList(id);
    await loadLists();
  }
}

function addTaskToList(listId) {
  alert('Bu listeye görev ekleme özelliği eklenecek!');
}

function addNoteToList(listId) {
  alert('Bu listeye not ekleme özelliği eklenecek!');
}

onMounted(() => {
  loadLists();
  loadCategories();
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
</style> 