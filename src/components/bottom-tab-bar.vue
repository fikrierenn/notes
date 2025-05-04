<template>
  <nav class="fixed bottom-0 left-0 right-0 z-20 bg-white border-t shadow-t flex justify-around items-center h-14 md:hidden">
    <button @click="$router.push('/')" :class="isActive('/') ? 'text-blue-600' : 'text-gray-400'" class="flex flex-col items-center flex-1 py-1">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mb-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M13 5v6h6m-6 0v6m0 0H7m6 0h6"/></svg>
      <span class="text-xs">Ana Sayfa</span>
    </button>
    <button @click="$router.push('/gorevler')" :class="isActive('/gorevler') ? 'text-blue-600' : 'text-gray-400'" class="flex flex-col items-center flex-1 py-1">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mb-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m2 0a2 2 0 100-4H7a2 2 0 100 4h10zm0 0v6a2 2 0 01-2 2H7a2 2 0 01-2-2v-6"/></svg>
      <span class="text-xs">Görevler</span>
    </button>
    <button @click="$router.push('/notlar')" :class="isActive('/notlar') ? 'text-green-600' : 'text-gray-400'" class="flex flex-col items-center flex-1 py-1">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mb-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16h8M8 12h8m-8-4h8M4 6h16M4 10h16M4 14h16M4 18h16"/></svg>
      <span class="text-xs">Notlar</span>
    </button>
    <button @click="$router.push('/listeler')" :class="isActive('/listeler') ? 'text-indigo-600' : 'text-gray-400'" class="flex flex-col items-center flex-1 py-1">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mb-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16"/></svg>
      <span class="text-xs">Listeler</span>
    </button>
    <button @click="$router.push('/kategoriler')" :class="isActive('/kategoriler') ? 'text-purple-600' : 'text-gray-400'" class="flex flex-col items-center flex-1 py-1">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mb-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" fill="none" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h8"/></svg>
      <span class="text-xs">Kategoriler</span>
    </button>
    <button @click="$router.push('/kullanicilar')" :class="isActive('/kullanicilar') ? 'text-pink-600' : 'text-gray-400'" class="flex flex-col items-center flex-1 py-1">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mb-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87M16 3.13a4 4 0 010 7.75M8 3.13a4 4 0 010 7.75"/></svg>
      <span class="text-xs">Kullanıcılar</span>
    </button>
  </nav>
</template>

<script setup>
import { useRoute } from 'vue-router';
const route = useRoute();
const isActive = (path) => route.path === path;
</script>

<style scoped>
.shadow-t {
  box-shadow: 0 -2px 8px 0 rgba(0,0,0,0.04);
}
</style> 