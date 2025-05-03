<template>
  <nav class="fixed bottom-0 left-0 right-0 z-20 bg-white border-t shadow-t flex justify-around items-center h-14 md:hidden">
    <button @click="$router.push('/')" :class="isActive('/') ? 'text-blue-600' : 'text-gray-400'" class="flex flex-col items-center flex-1 py-1">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mb-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V7M16 3v4M8 3v4m-5 4h18" /></svg>
      <span class="text-xs">Görevler</span>
    </button>
    <button @click="$router.push('/notlar')" :class="isActive('/notlar') ? 'text-green-600' : 'text-gray-400'" class="flex flex-col items-center flex-1 py-1">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mb-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 20h9" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" /></svg>
      <span class="text-xs">Notlar</span>
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