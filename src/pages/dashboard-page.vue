<template>
  <div class="min-h-screen bg-gray-50 flex flex-col">
    <header class="sticky top-0 z-20 bg-white shadow flex flex-col md:flex-row md:items-center gap-2 px-4 py-3">
      <h1 class="text-2xl font-bold tracking-tight flex-1">Ana Sayfa</h1>
      <div class="flex gap-2">
        <button class="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold shadow hover:bg-blue-700 transition">Yeni Görev</button>
        <button class="px-4 py-2 bg-green-600 text-white rounded-lg font-semibold shadow hover:bg-green-700 transition">Yeni Not</button>
        <button class="px-4 py-2 bg-indigo-600 text-white rounded-lg font-semibold shadow hover:bg-indigo-700 transition">Yeni Liste</button>
      </div>
    </header>

    <main class="flex-1 p-4 flex flex-col gap-6">
      <!-- İstatistik Kartları -->
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div class="bg-white rounded-xl shadow p-4 flex flex-col items-center">
          <div class="text-2xl font-bold text-blue-600">{{ stats.tasks }}</div>
          <div class="text-xs text-gray-500 mt-1">Toplam Görev</div>
        </div>
        <div class="bg-white rounded-xl shadow p-4 flex flex-col items-center">
          <div class="text-2xl font-bold text-green-600">{{ stats.completed }}</div>
          <div class="text-xs text-gray-500 mt-1">Tamamlanan</div>
        </div>
        <div class="bg-white rounded-xl shadow p-4 flex flex-col items-center">
          <div class="text-2xl font-bold text-yellow-600">{{ stats.postponed }}</div>
          <div class="text-xs text-gray-500 mt-1">Ertelenen</div>
        </div>
        <div class="bg-white rounded-xl shadow p-4 flex flex-col items-center">
          <div class="text-2xl font-bold text-purple-600">{{ stats.notes }}</div>
          <div class="text-xs text-gray-500 mt-1">Not</div>
        </div>
        <div class="bg-white rounded-xl shadow p-4 flex flex-col items-center">
          <div class="text-2xl font-bold text-indigo-600">{{ stats.lists }}</div>
          <div class="text-xs text-gray-500 mt-1">Liste</div>
        </div>
        <div class="bg-white rounded-xl shadow p-4 flex flex-col items-center">
          <div class="text-2xl font-bold text-pink-600">{{ stats.categories }}</div>
          <div class="text-xs text-gray-500 mt-1">Kategori</div>
        </div>
      </div>

      <!-- Yaklaşan Son Tarihli Görevler -->
      <div class="bg-white rounded-xl shadow p-4">
        <div class="font-semibold text-lg mb-2">Yaklaşan Son Tarihli Görevler</div>
        <ul class="divide-y divide-gray-100">
          <li v-for="task in upcomingTasks" :key="task.id" class="py-2 flex flex-col md:flex-row md:items-center gap-1">
            <span class="font-medium">{{ task.title }}</span>
            <span class="text-xs text-gray-500">Son: {{ formatDate(task.due_date) }}</span>
            <span v-if="task.category" class="text-xs px-2 py-1 rounded bg-indigo-100 text-indigo-700 font-semibold">{{ task.category }}</span>
            <span v-if="task.assigned_to_user_id" class="text-xs text-green-700">@{{ task.assigned_to_user_id }}</span>
          </li>
          <li v-if="upcomingTasks.length === 0" class="text-gray-400 py-4 text-center">Yaklaşan görev yok.</li>
        </ul>
      </div>

      <!-- Kısa Raporlar -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="bg-white rounded-xl shadow p-4">
          <div class="font-semibold text-lg mb-2">En Çok Ertelenen Görevler</div>
          <ul class="divide-y divide-gray-100">
            <li v-for="task in mostPostponedTasks" :key="task.id" class="py-2 flex flex-col md:flex-row md:items-center gap-1">
              <span class="font-medium">{{ task.title }}</span>
              <span class="text-xs text-yellow-600">{{ task.postponed_count }} kez ertelendi</span>
            </li>
            <li v-if="mostPostponedTasks.length === 0" class="text-gray-400 py-4 text-center">Erteleme kaydı yok.</li>
          </ul>
        </div>
        <div class="bg-white rounded-xl shadow p-4">
          <div class="font-semibold text-lg mb-2">Son Eklenen Notlar</div>
          <ul class="divide-y divide-gray-100">
            <li v-for="note in recentNotes" :key="note.id" class="py-2">
              <span class="font-medium">{{ note.title }}</span>
              <span class="text-xs text-gray-500 ml-2">{{ formatDate(note.created_at) }}</span>
            </li>
            <li v-if="recentNotes.length === 0" class="text-gray-400 py-4 text-center">Not yok.</li>
          </ul>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useTaskStore } from '../stores/task-store';
import { useNoteStore } from '../stores/note-store';
import { useListStore } from '../stores/list-store';
import { useCategoryStore } from '../stores/category-store';

const taskStore = useTaskStore();
const noteStore = useNoteStore();
const listStore = useListStore();
const categoryStore = useCategoryStore();

const stats = computed(() => ({
  tasks: taskStore.tasks.length,
  completed: taskStore.tasks.filter(t => t.status === 'Tamamlandı').length,
  postponed: taskStore.tasks.filter(t => t.postponed_count > 0).length,
  notes: noteStore.notes.length,
  lists: listStore.lists.length,
  categories: categoryStore.categories.length
}));

const upcomingTasks = computed(() => {
  const now = new Date();
  const weekLater = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
  return taskStore.tasks.filter(t => t.due_date && new Date(t.due_date) >= now && new Date(t.due_date) <= weekLater)
    .sort((a, b) => new Date(a.due_date) - new Date(b.due_date)).slice(0, 5);
});

const mostPostponedTasks = computed(() => {
  return [...taskStore.tasks].filter(t => t.postponed_count > 0)
    .sort((a, b) => b.postponed_count - a.postponed_count).slice(0, 5);
});

const recentNotes = computed(() => {
  return [...noteStore.notes].sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).slice(0, 5);
});

function formatDate(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return d.toLocaleDateString('tr-TR', { day: '2-digit', month: 'short', year: 'numeric' });
}
</script>

<style scoped>
/* Responsive ve modern kartlar için ek stiller */
</style> 