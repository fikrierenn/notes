<template>
  <aside class="hidden md:flex flex-col w-64 h-screen bg-white border-r shadow-lg fixed top-0 left-0 z-30">
    <div class="flex items-center gap-2 px-6 py-4 border-b">
      <span class="text-2xl font-bold text-blue-700">Takip Asistanı</span>
    </div>
    <nav class="flex-1 flex flex-col gap-1 mt-4">
      <router-link v-for="item in menu" :key="item.path" :to="item.path" class="flex items-center gap-3 px-6 py-3 text-gray-700 hover:bg-blue-50 transition rounded-r-full group" :class="{ 'bg-blue-100 text-blue-700 font-semibold': $route.path === item.path }">
        <span v-html="item.icon" class="w-5 h-5"></span>
        <span>{{ item.label }}</span>
      </router-link>
    </nav>
    <div class="mt-auto px-6 py-4 border-t flex items-center gap-3">
      <span class="inline-block w-10 h-10 rounded-full bg-blue-200 flex items-center justify-center text-lg font-bold text-blue-700">S</span>
      <div class="flex flex-col">
        <span class="font-semibold text-gray-700">Sen (Demo)</span>
        <span class="text-xs flex items-center gap-1">
          <span class="w-2 h-2 rounded-full" :class="isOnline ? 'bg-green-500' : 'bg-gray-400'" />
          <span class="text-gray-500">{{ isOnline ? 'Online' : 'Offline' }}</span>
        </span>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';

const isOnline = ref(navigator.onLine);
window.addEventListener('online', () => (isOnline.value = true));
window.addEventListener('offline', () => (isOnline.value = false));

const menu = [
  {
    label: 'Dashboard',
    path: '/',
    icon: `<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M3 12l2-2m0 0l7-7 7 7M13 5v6h6m-6 0v6m0 0H7m6 0h6'/></svg>`
  },
  {
    label: 'Görevler',
    path: '/gorevler',
    icon: `<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M9 12h6m2 0a2 2 0 100-4H7a2 2 0 100 4h10zm0 0v6a2 2 0 01-2 2H7a2 2 0 01-2-2v-6'/></svg>`
  },
  {
    label: 'Notlar',
    path: '/notlar',
    icon: `<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M8 16h8M8 12h8m-8-4h8M4 6h16M4 10h16M4 14h16M4 18h16'/></svg>`
  },
  {
    label: 'Listeler',
    path: '/listeler',
    icon: `<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M4 6h16M4 10h16M4 14h16M4 18h16'/></svg>`
  },
  {
    label: 'Kategoriler',
    path: '/kategoriler',
    icon: `<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'><circle cx='12' cy='12' r='10' stroke='currentColor' stroke-width='2' fill='none'/><path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M8 12h8'/></svg>`
  },
  {
    label: 'Kullanıcılar',
    path: '/kullanicilar',
    icon: `<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87M16 3.13a4 4 0 010 7.75M8 3.13a4 4 0 010 7.75'/></svg>`
  }
];
</script>

<style scoped>
/* Modern sidebar için ek responsive ve hover stilleri */
</style> 