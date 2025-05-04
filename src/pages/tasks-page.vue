<template>
  <div class="min-h-screen bg-gray-50 flex flex-col">
    <!-- Sabit Başlık ve Durum -->
    <header class="sticky top-0 z-20 bg-white shadow flex flex-col gap-2 px-4 py-3">
      <div class="flex items-center justify-between">
        <h1 class="text-xl font-bold tracking-tight">Görevlerim</h1>
        <span class="flex items-center gap-1">
          <span class="w-2 h-2 rounded-full" :class="isOnline ? 'bg-green-500' : 'bg-gray-400'" />
          <span class="text-xs text-gray-500">{{ isOnline ? 'Online' : 'Offline' }}</span>
          <button @click="handleSync" :disabled="syncLoading" class="ml-2 flex items-center gap-1 px-2 py-1 rounded text-xs font-semibold border border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100 transition disabled:opacity-60">
            <svg v-if="!syncLoading" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582M20 20v-5h-.581M5.635 19A9 9 0 1021 12.35" /></svg>
            <svg v-else class="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path></svg>
            <span>Eşitle</span>
          </button>
        </span>
        <button @click="openAddModal" class="ml-auto px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold shadow hover:bg-blue-700 transition">Yeni Görev</button>
      </div>
      <div v-if="syncMessage" class="text-xs text-blue-700 mt-1">{{ syncMessage }}</div>
    </header>

    <!-- Filtreler ve Arama -->
    <section class="flex flex-col sm:flex-row gap-2 items-stretch sm:items-end mt-4 mb-4">
      <input v-model="aramaMetni" type="text" placeholder="Görev veya açıklama ara..." class="flex-1 border rounded px-3 py-2" />
      <select v-model="seciliKategori" class="border rounded px-3 py-2">
        <option value="">Tüm Kategoriler</option>
        <option v-for="cat in categories" :key="cat.id" :value="cat.name">{{ cat.name }}</option>
      </select>
      <select v-model="seciliDurum" class="border rounded px-3 py-2">
        <option value="">Tüm Durumlar</option>
        <option value="Açık">Açık</option>
        <option value="Tamamlandı">Tamamlandı</option>
        <option value="Ertelendi">Ertelendi</option>
      </select>
      <select v-model="seciliKullanici" class="border rounded px-3 py-2">
        <option value="">Tüm Kullanıcılar</option>
        <option v-for="user in users" :key="user.id" :value="user.id">{{ user.name }}</option>
      </select>
    </section>

    <!-- Görev Listesi -->
    <main class="flex-1 p-4">
      <ul class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <li v-for="task in filteredTasks" :key="task.id" class="bg-white rounded-xl shadow p-4 flex flex-col gap-1 border border-gray-100">
          <div class="flex items-center justify-between">
            <span class="font-medium text-base">{{ task.title }}</span>
            <span class="text-xs px-2 py-1 rounded bg-blue-100 text-blue-700">{{ task.status }}</span>
          </div>
          <div class="flex items-center gap-2 mt-1 flex-wrap">
            <span v-if="task.category" :class="['text-xs px-2 py-1 rounded font-semibold', getCategoryColor(task.category)]" :title="'Kategori: ' + task.category">{{ task.category }}</span>
            <span class="text-xs text-gray-400">{{ formatDate(task.created_at) }}</span>
            <span v-if="task.due_date" class="text-xs text-gray-500">Son: {{ formatDate(task.due_date) }}</span>
            <span v-if="task.postponed_count > 0" class="text-xs text-yellow-600">{{ task.postponed_count }} kez ertelendi</span>
          </div>
          <div v-if="task.summary" class="text-sm text-gray-600 mt-1" v-html="task.summary"></div>
          <div class="flex items-center gap-2 mt-2">
            <button @click="openEditModal(task)" class="ml-auto text-xs text-yellow-600 hover:underline">Düzenle</button>
            <button @click="deleteTaskById(task.id)" class="text-xs text-red-600 hover:underline">Sil</button>
          </div>
          <!-- Görev Detayları -->
          <div class="mt-2 text-xs text-gray-500 flex flex-col gap-1">
            <div><b>Başlangıç:</b> {{ formatDate(task.created_at) }}</div>
            <div v-if="task.due_date"><b>Son Tarih:</b> {{ formatDate(task.due_date) }}</div>
            <div v-if="task.completed_at"><b>Tamamlandı:</b> {{ formatDate(task.completed_at) }}</div>
            <div v-if="task.completed_at"><b>Toplam Gün:</b> {{ calcTotalDays(task.created_at, task.completed_at) }}</div>
            <div><b>Atanan:</b> <span v-if="task.assigned_to_user_id" class="inline-flex items-center gap-1">
              <img v-if="getUserAvatar(task.assigned_to_user_id)" :src="getUserAvatar(task.assigned_to_user_id)" class="w-5 h-5 rounded-full border inline-block" :alt="getUserName(task.assigned_to_user_id)" />
              <span v-else class="w-5 h-5 rounded-full bg-green-200 text-green-800 flex items-center justify-center font-bold text-xs">{{ getUserInitials(task.assigned_to_user_id) }}</span>
              {{ getUserName(task.assigned_to_user_id) }}
            </span></div>
            <div><b>Ertelenme:</b> {{ task.postponed_count }} kez</div>
            <div v-if="task.postponed_dates && task.postponed_dates.length">
              <b>Ertelenme Geçmişi:</b>
              <ul class="list-disc ml-4">
                <li v-for="(p, i) in task.postponed_dates" :key="i">
                  {{ formatDate(p.old_due_date) }} → {{ formatDate(p.new_due_date) }} ({{ formatDateTime(p.changed_at) }})
                </li>
              </ul>
            </div>
          </div>
        </li>
      </ul>
      <div v-if="tasks.length === 0" class="text-center text-gray-400 py-8">
        Henüz hiç görev yok.
      </div>
    </main>

    <!-- Görev Ekleme Modalı -->
    <div v-if="addModal" class="fixed inset-0 z-30 bg-black bg-opacity-40 flex items-center justify-center">
      <div class="bg-white rounded-xl shadow-lg p-6 w-full max-w-md mx-2 flex flex-col gap-4">
        <h2 class="text-lg font-bold mb-2">Yeni Görev</h2>
        <div v-if="addError" class="text-red-600 text-sm font-semibold">{{ addError }}</div>
        <input v-model="newTask" class="border rounded px-3 py-2" placeholder="Başlık" />
        <ckeditor :editor="ClassicEditor" v-model="newSummary" class="bg-white rounded-lg border border-gray-200" />
        <select v-model="newCategory" class="border rounded px-3 py-2">
          <option disabled value="">Kategori Seç</option>
          <option v-for="cat in categories" :key="cat.id" :value="cat.name">{{ cat.name }}</option>
        </select>
        <input v-model="newDueDate" type="date" class="border rounded px-3 py-2" />
        <select v-model="newAssignedTo" class="border rounded px-3 py-2">
          <option disabled value="">Kullanıcı Ata</option>
          <option v-for="user in users" :key="user.id" :value="user.id">{{ user.name }}</option>
        </select>
        <div class="flex gap-2 mt-2">
          <button @click="handleAddTask" class="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700">Kaydet</button>
          <button @click="closeAddModal" class="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-semibold">Vazgeç</button>
        </div>
      </div>
    </div>

    <!-- Düzenleme Modalı -->
    <div v-if="editModal" class="fixed inset-0 z-30 bg-black bg-opacity-40 flex items-center justify-center">
      <div class="bg-white rounded-xl shadow-lg p-6 w-full max-w-md mx-2 flex flex-col gap-4">
        <h2 class="text-lg font-bold mb-2">Görev Düzenle</h2>
        <div v-if="editError" class="text-red-600 text-sm font-semibold">{{ editError }}</div>
        <input v-model="editTitle" class="border rounded px-3 py-2" placeholder="Başlık" />
        <ckeditor :editor="ClassicEditor" v-model="editSummary" class="bg-white rounded-lg border border-gray-200" />
        <select v-model="editCategory" class="border rounded px-3 py-2">
          <option disabled value="">Kategori Seç</option>
          <option v-for="cat in categories" :key="cat.id" :value="cat.name">{{ cat.name }}</option>
        </select>
        <input v-model="editDueDate" type="date" class="border rounded px-3 py-2" />
        <select v-model="editAssignedTo" class="border rounded px-3 py-2">
          <option disabled value="">Kullanıcı Ata</option>
          <option v-for="user in users" :key="user.id" :value="user.id">{{ user.name }}</option>
        </select>
        <select v-model="editStatus" class="border rounded px-3 py-2">
          <option value="Açık">Açık</option>
          <option value="Tamamlandı">Tamamlandı</option>
        </select>
        <div class="flex gap-2 mt-2">
          <button @click="saveEdit" class="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700">Kaydet</button>
          <button @click="closeEditModal" class="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-semibold">Vazgeç</button>
        </div>
      </div>
    </div>

    <!-- Alt Tab Bar App.vue'da -->
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useTaskStore } from '../stores/task-store';
import { useCategoryStore } from '../stores/category-store';
import { useUserStore } from '../stores/user-store';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const taskStore = useTaskStore();
const categoryStore = useCategoryStore();
const userStore = useUserStore();

