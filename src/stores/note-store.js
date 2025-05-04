import { defineStore } from 'pinia';
import { nanoid } from 'nanoid';

// Dummy not verileri
const dummyNotes = [
  {
    id: nanoid(),
    title: 'Toplantı Notları',
    created_at: '2024-06-01',
    summary: 'Yönetim toplantısında alınan önemli notlar.',
    tags: ['toplantı', 'not'],
    category: 'İş',
    assigned_to_user_id: 'user1',
    created_by_user_id: 'user1'
  },
  {
    id: nanoid(),
    title: 'Alışveriş Notu',
    created_at: '2024-06-02',
    summary: 'Alınacaklar: süt, ekmek, yumurta.',
    tags: ['alışveriş'],
    category: 'Alışveriş',
    assigned_to_user_id: 'user2',
    created_by_user_id: 'user1'
  }
];

export const useNoteStore = defineStore('note', {
  state: () => ({
    notes: [...dummyNotes]
  }),
  actions: {
    // Not ekleme, silme, güncelleme fonksiyonları buraya eklenebilir
  }
}); 