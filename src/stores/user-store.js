import { defineStore } from 'pinia';

// Dummy kullanıcı verileri
const dummyUsers = [
  { id: 'user1', name: 'Ahmet Yılmaz', email: 'ahmet@example.com', avatar: 'https://ui-avatars.com/api/?name=Ahmet+Yılmaz&background=0D8ABC&color=fff' },
  { id: 'user2', name: 'Ayşe Demir', email: 'ayse@example.com', avatar: 'https://ui-avatars.com/api/?name=Ayşe+Demir&background=0D8ABC&color=fff' },
  { id: 'user3', name: 'Mehmet Kaya', email: 'mehmet@example.com', avatar: 'https://ui-avatars.com/api/?name=Mehmet+Kaya&background=0D8ABC&color=fff' }
];

export const useUserStore = defineStore('user', {
  state: () => ({
    users: [...dummyUsers]
  }),
  actions: {
    loadUsers() {
      this.users = [...dummyUsers];
    }
  }
}); 