const tasks = computed(() => taskStore.tasks);
const categories = computed(() => categoryStore.categories);
const users = computed(() => userStore.users);

const isOnline = ref(navigator.onLine);

const addModal = ref(false);
const newTask = ref('');
const newSummary = ref('');
const newCategory = ref('');
const newDueDate = ref('');
const newAssignedTo = ref('');
const addError = ref('');

const currentUserId = 'user1'; // Dummy, ileride auth ile değiştirilecek

function openAddModal() {
  addModal.value = true;
  newAssignedTo.value = currentUserId;
  newTask.value = '';
  newSummary.value = '';
  newCategory.value = '';
  newDueDate.value = '';
  addError.value = '';
}
function closeAddModal() {
  addModal.value = false;
  newTask.value = '';
  newSummary.value = '';
  newCategory.value = '';
  newDueDate.value = '';
  newAssignedTo.value = currentUserId;
  addError.value = '';
}

// Düzenleme modalı için
const editModal = ref(false);
const editId = ref(null);
const editTitle = ref('');
const editSummary = ref('');
const editCategory = ref('');
const editDueDate = ref('');
const editAssignedTo = ref('');
const editStatus = ref('Açık');
const editPostponedCount = ref(0);
const editPostponedDates = ref([]);
const editCreatedAt = ref('');
const editCompletedAt = ref('');
const editError = ref('');

