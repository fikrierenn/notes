<template>
  <aside class="hidden md:flex flex-col w-64 h-screen bg-white border-r shadow-lg fixed top-0 left-0 z-50">
    <!-- User Info -->
    <div class="flex items-center gap-3 px-6 py-5 border-b">
      <img :src="user.avatar" alt="Kullanıcı Avatarı" class="w-10 h-10 rounded-full border" />
      <div>
        <div class="font-semibold text-gray-800">{{ user.name }}</div>
        <div class="text-xs text-gray-500">{{ user.email }}</div>
      </div>
    </div>
    <!-- Menu -->
    <nav class="flex-1 py-4">
      <router-link
        v-for="item in menuItems"
        :key="item.path"
        :to="item.path"
        class="flex items-center gap-3 px-6 py-3 text-gray-600 hover:bg-blue-50 hover:text-blue-700 transition rounded-lg mb-1"
        :class="{ 'bg-blue-100 text-blue-700 font-semibold': $route.path === item.path }"
      >
        <span v-html="item.icon" class="w-6 h-6"></span>
        <span>{{ item.label }}</span>
      </router-link>
    </nav>
    <!-- Logout Button -->
    <button @click="logout" class="m-6 mt-auto flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded hover:bg-red-100 transition">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2h4a2 2 0 012 2v1"/></svg>
      <span>Çıkış Yap</span>
    </button>
  </aside>
</template>

<script setup>
// Sidebar menüde gösterilecek sayfalar ve ikonlar (değişken adı İngilizce)
const menuItems = [
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

// Dummy user info (gerçek uygulamada store veya auth'dan alınacak)
const user = {
  name: 'Demo Kullanıcı',
  email: 'demo@kullanici.com',
  avatar: 'https://ui-avatars.com/api/?name=Demo+Kullanıcı&background=0D8ABC&color=fff'
};

// Logout fonksiyonu (gerçek uygulamada auth servisi ile entegre edilmeli)
function logout() {
  // TODO: Auth logout işlemi
  alert('Çıkış yapıldı (demo)');
}
</script>

<style scoped>
/* Sidebar responsive ve modern görünüm için özelleştirilmiştir */
</style> 