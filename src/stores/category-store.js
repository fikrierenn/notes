import { defineStore } from 'pinia';

// Dummy kategori verileri
const dummyCategories = [
  { id: 'cat1', name: 'İş', color: 'bg-blue-500' },
  { id: 'cat2', name: 'Kişisel', color: 'bg-green-500' },
  { id: 'cat3', name: 'Alışveriş', color: 'bg-yellow-500' }
];

export const useCategoryStore = defineStore('category', {
  state: () => ({
    categories: [...dummyCategories]
  }),
  actions: {
    loadCategories() {
      this.categories = [...dummyCategories];
    }
  }
}); 