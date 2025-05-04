<template>
  <div class="pb-14 md:pb-0">
    <!-- Sidebar sadece masaüstünde görünür -->
    <SidebarMenu class="hidden md:block" />
    <!-- Ana içerik alanı, sidebar varsa sola kayar -->
    <div class="md:ml-64">
      <router-view />
    </div>
    <!-- Mobilde alt menü -->
    <BottomTabBar />
  </div>
</template>

<script setup>
import SidebarMenu from './components/sidebar-menu.vue';
import BottomTabBar from './components/bottom-tab-bar.vue';
// Uygulama ana bileşeni
</script>

<style>
/* Global stiller buraya eklenebilir */
</style> 