function formatDate(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return d.toLocaleDateString('tr-TR', { day: '2-digit', month: 'short', year: 'numeric' });
}
function formatDateTime(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return d.toLocaleString('tr-TR');
}
function calcTotalDays(start, end) {
  if (!start || !end) return '';
  const s = new Date(start);
  const e = new Date(end);
  return Math.ceil((e - s) / (1000 * 60 * 60 * 24));
}

async function handleAddTask() {
  addError.value = '';
  if (!newTask.value.trim()) {
    addError.value = 'Başlık zorunludur.';
    return;
  }
  if (!newSummary.value || newSummary.value.replace(/<[^>]*>/g, '').trim() === '') {
    addError.value = 'Açıklama zorunludur.';
    return;
  }
  if (!newCategory.value) {
    addError.value = 'Kategori seçimi zorunludur.';
    return;
  }
  if (!newDueDate.value) {
    addError.value = 'Son tarih zorunludur.';
    return;
  }
  if (!newAssignedTo.value) {
    addError.value = 'Kullanıcı seçimi zorunludur.';
    return;
  }
  await taskStore.addTask({
    title: newTask.value,
    summary: newSummary.value,
    category: newCategory.value,
    due_date: newDueDate.value,
    assigned_to_user_id: newAssignedTo.value,
    created_by_user_id: currentUserId
  });
  newTask.value = '';
  newSummary.value = '';
  newCategory.value = '';
  newDueDate.value = '';
  newAssignedTo.value = currentUserId;
  addModal.value = false;
  await taskStore.loadTasks();
}

function openEditModal(task) {
  editId.value = task.id;
  editTitle.value = task.title;
  editSummary.value = task.summary;
  editCategory.value = task.category;
  editDueDate.value = task.due_date;
  editAssignedTo.value = task.assigned_to_user_id;
  editStatus.value = task.status;
  editPostponedCount.value = task.postponed_count || 0;
  editPostponedDates.value = task.postponed_dates || [];
  editCreatedAt.value = task.created_at;
  editCompletedAt.value = task.completed_at;
  editModal.value = true;
}

function closeEditModal() {
  editModal.value = false;
}

