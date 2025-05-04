<template>
  <div class="min-h-screen bg-gray-50 flex flex-col">
    <header class="sticky top-0 z-20 bg-white shadow flex flex-col gap-2 px-4 py-3">
      <h1 class="text-xl font-bold tracking-tight">Kategoriler</h1>
      <form @submit.prevent="handleAddCategory" class="flex gap-2 pt-2">
        <input v-model="newCategory" type="text" placeholder="Yeni kategori ekle..." class="flex-1 border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400 transition" />
        <button class="px-4 py-2 bg-purple-600 text-white rounded-lg font-semibold shadow hover:bg-purple-700 transition">Ekle</button>
      </form>
    </header>
    <main class="flex-1 p-4 flex flex-col gap-4">
      <ul class="flex flex-col gap-3">
        <li v-for="cat in categories" :key="cat.id" class="bg-white rounded-xl shadow p-4 flex items-center gap-2 border border-gray-100">
          <span class="font-medium text-base flex-1">{{ cat.name }}</span>
          <button @click="openEditModal(cat)" class="text-xs text-yellow-600 hover:underline">Düzenle</button>
          <button @click="deleteCategoryById(cat.id)" class="text-xs text-red-600 hover:underline">Sil</button>
        </li>
      </ul>
      <div v-if="categories.length === 0" class="text-center text-gray-400 py-8">
        Henüz hiç kategori yok.
      </div>
    </main>
    <!-- Düzenleme Modalı -->
    <div v-if="editModal" class="fixed inset-0 z-30 bg-black bg-opacity-40 flex items-center justify-center">
      <div class="bg-white rounded-xl shadow-lg p-6 w-full max-w-md mx-2 flex flex-col gap-4">
        <h2 class="text-lg font-bold mb-2">Kategori Düzenle</h2>
        <input v-model="editName" class="border rounded px-3 py-2" placeholder="Kategori Adı" />
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
import { getCategories, addCategory, deleteCategory, updateCategory } from '../services/sqlite';

const categories = ref([]);
const newCategory = ref('');

// Düzenleme modalı için
const editModal = ref(false);
const editId = ref(null);
const editName = ref('');

async function loadCategories() {
  categories.value = await getCategories();
}

async function handleAddCategory() {
  if (!newCategory.value.trim()) return;
  await addCategory(newCategory.value.trim());
  newCategory.value = '';
  await loadCategories();
}

function openEditModal(cat) {
  editId.value = cat.id;
  editName.value = cat.name;
  editModal.value = true;
}

function closeEditModal() {
  editModal.value = false;
}

async function saveEdit() {
  if (!editName.value.trim()) return;
  await updateCategory({ id: editId.value, name: editName.value.trim() });
  editModal.value = false;
  await loadCategories();
}

async function deleteCategoryById(id) {
  if (confirm('Bu kategoriyi silmek istediğinize emin misiniz?')) {
    await deleteCategory(id);
    await loadCategories();
  }
}

onMounted(loadCategories);
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