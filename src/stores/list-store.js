import { defineStore } from 'pinia';
import { nanoid } from 'nanoid';

// Dummy liste verileri
const dummyLists = [
  {
    id: nanoid(),
    title: 'Proje Kontrol Listesi',
    created_at: '2024-06-01',
    summary: 'Proje teslimi öncesi yapılacaklar.',
    tags: ['proje', 'kontrol'],
    category: 'İş',
    assigned_to_user_id: 'user1',
    created_by_user_id: 'user1'
  },
  {
    id: nanoid(),
    title: 'Tatilde Götürülecekler',
    created_at: '2024-06-03',
    summary: 'Tatil için valiz listesi.',
    tags: ['tatil', 'valiz'],
    category: 'Kişisel',
    assigned_to_user_id: 'user2',
    created_by_user_id: 'user2'
  }
];

export const useListStore = defineStore('list', {
  state: () => ({
    lists: [...dummyLists]
  }),
  actions: {
    // Liste ekleme, silme, güncelleme fonksiyonları buraya eklenebilir
  }
}); 