async function saveEdit() {
  editError.value = '';
  if (!editTitle.value.trim()) {
    editError.value = 'Başlık zorunludur.';
    return;
  }
  if (!editSummary.value || editSummary.value.replace(/<[^>]*>/g, '').trim() === '') {
    editError.value = 'Açıklama zorunludur.';
    return;
  }
  if (!editCategory.value) {
    editError.value = 'Kategori seçimi zorunludur.';
    return;
  }
  if (!editDueDate.value) {
    editError.value = 'Son tarih zorunludur.';
    return;
  }
  if (!editAssignedTo.value) {
    editError.value = 'Kullanıcı seçimi zorunludur.';
    return;
  }
  let postponedCount = editPostponedCount.value;
  let postponedDates = editPostponedDates.value ? [...editPostponedDates.value] : [];
  // Son tarih değiştiyse erteleme kaydı ekle
  const oldDueDate = tasks.value.find(t => t.id === editId.value)?.due_date;
  if (oldDueDate && oldDueDate !== editDueDate.value) {
    postponedCount++;
    postponedDates.push({
      old_due_date: oldDueDate,
      new_due_date: editDueDate.value,
      changed_at: new Date().toISOString()
    });
  }
  let completedAt = editCompletedAt.value;
  if (editStatus.value === 'Tamamlandı' && !completedAt) {
    completedAt = new Date().toISOString();
  }
  await taskStore.updateTask({
    id: editId.value,
    title: editTitle.value,
    status: editStatus.value,
    summary: editSummary.value,
    tags: [],
    category: editCategory.value,
    due_date: editDueDate.value,
    completed_at: completedAt,
    assigned_to_user_id: editAssignedTo.value,
    postponed_count: postponedCount,
    postponed_dates: postponedDates
  });
  editModal.value = false;
  await taskStore.loadTasks();
}

async function deleteTaskById(id) {
  if (confirm('Bu görevi silmek istediğinize emin misiniz?')) {
    await taskStore.deleteTask(id);
    await taskStore.loadTasks();
  }
}

// Kategoriye göre renkli etiket döndürür
function getCategoryColor(categoryName) {
  const cat = categories.value.find(c => c.name === categoryName);
  return cat ? cat.color + ' text-white' : 'bg-gray-300 text-gray-700';
}

// Kullanıcı adını döndürür
function getUserName(userId) {
  const user = users.value.find(u => u.id === userId);
  return user ? user.name : userId;
}

const syncLoading = ref(false);
const syncMessage = ref('');
async function handleSync() {
  if (!isOnline.value) {
    syncMessage.value = 'Bağlantı yok, eşitleme yapılamaz.';
    return;
  }
  syncLoading.value = true;
  syncMessage.value = 'Eşitleniyor...';
  try {
    if (typeof taskStore.syncWithSupabase === 'function') {
      await taskStore.syncWithSupabase();
      syncMessage.value = 'Eşitleme başarılı.';
    } else {
      // Placeholder: Gerçek fonksiyon yoksa kısa gecikme simüle et
      await new Promise(r => setTimeout(r, 1000));
      syncMessage.value = 'Eşitleme (simülasyon) tamamlandı.';
    }
  } catch (e) {
    syncMessage.value = 'Eşitleme sırasında hata oluştu.';
  } finally {
    syncLoading.value = false;
    setTimeout(() => { syncMessage.value = ''; }, 2000);
  }
}

const aramaMetni = ref("");
const seciliKategori = ref("");
const seciliDurum = ref("");
const seciliKullanici = ref("");

const filteredTasks = computed(() => {
  return tasks.value.filter(task => {
    // Arama metni başlık veya açıklamada geçmeli
    const arama = aramaMetni.value.trim().toLowerCase();
    const baslik = (task.title || "").toLowerCase();
    const aciklama = (task.summary || "").replace(/<[^>]*>/g, '').toLowerCase();
    const aramaGeciyor = !arama || baslik.includes(arama) || aciklama.includes(arama);
    // Kategori filtresi
    const kategoriGeciyor = !seciliKategori.value || task.category === seciliKategori.value;
    // Durum filtresi
    const durumGeciyor = !seciliDurum.value || task.status === seciliDurum.value;
    // Kullanıcı filtresi
    const kullaniciGeciyor = !seciliKullanici.value || task.assigned_to_user_id === seciliKullanici.value;
    return aramaGeciyor && kategoriGeciyor && durumGeciyor && kullaniciGeciyor;
  });
});

watch(filteredTasks, (yeni) => {
  console.log('Filtreli görevler:', yeni);
});

onMounted(() => {
  taskStore.loadTasks();
  categoryStore.loadCategories();
  userStore.loadUsers();
  window.addEventListener('online', () => (isOnline.value = true));
  window.addEventListener('offline', () => (isOnline.value = false));
});

function getUserAvatar(userId) {
  const user = users.value.find(u => u.id === userId);
  return user && user.avatar ? user.avatar : '';
}
function getUserInitials(userId) {
  const user = users.value.find(u => u.id === userId);
  if (!user || !user.name) return '';
  return user.name.split(' ').map(s => s[0]).join('').toUpperCase();
}
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