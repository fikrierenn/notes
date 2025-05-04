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
      <form @submit.prevent="handleAddNote" class="flex flex-col gap-2 pt-2 md:flex-row md:items-center">
        <ckeditor :editor="ClassicEditor" v-model="newNote" class="flex-1 bg-white rounded-lg border border-gray-200" />
        <select v-model="newCategory" class="border border-gray-200 rounded-lg px-2 py-2 focus:outline-none focus:ring-2 focus:ring-green-400 transition">
          <option disabled value="">Kategori Seç</option>
          <option v-for="cat in categories" :key="cat.id" :value="cat.name">{{ cat.name }}</option>
        </select>
        <button class="px-4 py-2 bg-green-600 text-white rounded-lg font-semibold shadow hover:bg-green-700 transition">Ekle</button>
      </form>
    </header>

    <!-- Not Listesi -->
    <main class="flex-1 p-4 flex flex-col gap-4">
      <transition-group name="fade" tag="ul" class="flex flex-col gap-3">
        <li v-for="note in notes" :key="note.id" class="bg-white rounded-xl shadow p-4 flex flex-col gap-1 border border-gray-100">
          <div class="font-semibold text-base">{{ note.title }}</div>
          <div class="text-sm text-gray-600" v-html="note.summary"></div>
          <div class="flex items-center gap-2 mt-1">
            <span v-if="note.category" class="text-xs px-2 py-1 rounded bg-indigo-100 text-indigo-700 font-semibold">{{ note.category }}</span>
            <span class="text-xs text-gray-400">{{ formatDate(note.created_at) }}</span>
            <button @click="openEditModal(note)" class="ml-auto text-xs text-yellow-600 hover:underline">Düzenle</button>
            <button @click="deleteNoteById(note.id)" class="text-xs text-red-600 hover:underline">Sil</button>
          </div>
        </li>
      </transition-group>
      <div v-if="notes.length === 0" class="text-center text-gray-400 py-8">
        Henüz hiç not yok.
      </div>
    </main>

    <!-- Düzenleme Modalı -->
    <div v-if="editModal" class="fixed inset-0 z-30 bg-black bg-opacity-40 flex items-center justify-center">
      <div class="bg-white rounded-xl shadow-lg p-6 w-full max-w-md mx-2 flex flex-col gap-4">
        <h2 class="text-lg font-bold mb-2">Not Düzenle</h2>
        <input v-model="editTitle" class="border rounded px-3 py-2" placeholder="Başlık" />
        <ckeditor :editor="ClassicEditor" v-model="editSummary" class="bg-white rounded-lg border border-gray-200" />
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

    <!-- Alt Tab Bar App.vue'da -->
    <div class="p-4 bg-white rounded-xl shadow flex flex-col gap-2">
      <div><b>Kategori:</b> {{ stats.categories }}</div>
      <div><b>Not:</b> {{ stats.notes }}</div>
      <div><b>Görev:</b> {{ stats.tasks }}</div>
      <div><b>Liste:</b> {{ stats.lists }}</div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getNotes, addNote, updateNote, deleteNote, getCategories, getTasks, getLists } from '../services/sqlite';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const notes = ref([]);
const newNote = ref('');
const newCategory = ref('');
const isOnline = ref(navigator.onLine);
const categories = ref([]);
const stats = ref({ categories: 0, notes: 0, tasks: 0, lists: 0 });

// Düzenleme modalı için
const editModal = ref(false);
const editId = ref(null);
const editTitle = ref('');
const editSummary = ref('');
const editCategory = ref('');

function formatDate(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return d.toLocaleDateString('tr-TR', { day: '2-digit', month: 'short', year: 'numeric' });
}

async function loadNotes() {
  notes.value = await getNotes();
}

async function loadCategories() {
  categories.value = await getCategories();
}

async function loadTasks() {
  // Implementasyon gerekiyor
}

async function loadLists() {
  // Implementasyon gerekiyor
}

async function handleAddNote() {
  if (!newNote.value || !newCategory.value) return;
  await addNote({ title: newNote.value.replace(/<[^>]+>/g, '').slice(0, 50), summary: newNote.value, category: newCategory.value });
  newNote.value = '';
  newCategory.value = '';
  await loadNotes();
}

function openEditModal(note) {
  editId.value = note.id;
  editTitle.value = note.title;
  editSummary.value = note.summary;
  editCategory.value = note.category;
  editModal.value = true;
}

function closeEditModal() {
  editModal.value = false;
}

async function saveEdit() {
  if (!editTitle.value || !editCategory.value) return;
  await updateNote({ id: editId.value, title: editTitle.value, summary: editSummary.value, category: editCategory.value });
  editModal.value = false;
  await loadNotes();
}

async function deleteNoteById(id) {
  if (confirm('Bu notu silmek istediğinize emin misiniz?')) {
    await deleteNote(id);
    await loadNotes();
  }
}

onMounted(async () => {
  await loadNotes();
  await loadCategories();
  const [categoriesArr, notesArr, tasksArr, listsArr] = await Promise.all([
    getCategories(), getNotes(), getTasks(), getLists()
  ]);
  stats.value.categories = categoriesArr.length;
  stats.value.notes = notesArr.length;
  stats.value.tasks = tasksArr.length;
  stats.value.lists = listsArr.length;
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